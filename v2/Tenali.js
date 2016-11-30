/**
* @author: Ashish Gaikwad <ash.gkwd@gmail.com>
* @desc: Tenali provides easy way to access UI elements based on schema
* {@link http://github.com/ashgkwd/tenali}
* 
* @constructor
* @param {Object} templateHash
*
templatesHash = {
	"key": <element />,
	"input": <input type="text" />,
	"select": SelectField,
	"custom-func": (data) => `${data.name} hello!`,
	"my-class": class SuperAwesome() { ... }
}
*
*
* @method elements
* @param {Array} schema
*
schema = [{
	"key": "my-class",
	"modelPath": "fullName",
	"data": {
		"name": "Munna Bhai"
	}
}, {
	"key": "any-string-here",
	"modelPath": "optional but recommended"
	"blah": [{"more":"data"}],
	"blah-blah": {"even":{"more":["data"]}}
}]
*
*
* @func bindTo
* @param {Object} model
* @param {String} modelPath
* @param {String} defaultValue
* @return {Function} onChangeHandler(value)
*
*
* @func toJS
* @param {Object} model
* @return {Object} new object with model["k.e.y.s"]=value expanded
* into model.k.e.y.s = value
* It's similar to lodash's .set
*
* @func fromJS
* @param {Object} JS
* @param {Array} modelPaths
* @return new object with JS.k.e.y.s=value converted to JS["k.e.y.s"]=value
* fromJS(toJS({"hello.world": 42})) === {"hello.world": 42}
*
*/

export class Tenali {
	constructor(templatesHash) {
		this.__hash__ = templatesHash;
	}
	
	addTemplates(templatesHash) {
		this.__hash__ = {
			...this.__hash__,
			...templatesHash
		}
	}

	get templates() {
		return this.__hash__;
	}

	elements(schema) {
		return schema.map(s => ({
			"schema": s,
			"element": this.__hash__[s.key]
		}));
	}
}

const tenali = new Tenali({});
export default tenali;

export const bindTo = (model, modelPath, defaultValue = null) => {
	model[modelPath] = defaultValue;
	return (value) => model[modelPath] = value;
}

export const toJS = (model) => {
	return Object.keys(model).reduce((acc, item) => {
		item.split('.').reduce((m, k, i, a) => {
			m[k] = (i+1 == array.length)? model[item] : m[k] || {};
			return m[k];
		}, acc);

		return acc;
	}, {});
}

export const fromJS = (JS, modelPaths) => {
	return modelPaths.reduce((acc, item) => {
		acc[item] = item.split('.').reduce((m, k, i, a) => {
			if(typeof m === 'undefined') return;
			if(typeof m[k] !== 'undefined') return m[k];
		}, JS);

		return acc;
	}, {});
}
