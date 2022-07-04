import animations from "../../node_modules/@axieinfinity/mixer/dist/data/axie-2d-v3-stuff-animations.json";

import { Color } from "./types";
import key from "./key.json";


export const animationList: string[] = animations.items.header
  .map((obj) => obj.name)
  .filter((obj) => obj.substring(0, 10) !== "action/mix");

export const colorsArray: Color[] = key.items.colors;