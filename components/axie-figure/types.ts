import { MixedSkeletonData } from "@axieinfinity/mixer";

export interface Part {
  key: string;
  name: string;
  type: string;
  sample: string;
}

export interface Color {
  key: string;
  primary1: string;
  primary2: string;
}

export interface Mixer {
  spine: MixedSkeletonData;
  variant: string;
}

export enum AxieDirection {
  Left = 1,
  Right = -1,
}
