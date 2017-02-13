/**
 * Created by yk on 2016/9/11.
 */



//热门品牌
function ajaxHot() {
  $.ajax({
    type: 'GET',
    url: 'data/yg_guide.php',
    data: "name=10002&count=40&page=1",
    success: function (list) {
      //console.log(list);
      if (list.msg == 'succ') {
        //获取总记录数,用于传给事假响应函数
        pageCount = list.page;
        var html = ``;
        $.each(list.data, function (key, brand) {
          //console.log(brand);
         html += `<a href="#"><img src="${brand.a_img}" alt=""/></a>`;
        });
        for(var i=0;i<list.data.length;i++){
          var brand=list.data[i];
          html += `<a href="#"><img src="${brand.a_img}" alt=""/></a>`;
        }
        $('.bigshow_hoticon').attr('data-name', list.recordCount).html(html);
      } else {
        console.log('数据库获取数据出现错误');
      }
      $('.left_jiantou').click(function () {
        $('.bigshow_hoticon').css("left", "-1100px");

      });
      $('.right_jiantou').click(function () {
        $('.bigshow_hoticon').css("left", "0");
      });
    }
  });
}
ajaxHot();

//特卖专区
var goodSort = {
  init: function (state) {
    document.querySelector("#sort_tab ul").addEventListener(state, function (e) {
        var target = e.target;
        var a;
        if (target.nodeName != "UL") {
          if (target.nodeName == "LI") {
            if (state == "mouseover") {
              target.className = "sort_on";
            } else {
              target.className = "";
            }
            a = target.getAttribute("data-class").slice(-1);
          } else if (target.nodeName == "A" || target.nodeName == "I") {
            a = target.parentElement.getAttribute("data-class").slice(-1);
            if (state == "mouseover") {
              target.parentElement.className = "sort_on";
            } else {
              target.parentElement.className = "";
            }
          }
          if (state == "mouseover") {
            document.getElementById("sort_pic" + a).style.display = "block";
            for (var i = 1; i <= 7; i++) {
              if (i != a) {
                document.getElementById("sort_pic" + i).style.display = "none";
              }
            }
          }
        }
      }
    );
  }
};
goodSort.init("mouseover");
goodSort.init("mouseout");

//商品分类栏 唤出侧边栏
var iconChange = {
  innit: function () {
    $('#banner_left > ul>li').hover(function (e) {
      var $target = $(e.target);
      if (e.target.nodeName != "LI") {
        $target = $(this);
      }
      var name = $target.attr('data-name');
      $(`div[data-name=${name}]`).removeClass('hide').addClass('show');
    }, function (e) {
      var $target = $(e.target);
      if (e.target.nodeName != "LI") {
        $target = $(this);
      }
      var name = $target.attr('data-name');
      $('.bannerStyle').addClass('hide').removeClass('show');
      $('.bannerStyle').hover(function (e) {
        $target = $(e.target);
        $target.addClass('show').removeClass('hide');
      }, function (e) {
        $target = $(e.target);
        $target.addClass('hide').removeClass('show');
      });
    });


  },
  topic: function () {
    $('.bannerStyle>p').hover(function () {
        $(this).css('left', '100px');
      },
      function () {
        $(this).css('left', '50px');
      }
    );
  }
};
iconChange.innit();
iconChange.topic();


