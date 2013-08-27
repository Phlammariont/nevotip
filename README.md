NevoTip v1.0.2
================
A jQuery plugin that shows a tooltip when exist a new feature.


How to use?
-----------
Include the JS and CSS files:

```html
<link href="css/nevotip.css" rel="stylesheet">
<script src="js/nevotip.js"></script>
```
\*Remember that is good practice include the CSS in the head and the Javascript before **\</ body\>**.

For use the plugin just code:
```javascript
$("element").nevotip();
```
By default the tooltip appends to the body. If you want to show it inside of a modal dialog, instance it in this way:
```javascript
$("element").nevotip({ container: "auto" });
```

The options by default are:
```javascript
{
	//x position respect to the element
	x: 15,
	//y position respect to the element
	y: 10,
	//Message to shows, HTML is not available
	message: "New!",
	//Personalized class
	nevoClass: "",
	//Perzonalized icon for mark as read, HTML is available
	asRead: "&nbsp;&times;"
}
```

Methods
-------
There are a few methods for take control of the plugin:

```javascript
//Hides the tooltip
$("element").nevotip("hide");

//Shows the tooltip
$("element").nevotip("show");

//Removes the tooltip from the DOM
$("element").nevotip("destroy");

//Marks the tooltip as read, putting the id element in the localStorage
$("element").nevotip("markAsRead");
```
