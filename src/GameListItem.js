import React from 'react';

class GameListItem extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  gameOpen() {
    return
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === null ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameAlreadyJoined() {
    return 
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameFull() {
    return !this.gameOpen();
  }

  playerOrYou(player) {
    if (player === this.props.currentPlayer) {
      return "You";
    }
    return player;
  }


  render() {
    return (
      <li>
        Game by {this.props.game.playerOne}

        { this.gameOpen() && !this.gameAlreadyJoined() &&
          <button onClick={this.selectGame.bind(this)}>Join Game</button> }

        { this.gameOpen() && this.gameAlreadyJoined() &&
          <button onClick={this.selectGame.bind(this)}>Resume Game</button> }

      </li>
    );
  }
}

export default GameListItem;
