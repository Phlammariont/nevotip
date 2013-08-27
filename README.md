Nevo Tip v.1.0.2
================
A jQuery plugin that shows a tooltip when exist a new feature.


How to use?
-----------
Include the JS and CSS files:

```html
<link href="css/nevotip.css" rel="stylesheet">
<script src="js/nevotip.js"></script>
```
*Remember that is good practice include the CSS in the head and javascript before /body tag

For display the tooltip by default just:
```javascript
$("element").nevotip();
```
By default the tooltip appends to the body, if you want shows inside a modal dialog instace in this way:
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
	//Perzonalized icon for Mark as read, HTML is available
	asRead: "&nbsp;&times;"
}
```

Methods
-------
There are a few methods in order to control the plugin:

```javascript
//Hide the tooltip
$("a").nevotip("hide");

//Shows the tooltip
$("a").nevotip("show");

//Remove the tooltip from the DOM
$("a").nevotip("destroy");

//Mark the tooltip as read in the localStorage
$("a").nevotip("markAsRead");
```
