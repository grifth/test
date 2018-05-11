'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.age = exports.name = exports.say = undefined;

var _skills = require('./skills.js');

var _skills2 = _interopRequireDefault(_skills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'ff';
var age = 18;
var say = function say() {
	alert('\u6211\u662F' + name + ', ' + age + '\u5C81');
};

exports.say = say;
exports.name = name;
exports.age = age;
exports.default = say;