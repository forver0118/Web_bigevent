$(function(){
  // 点击‘去注册账号’的链接
  $('#go2Reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击‘去登录’的链接
  $('#go2Login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
})