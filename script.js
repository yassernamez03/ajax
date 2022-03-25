let req = new XMLHttpRequest();
let resp;
let str = "";
const div = document.querySelector('#main')
req.open('GET', 'https://api.covid19api.com/countries')
console.log('start!!!!!');

function pross() {
    console.log(req.readyState);
    if (req.readyState == 4) {
        resp = JSON.parse(req.response);
        str = ''
        resp.forEach(e => str += `<div id ="hall">${e.Country}</div> `);
    }
    div.innerHTML = str
}
req.onreadystatechange = pross
req.send()
console.log('end!!!!!');