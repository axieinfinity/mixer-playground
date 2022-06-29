import { Listbox } from "@headlessui/react";

import s from "./styles.module.css";
import { Title } from "./title/Title";

interface Color {
  key: string;
  primary1: string;
  primary2: string;
}

interface iDropdown {
  options: Color[];
  value: Color;
  title: string;
  setValue: (value: Color) => void;
}

export const ColorDropdown = ({
  options,
  value,
  setValue,
  title,
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
     
      <Listbox.Options className={s.dropdownActive}>
        {options.map((option) => (
          <Listbox.Option key={option.key} className={s.dropdownItem} value={option}>
            <div className={s.previewColorContainer}>
              <div
                style={{
                  backgroundColor: `#${option.primary1}`,
                  width: 16,
                  height: 16,
                }}
              ></div>
              <div>#{option.primary1}</div>
            </div>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
