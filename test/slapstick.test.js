/**
 * This test file is in JS, as opposed to other test files that are in TS. The reason is that I wanted to keep the
 * tests as close to real world as possible. The SlapStick class, when exposed in browsers, will not have types for
 * rescue.
 *
 * @jest-environment jsdom
 */

import SlapStick from '../src/slapstick';

const testSuit = 'Testing SlapStick class.';
describe( testSuit, () => {
  let testName = 'Empty constructor call should throw a type error.';
  test( testName, testEmptyConstructorCall );

  testName = 'Invalid selectors should throw error during initialization.';
  test( testName, testInvalidSelectorInConstructor );

  testName = 'Should throw error when html element is not found.';
  test( testName, testNonExistentDOMElement );

  testName = 'Html element should be positioned sticky on successful initalization.';
  test( testName, testSuccessfulInitialization );

  testName = 'Html element should be positioned back to what it was after destruction.';
  test( testName, testSuccessfulDestruction );
} );

function testEmptyConstructorCall() {
  expect( () => new SlapStick() ).toThrowError( TypeError );
}

function testInvalidSelectorInConstructor() {
  getSomeInvalidSelectors()
    .forEach(
      selector => {
        expect( () => new SlapStick( selector ) ).toThrowError( TypeError );
      }
    );
}

function getSomeInvalidSelectors() {
  return [
    23,
    {},
    { 'a': 'b' },
    [],
    [1, 3, 5],
    '',
    false,
  ];
}

function testNonExistentDOMElement() {
  document.body.innerHTML = `<div></div>`;
  expect( () => new SlapStick( '#sidebar' ) ).toThrowError( ReferenceError );
}

function testSuccessfulInitialization() {
  document.body.innerHTML = `<div class="sticky-sidebar"></div>`;
  const stickySidebar = new SlapStick( '.sticky-sidebar' );

  expect( stickySidebar instanceof SlapStick ).toBe( true );
  expect( document.querySelector( '.sticky-sidebar' ).style.position ).toBe( 'sticky' );
}

function testSuccessfulDestruction() {
  document.body.innerHTML = `<div class="sticky-sidebar"></div>`;
  const sidebar = document.querySelector( '.sticky-sidebar' );
  const position = sidebar.style.position;

  const stickySidebar = new SlapStick( '.sticky-sidebar' );
  stickySidebar.destroy();

  expect( sidebar.style.position ).toBe( position );
}
