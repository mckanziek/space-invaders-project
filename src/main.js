"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Phaser = require("phaser");
var preload_1 = require("./scenes/preload");
var boot_1 = require("./scenes/boot");
var game_1 = require("./scenes/game");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = this;
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#a9ffbc'
        };
        _this = _super.call(this, config) || this;
        _this.scene.add("boot", boot_1.Boot, false);
        _this.scene.add("preload", preload_1.Preload, false);
        _this.scene.add("game", game_1.Game, false);
        _this.scene.start("preload");
        return _this;
    }
    return Main;
}(Phaser.Game));
window.onload = function () {
    var GameApp = new Main();
};
