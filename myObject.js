var myObject = {

	foundFunction: false,
	
	create: function(prototypeList){
		var parents = [];
		// Om prototypeList är en array och den inte är null eller tom
		if(Array.isArray(prototypeList) && (prototypeList != null || prototypeList.length == 0)){
			for(var i = 0; i < prototypeList.length; i++){
				// Om objekt och inte array
				if(typeof prototypeList[i] === 'object' && !Array.isArray(prototypeList[i])){
					parents.push(prototypeList[i]);
				}
			}
		}
		var newObject = Object.create(this);
		newObject.parents = parents;
		return newObject;	
	},

	call: function(funcName, parameters){
		this.foundFunction = false;
		if (funcName in this && typeof this[funcName] === "function" ){
			this.foundFunction = true;
			return this[funcName](parameters);
		}

		for (var i=0; i < this.parents.length; ++i){
			var returnValue = this.parents[i].call(funcName, parameters);
			this.foundFunction = this.parents[i].foundFunction;
			if (this.foundFunction){
				return returnValue;
			}
		}
	}
};

