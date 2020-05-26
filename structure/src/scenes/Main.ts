import {Player} from '../gameObjs/Player';
import {Enemy} from '../gameObjs/Enemy';

export class Main extends Phaser.Scene {
    private key: any;

    private player: Player | any;

    private enemiesMarginGrid: number = 50;
    private enemiesReferGrid: Array<number[]> = [];

    private enemies: Phaser.GameObjects.Group | any;
    private enemiesDirection = 1;

    constructor() {
        super("main");
    }

    init() {
        this.key = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.player = new Player(this, 'shipTest', this.key);

        this.enemies = this.add.group({runChildUpdate: true});
        for (let i = 0; i < 5; i++) {
            const row = [];
            for (let j = 0; j < 11; j++) {
                this.enemies.add(new Enemy(this,
                    (60 + (j * this.enemiesMarginGrid)),
                    (60 + (i * this.enemiesMarginGrid)),
                    '',
                    j + ";" + i
                ));

                row.push(1);
            }
            this.enemiesReferGrid.push(row);
        }
    }

    update(time: integer) {
        this.player.move();

        Enemy.updatePosition(time, this, this.sys.canvas);
    }

    checkCollision(shot: any) {
        let grid = this.enemiesReferGrid;

        this.enemies.getChildren().forEach((enemy: Enemy) => {
            if(enemy.active){
                this.physics.add.collider(shot, enemy, function () {
                    grid[Number(enemy.getCoordinates()[1])][Number(enemy.getCoordinates()[0])] = 0;

                    enemy.setActive(false);
                    enemy.setVisible(false);

                    shot.destroy();
                });
            }
        });

        this.enemiesReferGrid = grid;

        console.log(this.getEnemiesAreaRange()[2].getId() + " " + this.getEnemiesAreaRange()[1].getId() + " | " + this.getEnemiesAreaRange()[0].getId())
    }

    getEnemiesAreaRange() {
        let minXEnemy = 10;
        let maxXEnemy = 0;
        let maxYEnemy = 0;

        let firstEnemy;
        let lastEnemy;
        let bottonEnemy;

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
                    bottonEnemy = this.enemies.getChildren()[(((4 - i) * 11) + j)];
                }
            }
        }

        return [firstEnemy, lastEnemy, bottonEnemy];
    }

    getEnemiesShooting() {
        var bottonEnemies = [];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 11; j++) {
                if (this.enemiesReferGrid[i][j])
                    bottonEnemies[j] = this.enemies.getChildren()[((i * 11) + j)].getCoordinates()
            }
        }

        return bottonEnemies
    }

    setEnemiesDirection(direction: integer) {
        this.enemiesDirection = direction;
    }

    goDownEnemy(c: number) {
        // @ts-ignore
        this.enemies.getChildren().forEach(enemy => enemy.y = c);
    }
}