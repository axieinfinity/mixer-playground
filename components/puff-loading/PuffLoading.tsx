import React from 'react'
import s from './styles.module.css'

interface PuffLoadingProps {
  size?: number
}

export const PuffLoading = (props: PuffLoadingProps) => {
  const { size } = props
  return (
    <div className={['absolute', s.loadingWrapper].join(' ')}>
      <img
        src="/puff-loading/puff-loading.png"
        style={{ maxWidth: size }}
        className={s.spin}
        alt="loading"
      />
    </div>
  )
}
