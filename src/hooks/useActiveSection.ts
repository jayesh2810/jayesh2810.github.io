import { useEffect, useState } from 'react';

/** Track which of the given section ids is currently in the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    const els: Element[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        obs.observe(el);
        els.push(el);
      }
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);
  return active;
}
