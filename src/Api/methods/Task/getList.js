import Req from "@api/Req.js";
/**
 * Зарос сортированного, разбитого на страницы списка.
 * 
 * @param  { string } sortField="username" - Поле сортировки 
 * @param  { string } sortDir="asc" - Направление сортировки
 * @param  { number } page=1 - Страница
 */
export default async function getTaskList(sortField = "username", sortDir = "asc", page = 1) {
  
  if(!["username", "email", "status"].includes(sortField)) 
    throw new Error("Укажите корректное поле для сортировки")
  if(!["asc", "desc"].includes(sortDir))
    throw new Error("Укажите корректное направление сортировки")
  if(typeof page != "number")
    throw new Error("'page' должен быть числом")
  
  return await Req("GET", "/", {
    sort_field: sortField,
    sort_direction: sortDir,
    page,
  });
}