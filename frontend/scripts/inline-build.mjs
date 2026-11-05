// Post-build step: inlines the compiled JS + CSS bundle into dist/index.html.
// Browsers (Chrome, Edge, Firefox) refuse to load external <script type="module">
// directly from disk. An inlined bundle works both from disk and from a server
// (including deep links such as /projects/<slug>).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const htmlPath = path.join(dist, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Remove any leftover dev-only entry tags (e.g. /src/main.jsx) that do not exist in dist.
html = html.replace(/\s*<script[^>]*src="\/src\/[^"]*"[^>]*><\/script>/g, '');

// Inline stylesheets.
html = html.replace(
  /<link rel="stylesheet"[^>]*href="\.?\/?(assets\/[^"]+\.css)"[^>]*>/g,
  (_m, file) => {
    const css = fs.readFileSync(path.join(dist, file), 'utf8');
    return `<style>\n${css}\n</style>`;
  }
);

// Inline module scripts and move them to the end of <body> so #root exists.
const scripts = [];
html = html.replace(
  /\s*<script type="module"[^>]*src="\.?\/?(assets\/[^"]+\.js)"[^>]*><\/script>/g,
  (_m, file) => {
    const js = fs
      .readFileSync(path.join(dist, file), 'utf8')
      .replace(/<\/script/gi, '<\\/script');
    scripts.push(`<script type="module">\n${js}\n</script>`);
    return '';
  }
);
html = html.replace('</body>', `${scripts.join('\n')}\n</body>`);

fs.writeFileSync(htmlPath, html);
console.log(`Inlined ${scripts.length} script bundle(s) into dist/index.html`);
