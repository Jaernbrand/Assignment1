function createClass(className, superClassList){
	
	var newClass = { 
	foundFunction : false,
	name : className,
	parents : superClassList
	};

	newClass.new = function(){ return Object.create(this); };
	

	newClass.haveFunction = 
	function (funcName, parameters){
				this.foundFunction = false;
				if (funcName in this && typeof this[funcName] === "function" ){
					return true;
				}
	};
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//call()
	newClass.call =
	function(funcName, parameters) {
		
		if(this.haveFunction(funcName, parameters)){ //Kolla om Rotobjektet har funktionen
			var f = this[funcName];
			return f.apply(null, parameters); 
		}
		
		// Rotobjektet läggs i visited(alla vi besökt) och i arrayen currentLevel, leveln vi är på..
		var visited = [ this]; 
		var currentLevel = [this]; //array med objekt vars parents vi ska söka igenom

		while(currentLevel.length != 0){ //While currentLevel's not empty
			nextLevel = [ ];
			
			for(var k = 0; k < currentLevel.length; ++k){
					for(var m = 0; m < currentLevel[k].parents.length; ++m){
						if( !visited in currentLevel[k].parents[m] ){ //om vi inte har vi sätt den förut " ! "
							if(currentLevel[k].parents[m].haveFunction(funcName, parameters)){ //Kolla om den har funktionen
								var f = currentLevel[k].parents[m][funcName];
								return f.apply(null, parameters); //Hittar funktionen och returnerar den..
							}
							nextLevel.push(currentLevel[k].parents[m]); //Föräldrarna som ska kollas nästa varv..
							visited.push(currentLevel[k].parents[m]);
						}
					}
			}					
			currentLevel = nextLevel; //Fel om det kopieras...vilket det förmodligen görs..
		}
	};				
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------------------			
	
	return newClass;	
}


