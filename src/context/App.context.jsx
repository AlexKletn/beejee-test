import React, { createContext, useEffect, useState } from "react"
import getCookie                                     from "get-cookie"

import * as Api from "@api"

export const AppContext = createContext();

export function AppProvider ({children}){
  const [state, setState] = useState({
    tasks: [],
    quantityPerPage: 3,
    total: 0,
    page: 1,
  });

  const [isAuth, setAuth] = useState(false)
  const [sort, setSort] = useState({
    by: "username", dir: "asc"
  })

  useEffect(() => {
    getList();
    let token = getToken();
    
    if(token) {
      setAuth(true);
    }
  }, [state.page, sort.by, sort.dir]);

  function getToken() {
    let token = getCookie("token");

    if(!token && isAuth) setAuth(false);
    else if(token && !isAuth) setAuth(true); 

    return token;
  }

  function login(user) {
    return Api.User.Login(user)
      .then(res => {
        if(res.token) {
          /**
           * Позволять JS`у, на фронте, работать с токеном - плохая практика. Так как XSS. 
           * Токен должен храниться только в httpOnly куках.
           * Но тут выбора у меня нет.
           */


          let expires = new Date();
          expires.setDate(expires.getDate() + 1)

          document.cookie = `token=${ res.token }; expires=${ expires.toUTCString() }`;
        
          setAuth(true);
        }        
      }, err => {
        throw err
      })
  }

  function exit(){
    document.cookie = `token=''; expires=${ (new Date()).toUTCString() }`;
    setAuth(false)
  }

  function getList(){
    Api.Task.getList(sort.by, sort.dir, state.page)
      .then(res => {
        setState({
          ...state,

          tasks: res.tasks,
          total: res.total_task_count,
        })
      }, console.error)
  }

  function changePage(page){
    setState({
      ...state,
      page
    })
  }

  function changeSort(field) {
    let newSort = { ...sort };

    if(sort.by == field) {
      newSort.dir = sort.dir == "asc" ? "desc" : "asc";
    } else {
      newSort.by = field
      newSort.dir = "asc"
    }

    setState({
      ...state, 
      page: 1
    })
    setSort(newSort)
  }

  function createTask(task) {
    Api.Task.create(task)
      .then(res => {
        getList()
      }, console.error)
  }

  function editTask(id, taskMod) {
    const token = getToken();
    if(!token) throw "Нужен токен";

    Api.Task.edit(id, {...taskMod, token})
      .then(res => {
        getList()        
      }, console.error)
  }

  return (
    <AppContext.Provider 
      value={{
        ...state, 

        isAuth,
        login,
        exit,

        sort,
        changeSort,

        getList,
        changePage,
        createTask,
        editTask,
      }}
    >
      { children }
    </AppContext.Provider>
  )
}

export const AppConsumer = AppContext.Consumer;