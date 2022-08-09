import { Listbox } from '@headlessui/react'
import cn from 'classnames'

import { Title } from './Title'
import { Part } from '../types'
import { DropdownOptionsByClass } from './DropdownOptionsByClass'
import s from './styles.module.css'

interface iPartsDropdown {
  options: Part[]
  value: Part
  title: string
  setValue: (value: Part) => void
  show: boolean
}

export const PartsDropdown = ({
  options,
  value,
  setValue,
  title,
  show,
}: iPartsDropdown) => {
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
        <DropdownOptionsByClass axieClass="beast" options={options} />
        <DropdownOptionsByClass axieClass="aquatic" options={options} />
        <DropdownOptionsByClass axieClass="plant" options={options} />
        <DropdownOptionsByClass axieClass="bug" options={options} />
        <DropdownOptionsByClass axieClass="bird" options={options} />
        <DropdownOptionsByClass axieClass="reptile" options={options} />
        <DropdownOptionsByClass axieClass="xmas" options={options} />
        <DropdownOptionsByClass axieClass="japan" options={options} />
        <DropdownOptionsByClass axieClass="summer" options={options} />
      </Listbox.Options>
    </Listbox>
  )
}
