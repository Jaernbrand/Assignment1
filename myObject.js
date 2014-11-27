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
	}, // create(prototypeList)

	call: function(funcName, parameters){
		var visited;
		if (Array.isArray(arguments[2])){
			visited = arguments[2];
		} else {
			visited = [];
		}

		visited.push(this);
		this.foundFunction = false;
		if (funcName in this && typeof this[funcName] === "function" ){
			this.foundFunction = true;
			var f = this[funcName];
			return f.apply(null, parameters);
		}

		for (var i=0; i < this.parents.length; ++i){
			var returnValue; 
			if (visited.indexOf(this.parents[i]) == -1){ // Kollar om vi besökt en superklass tidigare
				returnValue = this.parents[i].call(funcName, parameters, visited);
			}
			this.foundFunction = this.parents[i].foundFunction;
			if (this.foundFunction){
				return returnValue;
			}
		}
	} // call(funcName, parameters)
};

