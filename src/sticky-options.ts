/**
 * Class encapsulating configurable settings that will later be used to make things sticky.
 */
class StickyOptions {

  public readonly top: number;

  public readonly bottom: number;

  public readonly stickyClass: string;

  public readonly minWidthBreakpoint: number;

  /**
   * Constructor to intialize the options with defaults or overwrite with the passed values.
   *
   * @param options - A key-value paired options object.
   */
  public constructor( options: Record<string, number | string> ) {
    this.top = this.parseInt( options, 'top' );
    this.bottom = this.parseInt( options, 'bottom' );
    this.minWidthBreakpoint = this.parseInt( options, 'minWidthBreakpoint' );

    this.stickyClass = 'is-sticky';
    if ( 'stickyClass' in options && typeof options['stickyClass'] === 'string' ) {
      const cssClass = options['stickyClass'].trim();
      if ( cssClass.length > 0 ) {
        this.stickyClass = cssClass;
      }
    }
  }

  /**
   * Parses the string for an integer from options object and returns 0 just in case the key doesn't exist.
   *
   * @param options - A key-value paried options object.
   * @param key - The specific key whose value need to be parsed.
   * @returns Parsed integer.
   */
  private parseInt( options: Record<string, number | string>, key: string | number ): number {
    let integer = 0;
    if ( key in options && ['string', 'number'].includes( typeof options[key] ) ) {
      integer = parseInt( options[key].toString() ) || 0;
    }

    return integer >= 0 ? integer : 0;
  }

}

export default StickyOptions;
