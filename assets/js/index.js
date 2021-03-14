$(function () {
    getUserInfo();
    // 退出
    let layer = layui.layer;
    $("#btnOut").on("click", function () {
        layer.confirm("是否确认退出?", {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem("token")
            location.href = '/login.html'
            layer.close(index)
        })
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: (res) => {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎 " + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic)
        $(".text-avatar").hide();

    } else {
        $(".layui-nav-img").hide();
        let text = name[0].toUpperCase();
        $(".text-avatar").show().html(text)
    }
}