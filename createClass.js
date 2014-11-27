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
		
		if(this.haveFunction(funcName, parameters)){ //Kolla om rotobjektet har funktionen
			var f = this[funcName];
			return f.apply(null, parameters); 
		}
		
		// Rotobjektet läggs i visited (alla vi besökt) och i arrayen currentLevel (leveln vi är på)
		var visited = [this];  //De vi besökt och inte vill besöka igen
		var currentLevel = [this]; //Array med objekt vars parents vi ska söka igenom
		
		var c = 0;
		while(currentLevel.length != 0){ //While currentLevel's not empty
			nextLevel = [ ];
			
			for(var k = 0; k < currentLevel.length; ++k){
					for(var m = 0; m < currentLevel[k].parents.length; ++m){ 
						if (visited.indexOf(currentLevel[k].parents[m]) == -1){ //Om vi inte har vi sätt den förut
							if(currentLevel[k].parents[m].haveFunction(funcName, parameters)){ //Kolla om den har funktionen	
								var f = currentLevel[k].parents[m][funcName];
								return f.apply(null, parameters); //Hittar funktionen och returnerar den
							}
							nextLevel.push(currentLevel[k].parents[m]); //Föräldrarna som ska kollas nästa varv
							visited.push(currentLevel[k].parents[m]); //Läggs till som besökt
						}
					}
			}					
			currentLevel = nextLevel;
		}
	}; // call				
			
	return newClass;	
}


