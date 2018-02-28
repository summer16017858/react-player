'use strict';

class DATE {
	/**
	 * [constructor description]
	 * @param  {[type]} days 增减计算的时间 [增减的时间，增加时间为正数，减去时间为负数]
	 * @param  {[type]} time,如果传入则代表使用这个date作为现在的时间
	 * @return {[type]} time + -days后新的时间
	 */
	constructor(options){
		let {days,time} = options? options:{};
		let timeNow = time?new Date(time):new Date();
		this.days = days?days:0;
		this.time = new Date(timeNow.setDate(timeNow.getDate()+this.days));
	}
	_getDate(){
		return this.time.getDate();
	}
	_getMonth(){ //国外从0算起，因此加1
		return this.time.getMonth()+1;
	}
	_getYear(){
		return this.time.getFullYear();
	}
	_getHours(){
		return this.time.getHours();
	}
	_getMinutes(){
		return this.time.getMinutes();
	}
	_getSeconds(){
		return this.time.getSeconds();
	}
	_setHours(hours){
		this.time.setHours(hours-0);
		return new DATE({time: this.time});
	}
	_setMinutes(minutes){
		this.time.setMinutes(minutes-0);
		return new DATE({time: this.time});
	}
	_setSeconds(seconds){
		this.time.setSeconds(seconds-0);
		return new DATE({time: this.time});
	}

	//设置时分秒   00:00:00的格式
	setHMS(str){
		let HMSArr = str.split(':');
		let hour = HMSArr[0],
			minute = HMSArr[1],
			second = HMSArr[2];
		return this._setHours(hour)._setMinutes(minute)._setSeconds(second);
	}
	//获取时间
	getTime(){
		return this.time;
	}
	format(formatStr){
		switch (formatStr){
			case 'mm.dd':
				return (
					(this._getMonth()<10? '0'+this._getMonth() : this._getMonth())
					+ '.' +
					(this._getDate()<10? '0'+this._getDate() : this._getDate())
				)
				break;
			case 'mm-dd':
				return (
					(this._getMonth()<10? '0'+this._getMonth() : this._getMonth())
					+ '-' +
					(this._getDate()<10? '0'+this._getDate() : this._getDate())
				)
				break;
			case 'yyyy-mm-dd':
				return (
					this._getYear()
					+'-'+
					(this._getMonth()<10 ? '0'+this._getMonth() : this._getMonth())
					+ '-' +
					(this._getDate()<10 ? '0'+this._getDate() : this._getDate())
				);
				break;
			case 'yyyy-MM-dd':
				return (
					this._getYear()
					+'-'+
					(this._getMonth()<10 ? '0'+this._getMonth() : this._getMonth())
					+ '-' +
					(this._getDate()<10 ? '0'+this._getDate() : this._getDate())
				);
				break;
			case 'yyyy-mm-dd HH:mm:ss':
				return (
					this._getYear()
					+'-'+
					(this._getMonth()<10 ? '0'+this._getMonth() : this._getMonth())
					+ '-' +
					(this._getDate()<10 ? '0'+this._getDate() : this._getDate())
					+ ' ' +
					(this._getHours()<10 ? '0'+this._getHours() : this._getHours())
					+ ':' +
					(this._getMinutes()<10 ? '0'+this._getMinutes() : this._getMinutes())
					+ ':' +
					(this._getSeconds()<10 ? '0'+this._getSeconds() : this._getSeconds())
				);
				break;
			defalut:
				return (
					this._getYear()
					+'-'+
					(this._getMonth()<10 ? '0'+this._getMonth() : this._getMonth())
					+ '-' +
					(this._getDate()<10 ? '0'+this._getDate() : this._getDate())
					+ ' ' +
					(this._getHours()<10 ? '0'+this._getHours() : this._getHours())
					+ ':' +
					(this._getMinutes()<10 ? '0'+this._getMinutes() : this._getMinutes())
					+ ':' +
					(this._getSeconds()<10 ? '0'+this._getSeconds() : this._getSeconds())
				);
				break;
		}
	}
}

Date.prototype.Format = function (fmt) {
    var o = {
        "m+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "M+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = DATE;
