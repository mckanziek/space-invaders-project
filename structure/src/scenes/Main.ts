import {Player} from '../gameObjs/Player';
import {Enemy} from '../gameObjs/Enemy';

export class Main extends Phaser.Scene {
    private canvasSize: any;
    private key: any;
    private player: Player | undefined;
    private enemies: Phaser.GameObjects.Group | undefined;

    constructor() {
        super("main");
    }

    preload() {
        this.key = this.input.keyboard.createCursorKeys();

        this.canvasSize = {
            width: this.sys.canvas.width,
            height: this.sys.canvas.height
        };
    }

    create() {
        this.player = new Player(this, 'shipTest', this.key, this.canvasSize);

        this.enemies = this.add.group({runChildUpdate: true});

        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 11; j++){
                this.enemies.add(new Enemy(this, (50 + j * 45), (50 + i * 45), ''))
            }
        }
    }

    update(time: integer) {
        // @ts-ignore
        this.player.move();
    }

    checkCollision(shot: any){
        // @ts-ignore
        this.physics.add.collider(shot, this.enemies.getChildren(), function (enemy, shot) {
            shot.destroy();
            enemy.destroy();
        })
    }
}