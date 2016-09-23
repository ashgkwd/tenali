var log = require('./log.helper.js');

module.exports = {
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
							schema: schema
						}
					} else { // No preference for schema.engine, return last one storage has
						return {
							template: lastFromObject(storage[schema.input][schema.variant]),
							schema: schema
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
