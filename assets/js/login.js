$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    // 自定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6-16位，且不能输入空格'
        ],
        // 确认密码验证
        repwd: function (value) {
            let pwd = $(".reg-box input[name=password]").val();
            if (value !== pwd) {
                return '两次密码输入不一致!';
            }
        }
    })

    // 注册功能
    let layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: (res) => {
                // 
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录!");
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }


        })
    })


    // 登录功能
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜你，登录成功!")
                localStorage.setItem("token", res.token)
                location.href = '/idnex.html'
            }
        })
    })
})