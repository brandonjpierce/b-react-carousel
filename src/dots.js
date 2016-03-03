import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Dots extends Component {

  constructor(props) {
    super(props);

    this.state = {
      indexes: []
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.currentCell !== this.props.currentCell;
  }

  componentWillMount() {
    this.getDotIndexes();
  }

  getDotIndexes() {
    const { cellsToShow, cellsToSlide, cellCount, currentCell } = this.props;
    const showHigherThanSlide = cellsToShow > cellsToSlide;
    const divisionFactor = showHigherThanSlide ? cellsToSlide : cellsToShow;
    const dotCount = Math.ceil(cellCount / divisionFactor);

    let lastIndex = 0;
    let indexes = [0];

    for (let i = 1; i < dotCount; i++) {
      let nextBatch = lastIndex + cellsToSlide;
      let isEnd = cellsToShow >= cellsToSlide ?
        (nextBatch + cellsToShow) > cellCount :
        nextBatch >= cellCount;

      if (showHigherThanSlide) {
        if (!isEnd) {
          indexes.push(nextBatch);
          lastIndex = nextBatch;
        }
      } else {
        let computedIndex = isEnd ?
          cellCount - cellsToShow :
          nextBatch;

        indexes.push(computedIndex);
        lastIndex = computedIndex;
      }
    }

    this.setState({ indexes });
  }

  render() {
    const { handleTo, currentCell } = this.props;
    const { indexes } = this.state;

    console.log('rendering dots');

    return (
      <div className="hawk-carousel__dots">
        {indexes.map(index => {
          const classes = classnames(
            'hawk-carousel__dot',
            { 'hawk-carousel__dot--active': index === currentCell }
          );

          return (
            <button
              type="button"
              key={index}
              className={classes}
              onClick={() => handleTo(index)}>
            </button>
          );
        })}
      </div>
    );
  }
}

export default Dots;
