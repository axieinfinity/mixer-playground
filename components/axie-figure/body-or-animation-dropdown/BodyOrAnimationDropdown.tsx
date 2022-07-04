import { Listbox } from "@headlessui/react";
import cn from "classnames";

import { Title } from "./Title";
import s from "./styles.module.css";

interface iDropdown {
  options: string[];
  value: string;
  title: string;
  setValue: (value: string) => void;
  show: boolean;
}

export const BodyOrAnimationDropdown = ({
  options,
  value,
  setValue,
  title,
  show,
}: iDropdown) => {
  return (
    <Listbox
      as="div"
      className={s.dropDownContainer}
      value={value}
      onChange={setValue}
    >
      <Listbox.Button className={s.dropdownButton}>
        <div className={s.optionContainer}>
          <Title value={value} title={title} />
        </div>
      </Listbox.Button>
      <div
        className={cn({
          [s.showHelperText]: show === true,
          [s.hideHelperText]: show === false,
        })}
      >
        <span>{title} is required.</span>
      </div>
      <Listbox.Options className={s.dropdownActive}>
        {options.map((option) => (
          <Listbox.Option
            key={option}
            className={s.dropdownItem}
            value={option}
          >
            {option}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
