import { Listbox } from "@headlessui/react";
import cn from "classnames"

import { Title } from "./title/Title";
import { Part } from "../types";
import s from "./styles.module.css";

interface iPartsDropdown {
  options: Part[];
  value: Part;
  title: string;
  setValue: (value: Part) => void;
  show: boolean;
}

export const PartsDropdown = ({
  options,
  value,
  setValue,
  title,
  show,
}: iPartsDropdown) => {
  const getOptionsByClass = (axieClass: string) => {
    return options.filter(
      (option) => option.sample.split("-")[0] === axieClass
    );
  };

  const beastOptions = getOptionsByClass("beast");
  const plantOptions = getOptionsByClass("plant");
  const bugOptions = getOptionsByClass("bug");
  const aquaticOptions = getOptionsByClass("aquatic");
  const reptileOptions = getOptionsByClass("reptile");
  const birdOptions = getOptionsByClass("bird");
  const xmasOptions = getOptionsByClass("xmas");
  const japaneseOptions = getOptionsByClass("japan");

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
      <div className={cn({
        [s.showHelperText]: show === true,
        [s.hideHelperText]: show === false,
      })}>
        <span>{title} is required.</span>
      </div>
      <Listbox.Options className={s.dropdownActive}>
        {/* {options.map((option) => (
          <Listbox.Option className={s.dropdownItem} value={option}>
            {option.name}
          </Listbox.Option>
        ))} */}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/beast.png" alt="beast-icon" />
            <span>beast</span>
          </div>
        </Listbox.Option>
        {beastOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/aquatic.png" alt="aquatic-icon" />
            <span>aquatic</span>
          </div>
        </Listbox.Option>
        {aquaticOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/plant.png" alt="plant-icon" />
            <span>plant</span>
          </div>
        </Listbox.Option>
        {plantOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/bug.png" alt="bug-icon" />
            <span>bug</span>
          </div>
        </Listbox.Option>
        {bugOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/bird.png" alt="bird-icon" />
            <span>bird</span>
          </div>
        </Listbox.Option>
        {birdOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/reptile.png" alt="reptile-icon" />
            <span>reptile</span>
          </div>
        </Listbox.Option>
        {reptileOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/xmas.png" alt="xmas-icon" />
            <span>Xmas</span>
          </div>
        </Listbox.Option>
        {xmasOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
        <Listbox.Option className={s.dropdownItemLabel} disabled value="">
          <div>
            <img src="/class-icons/japan.png" alt="japan-icon" />
            <span>Japanese</span>
          </div>
        </Listbox.Option>
        {japaneseOptions.map((option) => {
          return (
            <Listbox.Option key={option.name} className={s.dropdownItem} value={option}>
              {option.name}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
};
