import "phaser";
import {Preloader} from './scenes/Preloader';
import {Main} from './scenes/Main';
import {Menu} from './scenes/Menu'
import {GameHud} from './scenes/GameHud';
import {Lose} from './scenes/Lose';

const config: GameConfig = {
    type: Phaser.AUTO, //Setta automaticamente il motore per il renderizzato
    parent: "canvas",
    width: 777,
    height: 666,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: [Preloader, Main, Menu, GameHud, Lose]
};

window.addEventListener('load', ()=>{
    const gameInit = new Phaser.Game(config);
})