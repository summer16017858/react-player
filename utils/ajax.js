'use strict';

/**
 * [$_ajax ajax请求]
 * @param  options
 * @return null
 */
let $_ajax = function (options){ //没考虑 ie
	let type = options.type.toUpperCase();
	let {
		url,
		data,
		dataType,
		success,
		error
	} = options;

	data = (function(){
		var arr = [];
		for (var key in data){
			arr.push(key + '=' + encodeURI((typeof data[key] ==='object'? JSON.stringify(data[key]) : data[key])));
		}
		return arr.join('&');
	})(data);

	var xhr = new XMLHttpRequest();
	if (xhr){
		let state =0;
		if(type === 'GET'){

			if( data && Object.keys(data).length !== 0){
				url += ('?'+data.toString());
			}
			xhr.open(type,url,true);
			xhr.send(null);
		}else{
			xhr.open(type,url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send(data);
		}
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 && xhr.status == 200){
				try {
					success(JSON.parse(xhr.responseText));
				} catch (e) {
					error();
					throw(e);
				}
			}else if(xhr.readyState == 4 && xhr.status >= 400 && xhr.status<= 600){
				error();
			}
		}
		return xhr;
	}else{
		console.log('no xhr obj error');
	}
};

module.exports = $_ajax;
