import React, { Component, PropTypes, Children } from 'react';
import ReactDom from 'react-dom';

import Container from 'container';
import Navigation from 'navigation';
import Item from 'item';
import Dots from 'dots';

class Carousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      cellWidth: 0,
      sliderWidth: 0,
      containerWidth: 0,

      currentCell: props.cellStart,
      cellCount: Children.count(props.children)
    };
  }

  /**
   * Handles incoming slider container width changes
   * @method handleDimensions
   * @param  {Integer} containerWidth The container width
   * @return {Function} Updates state with container, slider, and cell widths
   */
  handleDimensions(containerWidth) {
    const { cellsToShow, cellSpacing } = this.props;
    const { cellCount } = this.state;

    const cellWidth = (Math.ceil(containerWidth / cellsToShow)) - cellSpacing;
    const sliderWidth = (cellCount * cellWidth) + (cellCount * cellSpacing);

    this.setState({
      containerWidth,
      sliderWidth,
      cellWidth
    });
  }

  /**
   * To specific item event handler
   * @method handleTo
   * @param  {Integer} index The index we want to move to
   * @return {Function} Sets the current index and offset state
   */
  handleTo(index) {
    const { cellSpacing } = this.props;
    const { currentCell, cellWidth } = this.state;

    if (index === currentCell) {
      return;
    }

    this.setState({
      currentCell: index,
      offset: (index * (cellWidth + cellSpacing)) * -1
    });
  }

  /**
   * Next item event handler
   * @method handleNext
   * @return {Function} Calls the computed index with the handleTo function
   */
  handleNext() {
    const { currentCell, cellCount } = this.state;
    const { cellsToSlide, cellsToShow } = this.props;

    const nextBatch = currentCell + cellsToSlide;
    const isEnd = cellsToShow >= cellsToSlide ?
      (nextBatch + cellsToShow) > cellCount :
      nextBatch >= cellCount;

    const computedIndex = isEnd ?
      cellCount - cellsToShow :
      nextBatch;

    this.handleTo(computedIndex);
  }

  /**
   * Prev item event handler
   * @method handlePrev
   * @return {Function} Calls the computed index with the handleTo function
   */
  handlePrev() {
    const { currentCell, cellCount } = this.state;
    const { cellsToSlide } = this.props;

    const computedIndex = (currentCell - cellsToSlide) < 0 ?
      0 :
      currentCell - cellsToSlide;

    this.handleTo(computedIndex);
  }

  render() {
    const {
      children,
      animate,
      animationSpeed,
      animationEasing,
      cellSpacing,
      cellAlign,
      cellsToShow,
      cellsToSlide
    } = this.props;

    const {
      cellCount,
      currentCell,
      cellWidth,
      sliderWidth,
      offset
    } = this.state;

    return (
      <div className="hawk-carousel">
        <Container
          animate={animate}
          speed={animationSpeed}
          easing={animationEasing}
          width={sliderWidth}
          offset={offset}
          handleDimensions={width => this.handleDimensions(width)}>
            {Children.map(children, child => {
              return <Item
                child={child}
                align={cellAlign}
                width={cellWidth}
                spacing={cellSpacing} />
            })}
        </Container>

        <Navigation
          handleNext={() => this.handleNext()}
          handlePrev={() => this.handlePrev()}
        />

        <Dots
          cellsToShow={cellsToShow}
          cellsToSlide={cellsToSlide}
          cellCount={cellCount}
          currentCell={currentCell}
          handleTo={index => this.handleTo(index)}
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  mouseDrag: PropTypes.bool,
  cellStart: PropTypes.number,
  cellAlign: PropTypes.oneOf(['left', 'center', 'right']),
  cellSpacing: PropTypes.number,
  cellsToShow: PropTypes.number,
  cellsToSlide: PropTypes.number,
  containerPadding: PropTypes.number,
  animate: PropTypes.bool,
  animationEasing: PropTypes.string,
  animationSpeed: PropTypes.string
};

Carousel.defaultProps = {
  mouseDrag: true,
  cellStart: 0,
  cellAlign: 'left',
  cellSpacing: 0,
  cellsToShow: 1,
  cellsToSlide: 1,
  containerPadding: 0,
  animate: true,
  animationEasing: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
  animationSpeed: '450ms'
}

class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel cellsToShow={1} cellsToSlide={1} cellSpacing={0}>
        <div className="test-item">1</div>
        <div className="test-item">2</div>
        <div className="test-item">3</div>
        <div className="test-item">4</div>
        <div className="test-item">5</div>
        <div className="test-item">6</div>
        <div className="test-item">7</div>
        <div className="test-item">8</div>
        <div className="test-item">9</div>
      </Carousel>
    );
  }
}

ReactDom.render(
  <Test />,
  document.getElementById('test')
);

export default Carousel;
