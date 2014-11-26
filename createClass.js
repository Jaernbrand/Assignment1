function createClass(className, superClassList){
	
	var newClass = { 
	foundFunction : false,
	name : className,
	parents : superClassList
	};

	newClass.new = 
	function(){ return Object.create(this); };
	
	newClass.call = 
	function(funcName, parameters) {
		
		function existsAndCall(object, funcName, parameters){
			object.foundFunction = false;
			if (funcName in object && typeof object[funcName] === "function" ){
				object.foundFunction = true;
				//return this[funcName](parameters);
				var f = object[funcName];
				return f.apply(null, parameters);
			}
		}
		
		for (var i=0; i < this.parents.length; ++i){
			var returnValue = existsAndCall(parents[i], funcName, parameters);
			this.foundFunction = this.parents[i].foundFunction;
			if (this.foundFunction){
				return returnValue;
			}
		}
		
		
	}
	
	
}


