import Sticker from './sticker';
import StickyOptions from './sticky-options';

/**
 * Creating a new class called SlapStick. Exposed to end-users as public API.
 */
class SlapStick {

  private sticker: Sticker;

  /**
   * Initializes the SlapStick class. Takes in the CSS selector to locate the element (also called the sticker) and
   * set of options to take into account.
   *
   * @param selector - A CSS selector string.
   * @param options - A key-value pair for configuring the sticker.
   */
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

    if ( typeof options === 'undefined' ) {
      options = {};
    }

    const stickerOptions = new StickyOptions( options );
    this.sticker = new Sticker( htmlElement as HTMLElement, stickerOptions );
  }

  /**
   * Redraws the sticker after it has been destroyed.
   */
  public redraw() {
    if ( this.sticker.isDestroyed ) {
      this.sticker.init();
    }
  }

  /**
   * Brings back the stickers back to how they were before initialization in terms of their CSS styles.
   */
  public destroy() {
    this.sticker.destroy();
  }

}

export default SlapStick;
