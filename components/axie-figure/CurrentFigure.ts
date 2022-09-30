import { Key, keyboard } from "../../utils/helper";
import { Figure } from "./Figure";
import { AxieDirection, Mixer } from "./types";

export class CurrentFigure extends PIXI.Container {
  currentSpine?: Figure;
  currentAnimation: string;
  keys: Record<string, Key>;
  vx: number;
  direction: AxieDirection;

  constructor() {
    super();
    this.direction = AxieDirection.Left;
    this.currentAnimation = "action/idle/normal";
    this.vx = 0;
  }

  async changeSpine(loader: PIXI.loaders.Loader, id: number) {
    this.removeChild(this.currentSpine);
    const prevSpine = this.currentSpine;

    const newFigure = await Figure.fromAxieId(loader, id);
    if (!newFigure) throw new Error("Invalid Axie ID");
    this.currentSpine = newFigure;

    this.addChild(this.currentSpine);
    this.currentSpine.scale.x = 0.18 * this.direction;
    this.changeCurrentAnimation(this.currentAnimation, true);
    this.removeChild(prevSpine);
  }

  async changeSpineFromMixer(loader: PIXI.loaders.Loader, mixer: Mixer) {
    this.removeChild(this.currentSpine);
    const prevSpine = this.currentSpine;

    const newFigure = await Figure.fromMixer(loader, mixer);
    if (!newFigure) throw new Error("Invalid input");
    this.currentSpine = newFigure;

    this.addChild(this.currentSpine);
    this.currentSpine.scale.x = 0.18 * this.direction;
    this.changeCurrentAnimation(this.currentAnimation, true);
    this.removeChild(prevSpine);
  }

  registerKeyBoardController() {
    this.keys = {
      left: keyboard("ArrowLeft"),
      right: keyboard("ArrowRight"),
      space: keyboard(" "),
      e: keyboard("e"),
    };

    const { left, right, space, e } = this.keys;

    for (let key in this.keys) {
      window.addEventListener("keydown", this.keys[key].downHandler, false);
      window.addEventListener("keyup", this.keys[key].upHandler, false);
    }

    left.press = () => {
      this.currentSpine.scale.x = 0.18 * AxieDirection.Left;
      this.changeCurrentAnimation("draft/run-origin", true);
      this.vx = -3;

      this.direction = AxieDirection.Left;
    };

    left.release = () => {
      if (!right.isDown) {
        this.vx = 0;
        this.changeCurrentAnimation("action/idle/normal", true, 0.8);
      }
    };

    right.press = () => {
      this.currentSpine.scale.x = 0.18 * AxieDirection.Right;
      this.changeCurrentAnimation("draft/run-origin", true);
      this.vx = 3;

      this.direction = AxieDirection.Right;
    };

    right.release = () => {
      if (!left.isDown) {
        this.vx = 0;
        this.changeCurrentAnimation("action/idle/normal", true, 0.8);
      }
    };

    space.press = () => {
      this.changeCurrentAnimation("attack/ranged/cast-fly", false);
    };

    space.release = () => {
      this.changeCurrentAnimation("action/idle/normal", true, 1);
    };

    e.press = () => {
      this.changeCurrentAnimation("attack/melee/tail-smash", false);
    };

    e.release = () => {
      this.changeCurrentAnimation("action/idle/normal", true, 1);
    };
  }

  changeCurrentAnimation(keyId: string, loop: boolean, delay?: number) {
    this.currentAnimation = keyId;
    if (delay) {
      this.currentSpine.state.addAnimation(0, keyId, loop, delay);
    } else {
      this.currentSpine.state.setAnimation(0, keyId, loop);
    }
  }
}
