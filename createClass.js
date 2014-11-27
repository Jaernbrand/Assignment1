function createClass(className, superClassList){
	
	var newClass = { 
	foundFunction : false,
	name : className,
	parents : superClassList
	};

	newClass.new = function(){ return Object.create(this); };
	
	newClass.call = function(funcName, parameters) {
		function existsAndCall(object, funcName, parameters){
			object.foundFunction = false;

			document.write("KODEN HÄR KÖRS!!!<br>");

			if (funcName in object && typeof object[funcName] === "function" ){
				object.foundFunction = true;
				//return this[funcName](parameters);
				var f = object[funcName];
				return f.apply(null, parameters);
			}
		}
		
		this.foundFunction = false;
		var returnValue = existsAndCall(this, funcName, parameters);

		var allParents = this.parents;
		document.write("allParents before loop: " + allParents + "<br>");
		for (var k=0; k < allParents.length && this.foundFunction === true; ++k){
			//allParents.concat(this.parents[k].parents);
			allParents.push(allParents[k].parents);
			
			returnValue = existsAndCall(allParents[k], funcName, parameters);
			this.foundFunction = allParents[k].foundFunction;
		}
		document.write("allParents after loop: " + allParents + "<br>");
		
	/*		
		for (var i=0; i < this.parents.length; ++i){
			var returnValue = existsAndCall(parents[i], funcName, parameters);
			this.foundFunction = this.parents[i].foundFunction;
			if (this.foundFunction){
				return returnValue;
			}
		}
	*/	
		return returnValue;
		
	}; // call
	
	return newClass;	
}


