import BaseModel from './BaseModel';

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null,
      hero1: {
      	speed: 325,
        position: {
          x: 400,
          y: 400
        }
      },
      hero2: {
      	speed: 325,
        position: {
          x: 400,
          y: 400
        }
      },
      monster: {x: null, y: null}
    };
  }

  constructor() {
    super('game');
  }
}

export default GameModel;
