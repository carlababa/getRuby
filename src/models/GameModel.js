import BaseModel from './BaseModel';
import Canvas from '../Canvas.js';

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null,
    };
  }

  constructor() {
    super('game');
  }
}

export default GameModel;
