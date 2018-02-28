'use strict'
import React,{Component} from 'react';
import {render} from 'react-dom';
import styles from './musicItem.less'


console.log(styles,'styles')
class MusicItem extends Component{
	constructor(props){
		super(props);
    this.state = {
    }
	}
  componentDidMount(){

  }
  componentWillUnMount(){
  }
  changeMusic(item){
    contentEmitter.emit('changeMusic',item)
  }
	render(){
    let item = this.props.musicItem;
    let currentMusic = this.props.currentMusic.currentMusic;
    console.log(this.props,'currentMusicdasasdadas')
		return (
      <div className={styles.music}>
            <li className={styles.musicItem}>
                <p className={styles.musicText} style={{'color':item.id === currentMusic.id? '#00BFFF' : '#000'}} onClick={()=>{
                  this.changeMusic(item)
                }}
                >{item.title} - {item.artist}</p>
                <a className={styles.musicIcon} onClick={()=>{
                  this.props.handleDelete(item)
                }}>&#xe677;</a>
            </li>
      </div>

		)
	}
}

export default MusicItem;
