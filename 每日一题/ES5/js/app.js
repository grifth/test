'use strict';

var _module = require('./module-1');

var _module2 = _interopRequireDefault(_module);

var _module3 = require('./module-2');

var _module4 = _interopRequireDefault(_module3);

require('../css/main.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _module2.default)();
console.log('fuck webpack');
(0, _module4.default)();