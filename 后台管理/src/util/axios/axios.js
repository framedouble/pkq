import axios from 'axios'
import router from '../../router'
const http = axios.create({
  baseURL: '/api'
});

http.interceptors.request.use(req => {
  // console.log(req,'请求拦截');
  let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : {};
  req.headers.authorization = token;
  return req
})
http.interceptors.response.use(res => {
  // console.log(res,'111');
  if (res.data.code == 403) {
    alert(res.data.msg);
    router.push('/login');
    return res
  }
  else if (res.data.code == 500) {
    alert(res.data.msg);
    router.push('/login');
    return res
  } else {
    return res
  }

})
export default http
