var myObject = {
	var parents = [ ]; 
	
	create: function(prototypeList){
	parents = [];
	// Om prototypeList är en array och den inte är null eller tom
	if(Array.isArray(prototypeList) && (prototypeList != null || prototypeList.length == 0)){
			for(i = 0; i < prototypeList.length; i++){
				// Om objekt och inte array
				if(typeof prototypeList[i] === 'object' && !Array.isArray(prototypeList[i])){
					parents.push(prototypeList[i]);
				}
			}
		}
	}	
	return object.create(this);	
	},

	call: function(funcName, parameters){
		
	}
};
