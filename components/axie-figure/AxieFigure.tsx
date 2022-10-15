import { getSpineFromAdultCombo } from '@axieinfinity/mixer'
import * as PIXI from 'pixi.js'
import React, { useEffect, useRef, useState } from 'react'

import { PuffLoading } from '../puff-loading/PuffLoading'
import { BodyOrAnimationDropdown } from './body-or-animation-dropdown/BodyOrAnimationDropdown'
import { ColorDropdown } from './color-dropdown/ColorDropdown'
import { animationList, colorsArray, summerColors } from './constants'
import key from './key.json'
import { PartsDropdown } from './parts-dropdown/PartsDropdown'
import { PlaygroundGame } from './PlaygroundGame'
import s from './styles.module.css'
import { Color, Part } from './types'

import 'pixi-spine'

interface AxieParts {
  ears: Part
  eyes: Part
  mouth: Part
  horn: Part
  back: Part
  tail: Part
}

const initialPartValue = {
  key: '',
  name: '',
  type: '',
  sample: '',
}

PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH

export const AxieFigure = () => {
  const [loading, setLoading] = useState<boolean>()
  // const [axieCombo, setAxieCombo] = useState<Map<string, string>>();
  // const [axieIdInput, setAxieIdInput] = useState<string>("");
  const [axieParts, setAxieParts] = useState<AxieParts>({
    ears: initialPartValue,
    eyes: initialPartValue,
    mouth: initialPartValue,
    horn: initialPartValue,
    back: initialPartValue,
    tail: initialPartValue,
  })
  const [body, setBody] = useState<string>('')
  const [animation, setAnimation] = useState<string>('Animation')
  const [color, setColor] = useState<Color>({
    key: 'beast-02',
    primary1: 'ffd500',
    primary2: 'fffeda',
  })
  const [showHelperTextStatus, setShowHelperTextStatus] = useState({
    ears: false,
    eyes: false,
    mouth: false,
    horn: false,
    back: false,
    tail: false,
    body: false,
    color: false,
  })

  const filterByBodyPart = (part: string) => {
    return key.items.parts.filter((item) => item.type === part)
  }

  const onAxiePartChange = (value: Part) => {
    setAxieParts({ ...axieParts, [value.type]: value })
  }

  const createAxieCombo = () => {
    const axieCombo = new Map<string, string>()
    axieCombo.set('body-id', '')
    axieCombo.set('body', body)
    axieCombo.set('back', axieParts.back.sample)
    axieCombo.set('ears', axieParts.ears.sample)
    axieCombo.set('ear', axieParts.ears.sample)
    axieCombo.set('eyes', axieParts.eyes.sample)
    axieCombo.set('horn', axieParts.horn.sample)
    axieCombo.set('mouth', axieParts.mouth.sample)
    axieCombo.set('tail', axieParts.tail.sample)
    return axieCombo
  }

  const updateHelperText = (axieCombo) => {
    const copyShowHelperText = { ...showHelperTextStatus }
    for (let [key, value] of axieCombo.entries()) {
      if (value === '') {
        copyShowHelperText[key] = true
      } else copyShowHelperText[key] = false
      setShowHelperTextStatus(copyShowHelperText)
    }
  }

  const onCreateSpineFromCombo = async () => {
    try {
      const axieCombo = createAxieCombo()
      updateHelperText(axieCombo)
      for (let [key, value] of axieCombo.entries()) {
        if (key !== 'body-id' && !value) {
          throw new Error('Axie part selection incomplete')
        }
      }
      const spine = getSpineFromAdultCombo(axieCombo)
      if (!spine) throw new Error('Spine undefined')
      const mixer = { spine: spine, variant: color.key }
      await gameRef.current.changeSpineFromMixer(mixer)
    } catch (e) {
      console.error(e)
    }
  }

  const container = useRef<HTMLDivElement>(null)
  const gameRef = useRef<PlaygroundGame>(null)

  // const onChangeAxieGenes = async () => {
  //   await gameRef.current.changeSpine(axieIdInput);
  //   setAxieIdInput("");
  // };

  // const onChangeAxieID = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAxieIdInput(e.target.value);
  // };

  const onChangeAnimation = (animation: string) => {
    setAnimation(animation)
    gameRef.current.currentFigure.changeCurrentAnimation(animation, true)
  }

  useEffect(() => {
    if (!container) return
    if (!container.current) return
    const canvasContainer = container.current
    if (canvasContainer.childElementCount > 0) {
      canvasContainer.lastChild?.remove()
    }
    setLoading(true)

    const { offsetWidth, offsetHeight } = canvasContainer
    const game = new PlaygroundGame({
      transparent: false,
      resolution: window.devicePixelRatio,
      autoStart: true,
      width: offsetWidth,
      height: offsetHeight,
      backgroundColor: 0x282b39,
    })

    gameRef.current = game
    gameRef.current.startGame()
    canvasContainer.appendChild(game.view)

    setLoading(false)

    return () => {
      // gameRef.current.cleanUpKeyListeners();
      if (game) {
        game.destroy()
      }
    }
  }, [])

  if (loading) return <PuffLoading size={200} />;

  return (
    <div className={s.container}>
      <div ref={container} className={s.canvas}></div>

      <div className={s.partsColumn}>
        <div className={s.bodyparts}>
          <button className={s.createButton} onClick={onCreateSpineFromCombo}>
            Generate Axie
          </button>

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
          <div className={s.animation}>
            <BodyOrAnimationDropdown
              options={animationList}
              setValue={onChangeAnimation}
              value={animation}
              title="Animation"
              show={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
