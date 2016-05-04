import React from 'react';
import GameListItem from './GameListItem';

class GameList extends React.Component {
  selectGame(game) {
    this.props.onSelect(game);
  }

  render() {
    let component = this;
    return (
      <ul>
        {this.props.games.map(function(game) {
          return (<GameListItem key={game._id} game={game} currentPlayer={component.props.currentPlayer} onClick={component.selectGame.bind(component)}/>);
        })}
      </ul>
    );
  }
}

export default GameList;
