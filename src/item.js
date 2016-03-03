import React, { Component, PropTypes } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  getStyles() {
    const { spacing, width, align } = this.props;

    let marginKey = null;
    let marginVal = null;

    switch(align) {
      case 'left':
        marginKey = 'marginRight';
        marginVal = spacing + 'px';
        break;

      case 'center':
        marginKey = 'margin';
        marginVal = '0 ' + (spacing / 2) + 'px';
        break;

      case 'right':
        marginKey = 'marginLeft';
        marginVal = spacing + 'px';
        break;
    }

    return {
      width: width + 'px',
      [marginKey]: marginVal
    };
  }

  render() {
    const { child } = this.props;
    const styles = this.getStyles();

    return (
      <div className="hawk-carousel__item" style={styles}>
        {child}
      </div>
    );
  }
}

export default Item;
