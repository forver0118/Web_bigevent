$(function(){
  // 点击去注册
  $('#go2Reg').on('click',function(){
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  // 点击去登录
  $('#go2Login').on('click',function(){
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })


  // 从layui中获取form对象
  const form=layui.form
  const layer=layui.layer
  // 通过form.verify（）函数自定义校验规则
  form.verify({
    //自定义了一个叫做pwd校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
    
    
    // 校验两次密码是否一致的规则
    repwd:  function(value){
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示消息即可
     const pwd= $('.reg-wrap [name=password]').val()
     if(pwd !== value){
      return '两次密码不一致！'
     }
    }
  })


  // 监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),
  password:$('#form_reg [name=password]').val()},function(res){
    console.log(res)
    if(res.status!==0){
      return layer.msg(res.message)
    }
    layer.msg('注册成功，请登录！')

    // 模拟人的点击行为
    $('#go2Login').click()
  })
  })


  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      // 快速获取表单中是数据
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href='./index.html'
      }
    })
  })
})