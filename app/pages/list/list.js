'use strict'
import React,{Component} from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'fbemitter';
import styles from './list.global.less';
import { connect } from "react-redux";
import { getList, getCurrentMusic } from '../../../actions/index';
import MusicItem from '../../components/musicItem/musicItem';
import { Link } from 'react-router-dom'
window.contentEmitter = new EventEmitter();


console.log(styles,'styles')
class MusicList extends Component{
	constructor(props){
		super(props);
    this.state = {

    }
	}
  componentWillMount(){
  }
  componentDidMount(){
    console.log()

  }
  componentWillUnMount(){
  }
  goBack(){
    this.props.history.goBack()
  }
  handleDelete(deleteItem){
    let musicList = this.props.musicList
      console.log(musicList,'testttttttt')
    musicList = musicList.filter(item => item.id!== deleteItem.id)

    this.props.getList(musicList)
  }
	render(){
    console.log(this.props.currentMusic,'this.props.currentMusic')
		return (
      <div>
        <h1  onClick={this.goBack.bind(this)} style={{fontSize:'16px',margin:'20px'}}>&lt;返回播放器页面</h1>
        <div className="music-list">
          {this.props.musicList.map((item,index) => {
            return (
              <MusicItem musicItem={item} key={index} currentMusic={this.props.currentMusic} handleDelete={(item)=>{this.handleDelete(item)}}/>
            )
          })}
        </div>
      </div>
		)
	}
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
        musicList: state.musicList || [],
        currentMusic: state.currentMusic || {}
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getList: (...args) => dispatch(getList(...args)),
        getCurrentMusic: (...args) => dispatch(getCurrentMusic(...args)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(MusicList)
