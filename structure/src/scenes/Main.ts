import {Player} from '../gameObjs/Player';
import {ShieldPiece} from '../gameObjs/ShieldPiece';
import {Enemy} from '../gameObjs/Enemy';
import {Ufo} from '../gameObjs/Ufo';

/**
 * Classe figlia di Phaser.Scene
 *
 * Questa classe si occupa di gestire tutto il gioco
 */
export class Main extends Phaser.Scene {
    /**
     * GameRound è il riferimento del round attuale del gioco
     */
    private gameMode: integer = 0;
    /**
     * Key serve per gestire gli eventi da tastiera
     * per gli spostamenti del giocatore
     */
    private key: Phaser.Input.Keyboard.KeyboardManager | any;

    private player: Player | any;

    /**
     * EnemiesPoints serve per avere un riferimento di quanti punti
     * verrano segnati ai nemici quando verranno creati
     */
    private enemiesPoints = [30, 20, 20, 10, 10];
    /**
     * EnemiesSprites serve per avere un riferimento di quali sprite
     * verranno assegnati ai nemici quando verranno creati
     */
    private enemiesSprites = [0, 0, 1, 1, 2];

    /**
     * EnemiesShootTiming serve per impostare quanto tempo deve passare
     * prima che i nemici possano fare un'altro sparo
     */
    private enemiesShootTiming = 0;
    private enemiesShootDelay: integer | any;
    /**
     * EnemiesMarginGrid è il valore di quanto spazio c'è tra un nemico
     * e l'altro
     */
    private enemiesMarginGrid: number = 55;
    /**
     * EnemiesReferGrid è una griglia di riferimento per sapere
     * dove si trova uno specifico nemico
     */
    private enemiesReferGrid: Array<number[]> | any;
    /**
     * Enemies è il gruppo che contiene tutti i nemici creati
     */
    private enemies: Phaser.GameObjects.Group | any;

    constructor() {
        super({key: "main"});
    }

    /**
     * Init è un metodo predefinito di tutti gli oggetti di Phaser
     * viene usato per inizializzare o creare componenti
     *
     * @param data Tramite questo parametro viene specificata
     * la modalità di gioco
     */
    init(data: any) {
        this.registry.set("gameMode", data.gameMode);
        this.gameMode = data.gameMode;

        this.key = this.input.keyboard.createCursorKeys();
        this.enemies = this.add.group({runChildUpdate: true});
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per istanziare il giocatore principale ed i nemici
     */
    create() {
        this.player = new Player(this, 'player' + this.gameMode, this.key);

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

        Ufo.ufoLives = [];
    }

    /**
     * Questo metodo predefinito degli oggetti Phaser, serve per aggiornare costantemente la posizione
     * del giocatore principale e i nemici
     *
     * @param time
     */
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

    /**
     * Questo metodo serve per controllare se ci sono collisioni tra lo sparo
     * del giocatore principale e un nemico, lo scudo oppure un Ufo
     *
     * @param playerShot Oggetto Shot generato dal giocatore
     */
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
        });

        ShieldPiece.pieces.forEach((piece: ShieldPiece) => {
            if (piece.active) {
                this.physics.add.overlap(playerShot, piece, function () {
                    piece.destroy();
                    playerShot.destroy();
                });
            }
        });

        let randomNum = Math.floor(Math.random() * 10);
        let ufoDirection = (randomNum % 2 == 0) ? this.sys.canvas.width + 40 : -40;

        if (Ufo.ufoLives.length == 0) {
            if (this.enemiesGroupLength() % 19 == 0)
                Ufo.ufoLives.push(new Ufo(this, ufoDirection, 'ufo'));
        } else {
            let ufo = Ufo.ufoLives[0];
            this.physics.add.overlap(playerShot, ufo, function () {
                ufo.die();
                playerShot.destroy();
            });
        }

        this.enemiesReferGrid = grid;
    }

    /**
     * Questo metodo serve per controllare se ci sono collisioni tra
     * un colpo sparato dai nemici ed il giocatore principale o lo scudo
     *
     * @param enemyShot
     */
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

    /**
     * Questo metodo serve per controllare se ci sono collisioni tra i nemici
     * e gli scudi
     */
    checkCollisionEnemy() {
        this.enemies.getChildren().forEach((enemy: Enemy) => {
            ShieldPiece.pieces.forEach((piece: ShieldPiece) => {
                this.physics.add.overlap(enemy, piece, function () {
                    if (enemy.active) piece.destroy();
                });
            });
        });
    }

    /**
     * Questo metodo serve per generare lo scudo con la forma
     *
     * @param x Posizione x dello scudo
     * @param y Posizioni y dello scudo
     */
    initShield(x: integer, y: integer) {
        let a = 3;
        let b = 7;

        let c = 4;
        let d = 6;

        for (let i = 0; i < 7; i++) {
            let randomNum = Math.floor(Math.random() * 3);
            let sprite = (this.gameMode == 0) ? 'shield1' : 'shield' + randomNum;

            if (i < 4) {
                for (let j = 0; j < 11; j++)
                    if (j >= a && j <= b)
                        new ShieldPiece(this, x + j * 9.6, y + i * 9.6, sprite);
                a--;
                b++;
            } else {
                for (let j = 0; j < 11; j++)
                    if (!(j >= c && j <= d))
                        new ShieldPiece(this, x + j * 9.6, y + i * 9.6, sprite);

                if (i < 3) {
                    c--;
                    d++;
                }
            }
        }
    }

    /**
     * Questo metodo serve per trovare quali sono i nemici alle estremita
     * del gruppo a siinistra, destra e sotto
     *
     * @return Array di oggetti Enemy
     */
    getEnemiesAreaRange() {
        let minXEnemy = 10;
        let maxXEnemy = 0;
        let maxYEnemy = 0;

        let firstEnemy;
        let lastEnemy;
        let buttonEnemy;

        if (this.enemiesGroupLength() > 0) {
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

    /**
     * @return enemies il numero di nemici vivi
     */
    enemiesGroupLength() {
        let enemies = 0;

        this.enemies.getChildren().forEach((enemy: Enemy) => {
            if (enemy.active) enemies++;
        });

        return enemies;
    }

    /**
     * @param refers Array con i riferimenti giusti dei nemici alle estremità nel
     * caso in cui un nemico sia il riferimento di piü di due estremi
     */
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

    /**
     * @return buttonEnemies un array contenenti tutti i nemici piü vicini al bordo sud
     */
    getEnemiesShooting() {
        const buttonEnemies = [];

        for (let i = 0; i < 5; i++)
            for (let j = 0; j < 11; j++)
                if (this.enemiesReferGrid[i][j])
                    buttonEnemies[j] = this.enemies.getChildren()[((i * 11) + j)];

        return buttonEnemies
    }

    /**
     * Questo metodo serve per diminuire il tempo che ci mette
     * un nemico a sparare
     */
    decreaseEnemiesShootDelay() {
        this.enemiesShootDelay -= (this.enemiesShootDelay - 50 < 1500) ? 50 : 0;
    }
}