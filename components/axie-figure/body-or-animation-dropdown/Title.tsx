import s from "./styles.module.css"

interface ITitle {
  value: string
  title: string
}

export const Title = ({ value, title }: ITitle) => {
  return (
    <>
      <div>
        {title === "Body" ? (
          <div>
            <img
              src={`/part-icons/${title.toLowerCase()}.png`}
              width={25}
              height={25}
            />
          </div>
        ) : null}
      </div>
      <div>{value || title}</div>
      <div className={s.carrot}>
        <img src="./chevron-down.png" width={14} />
      </div>
    </>
  )
}
