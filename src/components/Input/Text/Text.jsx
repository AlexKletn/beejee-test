import React from "react"

import style from './Text.scss'

export default function InputText({label, multiline, name, defaultValue, placeholder, _ref, password, error, ...props}) {

  return (
    <div className={ `${style['input-container']} ${ props.className }` }>
      { label && 
        <label className={ style['label'] } htmlFor={ name }>
          { label }
        </label>
      }

      { multiline && !password ?
        <textarea
          id={ name }
          name={ name }
          className={ `${ style['input'] } ${ error ? style['input-error'] : '' }` } 
          ref={ _ref } 
          defaultValue={ defaultValue }
          placeholder={ placeholder }          
        />
      :        
        <input 
          id={ name }
          name={ name }
          type={ password ? "password" : "text"}
          className={ `${ style['input'] } ${ error ? style['input-error'] : '' }` } 
          ref={ _ref } 
          defaultValue={ defaultValue }
          placeholder={ placeholder }
        />
      }

      { error && 
        <div className={ style['error-message'] }> { error } </div>    
      }
    </div>
  )
}