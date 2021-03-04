import {
  getTaskList,
  createTask,
  editTask,
} from "./Task"

import { 
  Login
} from "./User"

export const Task = {
  getList: getTaskList,
  create: createTask,
  edit: editTask,
}

export const User = {
  Login
}