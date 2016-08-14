/** 
* @author Ashish Gaikwad <ash.gkwd@gmail.com>
* @license MIT
* @version 0.0.1
* @desc Tenali is form element generating library based on JSON schema
* {@link http://github.com/ashgkwd/tenali}
*/

Tenali._logHelper = function(level, label, message) {
	switch(level) {
		case 'e': console.error(label, message);
		case 'w': console.warn(label, message);
		case 'i': console.info(label, message);
		case 'd': console.debug(label, message);
		default: console.info(label, message);
	}
}

Tenali._storageHelper = function() {
	var log = Tenali._logHelper;
	return {
		storeTemplate: storeTemplate,
		fetchTemplate: fetchTemplate
	}

	function lastFromObject(hash) {
		return hash[Object.keys(hash).pop()];
	}

	function handleStorageHierarchy(storage, template) {
		var engineTemplate = {};
		engineTemplate[template.engine.toLowerCase()] = template.template;

		var variantET = {};
		variantET[template.variant] = engineTemplate;

		return function(input) {
			if (storage[input]) {
				storage[input][template.variant] = engineTemplate;
			} else {
				storage[input] = variantET;
			}
		}
	}

	function storeTemplate(storage) {
		return function(template) {
			if (typeof template.input === 'string') {
				[template.input].forEach(handleStorageHierarchy(storage, template));
			} else {
				template.input.forEach(handleStorageHierarchy(storage, template));
			}
		}
	}

	function fetchTemplate(storage) {
		return function(schema) {
			if(storage[schema.input]) {
				if(schema.variant && storage[schema.input][schema.variant]) {
					if (schema.engine) { // If schema.engine is specified but storage doesn't have it, then it must return undefined
						return {
							template: storage[schema.input][schema.variant][schema.engine.toLowerCase()],
							engine: schema.engine,
							options: schema.options
						}
					} else { // No preference for schema.engine, return last one storage has
						return {
							template: lastFromObject(storage[schema.input][schema.variant]),
							options: schema.options
						}
					}
				} else {
					if(!schema.variant) log('e', 'fetchTemplate', 'Schema Must Specify A Variant');
					else log('e', 'fetchTemplate', 'Specified Variant Is Not Registered: ' + schema.variant);
				}
			} else {
				if(!schema.input) log('e', 'fetchTemplate', 'Schema Must Specify Input Type');
				else log('e', 'fetchTemplate', 'Specified Input Type Is Not Registered: ' + schema.input)
			}
		}
	}
}

Tenali._engineHelper = function() {
	this.engineStorage = {} // stores reference to templating library
	var log = Tenali._logHelper();

	return {
		compile: compileUsingEngine.bind(this),
		register: registerNewTemplateEngine.bind(this)
	}

	function compileUsingEngine(options) {
		// Handlebars .compile
		// Mustache function()
		if(!options.engine || options.engine == "none") return;
		if(this.engineStorage[options.engine]) {
			return this.engineStorage[options.engine].template(options.template)(options.options);
		} else {
			log('e', 'compileUsingEngine', 'Engine Is Not Known: ' + options.engine + ' Please Register The Engine!');
		}
	}

	function registerNewTemplateEngine(name, engine) {
		this.engineStorage[name] = engine;
	}
}

/** Represents a Tenali - a schema based element generation library
* @constructor
* @exports
*/

function Tenali() {
	this.storage = {}; // In memory key:value store
	var helper = Tenali._storageHelper();
	var engineHelper = new Tenali._engineHelper();

	return {
		engine: {
			add: addEngine.bind(this)
		},
		register: registerNewTemplateSet.bind(this),
		get: getElement.bind(this),
		list: listOfRegisteredSets.bind(this)
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
		templates.forEach(helper.storeTemplate(this.storage));
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
			.map(helper.fetchTemplate(this.storage))
			.filter(Boolean)
			.map(engineHelper.compile);
	}

	/** Returns storage
	* @return {Object} storage
	*/

	function listOfRegisteredSets() {
		return this.storage;
	}

	function addEngine(name, engine) {
		engineHelper.register(name, engine);
	}
}
