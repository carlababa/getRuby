import BaseModel from './BaseModel';

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null
    };
  }

  constructor() {
    super('game');
  }
}

export default GameModel;
