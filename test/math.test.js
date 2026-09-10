'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { add, subtract, multiply, divide } = require('../src/math.js');

test('add: 1 + 2 = 3', () => {
  assert.equal(add(1, 2), 3);
});

test('subtract: 5 - 2 = 3', () => {
  assert.equal(subtract(5, 2), 3);
});

test('multiply: 3 x 4 = 12', () => {
  assert.equal(multiply(3, 4), 12);
});

test('divide: 10 / 4 = 2.5', () => {
  assert.equal(divide(10, 4), 2.5);
});

test('divide: 除以 0 抛错', () => {
  assert.throws(() => divide(10, 0), /division by zero/);
});