'use strict'
import React,{Component} from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'fbemitter';
import styles from './header.less'
window.contentEmitter = new EventEmitter();


console.log(styles,'styles')
class Index extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className={styles.header}>
        <span className={styles.musicIcon}>&#xe626;</span>
        <h1 className="caption">React Music Player Demo</h1>
			</div>
		)
	}
}

export default Index;
