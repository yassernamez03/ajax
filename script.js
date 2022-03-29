const ctx = document.getElementById('mychart').getContext('2d');
let req = new XMLHttpRequest();
let resp;;
let str = "";
let data = '';
var xValues = [];
let actives = [];
let deaths = [];
let confirmed = [];
let recovered = [];
const div = document.querySelector('#main');
req.open('GET', 'https://api.covid19api.com/countries');
req.send();
req.onreadystatechange = pross;
console.log('start!!!!!');

function showData() {
    let obj = {
        type: 'bar',
        data: {
            labels: xValues,
            datasets: [{
                    label: 'deaths',
                    data: deaths,
                    backgroundColor: 'black',
                    margin: 0
                },
                {
                    label: 'active',
                    data: actives,
                    backgroundColor: 'darkblue',
                    margin: 0
                },
                {
                    label: 'recovered',
                    data: recovered,
                    backgroundColor: 'green',
                    margin: 0
                },
                {
                    label: 'confirmed',
                    data: confirmed,
                    backgroundColor: 'red',
                    margin: 0
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    let myChart = new Chart(ctx, obj);
}

function getdata(e) {
    let dt = new XMLHttpRequest()
    let url = `https://api.covid19api.com/dayone/country/${e.target.getAttribute("id")}`
    dt.open('GET', url)
    dt.send()

    function dtt() {
        console.log(url)
        if (dt.readyState == 4 && dt.status == 200) {
            xValues = []
            actives = []
            data = JSON.parse(dt.response);
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                xValues.push(i.toString())
                actives.push(data[i].Active)
                deaths.push(data[i].Deaths)
                confirmed.push(data[i].Confirmed)
                recovered.push(data[i].Recovered)
            }
            showData()
        }
    }

    dt.onreadystatechange = dtt
}

function pross() {
    console.log(req.readyState);
    if (req.readyState == 4) {
        resp = JSON.parse(req.response);
        str = ''
        resp.forEach(e => str += `<div id='${e.ISO2}' class ="hall">${e.Country}</div> `);
        div.innerHTML = str
        const count = document.querySelectorAll('.hall')
        count.forEach(e => {
            e.addEventListener('click', getdata);
        });
    }
}

console.log('end!!!!!');