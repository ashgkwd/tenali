# Tenali - A Schema Based Element Generation Library

Tenali simplifies element (HTML, SVG...) generation based on schema (JSON). You can use it for dynamic form generation. It's faster and more customizable than "Angular Schema Form" library.

Tenali have zero dependency and you can plug in your favorite template library such as handlebar, mustache, lodash...

# Install Tenali

```bash
npm i -S tenali
bower install tenali --save
```

Or you can direct download ZIP or TAR.GZ file form GitHub.

# Configure Tenali

Tenali needs two things in order to work.
 - templates
 - schema

Also if you are using templating library, then you need to tell tenali about it. Library must have `.template(string)` interface which gives function which will take data as parameter. This interface is like [_.template](https://lodash.com/docs)

# Registering templates

You can register template either using JSON or HTML. Template should
have following attributes:
 - `input`
 - `variant`
 - `engine`
 - `template`

Example of templates using JSON:
```javascript
var myTemplate = [{
	"input": "my-elem",
	"variant": "basic",
	"engine": "none",
	"template": "<p>Hello Tenali!</p>"
}, {
	"input": "my-elem",
	"variant": "advanced",
	"engine": "LoDash",
	"template": "<p>Hello <%= data.name %></p>"
}, {
	"input": "number",
	"variant": "foundation",
	"engine": "LoDash",
	"template": "<label>How many puppies?<input type='number' placeholder='<%= data.placeholder %>'></label>"
}]
```
Good thing about JSON templates is that you can use exact same JSON as schema. Downside is that as template gets complicated, writing it in JSON is painful.

HTML templates can make life easy. Here is example of HTML template:
```html
<script type="text/template" input="number" variant="foundation" engine="LoDash">
	<div class="input-group">
		<span class="input-group-label">$</span>
		<input class="input-group-field" type="number" placeholder="<%= data.placeholder %>">
		<div class="input-group-button">
			<input type="submit" class="button" value="<%= data.buttonLabel %>">
		</div>
	</div>
</script>
```

You can register template using `register` method.
```javascript
var tenali = new Tenali();
tenali.register(myTemplate);
```

# Registering templating engine (library)

You can register any templating library as engine in tenali, so that your templates will be compiled using this library. Here is example of registering LoDash as templating engine:
```javascript
var tenali = new Tenali();
tenali.engine.add("LoDash", _); // Assuming _ is available
```

You can create your own templating library and register it with tenali as long as it provides interface similar to lodash's `_.template` function.

# Accessing templates using schema

Once templates are registered, you can access then based on JSON schema.
Schema should have following attributes:
 - `input`
 - `variant`
 - `engine`
 - `options`

Here is example of schema:
```
var mySchema = [{
	"input": "text",
	"variant": "foundation",
	"engine": "LoDash",
	"options": { "placeholder": "Enter Da Number" }
}, {
	"input": "my-elem",
	"variant": "basic"
	"engine": "none"
}, {
	"input": "text",
	"variant": "foundation",
	"engine": "LoDash",
	"options": { "placeholder": "Enter Ano Da Number" }
}]
```

To get templates based on above schema, we will use `get` methos
```javascript
tenali.get(mySchema);

/* returns an array of template strings
[
	"<label>How many puppies?<input type='number' placeholder='Enter Da Number'></label>",
	"<p>Hello Tenali!</p>",
	"<label>How many puppies?<input type='number' placeholder='Enter Ano Da Number'></label>"
]
*/
```

# Angular Tenali

Angular Tenali provides `tenaliCompiler` service and `<tenali-form>` directive. You can use Angular Tenali by linking file `angular-tenali.js` in your project. Your app can use Angular Tenali module by mentioning `Tenali` as module dependency.

```javascript
var app = andular.module('myApp', ['Tenali']);
```

You can register templates and engines in your app's `config` function using `tenaliCompiler`'s `engine.add` and `register` methods.

 ```javascript
app.config(configFn);

configFn.$inject = ['tenaliCompiler'];
function configFn(tenaliCompiler) {
	tenaliCompiler.engine.add("LoDash", _);

	// for templates set HTML example, see `template-samples/foundation-apps.html` file.
	var templates = tenaliCompiler.template.getSetById('foundation-apps-tenali');
	tenaliCompiler.register(templates);
}
```

In your angular templates, you can use `<tenali-form>` directive as follows:

```html
<tenali-form from="schema" for="foundation-apps" using="LoDash" to="myModel">
	<p> Anything inside will be come last element. After all elements in `schema` </p>
</tenali-form>
```

# License

MIT © Ashish Gaikwad 2016
