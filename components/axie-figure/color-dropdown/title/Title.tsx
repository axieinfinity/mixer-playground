import {SvgChevronDownIcon} from "@axieinfinity/icons"

import s from "./styles.module.css";

interface Color { key: string; primary1: string; primary2: string; }

interface ITitle {
  value: Color,
  title: string
}

export const Title = ({value, title}: ITitle) => {
 
  return (
    <>
      <div style={{backgroundColor: `#${value ? value.primary1 : "#FFD500"}`, height: 16, width: 16}}></div>
      <span>{"#"+value.primary1 || title}</span>
      <div className={s.carrot}>
        {/* <Icon name={CaretDownIconSrc} color="currentColor" /> */}
        <SvgChevronDownIcon size={25} />
      </div>
    </>
  );
};
