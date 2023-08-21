import React, { useState } from 'react'

export const LazyImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = 'Image',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      {...props}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{
        filter: !loaded ? 'blur(0.2rem)' : 'none',
        transition: !loaded ? 'none' : 'filter 0.3s ease-out',
        ...props.style,
      }}
      loading='lazy'
    />
  )
}
