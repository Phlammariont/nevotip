Nevo Tip 0.2.0
================
A jQuery plugin that shows a tooltip when exist a new feature.


How to use?
-----------
Include the JS and CSS files:

```html
<link href="css/nevotip.css" rel="stylesheet">
<script src="js/nevotip.js"></script>
```
Remember that is good practice include the CSS before the **\</ head\>** and the Javascript before **\</ body\>**.*

Set a due date if you want to expired the tooltip:
```html
<!-- You can use the data-due-date for set a due date -->
<a id="nevo" class="nevotip" data-nevo-due-date="dd/mm/aaaa" />
```
For use the plugin just code:
```javascript
$("#nevotip").nevotip();
```
In order to that Nevo Tip works fine is necessary that all elements have a unique id.

By default the tooltip appends to the body. If you want to show it inside of a modal dialog, instance it in this way:
```javascript
$("#nevotip").nevotip({ container: "auto" });
```
Also you can put the **id** of any parent container of the element:
```javascript
$("#nevotip").nevotip({ container: "myModalDialog" });
```

The options by default are:
```javascript
{
	//x position respect to the element
	x: 15,
	//y position respect to the element
	y: 10,
	//The container of the nevotip
	container: "body",
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
$("#nevotip").nevotip("hide");

//Shows the tooltip
$("#nevotip").nevotip("show");

//Removes the tooltip from the DOM
$("#nevotip").nevotip("destroy");

//Marks the tooltip as read, putting the id element in the localStorage
$("#nevotip").nevotip("markAsRead");
```
