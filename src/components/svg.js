import React from 'react'

const Svg = ({ className, html }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="512"
    height="512"
    viewBox="0 0 512 512"
    className={className}
    dangerouslySetInnerHTML={
      { __html: html }
    } />
)

export default Svg