/*广告图片数组*/
var move_imgs = [
  {"i": 0, "img": "images/0840918447a7435fb960184ba8d81888.jpg"},
  {"i": 1, "img": "images/02284c86e98a4521bc3c4b03771b1abb.jpg"},
  {"i": 2, "img": "images/3173b9b464ee406c8f1e499f508bbd67.jpg"},
  {"i": 3, "img": "images/a7fefa3b16f54f2b963b3537e01d3b43.jpg"},
  {"i": 4, "img": "images/c10a9850fac64317b89f04345d3f1996.jpg"}
];
//轮播效果
var banner_right = {
  LIWIDTH: 0,//保存每个li的宽度,其实就是#banner_right的宽度
  DURATION: 1500,//动画总时间,
  WAIT: 3000,//自动轮播等待时间,
  canAuto: true,//保存是否可以自动轮播
  timer: null,//
  init: function () {
    this.LIWIDTH = parseFloat($("#banner_right").css("width"));
    console.log(this.LIWIDTH);
    this.updateView();
    //为id为indexs的ul添加鼠标进入事件代理,只有li不是hover的li才能响应事件
    $("#indexs").on("mouseover", "li:not(.hover)",
      function (e) {
        $target = $(e.target);//获得目标元素$target
        //调用move方法,传入移动的个数:
        //目标元素的内容-目标元素的兄弟中class为hover的li的内容
        this.move($target.html() - $target.siblings(".hover").html());
      }.bind(this));
    //当鼠标进入banner_right时,将canAuto改为false
    //当鼠标移出#banner_right时,将canAuto改为true
    $("#banner_right").hover(function () {
      this.canAuto = false
    }.bind(this), function () {
      this.canAuto = true
    }.bind(this));
    this.autoMove();
  },
  autoMove: function () {
    //启动一次性
    this.timer = setTimeout(function () {
      if (this.canAuto) {
        this.move(1);
      }
      else {
        this.autoMove();
      }
    }.bind(this), this.WAIT);
  },
  move: function (n) {//移动
    clearTimeout(this.timer);
    this.timer = null;
    //获得#move_imgs当前的left,转为浮点数
    var left = parseFloat($("#move_imgs").css("left"));
    //如果n<0
    if (n < 0) {
      $("#move_imgs").stop(true);
      n *= -1;
      //修改#move_imgs的left为left-n*LIWIDTH
      move_imgs = move_imgs.splice(move_imgs.length - n, n).concat(move_imgs);
      this.updateView();
      $("#move_imgs").css("left", left - n * this.LIWIDTH);
      //启动动画,在duration时间内,left移动到0
      $("#move_imgs").animate({left: 0}, this.DURATION, this.autoMove.bind(this));
    }
    else {
      $("#move_imgs").stop(true);
      //否则
      //让#move_imgs的ol在DURATION事件内,left变为-n*LIWIDTH
      $("#move_imgs").animate({left: -n * this.LIWIDTH + "px"}, this.DURATION, this.endMove.bind(this, n));
    }
  },
  endMove: function (n) {
    //删除move_imgs开头的n个元素,再拼到结尾
    move_imgs = move_imgs.concat(move_imgs.splice(0, n));
    this.updateView();//更新界面
    $("#move_imgs").css("left", 0);//设置#move_imgs的left为0
    //启用轮播
    this.autoMove();
  },
  updateView: function () {//将数组中的元素更新到页面
    //遍历move_imgs数组中每个图片数组,同时声明空字符串html
    for (var i = 0, html = "", idxs = ""; i < move_imgs.length; i++) {
      html += "<li><img src='" + move_imgs[i].img + "'></li>";
      idxs += "<li>" + (i + 1) + "</li>";
    }
    //设置id为move_imgs的内容为html,设置其宽为LIWIDTH*move_imgs个数
    $("#move_imgs").html(html).css("width", this.LIWIDTH * move_imgs.length);
    $("#indexs").html(idxs);//设置id为indexs的内容为idxs
    //获得#indexs下的和move_imgs中第一个元素的i属性对应 的li,
    //设置器class为hover,选择兄弟中的class为hover的li,清除其class
    $("#indexs>li:eq(" + move_imgs[0].i + ")").addClass("hover").siblings(".hover").removeClass("hover");
  }
};
banner_right.init();
//-----------------------------------------------------------
//优购楼层电梯
var elevator = {
  FHEIGHT: 0,//保存楼层的亮度
  UPLEVEL: 0,//保存亮灯区域上边界距文档显示区顶部的距离,
  DOWNLEVEL: 0,//保存亮灯区域下边界距文档显示区顶部的距离,
  DURATION: 1000,
  init: function () {
    this.FHEIGHT =parseFloat($("#bigShow_1f").css("height")) + parseFloat($("#bigShow_1f").css("marginBottom"));//#f1的高+f1的marginBottom
    console.log(this.FHEIGHT);
    this.UPLEVEL = (window.innerHeight - this.FHEIGHT) / 2;
    //(innerHeight-FHIEGHT)/2
    this.DOWNLEVEL = this.UPLEVEL + this.FHEIGHT;//UPLEVEL+FHEIGHT
    //为ducument绑定scroll事件为scroll方法
    $(document).scroll(this.scroll.bind(this));
    //debugger;
    //为#elevator下的ul添加mouseover事件代理,只有li	才能响应事件

    $("#elevator>ul").on("mouseover", "li", function (e) {
      //	获得目标元素$target
      var $target = $(e.target);
      if (e.target.nodeName == "A") {
        $target = $target.parent();
      }
      //对应的target中显示第2个a,隐藏第1个a
      $target.children(":first").hide();
      $target.children(":last").show().addClass('hover');
    });

    $("#elevator>ul").on("mouseout", "li", function (e) {
      //	获得目标元素$target
      var $target = $(e.target);
      if (e.target.nodeName == "A") {
        e.preventDefault();
        $target = $target.parent();
      }
      //获得$target在ul下的下标
      var i = $target.index("#elevator>ul>li");
      //查找所有.floor下的header下的span取第i个
      var $span = $(".topic_floor>a:eq(" + i + ")");
      //如果span的class不是hover
      if (!$span.hasClass("changeColor")) {
        $target.children(":first").show();
        $target.children(":last").hide();

      }
    });
    //为#elevator下的ul添加click事件代理,只有li下的class为etitle的a才能响应
    $("#elevator>ul").on("click", "li>a.etitle", function (e) {
      console.log(e);
      //停止body上的动画,清空队列
      $("body").stop(true);
      //获得目标元素的父元素$li
      var $li = $(e.target).parent();
      //获得$li下的所有的li中的下标i
      var i = $li.index("#elevator>ul>li");
      //查找.floor下的header下的span中第i个$span
      var $a = $(".topic_floor>a:eq(" + i + ")");
      console.log($a);
      //启动动画,让body在DURATION时间内,滚动到$span距离页面顶部总距离-UPLEVEL
      $("body").animate({scrollTop: $a.offset().top - this.UPLEVEL}, this.DURATION);
    }.bind(this));

  },
  scroll: function () {//响应document的scroll事件

    //查找topic_floor>a,对每个元素执行:
    $(".topic_floor>a").each(function (i, elem) {
      //function(i){i:的下标 ,elem:DOM元素}
      //获取 当前元素距离页面的总距离totalTop
      var totalTop = $(elem).offset().top;
      //获取body滚动过的距离scrollTop
      var scrollTop = $("body").scrollTop();
      //totalTop-scrollTop保存在innerTop中
      var innerTop = totalTop - scrollTop;

      //如果innerTop大于UPLEVEL而且小于等于DOWNLEVEL
      if (innerTop > this.UPLEVEL && innerTop <= this.DOWNLEVEL) {
        //设置当前元素的class为hover
        $(elem).addClass("hover");
        //对应的li中显示第二个a,隐藏第一个a
        $("#elevator>ul>li:eq(" + i + ")>a:first").hide();
        $("#elevator>ul>li:eq(" + i + ")>a:last").show().addClass('hover');

      } else {
        //否则
        //移除当前元素的hover类
        $(elem).removeClass("hover");
        $("#elevator>ul>li:eq(" + i + ")>a:first").show();
        $("#elevator>ul>li:eq(" + i + ")>a:last").hide().addClass('hover');

      }
    }.bind(this));
    //查找.floor下的header下的span中class为hover的,如果找到,就设置#elevator显示,否则隐藏
    //$(".topic_floor>a.hover").length>0?$("#elevator").show():$("#elevator").hide();
  }

};
elevator.init();


