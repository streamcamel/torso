export function pathToCommand(path) {
    if(path !== undefined && path !== '') {
        let tokens = path.split('/');
        return tokens[1]

    }
    return '';
}

export function pathToSlug(path) {
    if(path !== undefined && path !== '') {
        let tokens = path.split('/');
        return tokens[2]

    }
    return '';
}

/* Parse QueryString using String Splitting */
export function parseQueryStringToDictionary(queryString) {
    var dictionary = {};
    
    if(queryString === undefined || queryString === '') {
        return dictionary;
    }
	
	// remove the '?' from the beginning of the
	// if it exists
	if (queryString.indexOf('?') === 0) {
		queryString = queryString.substr(1);
	}
	
	// Step 1: separate out each key/value pair
	var parts = queryString.split('&');
	
	for(var i = 0; i < parts.length; i++) {
		var p = parts[i];

        // Step 2: Split Key/Value pair
		var keyValuePair = p.split('=');
		
		// Step 3: Add Key/Value pair to Dictionary object
		var key = keyValuePair[0];
		var value = keyValuePair[1];
				
		dictionary[key] = value;
	}
	
	// Step 4: Return Dictionary Object
	return dictionary;
}

export function joinQueryDictionary(dictionary) {
    let res = '';

    for(var k in dictionary) {
        if(res === '') {
            res += '?' + k + '=' + dictionary[k];
        } else {
            res += '&' + k + '=' + dictionary[k];
        }
    }
    return res;
}

export function URLSearchAddQuery(queryString, newQueryKey, newQueryValue) {
    let queries = parseQueryStringToDictionary(queryString);
    
    queries[newQueryKey] = newQueryValue;

    return joinQueryDictionary(queries);
}

export function URLSearchRemoveQuery(queryString, delQueryKey) {
    let queries = parseQueryStringToDictionary(queryString);

    if(delQueryKey in queries) {
        delete queries[delQueryKey];
    }

    return joinQueryDictionary(queries);
}

export function URLSearchGetQueryString(queryString, getQueryKey, defaultValue=undefined) {
    let queries = parseQueryStringToDictionary(queryString);

    if(getQueryKey in queries) {
        return queries[getQueryKey];
    }

    return defaultValue;
}

export function URLSearchGetQueryInt(queryString, getQueryKey, defaultValue=NaN) {
    let queries = parseQueryStringToDictionary(queryString);

    if(getQueryKey in queries) {
        return parseInt(queries[getQueryKey]);
    }

    return defaultValue;
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function textToParagraphs(str) {
    let res = [];
    
    if(str!==undefined && str!==null && str.length>0) {
        let lines = str.split(/\r?\n/);
        for(let aline of lines) {
            aline = aline.trim();
            if(aline.length >0) {
                res.push(aline);
            }
        }
    }
    
    return res;
}