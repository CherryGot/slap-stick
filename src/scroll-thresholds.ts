/**
 * A class wrapping thresholding logic.
 */
class ScrollThresholds {

  minima: number;

  maxima: number;

  /**
   * Checks whether the passed in value is within the bounds of minima and maxima defined or not.
   *
   * @param value - The input value.
   * @returns A boolean value.
   */
  public haveBeenCrossed( value: number ): boolean {
    return ( value < this.minima || value > this.maxima );
  }

}

export default ScrollThresholds;
