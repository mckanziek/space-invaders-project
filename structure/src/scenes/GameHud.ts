export class GameHud extends Phaser.Scene {
    private score: integer = 0;

    constructor() {
        super({key: "gameHud", active: true});
    }

    create() {
        let mainScene = this.scene.get('main');

        let scoreLabel = this.add.text(15, 15, "Punteggio: " + this.score,
            {font: '30px Arial', fill: '#fff'}
        );

        mainScene.events.on('incrementScore', function(points: integer){
            // @ts-ignore
            this.score += points;
            // @ts-ignore
            scoreLabel.setText("Punteggio: " + this.score);
        }, this);
    }
}