class ColorsUtils {

  getColour(colour) {
    return {
      backgroundColor: this.rgba(colour, 0.9),
      hoverBackgroundColor: this.rgba(colour, 1),
      borderColor: this.rgba(colour, 1),
      pointBackgroundColor: this.rgba(colour, 1),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: this.rgba(colour, 0.8),
      pointHoverBorderColor: this.rgba(colour, 0.5),
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
