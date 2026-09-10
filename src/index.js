'use strict';

const { add, subtract, multiply, divide } = require('./math');

const OPERATORS = {
  add: { label: '加', fn: add },
  subtract: { label: '减', fn: subtract },
  multiply: { label: '乘', fn: multiply },
  divide: { label: '除', fn: divide }
};

function calculate(a, operator, b) {
  const entry = OPERATORS[operator];
  if (!entry) {
    throw new Error(`unknown operator: ${operator}`);
  }
  return entry.fn(a, b);
}

// ---- 浏览器侧渲染（build.js 会把本文件与 math.js 拼成 dist/bundle.js） ----
if (typeof document !== 'undefined' && document.getElementById('app')) {
  const app = document.getElementById('app');
  const version = document.createElement('p');
  version.className = 'version';
  version.textContent = '版本 v3 · 由 GitHub Actions 自动发布';
  app.appendChild(version);

  const form = document.createElement('div');
  form.className = 'calculator';
  form.innerHTML =
    '<input id="numA" type="number" value="6" />' +
    '<select id="op">' +
    '<option value="add">+</option>' +
    '<option value="subtract">-</option>' +
    '<option value="multiply">*</option>' +
    '<option value="divide">/</option>' +
    '</select>' +
    '<input id="numB" type="number" value="3" />' +
    '<button id="calcBtn">=</button>' +
    '<span id="calcResult">—</span>';
  app.appendChild(form);

  document.getElementById('calcBtn').addEventListener('click', () => {
    const a = Number(document.getElementById('numA').value);
    const b = Number(document.getElementById('numB').value);
    const op = document.getElementById('op').value;
    const result = calculate(a, op, b);
    document.getElementById('calcResult').textContent = String(result);
  });
}

module.exports = { calculate };