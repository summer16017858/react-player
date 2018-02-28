'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MusicSchema = new Schema({
  title:{
    type: String
  },
  artist:{
    type: String
  },
  file:{
    type:String
  },
  cover:{
    type:String
  }
})

MusicSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next()
})
const MusicModel = mongoose.model('Music',MusicSchema)

module.exports = MusicModel;
