const BaseAPIUrl = new URL("https://uxcandy.com/~shapoval/test-task-backend/v2/");

const defaultSearch = {
  developer: "AlexQ98"
}
/**
 * Добавляет параметры к query части url из объекта.
 * 
 * @param  { object } urlObject - экземляр URL()
 * @param  { object } paramsList
 */
async function setSearchParams(urlObject, paramsList) {
  for(const paramKey in paramsList) {
    urlObject.searchParams.set(paramKey, paramsList[paramKey]);
  }
  
  return;
}
/**
 * Обёртка для fetch.
 * 
 * @param  { string } method="GET"
 * @param  { string } endpointUrl
 * @param  { object } data - если метод запроса GET, то это параметры query(search). Иначе - тело запроса.
 */
export default async function Request(method = "GET", endpointUrl, data) {

  if(!endpointUrl) throw 'Укажите url';

  const url = new URL(`.${endpointUrl}`, BaseAPIUrl);

  await setSearchParams(url, defaultSearch);

  if(data && method.toUpperCase() == "GET") {
    await setSearchParams(url, data);
  }

  const res = await fetch(url, {
    method, 
    mode: 'cors',
    body: method != "GET" ? data : undefined  
  })

  if (res.ok) {
    if(/json/i.test(res.headers.get('Content-Type'))) {
      const json = await res.json();

      if(json.status == "ok") 
        return json.message;
      else 
        throw json.message;
      
    }    
  } else 
    throw "Fail"
  
  
}