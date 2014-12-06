define(function (require, exports) {
    var TagTypes = {};

    exports.register = function (TagType) {
        return TagTypes[TagType.name] = TagType;
    };

    exports.getTag = function (tagName) {
        tagName = tagName.toLocaleLowerCase();
        return TagTypes[tagName];
    };
});