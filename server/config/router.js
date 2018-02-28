'use strict'
const Router=require('koa-router');
const Music = require('../controllers/music')
module.exports = function(){
  const router= new Router({
    prefix:'/api'
  })
  router.get('/musicList',Music.list)

  return router
}
