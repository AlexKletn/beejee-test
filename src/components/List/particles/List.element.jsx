import React, { useContext, useEffect, useRef, useState } from "react"
import { useForm }    from 'react-hook-form'

import { AppContext } from "@src/context/App.context.jsx"
import { InputText }  from "@components/Input"
import Button         from "@components/Button"

import style          from "../style/List.element.scss"

import pencilIco      from "@src/img/pen.svg"

export default function ListElement({ id, username, email, text, status, ...props }){
  const appCtx = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();

  const [editMode, setEditMode] = useState(false);
  const editPopRef = useRef(null)
  const editPopBtnRef = useRef(null)

  useEffect(() => {
    if(editMode) document.addEventListener('click', outsideClickHander, false);
  }, [editMode])

  function outsideClickHander(e) {
    if(editPopRef.current != e.target.closest(`.${ style['edit-popup'] }`) && e.target.closest(`.${style['edit']}`) != editPopBtnRef.current) {
      setEditMode(false);
      document.removeEventListener('click', outsideClickHander, false);
    }
  } 

  function editTask(data) {
    let parsedStatus = {
      textChanged: [1, 11].includes(status),
      performed: data.performed
    };

    if(!parsedStatus.textChanged && text != data.text) {
      parsedStatus.textChanged = true
    }

    const newStatus = 0 + ( parsedStatus.performed ? 10 : 0 ) + (Number(parsedStatus.textChanged));

    appCtx.editTask(id, {
      text: text != data.text ? data.text : null,
      status: newStatus
    })
    
    setEditMode(false);
  }
  
  return (
    <div className={ `${style['element']} ${ editMode ? style['edit-mode'] : ''}` }>
      <div className={ style['username'] }>
        { username }
      </div>
      <div className={ style['email'] }>
        { email }
      </div>
      <div className={ style['text'] }>
        { text }
      </div>

      <div className={ style['statuses'] }>
        { (status == 0 || status == 1) &&
          <div className={ style['status-not-performed'] }>
            Не выполнена
          </div>
        }
        { (status == 10 || status == 11) &&
          <div className={ style['status-performed'] }>
            Выполнена
          </div>
        }
        { (status == 1 || status == 11) &&
          <div className={ style['status-changed-admin'] }>
            Отредактирована админом
          </div>
        }
      </div>

      { appCtx.isAuth && 
        <>
          <Button 
            _ref={ editPopBtnRef }
            className={ style['edit'] } 
            onClick={ () => setEditMode(!editMode) }
            circle 
          >
            <img src={ pencilIco } height="16px"/>
            {/* Редактировать */}
          </Button>

          { editMode && 
            /**
             * Это тоже, наверное, стоило декомпозировать..но можно и обойтись)))
             */
            <div ref={ editPopRef } className={ style['edit-popup'] }>
              <form onSubmit={ handleSubmit(editTask) }>

                <InputText 
                  className={ style['textarea'] }

                  defaultValue={ text }
                  error={ errors.text && "Введите текст" }
                  label="Текст"
                  placeholder="Сварить пельмешки"
                  name="text"
                  multiline
                  _ref={ register() }
                />

                <label className={ style['performed-check'] } >
                  <input 
                    defaultChecked={ ![0, 1].includes(status) }
                    name="performed" 
                    type="checkbox" 
                    ref={ register() }
                  />
                  Выполнена
                </label>

                <Button className={ style['submit'] }> Сохранить </Button>
              </form>
            </div>
          }
        </>
      }
    </div>
  )
}