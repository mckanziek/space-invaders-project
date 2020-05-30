import {Player} from '../gameObjs/Player';
import {ShieldPiece} from '../gameObjs/ShieldPiece';
import {Enemy} from '../gameObjs/Enemy';
import {Ufo} from '../gameObjs/Ufo';

export class Main extends Phaser.Scene {
    private gameMode: integer = 0;
    private key: Phaser.Input.Keyboard.KeyboardManager | any;

    private player: Player | any;

    private enemiesPoints = [30, 20, 20, 10, 10];
    private enemiesSprites = [0, 0, 1, 1, 2];

    private enemiesShootTiming = 0;
    private enemiesShootDelay: integer | any;
    private enemiesMarginGrid: number = 55;
    private enemiesReferGrid: Array<number[]> | any;
    private enemies: Phaser.GameObjects.Group | any;

    constructor() {
        super({key: "main"});
    }

    init(data: any) {
        this.registry.set("gameMode", data.gameMode);
        this.gameMode = data.gameMode;

        this.key = this.input.keyboard.createCursorKeys();
        this.enemies = this.add.group({runChildUpdate: true});
    }

    create() {
        this.player = new Player(this, 'playerSprt' + this.gameMode, this.key);

        for (let i = 0; i < 4; i++)
            this.initShield(96 + (i * 161), this.sys.canvas.height - 202);

        this.enemiesReferGrid = [];
        this.enemiesShootDelay = 1666;
        for (let i = 0; i < 5; i++) {
            const row = [];
            for (let j = 0; j < 11; j++) {
                this.enemies.add(new Enemy(this,
                    (60 + (j * this.enemiesMarginGrid)),
                    (99 + (i * this.enemiesMarginGrid)),
                    'alien' + this.enemiesSprites[i] + this.gameMode,
                    j + ";" + i,
                    this.enemiesPoints[i]
                ));

                row.push(1);
            }
            this.enemiesReferGrid.push(row);
        }
        this.checkCollisionEnemy();

        console.log(this.enemies.getChildren().length);
        console.log(this.getEnemiesAreaRange())
    }

    update(time: integer) {
        this.player.move(time);

        Enemy.updatePosition(time);

        if (this.enemiesShootTiming < time) {
            let enemies = this.getEnemiesShooting();
            let randomIndex = Math.floor(Math.random() * enemies.length);
            let randomEnemy = enemies[randomIndex];

            randomEnemy.shoot();

            this.enemiesShootTiming = time + this.enemiesShootDelay;
        }
    }

    checkCollisionShotPlayer(playerShot: any) {
        let grid = this.enemiesReferGrid;

        this.enemies.getChildren().forEach((enemy: Enemy) => {
            if (enemy.active) {
                this.physics.add.overlap(playerShot, enemy, function () {
                    grid[Number(enemy.getCoordinates()[1])][Number(enemy.getCoordinates()[0])] = 0;

                    enemy.die();
                    playerShot.destroy();
                });
            }

            if(this.enemies.length % 4 == 0) {
                console.log('AHORA')
                new Ufo(this, '');
            }
        });

        ShieldPiece.pieces.forEach((piece: ShieldPiece) => {
            if (piece.active) {
                this.physics.add.overlap(playerShot, piece, function () {
                    piece.destroy();
                    playerShot.destroy();
                });
            }
        });

        this.enemiesReferGrid = grid;
    }

    checkCollisionShotEnemy(enemyShot: any) {
        let player = this.player;

        this.physics.add.overlap(enemyShot, player, function () {
            player.mainScene.events.emit('decreaseHealth');
            enemyShot.destroy();
        });

        ShieldPiece.pieces.forEach((piece: ShieldPiece) => {
            if (piece.active) {
                this.physics.add.overlap(enemyShot, piece, function () {
                    piece.destroy();
                    enemyShot.destroy();
                });
            }
        });
    }

    checkCollisionEnemy() {
        this.enemies.getChildren().forEach((enemy: Enemy) => {
            ShieldPiece.pieces.forEach((piece: ShieldPiece) => {
                this.physics.add.overlap(enemy, piece, function () {
                    if(enemy.active) piece.destroy();
                });
            });
        });
    }

    initShield(x: integer, y: integer) {
        let a = 3;
        let b = 7;

        let c = 4;
        let d = 6;

        for (let i = 0; i < 7; i++) {
            if (i < 4) {
                for (let j = 0; j < 11; j++)
                    if (j >= a && j <= b)
                        new ShieldPiece(this, '', x + j * 10, y + i * 10);
                a--;
                b++;
            } else {
                for (let j = 0; j < 11; j++)
                    if (!(j >= c && j <= d))
                        new ShieldPiece(this, '', x + j * 10, y + i * 10);

                if (i < 3) {
                    c--;
                    d++;
                }
            }
        }
    }

    getEnemiesAreaRange() {
        let minXEnemy = 10;
        let maxXEnemy = 0;
        let maxYEnemy = 0;

        let firstEnemy;
        let lastEnemy;
        let buttonEnemy;

        if (!this.enemiesGroupIsEmpty()) {
            for (let i = 0; i < this.enemiesReferGrid.length; i++) {
                for (let j = this.enemiesReferGrid[i].length - 1; j >= 0; j--) {
                    if (this.enemiesReferGrid[i][j] && j > maxXEnemy) {
                        maxXEnemy = j;
                        lastEnemy = this.enemies.getChildren()[((i * 11) + j)];
                    }

                    if (this.enemiesReferGrid[i][(10 - j)] && (10 - j) < minXEnemy) {
                        minXEnemy = (10 - j);
                        firstEnemy = this.enemies.getChildren()[((i * 11) + (10 - j))];
                    }

                    if (this.enemiesReferGrid[4 - i][(10 - j)] && (4 - i) > maxYEnemy) {
                        maxYEnemy = (4 - i);
                        buttonEnemy = this.enemies.getChildren()[(((4 - i) * 11) + j)];
                    }
                }
            }
        } else {
            this.scene.pause('main');

            this.scene.launch('generalMessage');
        }
        return this.correctEnemiesRefer([firstEnemy, lastEnemy, buttonEnemy]);
    }

    enemiesGroupIsEmpty() {
        let result = true;

        this.enemies.getChildren().forEach((enemy: Enemy) => {
            if (enemy.active) result = false;
        });

        return result;
    }

    correctEnemiesRefer(refers: any) {
        let correction = [];

        if (refers[0] == undefined)
            correction[0] = correction[1] = refers[1];
        else if (refers[1] == undefined)
            correction[0] = correction[1] = refers[0];
        else
            correction = refers

        if (refers[2] == undefined) correction[2] = correction[0];

        return correction;
    }

    getEnemiesShooting() {
        const buttonEnemies = [];

        for (let i = 0; i < 5; i++)
            for (let j = 0; j < 11; j++)
                if (this.enemiesReferGrid[i][j])
                    buttonEnemies[j] = this.enemies.getChildren()[((i * 11) + j)];

        return buttonEnemies
    }

    decreaseEnemiesShootDelay() {
        this.enemiesShootDelay -= (this.enemiesShootDelay - 50 < 1500) ? 50 : 0;
    }
}