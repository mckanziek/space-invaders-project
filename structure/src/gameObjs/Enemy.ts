import {Shot} from "./Shot";
import {GameHud} from "../scenes/GameHud";

/**
 * Classe figlia di Phaser.GameObjects.Sprite
 *
 * Questa classe serve per generare i nemici nel gioco.
 * Gestisce anche il movimento ed altri eventi legati a questa istanza.
 */
export class Enemy extends Phaser.GameObjects.Sprite {
    /**
     * L'id serve per tenere traccia delle coordinate di un singolo nemico
     */
    private readonly id: string;
    /**
     * Point è la quantità di punti che vale il nemico,
     * stessa quantità di punti che verrà assegnata al giocatore
     * se questo nemico venisse ucciso
     */
    private readonly point: integer;
    /**
     * CustomY serve per tenere traccia del vero valore di Y del nemico
     */
    private customY: number;

    /**
     * MainScene serve per avere un riferimento della scena principale del gioco
     */
    private static mainScene: Phaser.Scene | any;
    /**
     * Canvas serve per tenere un riferimento del canvas usato per renderizzare il gioco
     */
    private static canvas: any;

    /**
     * SpriteSheet è lo sprite che viene assegnato al nemico
     */
    private spriteSheet: string | any;

    /**
     * Grandezze dell'oggetto nemico,
     * serve per poter accedere da metodi statici
     */
    private static width: number;
    private static height: number;

    /**
     * Speed è il valore di quanto avanza l'oggetto nemico
     */
    private static speed = 10;
    /**
     * TimingMove serve per calcolare il tempo che ci metterà l'oggetto nemico
     * per passare da una posizione all'altra
     */
    private static timingMove = 0;
    /**
     * EnemyMoveDelay serve per calcolare quanto tempo ci mente uno spostamento
     * dell'oggetto nemico.
     */
    private static enemyMoveDelay = 420;

    /**
     * BulletsAlive serve per tenere traccia dei colpi sparati dai nemici
     */
    private bulletsAlive: Phaser.GameObjects.Group = this.scene.add.group();

    /**
     *
     * @param scene Istanza dove verrà inserito l'oggetto Enemy
     * @param x Posizione x dell'oggetto Enemy
     * @param y Posizione y dell'oggetto Enemy
     * @param spriteSheet Sprite da assegnare alle istanze di Enemy
     * @param id Coordinate delle istanze di Enemy
     * @param point Valore della istanza Enemy di quando viene ucciso
     */
    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string, point: integer) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        this.point = point;

        this.spriteSheet = spriteSheet;

        Enemy.width = this.width;
        Enemy.height = this.height;

        Enemy.speed = 10;
        Enemy.timingMove = 0;
        Enemy.enemyMoveDelay = 420;

        Enemy.mainScene = scene;
        Enemy.canvas = scene.sys.canvas;

        try {
            /**
             * Riprodurre le animazioni per ogni istanza di Enemy
             */
            this.play('move' + spriteSheet.slice(-2));
        } catch (e) {
        }

        this.customY = this.y;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(0.8);
    }

    /**
     * @return id Ritorna l'id della istanza di Enemy
     */
    getId() {
        return this.id;
    }

    /**
     * @return [x, y] Ritorna un array con le coordinate della istanza di Enemy
     */
    getCoordinates() {
        const x = this.getId().split(";")[0];
        const y = this.getId().split(";")[1];

        return [x, y];
    }

    /**
     * Questo metodo serve per incrementare la
     * velocità dello spostamente delle istanze di Enemy
     */
    public incrementSpeed() {
        let speedSign = (Enemy.speed < 0) ? -1 : 1;
        let newSpeed = this.point / 10;

        if (Math.abs(Enemy.speed + newSpeed * speedSign) < 15) {
            Enemy.speed += newSpeed * speedSign;
            Enemy.enemyMoveDelay -= this.point * 2;
        }
    }

    /**
     * Questo metodo serve per spostaare tutte le istanze di Enemy
     *
     * @param time Riferimento del tempo percorso
     */
    static updatePosition(time: integer) {
        let dataPositions = Enemy.mainScene.getEnemiesAreaRange();

        if (this.timingMove < time) {
            Enemy.mainScene.enemies.getChildren().forEach((enemy: Enemy) => enemy.x += Enemy.speed);

            /**
             * Controllo se una delle istanze nelle estremità tocca il bordo
             * per poi cambiare la direzione di spostamento
             */
            if (!(dataPositions[1].x <= Enemy.canvas.width - (this.width * 1.2))
                || !(dataPositions[0].x >= (this.width * 1.2))) {
                Enemy.speed *= -1;
                Enemy.goDown(dataPositions[2]);
            }

            Enemy.timingMove = time + Enemy.enemyMoveDelay;
        }
    }

    /**
     * Questo metodo serve per spostare in giu tutte le istanze di Enemy
     *
     * @param buttonEnemy La istanza di Enemy piü vicina al bordo sud della scena
     */
    static goDown(buttonEnemy: Enemy) {

        /**
         * Se la istanza piü vicina al bordo sud non supera il limite
         * tutte le istanze di Enemy scendono. Se accade il contrario
         * il gioco finisce
         */
        if (buttonEnemy.customY < Enemy.canvas.height - (Enemy.height * 2)) {
            setTimeout(function () {
                // @ts-ignore
                Enemy.mainScene.enemies.getChildren().forEach(enemy => {
                    enemy.customY += 15;
                    enemy.y = enemy.customY;
                });
            }, 100);
        } else {
            this.mainScene.scene.pause('main');

            (this.mainScene.scene.get('gameHud') as GameHud).pushScore();

            this.mainScene.scene.launch('loseScreen');
        }
    }

    /**
     * Questo metodo serve per sparare un colpo
     */
    shoot() {
        let gameMode = Enemy.mainScene.registry.get("gameMode");

        let shot = new Shot(Enemy.mainScene, this.x, this.y, 450, 'shotSprt' + gameMode);
        this.bulletsAlive.add(shot);
        Enemy.mainScene.checkCollisionShotEnemy(shot);

        /**
         * Questa condizione serve per fare in modo de che le istanze di Enemy
         * possano sparare solo un colpo alla volta
         */
        if (this.bulletsAlive.getLength() > 0)
            this.bulletsAlive.getChildren()[0].update();
    }

    /**
     * Questo metodo serve per eseguire una serie
     * di eventi se una istanza di Enemy viene 'uccisa'
     */
    die() {
        /**
         * Aumenta la velocità di spostamento delle istanze di Enemy
         */
        this.incrementSpeed();

        /**
         * Viene riprodotto un suono
         */
        Enemy.mainScene.sound.play("enemyKilled");
        /**
         * Viene aumentato lo score del giocatore
         */
        Enemy.mainScene.events.emit('incrementScore', this.point);
        /**
         * Viene diminuito il delay dei movimenti delle istanze di Enemy
         */
        Enemy.mainScene.decreaseEnemiesShootDelay();

        this.setActive(false);
        this.setVisible(false);
    }
}