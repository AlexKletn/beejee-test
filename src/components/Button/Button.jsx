import React, { useMemo } from "react";

import style              from "./Button.scss"

export default function Button({type, icon, circle, children, onClick, _ref, ...props}) {
  let className = useMemo(() => {
    let classes = [style['btn'], style[type] || style["default"], props.className];

    if(icon) classes.push(style['with-icon'], icon.pos == 'left' ? style['icon-left'] : style['icon-right'])    
    if(circle) classes.push(style['circle'])
    
    return classes.join(' ');
  }, [type, icon, circle, props.className]) 

  return (
    <button
      ref={ _ref }
      className={ className }
      onClick={ onClick }
    >
      { icon && 
        <div className={ style['icon'] }>
          { icon.component }
        </div>
      }

      <div className={ style['label'] }>
        { children }
      </div>
    </button>
  )
}