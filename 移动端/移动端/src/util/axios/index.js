import http from './axios';

// 封装获取分类信息(首页)接口
export function getCate(){
  return http.get('/getcate')
}

// 封装轮播图信息(首页)接口
export function getBanner(){
  return http.get('/getbanner')
}

// 封装限时秒杀信息(首页)接口
export function getSeckill(){
  return http.get('/getseckill')
}

// 封装获取商品信息(首页)接口
export function getIndexGoods(){
  return http.get('/getindexgoods')
}

// 封装获取分类树形结构接口
export function getCateTree(){
  return http.get('/getcatetree')
}

// 封装获取分类商品接口
export function getGoods(params){
  return http.get('/getgoods',{
    params
  })
}

// 封装获取一个商品信息接口
export function getGoodsInfo(params){
  return http.get('/getgoodsinfo',{
    params
  })
}

// 封装一个会员注册接口
export function register(data){
  return http.post('/register',data)
}

// 封装一个会员登录接口
export function login(data){
  return http.post('/login',data)
}

// 封装一个获取购物车接口
export function cartList(params){
  return http.get('/cartlist',{
    params
  })
}

// 封装一个获取购物车添加接口
export function cartAdd(data){
  return http.post('/cartadd',data)
}

// 封装一个获取购物车删除的接口
export function cartDelete(data){
  return http.post('/cartdelete',data)
}