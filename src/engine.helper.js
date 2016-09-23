var log = require('./log.helper.js');

module.exports = function EngineHelper() {
	this.engineStorage = {} // stores reference to templating library

	return {
		compile: compileUsingEngine.bind(this),
		register: registerNewTemplateEngine.bind(this)
	}

	function compileUsingEngine(template_and_schema) {
		var schema = template_and_schema.schema;
		var template = template_and_schema.template;

		if(!schema.engine || schema.engine == "none") return template;

		var engineLib = this.engineStorage[schema.engine.toLowerCase()];
		if(engineLib) {
			return engineLib.template(template)({
				_meta_: schema,
				data: schema.data
			});
		} else {
			log('e', 'compileUsingEngine', 'Engine Is Not Known: ' + schema.engine + ' Please Register The Engine!');
		}
	}

	function registerNewTemplateEngine(name, engine) {
		this.engineStorage[name.toLowerCase()] = engine;
	}
}
