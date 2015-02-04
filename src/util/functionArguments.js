define({
	getArray: function getArray(args) {
		var a;
		if (args[0] && args[0].constructor === Array) {
			a = args[0]
		} else {
			a = args;
		}
		var ret = [];
		for (var i = 0; i < a.length; ++i) {
			ret.push(a[i]);
		}
		return ret;
	}
});