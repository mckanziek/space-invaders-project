import { Player } from '../gameObjs/Player';

export class Main extends Phaser.Scene {
    private canvasSize: any;
    private key: any;
    private player: Player | undefined;

    constructor() {
        super("main");
    }

    preload(){
        this.key = this.input.keyboard.createCursorKeys();

        this.canvasSize = {
            width: this.sys.canvas.width,
            height: this.sys.canvas.height
        };
    }

    create() {
        this.player = new Player(this, 'shipTest', this.key, this.canvasSize);
    }

    update(time: integer){
        // @ts-ignore
        this.player.move();
    }
}