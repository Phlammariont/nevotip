Nevo Tip v.1.0.2
================
A jQuery plugin that shows a tooltip when exist a new feature

How to use?
===========
Include the JS and CSS files:

```html
<script src="js/nevotip.js"></script>
<link href="css/nevotip.css" rel="stylesheet">
```
For display the tooltip by default just:
```javascript
$("element").nevotip();
```
By default the tooltip appends to the body, if you want shows inside a modal dialog instace in this way:
$("element").nevotip({ container: "auto" });

The other options are by default:
```javascript
{
	//x position respect element
	x: 15,
	//y position respect element
	y: 10,
	//container just body or auto
	container: "body",
	//message to show
	message: "New!",
	//personalized class
	nevoClass: "",
	//icon for Mark as read
	asRead: "&nbsp;&times;"
}
```

Methods
=======
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