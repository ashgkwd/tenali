var myEngine = "LoDash";
var myVariant = "foundation-apps";

function setDefaults(item) {
	var b = item.variant
	item.engine = item.engine || myEngine;
	item.variant = item.variant || myVariant;
	if(b) console.log('VARIANT', b == item.variant, b, item.variant, item.input);
	return item;
}

// var myTemplate = [{
// 	input: ["text", "password", "datetime", "datetime-local", "date", "month", "time", "week", "number", "email", "url", "search", "tel", "color"],
// 	template: "<label>" +
// 		"<%= data.label %>" +
// 		"<span class='inline-label'>" +
// 		"<% if(data.prefix) { %><span class='form-label'><%= data.prefix %></span><% } %>" +
// 		"<input type='<%= data.type || _meta_.input %>' name='<%= data.name %>' placeholder='<%= data.placeholder %>'>" +
// 		"<% if(data.sufix) { %><span class='form-label'><%= data.sufix %></span><% } %>" +
// 		"</span>" +
// 		"</label>"
// }, {
// 	input: "select",
// 	template: "<label><%= data.label %></label>" +
// 		"<select name='<%= data.name %>'>" +
// 		"<% data.option.forEach(function(op) { %>" +
// 			"<option value='<%= op %>'><%= op %></option>" +
// 		"<% }); %>"
// }].map(setDefaults);

var mySchema = [{
	input: "text",
	data: {
		label: "Username",
		type: "text",
		placeholder: "Thunder Shock"
	}
}, {
	input: "email",
	data: {
		label: "Your Pokemaster Id",
		sufix: "@pokemaster.com",
		type: "email",
		placeholder: "Ash"
	}
}, {
	input: "password",
	data: {
		label: "Password",
		type: "password",
		placeholder: "Awesome!",
		prefix: "Make is hard"
	}
}, {
	input: "select",
	data: {
		label: "Select Any Option",
		option: ["Hello", "Dear", "World"]
	}
}].map(setDefaults);

// var testT = new Tenali();
// testT.register(myTemplate);
// var myHtmlToTemplate = testT.template.getSetById('fst');
// testT.register(myHtmlToTemplate);
// testT.engine.add(myEngine, _);
// console.log(testT.list(), myHtmlToTemplate);