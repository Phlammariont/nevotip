/*!
 * Nevo Tip v1.0.2 by @Garethderioth
 * https://github.com/Garethderioth/nevotip 
 */

(function( $ ) {
	$.fn.nevotip = function( options ) {
		var defaults = {
			x: 15,
			y: 10,
			container: "body",
			message: "New!",
			nevoClass: "",
			asRead: "&nbsp;&times;"
		};
		
		var settings = $.extend( {}, defaults, options );
		
		function markAsRead($el) {
			var nevoReadIds = localStorage.nevoReadIds != null ? localStorage.nevoReadIds.split(",") : false;
			
			if ( nevoReadIds ) {
				nevoReadIds.push($el.attr("id"));
			} else {
				nevoReadIds = [$el.attr("id")];
			}
			//Almacenamos el id del elemento en localStorage
			localStorage.nevoReadIds = nevoReadIds;
			
			//Lo destruimos
			$("#" + $el.data("nevo-id")).fadeOut("fast").remove();
			$el.data("nevo-id", "");
		}
		
		return this.each(function( i, el ) {
			var $el = $(el),
				$parent = $el.parent(),
				offset = settings.container == "auto" ? $el.position() : $el.offset(),
				heigth = $el.height(),
				width = $el.width(),
				zIndex = $el.css("z-index"),
				dateArray = $el.data("nevo-due-date") != null ? $el.data("nevo-due-date").split("/") : false,
				dueDate = dateArray != false ? new Date(dateArray[2], dateArray[1] - 1, dateArray[0]) : false,
				readIds = localStorage.nevoReadIds != null ? localStorage.nevoReadIds.split(",") : false;

			if ( options == "destroy" ) {
				//Eliminamos el nevotip y su relacion
				$("#" + $el.data("nevo-id")).remove();
				$el.data("nevo-id", "");
				
			} else if ( options == "hide" ) {
				$("#" + $el.data("nevo-id")).hide();
			} else if ( options == "show" ){
				$("#" + $el.data("nevo-id")).show();
			} else if ( options == "markAsRead" ) {
				 markAsRead($el);
			} else {
				//Si la fecha esta vencida salimos
				if ( dueDate && new Date() > dueDate ) {
						return;
				}
				
				//Si el elemento ya esta leido salimos
				for( var i in readIds ) {
					if( readIds[i] == $el.attr("id") ) {
						return;
					}
				}

				//Si el elemento ya esta instanciado lo mostramos y nos salimos
				if ( $el.data("nevo-id") ) {
					$("#" + $el.data("nevo-id")).show();
					return;
				}
				
				//Buscamos un valor de z-index diferente de auto.
				while ( zIndex == "auto" && !$parent.is("body") ) {
					zIndex = $parent.css("z-index");
					$parent = $parent.parent();
				}
				
				//Establecemos el valor del z-index mayor a su contenedor
				if ( zIndex != "auto" ) {
					zIndex = ( zIndex + 1 );
				}

				//Generamos el id temporal
				var nevoId = new Date().getTime();
				$el.data("nevo-id", "nevotip_" + nevoId);
				
				$nevoTip = $("<div />").attr("id", "nevotip_" + nevoId).addClass("nevo-tip").addClass(settings.nevoClass).appendTo( settings.container == "auto" ? $el.parent() : settings.container ).css({ "top": ( offset.top - heigth - ( settings.y ) ) + "px", "left": ( offset.left + width - ( settings.x ) ) + "px", "z-index": zIndex }).text(settings.message).append("<span class='nevo-mark-as-read' />");
				$nevoTip.children(".nevo-mark-as-read").append(settings.asRead);
				
				$nevoTip.off("click").on("click", function() {
					 markAsRead($el);
				});
			}
		});
	};
}( jQuery ));