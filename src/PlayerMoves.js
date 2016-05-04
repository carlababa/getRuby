import React from 'react';
import keydown, { Keys } from 'react-keydown';

class PlayerMoves extends React.Component {
  makeMove() {
    this.props.onClick(this.props.move);
  }

  render() {
    return (
      <button onClick={this.makeMove.bind(this)}>{this.props.move}</button>
    );
  }
}

export default PlayerMoves;
