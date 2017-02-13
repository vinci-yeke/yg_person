<?php
header("Content-Type:text/html");
?>

  <div class="lf" id="header_left">
    <ul>
      <li><a href="#">时尚商城</a></li>
      <li><a href="#">首尔站</a></li>
      <script>
        var a = document.querySelector("#header_left > ul > li:nth-child(2) a");
        a.style.color = "#fff";
        a.addEventListener("mouseover", function () {
          a.innerHTML = "Scoul Station";
          a.style.fontSize = "0.5em";
          a.style.letterSpacing = "0.1em";
          a.style.color = "#fff";
        });
        a.addEventListener("mouseout", function () {
          a.innerHTML = "首尔站";
          a.style.color = "#fff";
        });

      </script>
      <li><a href="#">手机优购<i class="down_jiantou"></i></a>
        <div id="phone_con">
          <img class="lf" src="images/2016-08-13_222545.png"/>
          <img class="lf" src="images/2016-08-13_222618.png"/>
          <img class="lf" src="images/2016-08-13_222631.png"/>
          <p>下载安装<strong>优购客户端</strong></p></div>
      </li>
    </ul>
  </div>
  <div class="rt" id="header_right">
    <ul>
      <li><a href="#" id="yg-login">登录</a></li>
      <li><a href="#" id="yg-register">注册</a></li>
      <li><a href="#">我的优购<i class="down_jiantou"></i></a>
        <div id="mycloct"><a href="#">我的收藏</a></div>
      </li>
      <li><a href="#">我的订单</a></li>
      <li><a href="#">公告</a>
        <div class="notice-text">
          <ul>
            <li><a href="#">10.21台风公告影响</a></li>
            <li><a href="#">接入</a></li>
            <li><a href="#">分享购官方微信</a></li>
            <li><a href="#">关于跨境商品征税新政策调整</a></li>
            <li><a href="#">提醒会员谨防诈骗电话</a></li>
          </ul>
        </div>
        <i class="down_jiantou"></i></li>
      <li><a href="#">更多</a><i class="down_jiantou"></i>

        <div class="more-text">
          <p>收藏优购</p>
          <p>帮助</p>
        </div>
      </li>
    </ul>
  </div>

