<?php
 header('Content-Type:application/json');
 include('config.php');
  $name=$_REQUEST['name'];
  $page=$_REQUEST['page'];
  $count=$_REQUEST['count'];
  //连接数据库
  $link=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
  mysqli_query($link,'set names utf8');
   if($name!=10002){
   echo '请求发送失败';
   return; }
$brandList=[
 'recordCount'=>0, //当前记录数
 'msg'=>'err',   //
 'count'=>intval($count),  //页面大小
 'data'=>null,
 'page'=>0      //总页数
];
$sql="select count(*) from yg_allbrand ";
$result=mysqli_query($link,$sql);
$num=mysqli_fetch_assoc($result)['count(*)'];
$brandList['page']=ceil(intval($num)/$brandList['count']);
$startNum=(intval($page)-1)*$brandList['count']+1;
$endNum=intval($page)*$brandList['count'];
$sql="select a_name,a_img from yg_allbrand where a_id<=$endNum and a_id>=$startNum";
$result=mysqli_query($link,$sql);
while(true){
$list=mysqli_fetch_assoc($result);
if($list){
$brandList['data'][]=$list;
 }else{
break;}
}

$brandList['recordCount']=intval($page);

$brandList['page'];

 $brandList['msg']='succ';

//print_r($brandList);

echo json_encode($brandList);