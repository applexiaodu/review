jQuery.fn.extend({
    get: function(num) {
        return this[num];
    },
    each: function(fn) {
        for(var i = 0; i<this.length; i++) {
            fn(i, this[i])
        }
        return this; // 支持链式
    },
    css: function() {
        var l = arguments.lengthl
        if (l === 1) {
            return this[0].style[arguments[0]];
        } else {
            var name = arguments[0];
            var value = arguments[1];
            this.each(function(index, ele) {
                ele.style[name] = value;
            })
        }
        return this; // 支持链式
    }
})