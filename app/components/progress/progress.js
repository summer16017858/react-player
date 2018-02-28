'use strict'
import React,{Component} from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'fbemitter';
window.contentEmitter = new EventEmitter();


const styles = {
  progressBox:{
    flex:1,
    position:'relative',
    display:'flex',
    height:'2px',
    background:'#eee',
    flexDirection:'row',
    justifyContent:'flex-start',
    cursor:'pointer'
  },
  progress:{
    width:0,
    height:'3px',
    background:'red',
    position:'absolute',
    left:0,
    top:0
  }
}
class Progress extends Component{
	constructor(props){
		super(props);
	}
  changeProgress(e){
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    // console.log(progress,'progress')
    this.props.onProgressChange && this.props.onProgressChange(progress)
  }
	render(){
		return (
			<div style={styles.progressBox} ref="progressBar" onClick={this.changeProgress.bind(this)}>
        <div style={Object.assign({},styles.progress,{width:this.props.progress + "%"})}></div>
			</div>
		)
	}
}

export default Progress;
