/**
 * React Depth of Field
 * (c) 2018-present Thomas Trinca
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

function createAnimationNode(
  child,
  nodeIndex,
  currentIndex,
  blurIncrement,
  animationTime
) {
  const style = {
    filter: `blur(${Math.abs((nodeIndex - currentIndex) * blurIncrement)}px)`,
    transition: `${animationTime}ms linear all`
  };
  return <div style={style}>{child}</div>;
}

export default class DepthOfField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: this.props.focus
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focus !== this.state.currentIndex) {
      this.move(nextProps);
    }
  }

  move({ focus, animationStep, animationTime }) {
    const { currentIndex } = this.state;
    if (currentIndex === focus) {
      // Done, no need to move
      this.isMoving = false;
      return;
    }
    if (currentIndex > focus) {
      // Move down the children
      this.setState({ currentIndex: currentIndex - animationStep });
    }
    if (currentIndex < focus) {
      // Move up the children
      this.setState({ currentIndex: currentIndex + animationStep });
    }
    if (this.movingTimer) {
      clearTimeout(this.movingTimer);
      this.movingTimer = null;
    }
    this.movingTimer = setTimeout(() => {
      this.move({ focus, animationStep, animationTime });
    }, animationTime);
  }

  render() {
    const { currentIndex } = this.state;
    const { blurIncrement, animationTime, children } = this.props;
    return (
      <div className="depth-of-field-container">
        {React.Children.map(children, (child, nodeIndex) =>
          createAnimationNode(
            child,
            nodeIndex,
            currentIndex,
            blurIncrement,
            animationTime
          )
        )}
      </div>
    );
  }
}

DepthOfField.propTypes = {
  animationTime: PropTypes.number,
  animationStep: PropTypes.number,
  blurIncrement: PropTypes.number,
  focus: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

DepthOfField.defaultProps = {
  animationTime: 300,
  animationStep: 1,
  blurIncrement: 1
};