/**
 * Creating a new class called SlapStick. Exposed to end-users as public API.
 */
class SlapStick {

  public constructor( selector: string, options?: Record<string, number | string> ) {
    if ( typeof selector !== 'string' ) {
      throw new TypeError( '"selector" should be of the string type.' );
    }

    if ( selector.length <= 0 ) {
      throw new TypeError( '"selector" can not be empty.' );
    }

    const htmlElement = document.querySelector( selector );
    if ( !htmlElement ) {
      throw new ReferenceError( 'Can\'t find a DOM element with the given selector' );
    }
  }

  public destroy() {
    this.sticker.destroy();
  }

}

export default SlapStick;
