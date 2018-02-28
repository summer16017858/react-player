'use strict'
import React,{Component} from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'fbemitter';
import styles from './player.global.less'
import Progress from '../../components/progress/progress'
import { connect } from "react-redux";
import { getList, getCurrentMusic, setPlayerInfo } from '../../../actions/index';
import { Link } from 'react-router-dom'
window.contentEmitter = new EventEmitter();


console.log(styles,'styles')
class Player extends Component{
	constructor(props){
		super(props);
    this.state = {
      progress:'-',
      currentTime:0,
      duration:0,
      isPlay:'play',
      repeatType:'cycle',
      volume:20
    }
	}
  progressHandle(progress){
    // this.state.progress = progress
    // this.setState({})
    let playerInfo = this.props.playerInfo.playerInfo
    let self = this;
    let duration = progress;
    this.props.setPlayerInfo(Object.assign({},playerInfo,{duration}))
    $('#player').jPlayer('play',Number(playerInfo.duration * progress));
  }
  volumeHandle(progress){
    let playerInfo = this.props.playerInfo.playerInfo
    let volume = progress;
    this.props.setPlayerInfo(Object.assign({},playerInfo,{volume}))
    // let playerInfo = this.props.playerInfo.playerInfo
    $('#player').jPlayer('volume', progress);
  }
  formatTime(time){
    let minute = 0;
    let second = 0;
    // console.log(time,'time')
    minute = Math.floor(time/60);
    second = time%60
    return minute + ':' +second;
  }
  play(){
    let playerInfo = this.props.playerInfo.playerInfo
    let isPlay = playerInfo.isPlay
    if(isPlay){
      console.log('pause')
      $('#player').jPlayer('pause',(e)=>{
        console.log(!e.jPlayer.status.paused,'e.jPlayer.status.paused')
      });
    }else{
      $('#player').jPlayer('play',(e)=>{
        console.log(!e.jPlayer.status.paused,'e.jPlayer.status.paused')
      });
    }
    // playerInfo.isPlay = isPlay
    // this.props.setPlayerInfo(Object.assign({},playerInfo))
  }
  prev(){
    contentEmitter.emit('prev')
  }
  next(){
    contentEmitter.emit('next')
  }
  changeRepeat(){
    let self = this
    let repeatList = [
			'cycle',
			'once',
			'random'
		];
    let index = repeatList.indexOf(self.props.playerInfo.playerInfo.repeatType);
			index = (index + 1) % repeatList.length;
    contentEmitter.emit('changeRepeat',repeatList[index])
  }
	render(){
    let currentMusic = this.props.currentMusic.currentMusic
    let playerInfo = this.props.playerInfo.playerInfo
		return  playerInfo?(
      <div className="player-page">
          <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
          <div className="mt20 row">
          	<div className="controll-wrapper">
          		<h2 className="music-title">{currentMusic.title}</h2>
          		<h3 className="music-artist mt10">{currentMusic.artist}</h3>
          		<div className="row mt20">
                <div>
                  {
                    this.formatTime(playerInfo.currentTime) + ' / ' + this.formatTime(playerInfo.duration)
                  }
                </div>
          			<div className="volume-container">
          				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
          				<div className="volume-wrapper">
		                <Progress
        							progress={playerInfo.volume}
        							onProgressChange={this.volumeHandle.bind(this)}
		                >
		                </Progress>
          				</div>
          			</div>
          		</div>
          		<div style={{height: 10, lineHeight: '10px'}}>
                <Progress
        					progress={playerInfo.progress}
        					onProgressChange={this.progressHandle.bind(this)}
                >
                </Progress>
          		</div>
          		<div className="mt35 row">
          			<div>
            			<i className="icon prev" onClick={this.prev.bind(this)}></i>
            			<i className={`icon ml20 ${playerInfo.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
            			<i className="icon next ml20" onClick={this.next.bind(this)}></i>
          			</div>
          			<div className="-col-auto">
          				<i className={`icon repeat-${playerInfo.repeatType}`} onClick={this.changeRepeat.bind(this)}></i>
          			</div>
          		</div>
          	</div>
          	<div className="-col-auto cover">
          		<img src={currentMusic.cover} alt={currentMusic.title}/>
          	</div>
          </div>
      </div>

		):null
	}
}
//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
        musicList: state.musicList || [],
        currentMusic: state.currentMusic || {},
        playerInfo: state.playerInfo || {}
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getCurrentMusic: (...args) => dispatch(getCurrentMusic(...args)),
      setPlayerInfo:(...args) => dispatch(setPlayerInfo(...args))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Player);
