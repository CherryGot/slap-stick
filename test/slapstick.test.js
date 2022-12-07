/**
 * This test file is in JS, as opposed to other test files that are in TS. The reason is that I wanted to keep the
 * tests as close to real world as possible. The SlapStick class, when exposed in browsers, will not have types for
 * rescue.
 *
 * @jest-environment jsdom
 */

import SlapStick from "../src/slapstick";

const testSuit = 'Testing SlapStick class.';
describe( testSuit, () => {
  let testName = 'Empty constructor call should throw a type error.';
  test( testName, testEmptyConstructorCall );
} );

function testEmptyConstructorCall() {
  expect(() => new SlapStick()).toThrowError(TypeError);
}

