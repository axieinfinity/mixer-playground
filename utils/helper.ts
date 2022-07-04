export interface Key {
  code: string;
  isDown: boolean;
  isUp: boolean;
  press: any;
  release: any;
  downHandler: (event: KeyboardEvent) => void;
  upHandler: (event: KeyboardEvent) => void;
}

export const keyboard = (keyCode: string) =>  {
  const key = {} as Key;
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  
  key.downHandler = (event: KeyboardEvent) => {
    if (event.key === key.code) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
    }
  };

  key.upHandler = (event: KeyboardEvent) =>  {
    if (event.key === key.code) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
    }
  };
  
  return key;
}

export const hitTestRectangle = (r1: any, r2: any) => {

  //Define the variables we'll need to calculate
  let hit: boolean, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

export const contain = (sprite: any, container: any) => {
  let collision = undefined;
  //Left
  if (sprite.x - sprite.halfWidth < container.x) {
    sprite.x = container.x + sprite.halfWidth;
    collision = "left";
  }

  //Right
  if (sprite.position.x + sprite.halfWidth * -1 > container.width) {
    sprite.x = container.width - sprite.halfWidth * -1;
    collision = "right";
  }

  return collision;
};
