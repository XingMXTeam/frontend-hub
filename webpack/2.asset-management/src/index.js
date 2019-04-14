import Icon from '../asset/a.jpg';

function component() {
    let element = document.createElement('div');

    let myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)

    return element;
}

document.body.appendChild(component());