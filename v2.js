import Tenali from 'tenali';

/** Tenali.use
* @params {Object} Template Object with following properties
* {Any} component. It can be string or object or function which will be
* returned as template on calling Tenali with schema param
* {String} id. It will used to identify which component to return
* {Function} engine. It is optional param which will be used to compile
* component before returning
*/

const useTemplates = () => {
	Tenali.useFromHTML('#foundation-app-templates', {
		engine: _
	});
}

const init = () => {
	Tenali.use({
		component: TodoList,
		id: "todo-list",
		engine: MyEngineFn
	});

	useTemplates();
}

export const bySchema = (schema) => {
	return Tenali(schema);
}

export const byDefault = () => {
	const defaultSchema = [{
		id: "todo-list", // Uses registered engine
		data: {
			props: {
				hello: "world",
				live: true
			},
			style: {
				color: "red"
			}
		}
	}, {
		id: "text",
		engine: _, // Uses _ instead of registered engine
		data: {
			props: {
				placeholder: "Name",
				onChange: (e) => {console.log(e.target)}
			}
		}
	}, {
		id: "select-range",
		engine: null // Doesn't use registered engine and ignores data property
	}]
}

export const byLead = (lead) => {
	return Tenali([{
		id: "select",
		data: {
			label: "Source Type",
			require: true,
			options: ["Field Capture", "Walk-In", "Phone Enquiry", "Campus"],
			model: "lead.source_type"
		}
	}, {
		id: "text",
		data: {
			label: "Full Name",
			required: true,
			placeholder: "Murali Prasad krishnadevraya",
			model: "lead.name"
		}
	}])
}