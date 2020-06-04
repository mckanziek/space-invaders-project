import "phaser";
import {Preloader} from './scenes/Preloader';
import {Main} from './scenes/Main';
import {Menu} from './scenes/Menus/Menu';
import {GeneralMessage} from './scenes/GeneralMessage';
import {PauseMenu} from './scenes/Menus/PauseMenu';
import {Scores} from './scenes/Menus/Scores';
import {GameHud} from './scenes/GameHud';
import {Lose} from './scenes/Menus/Lose';

const config: GameConfig = {
    type: Phaser.AUTO, //Setta automaticamente il motore per il renderizzato
    parent: "canvas",
    width: 777,
    height: 777,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: false
        },
        fps: 60,
    },
    scene: [Preloader, Main, Menu, PauseMenu, GeneralMessage, Scores, GameHud, Lose],
};

window.addEventListener('load', ()=>{
    const gameInit = new Phaser.Game(config);
})