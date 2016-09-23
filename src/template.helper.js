module.exports = {
	getById: getTemplateById,
	getSetById: getTemplateSetById
};

function toJSON(html) {
	if(!html || !html.getAttribute) return;

	var input = html.getAttribute("input");
	if(input.charAt(0) == '[' || input.charAt(0) == '{')
		input = JSON.parse(input);

	return {
		input: input,
		variant: html.getAttribute("variant"),
		engine: html.getAttribute("engine"),
		template: html.innerHTML
	}
}

function getTemplateById(id) {
	return toJSON(document.getElementById(id));
}

function getTemplateSetById(id) {
	var cn = document.getElementById(id).childNodes
	return Array.prototype.map.call(cn, function(item) {
		return toJSON(item);
	}).filter(Boolean);
}

