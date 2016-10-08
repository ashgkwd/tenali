import Tenali from 'tenali';

const getTemplates = () => {
	Tenali.use(Server.getTemplates('all'), {
		engine: _
	});
}

const init = () => {
	Tenali.use({
		component: TodoList,
		id: "todo-list",
		engine: "none"
	});

	getTemplates();
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