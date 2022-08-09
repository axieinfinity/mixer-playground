import animations from "../../node_modules/@axieinfinity/mixer/dist/data/axie-2d-v3-stuff-animations.json";
import key from "./key.json";
import { Color } from "./types";

export const animationList: string[] = animations.items.header
  .map((obj) => obj.name)
  .filter((obj) => obj.substring(0, 10) !== "action/mix");

export const colorsArray: Color[] = key.items.colors;
export const summerColors: Color[] = [
  {
    key: "aquatic-summer",
    primary1: "Aquatic",
    primary2: "",
  },
  {
    key: "bird-summer",
    primary1: "Bird",
    primary2: "",
  },
  {
    key: "dawn-summer",
    primary1: "Dawn",
    primary2: "",
  },
  {
    key: "mech-summer",
    primary1: "Mech",
    primary2: "",
  },
  {
    key: "reptile-summer",
    primary1: "Reptile",
    primary2: "",
  },
  {
    key: "beast-summer",
    primary1: "Beast",
    primary2: "",
  },
  {
    key: "bug-summer",
    primary1: "Bug",
    primary2: "",
  },
  {
    key: "dusk-summer",
    primary1: "Dusk",
    primary2: "",
  },
  {
    key: "plant-summer",
    primary1: "Plant",
    primary2: "",
  },
];
