import { Listbox } from "@headlessui/react";

import { Part } from "../types";
import s from "./styles.module.css";

interface IDropdownOptions {
  options: Part[];
  axieClass: string;
}

export const DropdownOptionsByClass = ({
  options,
  axieClass,
}: IDropdownOptions) => {
  const getOptionsByClass = (axieClass: string) => {
    return options.filter(
      (option) => option.sample.split("-")[0] === axieClass
    );
  };
  return (
    <>
      <Listbox.Option className={s.dropdownItemLabel} disabled value="">
        <div>
          <img
            src={`/class-icons/${axieClass}.png`}
            alt={`${axieClass}-icon`}
          />
          <span>{axieClass}</span>
        </div>
      </Listbox.Option>
      {getOptionsByClass(axieClass).map((option) => {
        return (
          <Listbox.Option
            key={option.name}
            className={s.dropdownItem}
            value={option}
          >
            {option.name}
          </Listbox.Option>
        );
      })}
    </>
  );
};
