/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(38);


/***/ }),

/***/ 38:
/***/ (function(module, exports) {

var vueForm = new Vue({
    el: '#form',
    data: {
        url: 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10',
        buttonState: 'enabled'
    },
    methods: {
        processXml: function processXml(element) {
            element.preventDefault();

            this.buttonState = 'inprogress';
            productGrid.gridData = [];
            xhr = new XMLHttpRequest();
            xhr.previous_text = '';
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 3) {
                    var newResponse = xhr.responseText.substring(xhr.previous_text.length);
                    newResponse = newResponse.replace(/}{/g, '}},{{');

                    newResponse.split('},{').forEach(function (product) {
                        var parsedProduct = JSON.parse(product);

                        productGrid.gridData.push({
                            productid: parsedProduct.productid,
                            name: parsedProduct.name,
                            description: parsedProduct.description,
                            price: parsedProduct.price,
                            category: parsedProduct.categories,
                            producturl: parsedProduct.producturl,
                            imageurl: parsedProduct.imageurl
                        });
                    });

                    xhr.previous_text = xhr.responseText;
                }
                if (xhr.readyState == 4) {
                    if (xhr.status != 200) {
                        productGrid.gridData = [];
                        vueForm.buttonState = 'enabled';

                        alert('[XHR] Fatal Error.');
                    }

                    var newResponse = xhr.responseText.substring(xhr.previous_text.length);
                    newResponse = newResponse.replace(/}{/g, '}},{{');

                    newResponse.split('},{').forEach(function (product) {
                        var parsedProduct = JSON.parse(product);

                        productGrid.gridData.push({
                            productid: parsedProduct.productid,
                            name: parsedProduct.name,
                            description: parsedProduct.description,
                            price: parsedProduct.price,
                            category: parsedProduct.categories,
                            producturl: parsedProduct.producturl,
                            imageurl: parsedProduct.imageurl
                        });
                    });

                    vueForm.buttonState = 'enabled';
                }
            };

            xhr.open('POST', 'parse-xml-ajax', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('_token=' + csrfToken + '&url=' + encodeURIComponent(this.url));
        }
    },
    watch: {
        url: function url(newUrl) {
            if (!newUrl) {
                this.url = 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10';
            }
        }
    }
});

var productGrid = new Vue({
    el: '#productGrid',
    data: {
        searchQuery: '',
        gridColumns: ['productid', 'name', 'description', 'price', 'category', 'producturl', 'imageurl'],
        gridData: [],
        modalHeader: '',
        modalContent: '',
        showModal: false,
        rowLimit: 100
    },
    filters: {
        truncate: function truncate(str) {
            var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

            return str.substring(0, val) + '...';
        }
    },
    methods: {
        updateModal: function updateModal(key) {
            this.modalHeader = this.gridData[key].name;
            this.modalContent = this.gridData[key].description;
            this.showModal = true;
        }
    }
});

/***/ })

/******/ });