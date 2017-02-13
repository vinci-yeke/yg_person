/**
 * Created by yk on 2016/9/11.
 */

//加载页头和页尾

$('header').load('data/header.php', function () {

    //注册页面
    $('#yg-register').click(function (e) {
        e.preventDefault();
        $('.modal').removeClass('hide').mouseover(function () {
            $('#form-register').removeClass('hide');
            $('#form-login').addClass('hide');
            $('.modelCon').css('top', "200px");
        });
    });
    //登录页面
    $('#yg-login').click(function (e) {
        e.preventDefault();
        $('.modal').removeClass('hide').mouseover(function () {
            $('.modelCon').css('top', "200px");
            $('#form-login').removeClass('hide');
            $('#form-register').addClass('hide');
        });
    });
    //用户登陆绑定

    if (sessionStorage['name'] != '10000') {
        $('#yg-login').html('欢迎回来' + sessionStorage['name']);
        $('#yg-login').parent().next().html('<a href="#" id="my-exit">退出</a>')

    }
    $('#my-exit').click(function () {
        sessionStorage['name'] = '10000';
        location.href = 'yougou.html';
    });

    //模态框关闭按钮
    $('.register-close').click(function (e) {
        e.preventDefault();
        $('.modal').addClass('hide');
        $('.modelCon').css('top', "0");
    });
    //表单输入框
    $('#form-register>div>input').focus(function () {
        $(this).next().addClass('show').removeClass('hide');
    });
});

//导航栏
$('nav').load('data/nav.php', function () {
    //搜索栏的热词搜索和跳转
    $('#yougou_search_top input').keyup(function () {
        console.log($(this).val());
        $.ajax({
            type: 'GET',
            url: 'data/keyword.php',
            data: 'keywords=' + $(this).val(),
            success: function (data) {
                console.log(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    html += `<li>${data[i]}</li>`;
                }
                $('#seachInput').html(html);
                $('#seachInput').css("display", 'block');
                $('#seachInput li').mouseover(function () {
                    console.log($(this).html());
                    $('#yougou_search_top input').val($(this).html());
                });
            }
        });
    });

    $('.yg_btn').click(function (e) {
        e.preventDefault();
        var value = $('#yougou_search_top input').val();
        console.log(value);
        if (value) {
            sessionStorage.setItem('key', value);
            location.href = "productList.html";
        }
    });

    $('#yougou_search_top input').blur(function () {
        $('#seachInput').css("display", 'none');
    });


});


//加载导购栏目后,异步加载图标库
$('#buy_leader').load('data/buy_leader.php', function () {

    var pageCount = 0;
    sessionStorage.setItem('page', 1);
    function ajaxBrand() {
        $.ajax({
            type: 'GET',
            url: 'data/yg_guide.php',
            data: "name=10002&count=48&page=" + sessionStorage.getItem('page'),
            success: function (list) {
                //console.log(list);
                if (list.msg == 'succ') {
                    //获取总记录数,用于传给事假响应函数
                    pageCount = list.page;
                    var html = ` <i id="item_bom_left" ></i><i id="item_bom_right" ></i>`;
                    $.each(list.data, function (key, brand) {
                        //console.log(brand);
                        html += `<a href="#"><img src="${brand.a_img}" alt=""/>${brand.a_name}</a>`;
                    });
                    $('#brand_wall').attr('data-name', list.recordCount).html(html);
                } else {
                    console.log('数据库获取数据出现错误');
                }
                //console.log(pageCount);
                var num = sessionStorage.getItem('page');
                $('#item_bom_left').click(function () {
                    if (num > 1) {
                        num--;
                        //console.log(num);
                        sessionStorage['page'] = num;
                        ajaxBrand();
                    } else {
                        console.log('数据已经到达头部');
                        return;
                    }
                });
                $('#item_bom_right').click(function () {
                    if (num < pageCount) {
                        num++;
                        console.log(num);
                        sessionStorage['page'] = num;
                        ajaxBrand();
                    } else {
                        console.log('数据已经到达尾部');
                        return;
                    }
                });
            }
        });
    }

    ajaxBrand();
});
$('footer').load('data/footer.php');
