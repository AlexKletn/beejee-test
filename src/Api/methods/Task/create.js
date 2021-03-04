import Req from "@api/Req.js";
import { serialize } from 'object-to-formdata';
/**
 * Создание задачи
 * 
 * @param  { object||FormData } task - данные задачи
 */
export default async function createTask(task) {
  let body;

  if(!(task instanceof FormData)) { 
    if(typeof task == "object") 
      body = serialize(task)    
    else
      throw "Неверный формат"
  } else {
    body = task;
  }


  if(!(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]+?$/.test(body.get("email"))))
    throw new Error("Укажите корректный email")
    
  if(typeof body.get("username") != "string")
    throw new Error("'username' должен быть строкой")

  if(typeof body.get("text") != "string")
    throw new Error("'text' должен быть строкой")
  

  return await Req("POST", "/create", body);
}