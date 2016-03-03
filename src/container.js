import React, { Component, PropTypes, Children } from 'react';
import prefixr from 'react-prefixr';
import debounce from 'debounce';
import { outerWidth } from 'utils';

class Container extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Only update component if specific incoming props change
   * @method shouldComponentUpdate
   * @param  {Object} nextProps Incoming props
   * @return {Boolean} Whether or not to update the component
   */
  shouldComponentUpdate(nextProps) {
    const { width, offset } = this.props;
    return nextProps.width !== width || nextProps.offset !== offset;
  }

  /**
   * Update our dimensions on window resize, this is debounced for performance
   * @method componentWillMount
   */
  componentWillMount() {
    window.addEventListener('resize', debounce(this.getDimensions.bind(this)));
  }

  /**
   * Grab our initial dimensions for the slider
   * @method componentDidMount
   */
  componentDidMount() {
    this.getDimensions();
  }

  /**
   * Get the dimensions of the slider container which we can then use to
   * compute the cell width and slider width
   * @method getDimensions
   */
  getDimensions() {
    const { handleDimensions } = this.props;
    handleDimensions(outerWidth(this.refs.sliderContainer));
  }

  /**
   * Get the cell slider styles
   * @method getSliderStyles
   * @return {Object} The styles object ran through a prefixer
   */
  getSliderStyles() {
    const { width, offset, animate, speed, easing } = this.props;

    let styles = {
      width: width + 'px',
      transform: `translate3d(${offset}px, 0, 0)`
    };

    if (animate) {
      styles.transition = `transform ${speed} ${easing}`;
    }

    return prefixr(styles);
  }

  render() {
    const { children } = this.props;
    const sliderStyles = this.getSliderStyles();

    return (
      <div ref="sliderContainer" className="hawk-carousel__viewport">
        <div className="hawk-carousel__slider" style={sliderStyles}>
          {children}
        </div>
      </div>
    );
  }
}

export default Container;
