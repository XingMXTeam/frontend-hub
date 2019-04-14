(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "dSPy":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return print; });
function print(text) {
    console.log(text);
};

/***/ }),

/***/ "tjUo":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _print__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print */ "dSPy");


function component() {
    let element = document.createElement('div');

    element.innerHTML = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(['Hedllo', 'webpack'], ' ');
    element.onclick = _print__WEBPACK_IMPORTED_MODULE_1__["default"].bind(null, 'Hello webpack!')
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

/***/ })

},[["tjUo","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHJpbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQWU7QUFDZjtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQXVCO0FBQ0k7QUFDM0I7QUFDQTs7QUFFQSx3QkFBd0IsNkNBQUM7QUFDekIsc0JBQXNCLDhDQUFLO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQ0FBc0MsYUFBYTtBQUNuRDs7QUFFQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxDIiwiZmlsZSI6ImFwcC4yOWQwZjZjMWM5YzExNmQ2Njk2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50KHRleHQpIHtcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbn07IiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcmludCBmcm9tICcuL3ByaW50J1xuZnVuY3Rpb24gY29tcG9uZW50KCkge1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlbGVtZW50LmlubmVySFRNTCA9IF8uam9pbihbJ0hlZGxsbycsICd3ZWJwYWNrJ10sICcgJyk7XG4gICAgZWxlbWVudC5vbmNsaWNrID0gUHJpbnQuYmluZChudWxsLCAnSGVsbG8gd2VicGFjayEnKVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTtcblxuLy8gZnVuY3Rpb24gZ2V0Q29tcG9uZW50KCkge1xuLy8gICAgIHJldHVybiBpbXBvcnQoJ2xvZGFzaCcpLnRoZW4oKHsgZGVmYXVsdDogXyB9KSA9PiB7XG4vLyAgICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbi8vICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBfLmpvaW4oWydIZWxsbycsICd3ZWJwYWNrJ10sICcgJyk7XG5cbi8vICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4vLyAgICAgfSkuY2F0Y2goZXJyID0+IGBhbiBlcnJvciBvY2N1cnNgKVxuLy8gfVxuXG4vLyBnZXRDb21wb25lbnQoKS50aGVuKGNvbXBvbmVudCA9PiB7XG4vLyAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQpXG4vLyB9KSJdLCJzb3VyY2VSb290IjoiIn0=