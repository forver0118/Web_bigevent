$(function () {
  // 调用getUserInfo获取用户基本信息
  getUserInfo()


  // 点击按钮实现退出功能
  const layer = layui.layer
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1.情况本地存储中的token
      localStorage.removeItem('token')
      // 2.重新跳转到登录页面
      location.href = './login.html'

      // 关闭confirm询问框
      layer.close(index)
    })

  })
})

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers:{
    //   Authorization:localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用renderAvatar 渲染用户的头像
      renderAvatar(res.data)

    },
    // 无论成功还是失败，最终都调用complete回调函数
    complete: function (res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        // 1.强制清空token
        localStorage.removeItem('token')

        // 2.强制跳转到登录页面
        location.href = '/login.html'
      }
    }

  })
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  const name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp' + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片图像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avater').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    const first = name[0].toUpperCase()
    $('.text-avater').html(first).show()
  }
}