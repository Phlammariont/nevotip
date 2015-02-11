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
            if(string != null && string) {
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
        },
        setElementId: function() {
            // TODO
        }
    };
    var Nevotip = {
        markAsRead: function() {
            if(Nevotip.id) {
                var $el = Nevotip.$el,
                    id = Nevotip.elementId,
                    readIds = Nevotip.getLocalReadIds();
                if(readIds) {
                    readIds.push(id);
                } else {
                    readIds = [id];
                }
                localStorage.NevotipReadIds = readIds;
                Nevotip.destroy();
            }
        },
        getLocalReadIds: function() {
            if(localStorage.NevotipReadIds != null) {
                return localStorage.NevotipReadIds.split(",");
            } else {
                return false;
            }
        },
        destroy: function() {
            if(Nevotip.id) {
                Nevotip.hide();
                if(Nevotip.$el.data("nt-container-auto")) {
                    Nevotip.$el.unwrap();
                } else {
                    Nevotip.$nevotip.remove();
                }
                Nevotip.$el.removeData("nt-id nt-classes nt-container-auto");
            }
        },
        hide: function() {
            if(Nevotip.id) {
                Nevotip.$nevotip.removeClass(Nevotip.classes);
            }
        },
        show: function() {
            if(Nevotip.id) {
                Nevotip.$nevotip.addClass(Nevotip.classes);
                if(!Nevotip.$el.hasClass("nevotip-inner")) {
                    Nevotip.$el.addClass("nevotip-inner");
                }
            }
        },
        cleanLocalstorage: function() {
            delete localStorage.NevotipReadIds;
        },
        setDueDate: function() {
            var $el = Nevotip.$el,
                dateStr = $el.data("nt-due-date") != null ? $el.data("nt-due-date") : false;
            return Utils.getDateFromString(dateStr);
        },
        checkDueDate: function() {
            var date = Nevotip.setDueDate();
            if(!date || (new Date() > date)) {
                return true;
            } else {
                return false;
            }
        },
        checkIfIsRead: function() {
            var readIds = Nevotip.getLocalReadIds();
            for(var i in readIds) {
                if(readIds[i] == Nevotip.elementId) {
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
    Nevotip.VERSION = "1.2.0";
    Nevotip.DEFAULTS = {
        x: 0,
        y: 0,
        gravity: "s",
        nevotipClass: "",
        container: "auto"
    };
    $.fn.nevotip = function(options) {
        var settings = $.extend({}, Nevotip.DEFAULTS, options);
        return this.each(function() {
            var $el = $(this);
            var containerId = settings.container != "auto" && settings.container != "body" ? "#" + settings.container : settings.container;
            Nevotip.$el = $el;
            Nevotip.elementId = Utils.setElementId($el);
            Nevotip.id = Nevotip.$el.data("nt-id");
            if(Nevotip.id) {
                Nevotip.$nevotip = $("#" + Nevotip.id);
                Nevotip.classes = Nevotip.$el.data("nt-classes");
            }
            if(options === "destroy") {
                Nevotip.destroy();
                return;
            } else if(options === "clean") {
                Nevotip.cleanLocalstorage();
                return;
            } else if(options === "close") {
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
            if(Nevotip.id) {
                Nevotip.show();
                return;
            }
            // Calculate the z-index
            Nevotip.setZindex($el.css("z-index"), $el.parent());
            // Save the id
            var nevotipId = "nt-" + Utils.getUuid();
            $el.data("nt-id", nevotipId).addClass("nevotip-inner");
            // Set the default classes
            if($el.css("display") === "block") {
                settings.nevotipClass = settings.nevotipClass + " nevotip--block"
            }
            var $nevotip = $("<span/>").attr("id", nevotipId).addClass("nevotip").addClass(settings.nevotipClass);
            if(containerId === "auto") {
                $el.data("nt-container-auto", true);
                $el.wrap($nevotip);
            } else if(containerId === "body" || containerId) {
                var offset = Utils.getOffset($el, $(containerId)),
                    heigth = $el.height(),
                    width = $el.width();
                $nevotip.addClass("nevotip--external").appendTo(containerId).css({
                    "top": (offset.top - heigth - (settings.y)) + "px",
                    "left": (offset.left + width + (settings.x)) + "px",
                    "z-index": $nevotip.zIndex,
                    "position": "absolute"
                });
            }
            //Save the current classes
            $el.data("nt-classes", $nevotip.attr("class"));
            $nevotip.on("click", Nevotip.markAsRead);
            $nevotip.find(".nevotip-inner").on("click", Nevotip.markAsRead);
        });
    };
}(jQuery));