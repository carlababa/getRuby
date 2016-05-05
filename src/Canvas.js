import React from 'react';
import ReactDOM from 'react-dom';
import keydown, { Keys } from 'react-keydown';
import App from './App';

class Canvas extends React.Component{
  constructor(props){
    super(props);

    this.hero1 = this.props.currentGame.hero1;

    this.hero2 = this.props.currentGame.hero2;

    this.monster = {
      x: 0,
      y:0
    };
    this.monstersCaught1 = 0;
    this.monstersCaught2 = 0;
    this.keysDown = {};
    this.then = Date.now();
  }

  componentDidMount() {
    this.hero = this.props.isPlayerOne ? this.hero1 : this.hero2;

    this.canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = 1024;
    this.ctx.canvas.height = 960;

    this.reset();
    this.main();
    var self = this;
    window.addEventListener('keydown', function(e) {
      self.keysDown[e.keyCode] = true;
    }, false);

    window.addEventListener('keyup', function(e) {
      delete self.keysDown[e.keyCode];
    }, false);
  }

  renderCanvas(){
    this.loadBackground();
    this.loadHero();
    this.loadMonster();
    this.loadHero2();

    this.ctx.fillStyle = "rgb(250, 250, 250)";
  	this.ctx.font = "24px Brandon Grotesque";
  	this.ctx.textAlign = "left";
  	this.ctx.textBaseline = "top";
  	this.ctx.fillText("Rubies found player 1: " + this.monstersCaught1, 32, 32);
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText("Rubies found player 2: " + this.monstersCaught2, 32, 32);
  }

  loadBackground(){
    let bgImage = new Image();
    var self = this;
    bgImage.onload = function () {
    	self.ctx.drawImage(bgImage, 0, 0);
    };
    bgImage.src = require("./images/background.png");
  }

  loadHero(){
    let heroImage = new Image();
    var self = this;
    heroImage.onload = function () {
    	self.ctx.drawImage(heroImage, self.hero1.position.x, self.hero1.position.y);
    };
    heroImage.src = require("./images/hero.png");
  }

  loadHero2(){
    let heroImage = new Image();
    var self = this;
    heroImage.onload = function () {
      self.ctx.drawImage(heroImage, self.hero2.position.x, self.hero2.position.y);
    };
    heroImage.src = require("./images/hero2.png");
  }

  loadMonster(){
    let monsterImage = new Image();
    var self = this;
    monsterImage.onload = function () {
    	self.ctx.drawImage(monsterImage, self.monster.x, self.monster.y);
    };
    monsterImage.src = require("./images/monster.png");
  }

  reset(){
    this.monster.x = 32 + (Math.random() * (this.canvas.width - 64));
    this.monster.y = 32 + (Math.random() * (this.canvas.height - 64));
  }


  update(modifier){
    let newGameData = {};
    let changed = false;

    if (38 in this.keysDown) { // Player holding up
  		this.hero.position.y -= this.hero.speed * modifier;
      changed = true;
  	}
  	if (40 in this.keysDown) { // Player holding down
  		this.hero.position.y += this.hero.speed * modifier;
      changed = true;
  	}
  	if (37 in this.keysDown) { // Player holding left
  		this.hero.position.x -= this.hero.speed * modifier;
      changed = true;
  	}
  	if (39 in this.keysDown) { // Player holding right
  		this.hero.position.x += this.hero.speed * modifier;
      changed = true;
  	}

    if (this.hero == this.hero1) {
      newGameData.hero1 = this.hero;
    } else {
      newGameData.hero2 = this.hero;
    }

  	if (
  		this.hero.position.x <= (this.monster.x + 32)
  		&& this.monster.x <= (this.hero.position.x + 32)
  		&& this.hero.position.y <= (this.monster.y + 32)
  		&& this.monster.y <= (this.hero.position.y + 32)
  	) {

      if(this.hero == this.hero1){
    		++this.monstersCaught1;
        newGameData.monstersCaught1 = this.monstersCaught1;
      } else {
        ++this.monstersCaught2;
        newGameData.monstersCaught2 = this.monstersCaught2;
      }

  		this.reset();
  	}

    if (changed) {
      this.props.onChange(newGameData);
    }
  }


  main(){
    let now = Date.now();
    let delta = now - this.then;

    this.update(delta / 1000);
    this.renderCanvas();
    this.then = now;

    let w = window;
    var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    requestAnimationFrame(this.main.bind(this));
  }


  render() {
    this.hero1 = this.props.currentGame.hero1;
    this.hero2 = this.props.currentGame.hero2;
    this.hero = this.props.isPlayerOne ? this.hero1 : this.hero2;

      return (
        <div>
          <canvas ref="myCanvas" />
        </div>
    );
  }
}

export default Canvas;
