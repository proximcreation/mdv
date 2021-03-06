function findOne(j,f,v){
	var r = [];
	for(i in j){
		if (j[i][f] === v){
			return j[i];
		}
	}
}
/**
 * TODO améliorer cette merde !
 * @param j the json
 * @param f the field
 * @param v the value
 * @returns
 */
function updateOne(j,f,v,nf,nv){
	for(i in j){
		if (j[i][f] === v){
			j[i][nf] = nv;
		}
	}
}
function contains(a, obj) {
	var i = a.length;
	while (i--) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}
function union(a, b){
	var result = b.slice();
	for(ai in a){
		if(!contains(result, a[ai])){
			result.push(a[ai]);
		}
	}
	return result.sort();
}
/**
 * src : http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
 * finds the intersection of 
 * two arrays in a simple fashion.  
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *
 *  Should have O(n) operations, where n is 
 *    n = MIN(a.length(), b.length())
 */
function intersect(a, b)
{
	var ai=0, bi=0;
	var result = new Array();
	var sa = a.sort();
	var sb = b.sort();

	while( ai < a.length && bi < b.length ){
		if (a[ai] < b[bi] ){
			ai++;
		}
		else if (a[ai] > b[bi] ){
			bi++;
		}
		else{
			result.push(a[ai]);
			ai++;
			bi++;
		}
	}

	return result;
}

function exclude(a, b)
{
	var ai=0, bi=0;
	var result = new Array();
	var sa = a.sort();
	var sb = b.sort();

	while( ai < a.length && bi < b.length ){
		if (a[ai] < b[bi] ){ 
			result.push(a[ai]);
			ai++;
		}
		else if (a[ai] > b[bi] ){
			result.push(b[bi]);
			bi++;
		}
		else /* they're equal */
		{
			ai++;
			bi++;
		}
	}

	return result;
}


function print_r(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' : {\n";
				dumped_text += dump(value,level+1) + level_padding + "}\n";
			} else {
				dumped_text += level_padding + "'" + item + "' : \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
