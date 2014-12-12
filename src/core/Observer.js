define(function (require, exports) {

    exports.observerHTMLElement = function (object, callback) {
        var observer = new MutationObserver(callback);
        observer.observe(
            object,
            {
                attributes: true, 
                childList: true, 
                subtree : true,
                characterData: true
            }
        );
    };

    exports.watch = function (object, callback) {
        var proxy = new Proxy(
            object,
            {
                get: function () {

                },
                set: function () {
                    
                }
            }
        );
    };

    exports.observe = function (object, callback) {
        if (object instanceof HTMLElement) {
            exports.observerHTMLElement(object, callback);
        } else {
            Object.observe(object, callback);
        }
    };
});
