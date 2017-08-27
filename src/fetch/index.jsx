import { buildQueryString } from '../utils/index';
import jsonp from 'fetch-jsonp';
// const apiUrl = process.env.SERVER_URL;

function getJsonp(param) {
    // const url = apiUrl+param;
    const url = "https://suggest.taobao.com/sug?"+param;
    return jsonp(url)
        .then(res => res.json())
        .catch(err => console.log(err));
}
/*function getJson(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err));
}
function postJson(url, data) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}*/

//request backend services
export const addNougats = (param) => getJsonp(buildQueryString(param));
export const getNougats = (param) => getJsonp(buildQueryString(param));
export const searchJson = (param) => getJsonp(buildQueryString(param));
export const createIphone = (param) => getJsonp(buildQueryString(param));
export const getIphones = (param) => getJsonp(buildQueryString(param));
export const getTopoByParam = (param) => getJsonp(buildQueryString(param));
