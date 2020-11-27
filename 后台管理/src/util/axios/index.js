import http from './axios'

//菜单管理接口
export function getMenuAdd(data) { //菜单添加接口
  return http.post('/api/menuadd', data)
}
export function getMenuList(params) { //菜单列表获取
  return http.get('/api/menulist', {
    params
  })
}
export function getMenuInfo(params) { //菜单获取一条
  return http.get('/api/menuinfo', {
    params
  })
}
export function getMenuedit(data) { //菜单修改
  return http.post('/api/menuedit', data)
}
export function getMenuDelete(data) { //菜单列表删除
  return http.post('/api/menudelete', data)
}


//角色管理接口

export function getRoleadd(data) { //角色添加接口
  return http.post('/api/roleadd', data)
}
export function getRolelist(params) { //角色列表接口
  return http.get('/api/rolelist', {
    params
  })
}
export function getRoleinfo(params) { //角色获取接口
  return http.get('/api/roleinfo', {
    params
  })
}
export function getRoleedit(data) { //角色修改接口
  return http.post('/api/roleedit', data)
}
export function getRoledelete(data) { //角色删除接口
  return http.post('/api/roledelete', data)
}


//管理员管理

export function getUseradd(data) {
  return http.post('/api/useradd', data); //管理员添加
}
export function getUsercount(params) {
  return http.get('/api/usercount', {
    params
  });
}
export function getUserlist(params) {
  return http.get('/api/userlist', {
    params
  });
}
export function getUserinfo(params) {
  return http.get('/api/userinfo', {
    params
  });
}
export function getUseredit(data) {
  return http.post('/api/useredit', data);
}
export function getUserdelete(data) {
  return http.post('/api/userdelete', data);
}
export function getUserlogin(data) {
  return http.post('/api/userlogin', data);
}
/* 分类管理接口 */
//封装分类添加接口
export function getCateAdd(data){
  return http.post('/api/cateadd',data)
}
//封装分类列表接口
export function getCateList(params){
  return http.get('/api/catelist',{
      params
  })
}
//封装分类获取（一条）接口
export function getCateInfo(params){
  return http.get('/api/cateinfo',{
      params
  })
}
//封装分类修改接口
export function getCateEdit(data){
  return http.post('/api/cateedit',data)
}
//封装分类删除接口
export function getCateDelete(data){
  return http.post('/api/catedelete',data)
}

//商品规格添加
export function getSpecsAdd(data){
  return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
  return http.get('/api/specslist',{
      params
  })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
  return http.get('/api/specsinfo',{
      params
  })
}
//商品规格修改
export function getSpecsEdit(data){
  return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
  return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
  return http.get('/api/specscount')
}
//商品管理添加
export function getGoodsAdd(data){
  return http.post('/api/goodsadd',data)
}
//商品管理列表
export function getGoodsList(params){
  return http.get('/api/goodslist',{
      params
  })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
  return http.get('/api/goodsinfo',{
      params
  })
}
//商品管理修改
export function getGoodsEdit(data){
  return http.post('/api/goodsedit',data)
}
//商品管理删除
export function getGoodsDelete(data){
  return http.post('/api/goodsdelete',data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
  return http.get('/api/goodscount')
}

// 封装会员管理接口
//封装会员管理列表接口
export function getMemberList(){
  return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
  return http.get('/api/memberinfo',{
      params
  })
}
//封装会员管理修改接口
export function getMemberEdit(data){
  return http.post('/api/memberedit',data)
}

/* 轮播图管理接口 */
//封装轮播图添加接口
export function getBannerAdd(data){
  return http.post('/api/banneradd',data)
}
//封装轮播图列表接口
export function getBannerList(){
  return http.get('/api/bannerlist')
}
//封装轮播图获取（一条）接口
export function getBannerInfo(params){
  return http.get('/api/bannerinfo',{
      params
  })
}
//封装轮播图修改接口
export function getBannerEdit(data){
  return http.post('/api/banneredit',data)
}
//封装轮播图删除接口
export function getBannerDelete(data){
  return http.post('/api/bannerdelete',data)
}

/* 限时秒杀管理接口 */
//封装限时秒杀添加接口
export function getSeckAdd(data){
  return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
  return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
  return http.get('/api/seckinfo',{
      params
  })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
  return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
  return http.post('/api/seckdelete',data)
}