import _ from 'lodash';

function component() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

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