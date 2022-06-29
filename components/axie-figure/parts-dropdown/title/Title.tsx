import { SvgChevronDownIcon } from "@axieinfinity/icons"

import { Part } from "../../types";
import s from "./styles.module.css";

interface ITitle {
  value: Part;
  title: string;
}

export const Title = ({ value, title }: ITitle) => {
  return (
    <>
      <div>
        <img src={`/part-icons/${title}.png`} width={25} height={25} />
      </div>
      <div className={s.text}>{value.name || title}</div>
      <div className={s.carrot}>
        <SvgChevronDownIcon size={25}/>
      </div>
    </>
  );
};
