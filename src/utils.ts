class Utils {

  private constructor() {}

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
