import React from 'react';
import Canvas from './Canvas';
import GameModel from './models/GameModel';

class App extends React.Component {

    render() {
        return (
          <div>
            <h1>Welcome to Get Rubies!</h1>
            <Canvas />
          </div>
        );
    }
}

export default App;
