function createClass(className, superClassList){
	
	var newClass = { 
	foundFunction : false,
	name : className,
	parents : [] 
	};

	//Kollar att superClassList är en array med objekt och att objekten i arrayen inte är "array-objekt", läggs sedan i parents
	if (Array.isArray(superClassList) && (superClassList != null || superClassList.length == 0)){
    	for(var i = 0; i < superClassList.length; i++){
        	if (typeof superClassList[i] === 'object' && !Array.isArray(superClassList[i])){
            	newClass.parents.push(superClassList[i]);
            }
    	}
	}

	//new()
	newClass.new = function(){ return Object.create(this); };	

	//haveFunction()
	newClass.haveFunction = 
	function (funcName, parameters){
				this.foundFunction = false;
				if (funcName in this && typeof this[funcName] === "function" ){
					return true;
				}
	};
	
	//call()
	newClass.call =
	function(funcName, parameters) {
		
		var visited;
		if (Array.isArray(arguments[2])){
			visited = arguments[2];
		} else {
			visited = [];
		}
		
		if(this.haveFunction(funcName, parameters)){ //Kolla om rotobjektet har funktionen
			this.foundFunction = true;
			var f = this[funcName];
			return f.apply(null, parameters); 
		}
		visited.push(this);

		for (var i=0; i < this.parents.length; ++i){
			var returnValue; 
			if (visited.indexOf(this.parents[i]) == -1){ // Kollar om vi besökt en superklass tidigare
				returnValue = this.parents[i].call(funcName, parameters, visited);
			}
			this.foundFunction = this.parents[i].foundFunction; 
			if (this.foundFunction){ // Om vi hittade funktionen hos föräldern så har returnValue fått ett värde
				return returnValue;
			}
		}
	}; // call(funcName, parameters)
	
	return newClass;	
};



