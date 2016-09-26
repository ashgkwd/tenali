# Tenali - A Schema Based Element Generation Library

Tenali simplifies element (HTML, SVG...) generation based on schema (JSON).
You can use it for dynamic form generation. It's faster and more customizable
than "Angular Schema Form" library.

Tenali have zero dependency and you can plug in your favorite template library
such as handlebar, mustache, lodash...

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

## Registering templates

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
	"template": "<label>How many puppies?<input type="number" placeholder="<%= data.placeholder %>"></label>"
}]
```
Good thing about JSON templates is that you can use exact same JSON
as schema. Downside is that as template gets complicated, writing it
in JSON is painful.

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

## Accessing templates using schema

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
	"<label>How many puppies?<input type="number" placeholder="Enter Da Number"></label>",
	"<p>Hello Tenali!</p>",
	"<label>How many puppies?<input type="number" placeholder="Enter Ano Da Number"></label>"
]
*/
```

# License

MIT © Ashish Gaikwad 2016
