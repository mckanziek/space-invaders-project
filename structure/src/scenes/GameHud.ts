import {Scores} from "./Menus/Scores";

export class GameHud extends Phaser.Scene {
    private mainScene: any;
    private gameMode: integer = 0;

    private score = 0;
    private playerHealth: Phaser.GameObjects.Group | any;

    private scoreLabel: any;
    private pauseButton: any;

    constructor() {
        super({key: "gameHud"});
    }

    init(){
        this.mainScene = this.scene.get('main');
        this.playerHealth = this.add.group();
    }

    create() {
        this.scoreLabel = this.add.text(15, 15, "Punteggio 0",
            {font: '40px arc-font', fill: '#fff'}
        );

        this.pauseButton = this.add.text(this.sys.canvas.width - 45, this.sys.canvas.height - 30, "Pausa",
            {font: '35px arc-font', fill: '#fff'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.pauseButton.setColor('#dbba16'))
            .on('pointerout', () => this.pauseButton.setColor('#fff'))
            .on('pointerdown', () => this.pauseButton.setFont('29px arc-font'))
            .on('pointerup', () => {
                this.pauseButton.setFont('35px arc-font');

                this.scene.pause('main');

                this.scene.launch('pauseMenu');
            });

        this.mainScene.events.on('incrementScore', function(points: integer){
            // @ts-ignore
            this.score += points;
            // @ts-ignore
            this.scoreLabel.setText("Punteggio " + this.score);
        }, this);

        this.mainScene.events.on('decraseHealth', this.decreasePlayerHealth, this);
    }

    initPlayerHealth(gameMode: integer, score: integer){

        if(score == 0) {
            // @ts-ignore
            this.playerHealth.getChildren().forEach(health => health.destroy());
            // @ts-ignore
            this.playerHealth.getChildren().forEach(health => health.destroy());


            for (let i = 1; i <= 3; i++) {
                let healthObj = this.add.image(0, 0, 'playerHealthSprt' + gameMode);
                let scale = 25 / healthObj.width;

                healthObj.setScale(scale);
                healthObj.x = (this.mainScene.sys.canvas.width - (i * (healthObj.width * scale)));
                healthObj.y = (healthObj.height * scale);

                this.playerHealth.add(healthObj);
            }
        }

        this.score = score;

        this.scoreLabel.setText("Punteggio " + this.score);
    }

    decreasePlayerHealth(){
        this.playerHealth.getChildren()[this.playerHealth.getChildren().length - 1].destroy();
        if(this.playerHealth.getChildren().length == 0){
            this.scene.pause('main');

            this.pushScore();

            this.scene.launch('loseScreen');
        }
    }

    getDate(){
        const date = new Date();

        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();

        return d + "/" + m + "/" + y;
    }

    pushScore(){
        Scores.scores.push([this.score, this.getDate()]);
        console.log(Scores.scores);
    }

    getScore(){
        return this.score;
    }

    getGameMode(){
        return this.gameMode;
    }
}