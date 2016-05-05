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
      monster:{
        x: 0,
        y: 0
      },
      monstersCaught1: 0,
      monstersCaught2: 0      
    };
  }

  constructor() {
    super('game');
  }
}

export default GameModel;
