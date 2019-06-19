// import printMe from './print.js'

// function component() {
//     let element = document.createElement('div');
//     var btn = document.createElement('button');
//     btn.innerHTML = 'Click me and check the console!';
//     btn.onclick = printMe;

//     element.appendChild(btn);
//     return element;
// }
import css from './index.css'

import Icon from '../asset/banner.png';

function component() {
    let element = document.createElement('div');

    let myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)

    return element;
}

document.body.appendChild(component());