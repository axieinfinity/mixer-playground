import * as PIXI from "pixi.js";

import { contain, Key } from "../../utils/helper";
import { CurrentFigure } from "./CurrentFigure";
import { Figure } from "./Figure";
import { AxieDirection, Mixer } from "./types";

class ContainerWithVelocity extends PIXI.Container {
  vx?: number;
}

export class PlaygroundGame extends PIXI.Application {
  offsetWidth: number;
  offsetHeight: number;
  keys: Record<string, Key>;
  axieContainer: ContainerWithVelocity;
  axieDirection: AxieDirection;
  currentFigure: CurrentFigure;
  axieContiner: PIXI.Container;

  constructor(options) {
    super(options);
    this.offsetWidth = options.width;
    this.offsetHeight = options.height;
    this.keys = null;
    this.axieDirection = AxieDirection.Left;
  }

  startGame() {
    this.stage.interactive = true;
    this.renderer.view.style.touchAction = "auto";
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.view.style.width = `${this.offsetWidth}px`;
    this.view.style.height = `${this.offsetHeight}px`;

    let state;

    this.loader.load(async () => {
      const currentFigure = new CurrentFigure();
      const figure = await Figure.fromGenes(this.loader, "0x82818021041000000001028810804104000102942880850a0001028c286180080001028c282101080001029420614508000102941800410a");
      currentFigure.currentSpine = figure;
      currentFigure.addChild(figure);
      currentFigure.changeCurrentAnimation("action/idle/normal", true);
      currentFigure.vx = 0;
      currentFigure.position.set(this.offsetWidth / 2, this.offsetHeight - 130);
      contain(currentFigure, { width: 700, height: 500 });

      this.stage?.addChild(currentFigure);
      this.currentFigure = currentFigure;
      this.currentFigure.registerKeyBoardController();
    });

    this.stage?.on("pointerdown", () => {
      this.currentFigure.changeCurrentAnimation("action/idle/random-02", false);
      this.currentFigure.changeCurrentAnimation("action/idle/normal", true, 1);
    });

    const play = (delta) => {
      if (this.currentFigure) {
        this.currentFigure.x += this.currentFigure.vx;
      }
    };

    state = play;
    const gameLoop = (delta) => state(delta);
    this?.ticker?.add((delta) => gameLoop(delta));
    this.start();
  }

  changeSpine(axieId: string) {
    return this.currentFigure.changeSpine(this.loader, axieId);
  }

  changeSpineFromMixer(mixer: Mixer) {
    return this.currentFigure.changeSpineFromMixer(this.loader, mixer)
  }
}
