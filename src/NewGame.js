import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class NewGame extends React.Component {
  createGame(event) {
    event.preventDefault();
    console.log("Create Game Called!");
    this.props.onCreate();
  }

  buttonStyle(){
    return{
      margin: 12
    };
  }

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <form onSubmit={this.createGame.bind(this)}>
            <div>
              <RaisedButton style={this.buttonStyle()} type="submit">Create New Game</RaisedButton>
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NewGame;
