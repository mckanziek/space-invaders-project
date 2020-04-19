import "phaser";
import { Preloader } from './scenes/Preloader';
import { Main } from './scenes/Main';
    
const config: GameConfig = {
    type: Phaser.AUTO,
    parent: "canvas",
    width: 960,
    height: 560,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: [
        Preloader,
        Main,
    ]
};

const gameInit = new Phaser.Game(config);