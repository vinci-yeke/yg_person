/**
 * Created by yk on 2016/11/9.
 */
var getList = {
  init: function () {
    $.ajax({
      type: 'GET',
      url: 'data/yg_list.php',
      data: 'keywords=' + sessionStorage.getItem('key'),
      success: function (data) {
        console.log(data);
        var html = '';
        $.each(data, function (key, value) {
          html += `<div class="sort_pic">
        <ul>
          <li><img src="images/${value.p_img}" alt="${value.p_id}"/></li>
          <li>限时抢&yen;</li>
          <li>${value.p_details}</li>
          <li><b>&yen;${value.p_price * 0.8.toFixed(0)}</b><i>&yen;${value.p_price}</i></li>
        </ul>
      </div>`;
        });
        $('#productList').html(html);
        $('.sort_pic').click(function(){
          var alt_id=$(this).find('ul>li>img').attr('alt');
          sessionStorage.setItem('p_id',alt_id);
          location.href="productDetail.html";
          //todo:turn to detail page

          //console.log($(this).children('ul').children('li').children('img').attr('alt'));
          //if(e.target.nodeName!=IMG){}
          //console.log($(e.target).attr('alt'))
        });
      }
    })
  }
};
getList.init();
var allProductSort={
  init:function(){
    $('#allSort').click(function(){
      console.log('123');
    });
  }
}
allProductSort.init();