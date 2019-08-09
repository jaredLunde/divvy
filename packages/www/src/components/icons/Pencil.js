import React from 'react'


const SvgComponent = ({svgRef, title = 'Edit', pathStyle, ...props}) => (
  <svg viewBox='0 0 1024 896' ref={svgRef} {...props}>
    <title>{title}</title>
    <path
      d="M704 64L576 192l192 192 128-128L704 64zM0 768l.688 192.562L192 960l512-512-192-192L0 768zm192 128H64V768h64v64h64v64z"
      style={pathStyle}
    />
  </svg>
)

const ForwardRef = React.forwardRef((props, ref) => (
  <SvgComponent svgRef={ref} {...props} />
))
export default ForwardRef
