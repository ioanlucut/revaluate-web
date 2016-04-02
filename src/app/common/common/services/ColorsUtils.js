class ColorsUtils {

  getColour(colour) {
    return {
      fillColor: this.rgba(colour, 0.9),
      strokeColor: this.rgba(colour, 1),
      pointColor: this.rgba(colour, 1),
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: this.rgba(colour, 0.1),
    };
  };

  hexToRgb(hex) {
    /*jshint validthis: true */
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  };

  rgba(colour, alpha) {
    return `rgba(${colour.concat(alpha).join(',')})`;
  };
}

export default ColorsUtils;
