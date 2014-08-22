(function($) {
    "use strict";
    
    var Utils = {
        getOffset: function($el, $container) {
            var elOffset = $el.offset(),
                containerOffset = $container.offset(),
                offset = {};
            offset.left = elOffset.left - containerOffset.left;
            offset.top = elOffset.top - containerOffset.top;
            return offset;
        },
        getDateFromString: function(string) {
            if(string != null) {
                var dateArr = string.split("/");
                return new Date(dateArr[2], dateArr[1] - 1, dateArr[0])
            } else {
                return false;
            }
        },
        getUuid: function() {
            var i, random;
            var uuid = "";
            for(i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if(i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += "-";
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }
            return uuid;
        }
    };
    
    var Nevotip = {
        markAsRead: function() {
            var $el = Nevotip.$el,
                id = $el.attr("id"),
                readIds = Nevotip.getLocalReadIds();
            if(readIds) {
                readIds.push(id);
            } else {
                readIds = [id];
            }
            localStorage.NevotipReadIds = readIds;
            Nevotip.destroy();
        },
        getLocalReadIds: function() {
            if(localStorage.NevotipReadIds != null) {
                return localStorage.NevotipReadIds.split(",");
            } else {
                return false;
            }
        },
        destroy: function() {
            //TODO
            Nevotip.$nevotip.fadeOut("fast").remove();
            Nevotip.$el.data("nt-id", "");
        },
        hide: function() {
            //TODO
            Nevotip.$nevotip.fadeOut("fast");
        },
        show: function() {
            // TODO
            Nevotip.$nevotip.fadeIn("fast");
        },
        cleanLocalstorage: function() {
            delete localStorage.NevotipReadIds;
        },
        setDueDate: function() {
            var $el = Nevotip.$el,
                dateStr = $el.data("nt-due-date") != null ? $el.data("nt-due-date") : false;
            Nevotip.dueDate = Utils.getDateFromString(dateStr);
        },
        checkDueDate: function() {
            var date = Nevotip.setDueDate();
            if(!date || (date && new Date() > date)) {
                return true;
            } else {
                return false;
            }
        },
        checkIfIsRead: function() {
            var readIds = Nevotip.getLocalReadIds();
            for(var i in readIds) {
                if(readIds[i] == $el.attr("id")) {
                    return true;
                }
            }
            return false;
        },
        setZindex: function(zIndex, $parent) {
            while(zIndex == "auto" && !$parent.is("body")) {
                zIndex = $parent.css("z-index");
                $parent = $parent.parent();
            }
            if(zIndex != "auto") {
                Nevotip.zIndex = (zIndex + 1);
            }
        }
    };
    
    Nevotip.VERSION = "2.0.0";
    
    Nevotip.DEFAULTS = {
        x: 0,
        y: 0,
        gravity: "s",
        nevotipClass: "",
        container: "auto"
    };
    
    $.fn.nevotip = function(options) {
        var settings = $.extend({}, Nevotip.defaults, options);
        
        return this.each(function() {
            var $el = $(this);
            var containerId = settings.container != "auto" && settings.container != "body" ? "#" + settings.container : false;
            
            Nevotip.$el = $el;
            
            // TODO validar si existe
            Nevotip.nevotipId = Nevotip.$el.data("nt-id");
            
            // TODO validar si existe
            Nevotip.$nevotip = $("#" + nevotipId);
            
            if(options === "destroy") {
                Nevotip.destroy();
                return;
            } else if(options === "clean") {
                Nevotip.cleanLocalstorage();
                return;
            } else if(options === "mark") {
                Nevotip.markAsRead();
                return;
            } else if(options === "show") {
                Nevotip.show();
                return;
            } else if(options === "hide") {
                Nevotip.hide();
                return;
            }
            
            // Check if the date is expired.
            if(Nevotip.checkDueDate()) {
                return;
            }
            
            // Check if the nevotip is mark as read.
            if(Nevotip.checkIfIsRead()) {
                return;
            }
            
            // If the nevotip is instanced then just show it.
            if(Nevotip.nevotipId) {
                Nevotip.show();
                return;
            }
            var $parent = $el.parent(),
                zIndex = $el.css("z-index");
            // Calculate the z-index
            Nevotip.setZindex(zIndex, $parent);
            
            var nevotipId = "nt-" + Utils.getUuid();
            //TODO guardar nevotip-inner
            $el.data("nt-id", nevotipId).addClass("nevotip-inner");
            
            var $nevotip = $("<span/>").attr("id", nevotipId).addClass("nevotip").addClass(settings.nevotipClass);
            
            if(containerId === "auto") {
                $nevotip.wrap($el);
                
                var offset = $nevotip.position();
                
                $nevotip.css({
                    "top": (offset.top - (settings.y)) + "px",
                    "left": (offset.left + (settings.x)) + "px",
                    "z-index": $nevotip.zIndex
                });
            } else if(containerId === "body" || containerId ) {
                var offset = Utils.getOffset($el, $(containerId)),
                	heigth = $el.height(),
                	width = $el.width(); 
                
                $nevotip.addClass("nevotip--external").appendTo("body").css({
                    "top": (offset.top - heigth - (settings.y)) + "px",
                    "left": (offset.left + width + (settings.x)) + "px",
                    "z-index": $nevotip.zIndex                    
                });
            }
            
            $nevotip.on("click", Nevotip.markAsRead);
            //TODO
            //$(".nevotip-inner").on("click", Nevotip.markAsRead);
        });
    };
}(jQuery));