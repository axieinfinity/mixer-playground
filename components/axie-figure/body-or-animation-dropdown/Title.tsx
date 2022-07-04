import { SvgChevronDownIcon } from "@axieinfinity/icons";

import s from "./styles.module.css";

interface ITitle {
  value: string;
  title: string;
}

export const Title = ({ value, title }: ITitle) => {
  return (
    <>
      <div>
        {title === "Body" ? (
          <div>
            <img src={`/part-icons/${title}.png`} width={25} height={25} />
          </div>
        ) : null}
      </div>
      <div>{value || title}</div>
      <div className={s.carrot}>
        <SvgChevronDownIcon size={25} />
      </div>
    </>
  );
};
