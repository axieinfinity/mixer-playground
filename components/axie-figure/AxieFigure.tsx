import { getSpineFromAdultCombo } from "@axieinfinity/mixer";
import * as PIXI from "pixi.js";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { PuffLoading } from "../puff-loading/PuffLoading";
import { BodyOrAnimationDropdown } from "./body-or-animation-dropdown/BodyOrAnimationDropdown";
import { ColorDropdown } from "./color-dropdown/ColorDropdown";
import { animationList, colorsArray, summerColors } from "./constants";
import key from "./key.json";
import { PartsDropdown } from "./parts-dropdown/PartsDropdown";
import { PlaygroundGame } from "./PlaygroundGame";
import s from "./styles.module.css";
import { Color, Part } from "./types";

import "pixi-spine";

interface AxieParts {
  ears: Part;
  eyes: Part;
  mouth: Part;
  horn: Part;
  back: Part;
  tail: Part;
}

const initialPartValue = {
  key: "",
  name: "",
  type: "",
  sample: "",
};

PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

export const AxieFigure = () => {
  const [loading, setLoading] = useState<boolean>();
  // const [canGenerate, setCanGenerate] = useState<boolean>(false);
  // const [axieCombo, setAxieCombo] = useState<Map<string, string>>();
  const [axieIdInput, setAxieIdInput] = useState<string>("11390642");
  const [axieParts, setAxieParts] = useState<AxieParts>({
    ears: initialPartValue,
    eyes: initialPartValue,
    mouth: initialPartValue,
    horn: initialPartValue,
    back: initialPartValue,
    tail: initialPartValue,
  });
  const [body, setBody] = useState<string>("");
  const [animation, setAnimation] = useState<string>("Animation");
  const [color, setColor] = useState<Color>({
    key: "beast-02",
    primary1: "ffd500",
    primary2: "fffeda",
  });
  const [showHelperTextStatus, setShowHelperTextStatus] = useState({
    ears: false,
    eyes: false,
    mouth: false,
    horn: false,
    back: false,
    tail: false,
    body: false,
    color: false,
  });
  const container = useRef<HTMLDivElement>(null);
  const gameRef = useRef<PlaygroundGame>(null);

  const createAxieCombo = useCallback(() => {
    // dropdowns validation helper text
    const updateHelperText = (axieCombo) => {
      console.log("updateHelperText", axieCombo);
      const copyShowHelperText = { ...showHelperTextStatus };
      for (let [key, value] of axieCombo.entries()) {
        if (value === "") {
          copyShowHelperText[key] = true;
        } else copyShowHelperText[key] = false;
        setShowHelperTextStatus(copyShowHelperText);
      }
    };

    const axieCombo = new Map<string, string>();
    axieCombo.set("body-id", "");
    axieCombo.set("body", body);
    axieCombo.set("back", axieParts.back.sample);
    axieCombo.set("ears", axieParts.ears.sample);
    axieCombo.set("ear", axieParts.ears.sample);
    axieCombo.set("eyes", axieParts.eyes.sample);
    axieCombo.set("horn", axieParts.horn.sample);
    axieCombo.set("mouth", axieParts.mouth.sample);
    axieCombo.set("tail", axieParts.tail.sample);

    updateHelperText(axieCombo);
    for (let [key, value] of axieCombo.entries()) {
      if (key !== "body-id" && !value) {
        return new Error("Axie part selection incomplete");
      }
    }

    return axieCombo;
  }, [axieParts, body, showHelperTextStatus]);

  const filterByBodyPart = (part: string) => {
    return key.items.parts.filter((item) => item.type === part);
  };

  const onAxiePartChange = (value: Part) => {
    setAxieParts({ ...axieParts, [value.type]: value });
  };

  const onCreateSpineMixerFromCombo = useCallback(async () => {
    try {
      const axieCombo = createAxieCombo();

      if (axieCombo instanceof Error) {
        return new Error("Axie part selection incomplete");
      }

      const spine = getSpineFromAdultCombo(axieCombo);
      if (!spine) return new Error("Spine undefined");
      const mixer = { spine: spine, variant: color.key };
      return mixer;
    } catch (e) {
      return new Error(e);
    }
  }, [color.key, createAxieCombo]);

  const onCreateSpineFromCombo = useCallback(async () => {
    const mixer = await onCreateSpineMixerFromCombo();
    if (mixer instanceof Error) {
      return new Error("Axie part selection incomplete");
    }
    await gameRef.current.changeSpineFromMixer(mixer);

    // scroll to top of the page, so the user can see the animation
    window.scrollTo(0, 0);
  }, [onCreateSpineMixerFromCombo]);

  const onAxieIdSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const axieId = e.target[1].value;

    if (!axieId || !axieId.length) return;

    try {
      // update pixi game view
      await gameRef.current.changeSpine(axieId);
      // TODO: get axie details and update the dropdowns
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeAnimation = (animation: string) => {
    setAnimation(animation);
    gameRef.current.currentFigure.changeCurrentAnimation(animation, true);
  };

  useEffect(() => {
    if (!container) return;
    if (!container.current) return;
    const canvasContainer = container.current;
    if (canvasContainer.childElementCount > 0) {
      canvasContainer.lastChild?.remove();
    }
    setLoading(true);

    const { offsetWidth, offsetHeight } = canvasContainer;
    const game = new PlaygroundGame({
      resolution: window.devicePixelRatio,
      autoStart: true,
      width: offsetWidth,
      height: offsetHeight,
      backgroundColor: 0x282b39,
    });

    gameRef.current = game;
    gameRef.current.startGame(axieIdInput);
    canvasContainer.appendChild(game.view);

    setLoading(false);

    return () => {
      // gameRef.current.cleanUpKeyListeners();
      if (game) {
        game.destroy();
      }
    };
  }, [axieIdInput]);

  const onSelectRandom = () => {
    const randomBody =
      key.items.bodies[Math.floor(Math.random() * key.items.bodies.length)];
    const randomEars =
      filterByBodyPart("ears")[
        Math.floor(Math.random() * filterByBodyPart("ears").length)
      ];
    const randomEyes =
      filterByBodyPart("eyes")[
        Math.floor(Math.random() * filterByBodyPart("eyes").length)
      ];
    const randomMouth =
      filterByBodyPart("mouth")[
        Math.floor(Math.random() * filterByBodyPart("mouth").length)
      ];
    const randomHorn =
      filterByBodyPart("horn")[
        Math.floor(Math.random() * filterByBodyPart("horn").length)
      ];
    const randomBack =
      filterByBodyPart("back")[
        Math.floor(Math.random() * filterByBodyPart("back").length)
      ];
    const randomTail =
      filterByBodyPart("tail")[
        Math.floor(Math.random() * filterByBodyPart("tail").length)
      ];

    setBody(randomBody);
    setAxieParts({
      ears: randomEars,
      eyes: randomEyes,
      mouth: randomMouth,
      horn: randomHorn,
      back: randomBack,
      tail: randomTail,
    });
    // check for body-summer special colors
    const randomColor =
      randomBody === "body-summer"
        ? summerColors[Math.floor(Math.random() * summerColors.length)]
        : colorsArray[Math.floor(Math.random() * colorsArray.length)];
    setColor(randomColor);
  };

  if (loading) return <PuffLoading size={200} />;

  return (
    <div className={s.container}>
      <div ref={container} className={s.canvas}></div>

      <div className={s.partsColumn}>
        <div className={s.bodyparts}>
          <div className={s.animation}>
            <BodyOrAnimationDropdown
              options={animationList}
              setValue={onChangeAnimation}
              value={animation}
              title="Animation"
              show={false}
            />
          </div>
          <div>
            <form onSubmit={onAxieIdSubmit} className={s.fromIdFrom}>
              <button type="submit">Get from ID</button>
              <input
                className={s.axieIdInput}
                type="number"
                placeholder="Axie ID"
                defaultValue={axieIdInput}
                onClick={(e: any) => e.target.select()}
              />
            </form>
          </div>
          <div>
            <button
              className={[s.button, s.selectRandom].join(" ")}
              onClick={onSelectRandom}
            >
              <span style={{ marginRight: "6px" }}>🎲</span>
              Select random
            </button>
          </div>

          <hr />

          <PartsDropdown
            options={filterByBodyPart("eyes")}
            setValue={onAxiePartChange}
            value={axieParts.eyes}
            title="Eyes"
            show={showHelperTextStatus.eyes}
          />
          <PartsDropdown
            options={filterByBodyPart("ears")}
            setValue={onAxiePartChange}
            value={axieParts.ears}
            title="Ears"
            show={showHelperTextStatus.ears}
          />
          <PartsDropdown
            options={filterByBodyPart("mouth")}
            setValue={onAxiePartChange}
            value={axieParts.mouth}
            title="Mouth"
            show={showHelperTextStatus.mouth}
          />

          <PartsDropdown
            options={filterByBodyPart("horn")}
            setValue={onAxiePartChange}
            value={axieParts.horn}
            title="Horn"
            show={showHelperTextStatus.horn}
          />
          <PartsDropdown
            options={filterByBodyPart("back")}
            setValue={onAxiePartChange}
            value={axieParts.back}
            title="Back"
            show={showHelperTextStatus.back}
          />
          <PartsDropdown
            options={filterByBodyPart("tail")}
            setValue={onAxiePartChange}
            value={axieParts.tail}
            title="Tail"
            show={showHelperTextStatus.back}
          />
          <BodyOrAnimationDropdown
            options={key.items.bodies}
            setValue={setBody}
            value={body}
            title="Body"
            show={showHelperTextStatus.body}
          />
          <ColorDropdown
            options={body === "body-summer" ? summerColors : colorsArray}
            setValue={setColor}
            value={color}
            title="Color"
          />

          <div>
            <button
              className={s.button}
              onClick={onCreateSpineFromCombo}
              // disabled={!canGenerate}
            >
              Generate Axie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
