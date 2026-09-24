import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

interface Props {
  draw: DrawFn;
  onPointer?: (e: PointerEvent<HTMLCanvasElement>, x: number, y: number, w: number, h: number) => void;
  onPointerEnd?: () => void;
  className?: string;
  style?: CSSProperties;
  label?: string;
}

/**
 * DPR-aware canvas that redraws every animation frame. The draw callback is
 * read through a ref, so demos can close over mutable state freely.
 */
export default function Canvas2D({ draw, onPointer, onPointerEnd, className, style, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawRef = useRef(draw);
  const pointerRef = useRef(onPointer);
  const pointerEndRef = useRef(onPointerEnd);

  useEffect(() => {
    drawRef.current = draw;
    pointerRef.current = onPointer;
    pointerEndRef.current = onPointerEnd;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    let raf = 0;
    const t0 = performance.now();
    const loop = () => {
      drawRef.current(ctx, w, h, (performance.now() - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const handlePointer = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !pointerRef.current) return;
    const rect = canvas.getBoundingClientRect();
    pointerRef.current(e, e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={label ?? 'Interactive machine-learning demo'}
      style={{ touchAction: 'none', ...style }}
      onPointerMove={handlePointer}
      onPointerDown={handlePointer}
      onPointerLeave={() => pointerEndRef.current?.()}
    />
  );
}
