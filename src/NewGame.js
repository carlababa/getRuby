import React from 'react';

class NewGame extends React.Component {
  createGame(event) {
    event.preventDefault();
    console.log("Create Game Called!");
    this.props.onCreate();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.createGame.bind(this)}>
          <div>
            <button type="submit">Create New Game</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewGame;
