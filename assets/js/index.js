$(function () {
  // 调用getUserInfo获取用户基本信息
  getUserInfo()
})

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    headers:{
      Authorization:localStorage.getItem('token') || ''
    },
    success:function(res){
      console.log(res)
    }
  })
}