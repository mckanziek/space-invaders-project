export class GameHud extends Phaser.Scene {
    private mainScene: any;

    private score = 0;
    private playerHealth: Phaser.GameObjects.Group | any;

    constructor() {
        super({key: "gameHud"});
    }

    init(){
        this.mainScene = this.scene.get('main');
        this.playerHealth = this.add.group();
    }

    create() {
        let scoreLabel = this.add.text(15, 15, "Punteggio: " + this.score,
            {font: '30px Arial', fill: '#fff'}
        );

        this.mainScene.events.on('incrementScore', function(points: integer){
            // @ts-ignore
            this.score += points;
            // @ts-ignore
            scoreLabel.setText("Punteggio: " + this.score);
        }, this);

        this.mainScene.events.on('decraseHealth', this.decrasePlayerHealth, this);
    }

    initPlayerHealth(){
        this.playerHealth = this.add.group();

        for(let i = 1; i <= 3; i++){
            let healthObj = this.add.image(0, 0, 'healthTest');
            let scale = 25 / healthObj.width;

            healthObj.setScale(scale);
            healthObj.x = (this.mainScene.sys.canvas.width - (i * (healthObj.width * scale)));
            healthObj.y = (healthObj.height * scale);

            this.playerHealth.add(healthObj);
        }
    }

    decrasePlayerHealth(){
        this.playerHealth.getChildren()[this.playerHealth.getChildren().length - 1].destroy();
        if(this.playerHealth.getChildren().length == 0){
            this.scene.pause('main');

            this.scene.launch('loseScreen');
        }
    }

    getScore(){
        return this.score;
    }
}