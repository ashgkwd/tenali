var storageHelper = require('./storage.helper.js');
var engineHelper = new require('./engine.helper.js')();
var templateHelper = require('./template.helper.js');

/** Represents a Tenali - a schema based element generation library
* @constructor
* @exports
*/

module.exports = function Tenali() {
	this.storage = {}; // In memory key:value store

	return {
		register: registerNewTemplateSet.bind(this),
		get: getElement.bind(this),
		list: listOfRegisteredSets.bind(this),
		engine: {
			add: addEngine.bind(this)
		},
		template: {
			getById: templateHelper.getById,
			getSetById: templateHelper.getSetById
		}
	}

	/** Registers templates in storage
	*
	* @param {Array} templates
	* Format: [{input: <type>, variant: <style>, engine: <templating library>, template: <template>}, ...]
	*
	* <type>:string or array which represents type attribute of input element or a custom element type.
	* <style>:string which represents which template to return for given input type.
	* <templating library>:string which is a name of templating library. It will be used to eveluate template.
	* <template>:string which can be HTML, SVG, JSON or any other text based format.
	*
	* Examples of <type>:
	* "text", ["checkbox", "select"], "switch" (eg. foundation switch componet), "datepicker" (eg. bootstrap datepicker)
	* Examples of <style>:
	* "ionic.floating-label", "bootstrap.inline", "foundation-app.title-bar.dark"
	* Eaxmples of <templating library>:
	* "LoDash", "Handlebars", "Mustache"
	* Examples of <template>:
	* "<ul class='awesome-list'><li class='incrediable-item' ng-repeat='u in users'> {{u.name}} </li></ul>"
	*/

	function registerNewTemplateSet(templates) {
		templates.forEach(storageHelper.storeTemplate(this.storage));
	}

	/** Returns template string as per schema
	* @param {Array} schema
	* @return {String}
	* Format: [{input: <input type>, variant: <template style>, engine: <templating library>, options: {<variable>: <value>}}]
	*
	* <input type>:string which represents type attribute of input element or a custom element type.
	* <template style>:string which represents which template to return for given input type.
	* <templating library>:string which is a name of templating library. It will be used to eveluate template.
	*
	* All <variable>s will be replaced by their value in the template using templating engine specified.
	* `options` are passed as it is to the templating engine along with template.
	* Examples:
	* [{input: "radio", options: {label: "Are You Ecprienced Developer?", "ng-change": "handleChange()"}}]
	* [{input: "switch", engine: "LoDash", options: {"ng-click": "handleSwitchChange(s)"}}]
	* [{input: "button-group", variant: "ionic", options: {buttons: [{text: "OK", "ng-click": "handleOk()"}, {text: "CANCEL", "ng-model": "close()"}]}}]
	*/

	function getElement(schema) {
		return schema
			.map(storageHelper.fetchTemplate(this.storage))
			.filter(Boolean)
			.map(engineHelper.compile);
	}

	/** Returns storage
	* @return {Object} storage
	*/

	function listOfRegisteredSets() {
		return this.storage;
	}

	/** registers a templating library
	* @param {String} name which will be used in schema
	* @param {Object} engine - a reference to Object of templating library. It must have .template(string)(values) interface
	* engine's .template function takes a string as template and returns a function which will
	* take values object as a parameter and return a compiled template.
	* @see LoDash's _.template function
	*/

	function addEngine(name, engine) {
		engineHelper.register(name, engine);
	}
}