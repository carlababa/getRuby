import React from 'react';
import Canvas from './Canvas';
import GameModel from './models/GameModel';
import Utils from './lib/Utils';
import NewPlayer from './NewPlayer';
import NewGame from './NewGame';
import GameList from './GameList';
import GameListItem from './GameListItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class App extends React.Component {

  constructor(){
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));
    this.utils = new Utils();

    let playerStorage = this.utils.store("getrubies.player");
    if (playerStorage.length === 0) {
      playerStorage = null;
    }

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: playerStorage
    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });

    if (this.state.currentGame !== null) {
      let component = this;
      this.games.resources.map(function(game) {
        if (game._id === component.state.currentGame._id) {
          console.log(game);
          component.setState({
            currentGame: game
          });
        }
      });
    }
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
    this.utils.store("getrubies.player", player);
  }

  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame(game) {
    console.log("Joining game...");
    if (game.playerOne === this.state.currentPlayer || game.playerTwo === this.state.currentPlayer || game.playerTwo === null) {
      if (game.playerOne !== this.state.currentPlayer && game.playerTwo !== this.state.currentPlayer) {
        console.log("Joining game as player two...");
        this.games.save(game, { playerTwo: this.state.currentPlayer });
      }

      this.setState({
        currentGame: game
      });
    } else {
      window.alert("Can't touch this dung dung dung dung");
    }
  }

  onUpdate(data){
    this.games.save(this.state.currentGame, data);
  }

  clearCurrentGame() {
    this.setState({
      currentGame: null
    });
  }

  logoutCurrentPlayer() {
    this.setState({
      currentPlayer: null
    });
  }

  buttonStyle(){
    return{
      margin: 12
    };
  }

  backgroundStyle(){
    return{
      backgroundColor: "#A31414"
    };
  }

  container(){
    return{
      margin: "auto",
      width: "60%"
    };
  }

  render() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AppBar style={this.backgroundStyle()} title="GetRubies" />
            <div  style={this.container()}>
              { this.state.currentPlayer === null &&
                <NewPlayer onCreate={this.setPlayer.bind(this)}/> }
              { this.state.currentPlayer !== null &&
                <div><strong>Hi, {this.state.currentPlayer}</strong>
                <RaisedButton style={this.buttonStyle()} onClick={this.logoutCurrentPlayer.bind(this)}>Logout</RaisedButton></div>
              }

              { this.state.currentPlayer && this.state.currentGame === null &&
                <NewGame onCreate={this.createGame.bind(this)}/> }

              { this.state.currentGame === null &&
                <GameList games={this.state.games} currentPlayer={this.state.currentPlayer} onSelect={this.joinGame.bind(this)}/> }

              { this.state.currentGame !== null && <div>
                <p>Player one: {this.state.currentGame.playerOne} |
                Player two: {this.state.currentGame.playerTwo}</p>
                <RaisedButton onClick={this.clearCurrentGame.bind(this)}>Back</RaisedButton>
                </div>
              }

              { this.state.currentGame !== null && <div>
                <Canvas isPlayerOne={this.state.currentPlayer == this.state.currentGame.playerOne}
                playerOne={this.state.currentGame.playerOne}
                playerTwo={this.state.currentGame.playerTwo}
                currentGame={this.state.currentGame}
                onChange={this.onUpdate.bind(this)}
                />
              </div>
              }
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
}

export default App;
