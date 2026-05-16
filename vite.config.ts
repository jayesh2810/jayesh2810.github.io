// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.

/** TanStack prerender/preview expect `dist/server/server.js`; Cloudflare worker build emits `index.js`. */
function emitServerJsBridge(): Plugin {
  return {
    name: "emit-server-js-bridge",
    writeBundle(options) {
      const dir = (options.dir ?? "").replace(/\\/g, "/");
      if (!dir.endsWith("dist/server")) return;
      const indexPath = join(options.dir ?? "", "index.js");
      const serverPath = join(options.dir ?? "", "server.js");
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, serverPath);
      }
    },
  };
}

export default defineConfig({
  plugins: [emitServerJsBridge()],
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: false,
      pages: ["/"],
      concurrency: 4,
      failOnError: true,
    },
  },
});