//动态加载楼层
$.ajax({
  type: 'GET',
  url: 'data/yg_floor.php',
  data: "name=10001",
  success: function (list) {
    console.dir(list);
    var html = '';
    jQuery.each(list, function (key, floorList) {
      console.log(floorList);
      html += `<div id="yg_floor">
    <div class="topic_floor"><a>${floorList.yg_floor}</a>
      <p><a href="#">MORE &gt;&gt;</a></p></div>
    <div class="bigShow">
      <div class="floor_lf">
        <div class="hook_img"><img src="${floorList.yg_sortImg}" alt=""/></div>
        <ul>
          <li>`;
      $.each(floorList.brand, function (key, brandList) {
        //console.log(brandList);
        html += `<a><img src="${brandList.b_img}" alt=""/></a>`;
      });
      html += `</li>
        </ul>
      </div>
      <div class="floor_rt">
        <div class="floor_rt_mid"><img src="${floorList.yg_bigImg}" alt=""/></div>
        <div class="floor_rt_rt">
          <ul><li>`;
      $.each(floorList.product, function (key, proWallList) {
        //console.log(proWallList);
        html += `<img src="${proWallList.w_img}" alt=""/>`;
        if (key == 2) {
          html += `</li><li>`;
        }
      });
      html += `</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>`;
      html += `</li></ul></div></div></div></div>`;
    });
    $('#yg_floor').html(html);
  }
});
//ajax加载图标库


