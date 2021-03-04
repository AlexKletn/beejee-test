import React, { useContext, useEffect, useReducer, useRef } from "react"

import { AppContext } from "@src/context/App.context.jsx"
import Button         from "@components/Button"

import CreateTask from "@components/CreateTask"
import Login      from "@components/Login"

import style      from "./ToolBar.scss"


export default function ToolBar() {
  const appCtx = useContext(AppContext);
  
  const [activeTool, setActiveTool] = useReducer((state, tool) => {
      if(state != tool) return tool
      else return null
    }, null)

  const activeToolRef = useRef(null)
  const activeToolRefBtn = useRef(null)

  useEffect(() => {
    if(activeTool) 
      document.addEventListener('click', outsideClickHander, false)    
  }, [activeTool])

  useEffect(() => {
    setActiveTool(null)
  }, [appCtx.isAuth, appCtx.tasks])

  function outsideClickHander(e) {
    if(activeToolRef.current != e.target.closest(`.${ style['tool'] }`) && !e.target.closest(`.${style['tool-btn']}`) ) {
      setActiveTool(null);
      document.removeEventListener('click', outsideClickHander, false);
    }
  } 

  return (
    <div className={ style['toolbar'] }>
      <Button 
        _ref={ activeTool == "create" ? activeToolRefBtn : undefined}
        className={ `${style['tool-btn']} ${ activeTool == "create" ? style['active'] : ''}` }
        onClick={ () => setActiveTool("create") }
      >
        Добавить
      </Button>
      { appCtx.isAuth ?
        <Button 
          className={ style['tool-btn'] }
          onClick={ appCtx.exit }
        >
          Выйти
        </Button>
      :
        <Button 
          _ref={ activeTool == "login" ? activeToolRefBtn : undefined}
          className={ `${style['tool-btn']} ${ activeTool == "login" ? style['active'] : ''}` }
          onClick={ () => setActiveTool("login") }
        >
          Войти
        </Button>
      }

      { activeTool == "create" &&
        <div ref={ activeToolRef } className={ style['tool'] }>
          <CreateTask />
        </div>
      }

      { activeTool == "login" &&
        <div ref={ activeToolRef } className={ style['tool'] }>
          <Login />
        </div>
      }
    </div>
  )  
}