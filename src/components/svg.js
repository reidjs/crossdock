import React from 'react'

const Svg = ({ className, width, height, fill, viewBox, html }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 512}
    fill={fill || ''}
    height={height || 512}
    viewBox={viewBox || "0 0 512 512"}
    className={className}
    dangerouslySetInnerHTML={
      { __html: html }
    } />
)

export default Svg