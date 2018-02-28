module.exports = (obj)=>{
	let strArr = [];
	for( let key in obj){
		if(!obj.hasOwnProperty(key)){
			continue ;
		}else{
			let _str = '';
			_str = key + '=' + (typeof obj[key] ==='object'? JSON.stringify(obj[key]) : obj[key]);
			strArr.push(_str);
		}
	}
	if(strArr.length > 0){
		return '?' + strArr.join('&');
	}else{
		return '';
	}
}
