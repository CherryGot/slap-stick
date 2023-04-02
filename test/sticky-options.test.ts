import StickyOptions from '../src/sticky-options';

const testSuit = 'Testing StickyOptions class.';
describe( testSuit, () => {
  let testName = 'Empty intializers in constructor call should fallback to default values.';
  test( testName, testEmptyInitializersConstructorCall );

  testName = 'Invalid configurations should fallback to the corresponding default values. #1 Numeric values.';
  test( testName, testInvalidConfigurationsNumeric );

  testName = 'Invalid configurations should fallback to the corresponding default values. #2 String values.';
  test( testName, testInvalidConfigurationsString );

  testName = 'Should intialize without any flaws for valid configurations.';
  test( testName, testValidConfigurations );
} );

const defaultOptions = {
  top: 0,
  bottom: 0,
  minWidthBreakpoint: 0,
  stickyClass: 'is-sticky',
};

function testEmptyInitializersConstructorCall() {
  const options = new StickyOptions( {} );
  expect( options ).toEqual( defaultOptions );
}

function testInvalidConfigurationsNumeric() {
  let options: any = { ...defaultOptions }; // eslint-disable-line @typescript-eslint/no-explicit-any

  const rogueArgs = getRogueNumericArgs();
  rogueArgs.forEach(
    arg => {
      options.top = options.bottom = options.minWidthBreakpoint = arg;
      options = new StickyOptions( options );
      expect( options ).toEqual( defaultOptions );
    }
  );
}

function getRogueNumericArgs() {
  return [
    'l23',
    {},
    { 'a': 'b' },
    [],
    [1, 3, 5],
    '',
    false,
    -23,
    -420.69,
  ];
}

function testInvalidConfigurationsString() {
  let options: any = { ...defaultOptions }; // eslint-disable-line @typescript-eslint/no-explicit-any

  const rogueArgs = getRogueStringArgs();
  rogueArgs.forEach(
    arg => {
      options.stickyClass = arg;
      options = new StickyOptions( options );
      expect( options ).toEqual( defaultOptions );
    }
  );
}

function getRogueStringArgs() {
  return [
    23,
    {},
    { 'a': 'b' },
    [],
    [1, 3, 5],
    '',
    false,
    -23,
    -420.69,
  ];
}

function testValidConfigurations() {
  const inputOptions = {
    top: 6.35,
    bottom: '94',
    stickyClass: 'stickyClass',
  };

  const options = new StickyOptions( inputOptions );
  expect( options ).toEqual(
    {
      top: 6,
      bottom: 94,
      minWidthBreakpoint: 0,
      stickyClass: 'stickyClass',
    }
  );
}
