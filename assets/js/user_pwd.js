$(function(){
  const form=layui.form

  form.verify({
    pass:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    samePwd:function(value){
      if(value===$('[name=oldPwd]').val()){
        return '新旧密码不能一样'
      }
    },
    rePwd:function(value){
      if(value!==$('[name=newPwd]').val()){
        return '两次输入的密码不一致'
      }
    }   
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit',function(e){
    e.preventDefault()

    $.ajax({
      method:'PATCH',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})