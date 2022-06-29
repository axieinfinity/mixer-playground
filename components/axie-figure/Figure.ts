import "pixi-spine";
import {
  AxieMixer,
  VARIANT_LIST,
} from "@axieinfinity/mixer";

import { getAxieGenes } from "../../utils/axie";
import { Mixer } from "./types";

export class Figure extends PIXI.spine.Spine {
  static readonly resourcePath =
    "https://axiecdn.axieinfinity.com/mixer-stuffs/v2/";
  mixer: Mixer;

  constructor(mixer: Mixer) {
    const resources = Figure.getResources(mixer);
    const allTextures: { [key: string]: PIXI.Texture } = {};

    resources.map((resource) => {
      const texture = PIXI.Texture.from(resource.imagePath);
      allTextures[resource.key] = texture;
    });

    const spineAtlas = new PIXI.spine.core.TextureAtlas();
    spineAtlas.addTextureHash(allTextures, false);

    const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(
      spineAtlas
    );

    const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
    const spineData = spineJsonParser.readSkeletonData(mixer.spine);
    super(spineData);

    this.mixer = mixer;
    this.scale.set(0.18);
  }

  static async loadAndSpawn(loader: PIXI.loaders.Loader, mixer: Mixer) {
    await this.loadResources(loader, mixer);
    return new Figure(mixer);
  }

  static async fromAxieId(loader: PIXI.loaders.Loader, id: string) {
    try {
      const genes = await getAxieGenes(id);

      const mixer = new AxieMixer(genes).getAssets();
      if(!mixer) throw new Error("invalid mixer")
      const newFigure = await this.loadAndSpawn(loader, mixer);
      newFigure.stateData.setMix("draft/run-origin", "action/idle/normal", 0.1 );
      newFigure.stateData.setMix("action/idle/normal", "draft/run-origin", 0.2 );
      return newFigure;
    } catch (e) {
      console.log(e)
    }
  }

  static async fromMixer(loader: PIXI.loaders.Loader, mixer: Mixer) {
    const newFigure = await this.loadAndSpawn(loader, mixer)
    newFigure.stateData.setMix("draft/run-origin", "action/idle/normal", 0.1 );
    newFigure.stateData.setMix("action/idle/normal", "draft/run-origin", 0.2 );
    return newFigure;
  }

  static async loadResources(loader: PIXI.loaders.Loader, mixer: Mixer) {
    loader.reset();
    const resources = this.getResources(mixer);
    resources.forEach((item) => {
      if (loader.resources[item.key] === undefined) {
        loader.add(item.key, item.imagePath);
      }
    });
    await new Promise((resolve) => loader.load(resolve));
  }

  static async loadResourcesFromCombo(loader: PIXI.loaders.Loader, spine, variant: string) {
    loader.reset();
    const resources = this.getResourcesFromCombo(spine, variant);
    resources.forEach((item) => {
      if (loader.resources[item.key] === undefined) {
        loader.add(item.key, item.imagePath);
      }
    });
    await new Promise((resolve) => loader.load(resolve));
  }

  static getResourcesFromCombo(spine, variant: string) {
    const skinAttachments = spine.skins[0].attachments;
    const imagesToLoad: { key: string; imagePath: string }[] = [];

    for (const slotName in skinAttachments) {
      const skinSlotAttachments = skinAttachments[slotName];
      for (const attachmentName in skinSlotAttachments) {
        const path = skinSlotAttachments[attachmentName].path;
        const directionPath = path.replace(".", "/");
        const variantPath = VARIANT_LIST.includes(path)
          ? `/${variant}`
          : "";
        const imagePath: string = `${this.resourcePath}${directionPath}${variantPath}.png`;
        imagesToLoad.push({ key: path, imagePath });
      }
    }
    return imagesToLoad;
  }

  static getResources(mixer: Mixer) {
    const skinAttachments = mixer.spine.skins[0].attachments;
    const imagesToLoad: { key: string; imagePath: string }[] = [];

    for (const slotName in skinAttachments) {
      const skinSlotAttachments = skinAttachments[slotName];
      for (const attachmentName in skinSlotAttachments) {
        const path = skinSlotAttachments[attachmentName].path;
        const directionPath = path.replace(".", "/");
        const variantPath = VARIANT_LIST.includes(path)
          ? `/${mixer.variant}`
          : "";
        const imagePath: string = `${this.resourcePath}${directionPath}${variantPath}.png`;
        imagesToLoad.push({ key: path, imagePath });
      }
    }
    return imagesToLoad;
  }
}
