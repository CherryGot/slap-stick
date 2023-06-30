import StickyOptions from './sticky-options';
import Utils from './utils';
import ScrollThresholds from './scroll-thresholds';
import StyleStore from './style-store';

/**
 * The class encapsulating the actual logic of making the HTML Element sticky, calculating the top CSS property and
 * attaching event listeners.
 */
class Sticker {

  private htmlElement: HTMLElement;

  private options: StickyOptions;

  private elementStyles: StyleStore;

  private nearestScrollParent: HTMLElement;

  private scrolledSoFar: number;

  private thresholds: ScrollThresholds;

  private redrawEventListener: EventListener;

  public isDestroyed: boolean;

  /**
   * Initialise with the htmlElement in question along with the options to use while preparing the sticky.
   *
   * @param htmlElement - The DOM element.
   * @param options - Options to configure the sticky DOM.
   */
  public constructor( htmlElement: HTMLElement, options: StickyOptions ) {
    this.htmlElement = htmlElement;
    this.options = options;

    this.init();
  }

  /**
   * Doing the honors!
   */
  public init() {
    this.elementStyles = {
      top: this.htmlElement.style.top,
      position: this.htmlElement.style.position,
    };

    this.prepareHTMLElement();

    this.redrawEventListener = () => this.reposition();
    this.nearestScrollParent.addEventListener( 'scroll', this.redrawEventListener );
    this.nearestScrollParent.addEventListener( 'resize', this.redrawEventListener );

    this.isDestroyed = false;
  }

  /**
   * Initialises the `position` and `top` CSS properties based on the current scroll behaviour of the nearest
   * scrollable parent.
   */
  private prepareHTMLElement() {
    this.initStyles();

    this.nearestScrollParent = Utils.findNearestScrollParent( this.htmlElement );
    this.scrolledSoFar = this.nearestScrollParent.scrollTop;

    this.thresholds = this.calculateThresholds();
    this.htmlElement.style.top = this.getTopFromScrollY() + 'px';
  }

  /**
   * Loads the initial values for the htmlElement styles based on the options specified.
   */
  private initStyles() {
    this.htmlElement.style.top = this.options.top + 'px';
    this.htmlElement.style.position = 'sticky';
  }

  /**
   * Determines the bounds within which the `top` property of the htmlElement can change. This is used to make sure
   * that it doesn't keep shifting sticky out of the viewport forever and make it stick!
   *
   * @returns Thresholds object containing a minimum and maximum value.
   */
  private calculateThresholds() {
    const totalHeight = this.options.top + this.htmlElement.offsetHeight + this.options.bottom;
    const overflownPixels = totalHeight - this.nearestScrollParent.clientHeight;

    const thresholds = new ScrollThresholds();
    thresholds.minima = -1 * overflownPixels + this.options.top;
    thresholds.maxima = this.options.top;

    return thresholds;
  }

  /**
   * Based on the calculated threshold and the current scroll position of the parent, this function determines the next
   * value of the `top` CSS property.
   *
   * @returns The number of pixels.
   */
  private getTopFromScrollY(): number {
    const scrollY = this.nearestScrollParent.scrollTop;
    const scrollDiff = scrollY - this.scrolledSoFar;

    if ( scrollDiff === 0 ) {
      if ( this.htmlElement.style.top.length <= 0 ) {
        return this.options.top;
      }

      return parseInt( this.htmlElement.style.top );
    }

    const currentTop = parseInt( this.htmlElement.style.top ) || 0;
    const newTop = currentTop - scrollDiff;
    if ( this.thresholds.haveBeenCrossed( newTop ) ) {
      return currentTop;
    }

    return newTop;
  }

  /**
   * This function repeats the calculation of the `top` CSS property and assigns to the htmlElement if there has been
   * some change. It is used when we re-position the sticker after some kind of event occurs, like resize, scroll, etc.
   */
  private reposition() {
    const newTop = this.getTopFromScrollY() + 'px';
    if ( this.htmlElement.style.top !== newTop ) {
      this.htmlElement.style.top = newTop;
    }

    this.scrolledSoFar = this.nearestScrollParent.scrollTop;
  }

  /**
   * Returns the htmlElement to its previous state, from which we initially started. The `position` and `top` CSS
   * property are reverted back to how they were and the attached event listeners are removed.
   */
  public destroy() {
    this.htmlElement.style.top = this.elementStyles.top;
    this.htmlElement.style.position = this.elementStyles.position;

    this.nearestScrollParent.removeEventListener( 'scroll', this.redrawEventListener );
    this.nearestScrollParent.removeEventListener( 'resize', this.redrawEventListener );

    this.isDestroyed = true;
  }

}

export default Sticker;
