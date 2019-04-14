import _ from 'lodash';
import Print from './print'
function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hedllo', 'webpack'], ' ');
    element.onclick = Print.bind(null, 'Hello webpack!')
    return element;
}

document.body.appendChild(component());

// function getComponent() {
//     return import('lodash').then(({ default: _ }) => {
//         let element = document.createElement('div');

//         element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//         return element;
//     }).catch(err => `an error occurs`)
// }

// getComponent().then(component => {
//     document.body.appendChild(component)
// })