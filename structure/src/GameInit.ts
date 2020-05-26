import "phaser";
import {Preloader} from './scenes/Preloader';
import {Main} from './scenes/Main';

const config: GameConfig = {
    type: Phaser.AUTO, //Setta automaticamente il motore per il renderizzato
    parent: "canvas",
    width: 720,
    height: 560,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
    scene: [
        Preloader,
        Main,
    ]
};

window.addEventListener('load', ()=>{
    const gameInit = new Phaser.Game(config);
})