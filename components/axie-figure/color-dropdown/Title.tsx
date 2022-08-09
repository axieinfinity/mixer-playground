import { Color } from "../types"
import s from "./styles.module.css"

interface ITitle {
  value: Color
  title: string
}

export const Title = ({ value, title }: ITitle) => {
  return (
    <>
      <div
        style={{
          backgroundColor: `#${value ? value.primary1 : "#FFD500"}`,
          height: 16,
          width: 16,
        }}
      ></div>
      <span>{"#" + value.primary1 || title}</span>
      <div className={s.carrot}>
        <img src="./chevron-down.png" width={14} />
      </div>
    </>
  )
}
