/**
 * Wraps up all the miscellaneous logic so that they can be independetly tested.
 */
class Utils {

  /**
   * Don't want to instantiate the Utils object.
   */
  private constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

  /**
   * Takes in an HTMLElement, crawls up the DOM tree recursively to find the parent node that is scrollable. If no such
   * parent is found, it returns document body.
   *
   * @param element - The input HTMLElement.
   * @returns HTMLElement The parent node that is scrollable.
   */
  public static findNearestScrollParent( element: HTMLElement ): HTMLElement {
    if ( !element || !element.parentElement ) {
      return document.scrollingElement as HTMLElement || document.body;
    }

    const parent = element.parentElement;
    const overflowY = window.getComputedStyle( parent ).overflowY;
    const isScrollable = !['visible', 'hidden'].includes( overflowY );

    if ( isScrollable && parent.scrollHeight > parent.clientHeight ) {
      return parent;
    }

    return Utils.findNearestScrollParent( parent );
  }

}

export default Utils;
