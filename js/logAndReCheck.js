/**
 * Created by yk on 2016/9/11.
 */
function getCode(list, code) {
    var ctx = code.getContext('2d');
    var w = code.width;
    var h = code.height;
//填充一个矩形
    ctx.fillStyle = rc(180, 230);
    ctx.fillRect(0, 0, w, h);

//绘制5个随机字符
    ctx.textBaseline = 'bottom';
    for (var i = 0; i < 5; i++) {
        var x = 18 * i + 5;
        var y = h;
        var c = list[i];
        ctx.fillStyle = rc(30, 180);//颜色随机
        ctx.font = rn(10, 30) + "px Arial";//大小随机
        ctx.translate(x, y);
        ctx.fillText(c, 0, 0);
        ctx.translate(-x, -y);
    }

//绘制5条干扰线

    for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(rn(0, w), rn(0, h));
        ctx.lineTo(rn(0, w), rn(0, h));
        ctx.strokeStyle = rc(30, 180);
        ctx.stroke();
    }
//绘制50个杂色点-半径为1的圆
    for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(rn(0, w), rn(0, h), 1, 0, Math.PI * 2);
        ctx.fillStyle = rc(30, 230);
        ctx.fill();
    }

//获取一个指定范围的随机数
    function rn(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

//获取一个随机范围内地额颜色
    function rc(min, max) {
        var r = rn(min, max);
        var g = rn(min, max);
        var b = rn(min, max);
        return `rgb(${r},${g},${b})`;

    }
}
//从服务器端获得验证码
function codePhp(code) {
    $.ajax({
        type: 'GET',
        url: 'data/getCode.php',
        success: function (list) {
            getCode(list, code);
            var strCode = '';
            strCode = list.join('');
            sessionStorage['code'] = strCode;
        }
    });

}


//注册表单验证
function checkForm() {
    codePhp(vcodeRe);
    $('#vcodeRe').click(function () {
        codePhp(vcodeRe);
    });

    var getName = false;
    var checkPwd = false;
    var checkCode = false;
    var phone = false;
    var email = false;
    //console.log('checkCode---------'+checkCode);
    $('.my-close').click(function (e) {
        e.preventDefault();
        $('.modal').addClass('hide');
    });
    $('#form-register>div>input').focus(function () {

        $(this).next().addClass('show ').removeClass('hide');
    });

//账号的验证
    $('#uname').blur(function () {
        var name = $(this).val();
        console.log('11');
        var reg = new RegExp("^\\w{1,10}$");
        if (reg.test(name)) {
            $.ajax({
                type: 'GET',
                url: 'data/register.php',
                data: 'name=' + $('#uname').val(),
                success: function (msg) {
                    console.log(msg);
                    if (msg == "exit") {
                        $('#uname').next().html('<em style="color:#e4393c">用户已存在</em>');
                    } else {
                        getName = true;
                        $('#uname').next().html('<em style="color:green">用户可以注册</em>');
                    }
                }
            });
        } else {
            $('#uname').next().addClass('danger').html("合适不正确")
        }
    });

    $('#upwd').blur(function () {
        var pwd = $(this).val();
        //console.log(pwd);
        var reg = new RegExp("^\\w{6,10}$");
        if (reg.test(pwd)) {

            $(this).next().html('正确');
            console.log('---' + checkPwd);
            //验证第二次密码
            $('#upwdCheck').blur(function () {
                console.log($(this).val());
                console.log($('#upwd').val());
                if ($(this).val() != $('#upwd').val()) {
                    $(this).next().html('两次密码不一致');
                } else {
                    $(this).next().html('密码一致');
                    checkPwd = true;
                }
                console.log(getName);
                console.log(checkPwd);
            });
        } else {
            $(this).next().html('密码格式不正确');
        }
    });
    //验证邮箱
    $('#uemail').blur(function () {
        var ema = $(this).val();
        console.log(ema);
        var reg = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\.\\w+([-.]\\w+)*$");
        if (reg.test(ema) || !ema) {
            $(this).next().html('正确');
            email = true;
        } else {
            $(this).next().html('格式错误');
        }
    });
    //验证邮箱
    $('#uphone').blur(function () {
        var uph = $(this).val();
        //console.log(pwd);
        var reg = new RegExp("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$");
        if (reg.test(uph) || !uph) {
            $(this).next().html('正确');
            phone = true;
        } else {
            $(this).next().html('格式错误');
        }
    });

    $('#ucheckCode').blur(function () {
        var value = $(this).val();
        console.log(value.toUpperCase());
        var code = sessionStorage['code'].toUpperCase();
        console.log(sessionStorage['code'].toUpperCase());
        checkCode = (value.toUpperCase() == code ? true : false);
        console.log('sss' + checkCode);
    });

//点击注册按钮
    $("#usubmit").click(function () {
        var checkBol = !getName && (!checkPwd) && phone && email;
        if (checkBol && checkPwd && checkCode) {
            console.log('数据错误 ');
        } else {
            //表单序列化,获得所有的用户输入
            var data = $("#form-register").serialize();
            console.log(data);
            $.ajax({
                type: 'POST',
                url: 'data/user_add.php',
                data: data,
                success: function (arr) {
                    console.log(arr);
                    if (arr.msg === 'succ') {
                        $("#modal").addClass('hide').removeClass('show');
                    } else if (arr.msg === 'err') {
                        alert(arr.sql + '用户注册失败');
                    }
                }
            });
        }
    });
}
checkForm();

function loginForm() {
    codePhp(vcodeLog);
    $('#yg-login').click(function (e) {
        e.preventDefault();
        $('#yg-register').addClass('hide').removeClass('show');
        $('#form-login').addClass('show').removeClass('hide');
    });

    $('#vcodeLog').click(function () {
        codePhp(vcodeLog);
    });

//点击登录按钮
    $("#mylogin").click(function () {

        console.log($("#myname").val());
        console.log($("#mypwd").val());
        if (!($("#myname").val() && $("#mypwd").val())) {
            $("#myname").next().html('<b style="color: red">用户名或者密码不能为空</b>');
        } else {

            var code = sessionStorage.getItem('code').toUpperCase();
            var myCode = $('#uloginCode').val().toUpperCase();
            //console.log(sessionStorage.getItem('code'))
            //console.log($('#uloginCode').val())
            if (myCode != code) {
                console.log('验证码错误')
            } else {
                //表单序列化,获得所有的用户输入
                var data = $("#form-login").serialize();
                console.log(data);
                $.ajax({
                    type: 'POST',
                    url: 'data/login.php',
                    data: data,
                    success: function (arr) {
                        console.log(arr);
                        sessionStorage['name']='10000';
                        if (arr[0] == 'ok') {
                            sessionStorage['name']=arr[1];
                            $('#yg-login').html('欢迎回来' +sessionStorage['name']);
                            $('#yg-login').parent().next().html('<a href="#" id="my-exit">退出</a>')
                            $('#my-exit').click(function () {
                                sessionStorage['name'] = '10000';
                                location.href = 'yougou.html';
                            });
                            $('.modal').addClass('hide');
                        } else if (arr[0] == 'err') {
                            $("#myname").next().html('<b style="color: red">用户名或者密码错误,请检查</b>');
                        }else{
                        //    todo:checkphp right?
                        }
                    }

                });
            }
        }


    });

}
loginForm();