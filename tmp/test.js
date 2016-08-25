var myEngine = "LoDash";
var myVariant = "foundation-apps";

function setDefaults(item) {
	var b = item.variant
	item.engine = item.engine || myEngine;
	item.variant = item.variant || myVariant;
	if(b) console.log('VARIANT', b == item.variant, b, item.variant, item.input);
	return item;
}

function strToOption(str) {
	return {value: str, label: str};
}

var mySchema = [{
	input: "select",
	data: {
		label: "Source Type",
		options: ["Field Capture", "Walk In", "Phone Enquery", "Campus"].map(strToOption),
		ngModel: "to.source_type"
	}
}, {
	input: "text",
	data: {
		label: "Full Name",
		placeholder: "Murali Prasad Krishnadevraya",
		ngModel: "to.name"
	}
}, {
	input: "text",
	data: {
		label: "How (s)he heard about us ?",
		placeholder: "Job Fair or Pamplet or Friend",
		ngModel: "to.source"
	}
}, {
	input: "number",
	data: {
		label: "Age",
		placeholder: "24",
		ngModel: "to.age"
	}
}, {
	input: "text",
	data: {
		label: "Location",
		placeholder: "Sanjaynagar, Bangalore",
		ngModel: "to.address"
	}
}, {
	input: "text",
	data: {
		label: "Courses Interested In",
		placeholder: "Electrician, Tally",
		ngModel: "to.coursesinterested"
	}
}, {
	input: "radio",
	data: {
		label: "Is {{lead.name}} Experienced Or Fresher ?",
		options: [{
			label: "Experienced",
			value: true,
			id: "rb-experienced"
		}, {
			label: "Fresher",
			value: false,
			id: "rb-fresher"
		}],
		ngModel: "to.experienced"
	}
}, {
	input: "textarea",
	data: {
		label: "Comments Or Remarks",
		placeholder: "{{lead.name}} is very talented and hard working person",
		ngModel: "to.remarks"
	}
}, {
	input: "select",
	data: {
		label: "Engagement Level",
		options: ["Stranger", "Might Be", "Encourage", "Admitted", "Disqualified", "Invalid"].map(strToOption),
		ngModel: "to.engagement_level"
	}
}] //.map(setDefaults);

// var testT = new Tenali();
// testT.register(myTemplate);
// var myHtmlToTemplate = testT.template.getSetById('fst');
// testT.register(myHtmlToTemplate);
// testT.engine.add(myEngine, _);
// console.log(testT.list(), myHtmlToTemplate);