'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

// 剥离 Node 专用两行：require('./math') 与 module.exports
function stripNodeOnly(source) {
  return source
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim();
      return !trimmed.startsWith("const { add, subtract, multiply, divide } = require('./math');")
        && !trimmed.startsWith('module.exports');
    })
    .join('\n');
}

const mathSrc = stripNodeOnly(read('src/math.js'));
const indexSrc = stripNodeOnly(read('src/index.js'));

const bundle = `;(function () {
'use strict';

/* ===== src/math.js ===== */
${mathSrc}

/* ===== src/index.js ===== */
${indexSrc}
})();
`;

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'bundle.js'), bundle);
fs.copyFileSync(path.join(ROOT, 'index.html'), path.join(DIST, 'index.html'));
console.log(`build ok: dist/bundle.js (${Buffer.byteLength(bundle)} bytes), dist/index.html`);