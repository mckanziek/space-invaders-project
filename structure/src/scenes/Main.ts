import { Player } from '../gameObjs/Player';

export class Main extends Phaser.Scene {
    private key: any;
    private player: Player | undefined;

    constructor() {
        super("main");
    }
    preload(){
        this.key = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.player = new Player(this, 50, 50, 'shipTest', this.key);
    }

    update(time: integer){
        // @ts-ignore
        this.player.move();
    }
}