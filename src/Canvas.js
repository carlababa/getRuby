import React from 'react';
import ReactDOM from 'react-dom';
import keydown, { Keys } from 'react-keydown';

class Canvas extends React.Component{
  constructor(){
    super();

    this.hero = {
    	speed: 325
    };

    this.hero2 = {
    	speed: 325
    };

    this.monster = {};
    this.monstersCaught = 0;
    this.monstersCaught2 = 0;
    this.keysDown = {};
    this.then = Date.now();
  }

  componentDidMount() {
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
  	this.ctx.fillText("Rubies found player 1: " + this.monstersCaught, 32, 32);
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
    	self.ctx.drawImage(heroImage, self.hero.x, self.hero.y);
    };
    heroImage.src = require("./images/hero.png");
  }

  loadHero2(){
    let heroImage = new Image();
    var self = this;
    heroImage.onload = function () {
      self.ctx.drawImage(heroImage, self.hero2.x, self.hero2.y);
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
    this.hero.x = 32 + (Math.random() * (this.canvas.width - 64));
  	this.hero.y = 32 + (Math.random() * (this.canvas.width - 64));

    this.hero2.x = 32 + (Math.random() * (this.canvas.width - 64));
  	this.hero2.y = 32 + (Math.random() * (this.canvas.width - 64));

    this.monster.x = 32 + (Math.random() * (this.canvas.width - 64));
    this.monster.y = 32 + (Math.random() * (this.canvas.height - 64));
  }


  update(modifier){
    if (38 in this.keysDown) { // Player holding up
  		this.hero.y -= this.hero.speed * modifier;
  	}
  	if (40 in this.keysDown) { // Player holding down
  		this.hero.y += this.hero.speed * modifier;
  	}
  	if (37 in this.keysDown) { // Player holding left
  		this.hero.x -= this.hero.speed * modifier;
  	}
  	if (39 in this.keysDown) { // Player holding right
  		this.hero.x += this.hero.speed * modifier;
  	}

  	if (
  		this.hero.x <= (this.monster.x + 32)
  		&& this.monster.x <= (this.hero.x + 32)
  		&& this.hero.y <= (this.monster.y + 32)
  		&& this.monster.y <= (this.hero.y + 32)
  	) {
  		++this.monstersCaught;
  		this.reset();
  	}

    if (
  		this.hero2.x <= (this.monster.x + 32)
  		&& this.monster.x <= (this.hero2.x + 32)
  		&& this.hero2.y <= (this.monster.y + 32)
  		&& this.monster.y <= (this.hero2.y + 32)
  	) {
  		++this.monstersCaught2;
  		this.reset();
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
      return (
        <div>
          <canvas ref="myCanvas" />
        </div>
    );
  }
}

export default Canvas;
