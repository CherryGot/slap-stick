/**
 * @jest-environment jsdom
 */

import Utils from '../src/utils';

const testSuit = 'Testing Utilities.';
describe( testSuit, () => {
  let testName = '[findNearestScrollParent] Should return document body when no scrollable elements are present.';
  test( testName, testNoScrollableElements );

  testName = '[findNearestScrollParent] Should return nearest scrolling parent.';
  test( testName, testNestedScrollableElements );

  testName = '[findNearestScrollParent] Should skip nearest scrolling parent when parent overflowY is hidden.';
  test( testName, testNestedScrollableElementsSkippingNearestParent );
} );

function testNoScrollableElements() {
  const main = document.createElement( 'main' );
  const section = document.createElement( 'section' );
  const content = document.createElement( 'div' );
  content.innerHTML = '<p>What an idea sirji!</p>';

  section.append( content );
  main.append( section );
  document.body.append( main );

  const parent = Utils.findNearestScrollParent( content );
  expect( parent ).toBe( document.body );
}

function testNestedScrollableElements() {
  const main = document.body.querySelector( 'main' );
  const section = document.body.querySelector( 'section' );
  const content = document.body.querySelector( 'div' );

  Object.defineProperty( section, 'scrollHeight', { configurable: true, value: 600 } );
  Object.defineProperty( section, 'clientHeight', { configurable: true, value: 350 } );

  Object.defineProperty( main, 'scrollHeight', { configurable: true, value: 350 } );
  Object.defineProperty( main, 'clientHeight', { configurable: true, value: 200 } );

  let parent = Utils.findNearestScrollParent( content );
  expect( parent ).toBe( section );

  parent = Utils.findNearestScrollParent( section );
  expect( parent ).toBe( main );
}

function testNestedScrollableElementsSkippingNearestParent() {
  const main = document.body.querySelector( 'main' );
  const section = document.body.querySelector( 'section' );
  const content = document.body.querySelector( 'div' );

  section.style.overflowY = 'hidden';

  let parent = Utils.findNearestScrollParent( content );
  expect( parent ).toBe( main );

  parent = Utils.findNearestScrollParent( section );
  expect( parent ).toBe( main );
}
