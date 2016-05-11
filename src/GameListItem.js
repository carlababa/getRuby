import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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

  buttonColorStyle(){
    return{
      color: "#A31414"
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <List>
          <Card>
            <CardTitle>
              Game by {this.props.game.playerOne}
              <FlatButton style={this.buttonColorStyle()} onClick={this.selectGame.bind(this)} primary={true}>JOIN</FlatButton>

              { this.gameOpen() && this.gameAlreadyJoined() &&
                <FlatButton style={this.buttonColorStyle()} onClick={this.selectGame.bind(this)} primary={true}>Resume Game</FlatButton> }
            </CardTitle>
          </Card>
        </List>
      </MuiThemeProvider>
    );
  }
}

export default GameListItem;
