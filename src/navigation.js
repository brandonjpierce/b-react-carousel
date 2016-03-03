import React, { Component, PropTypes, Children } from 'react';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleNext, handlePrev } = this.props;

    return (
      <div className="hawk-carousel__navigation">
        <button
          type="button"
          className="hawk-carousel__navigation--next"
          onClick={handleNext}>
            Next
        </button>
        <button
          type="button"
          className="hawk-carousel__navigation--prev"
          onClick={handlePrev}>
            Prev
        </button>
      </div>
    );
  }
}

export default Navigation;
