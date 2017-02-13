<?php
 header('Content-Type:application/json');
 include('config.php');
 //定义一个对象数组来接受从表里查询到的数据
 $floorList=[];
 $name=$_REQUEST['name'];
 //连接数据库
 $link=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
 mysqli_query($link,'set names utf8');
 //print_r($name);
 if($name!=10001){
 echo '请求发送失败';
 return; }
 //获得楼层得到循环次数
 $sql="select count(*) from yg_floor";
 $result=mysqli_query($link,$sql);
 $num=mysqli_fetch_assoc($result)['count(*)'];
 //print_r($num);

//循环获得所有的楼层数
for($i=1;$i<=$num;$i++){
//查询楼层表
//数据库下标定义从1开始
$sql="select yg_floor,yg_sortImg,yg_bigImg,yg_sort from yg_floor where yg_id=$i";
$result=mysqli_query($link,$sql);
$list=mysqli_fetch_assoc($result);
$yg_sort=$list['yg_sort'];
    //print_r($list['yg_sort']);
    
    
//查询品牌表
$sql="select w_img from yg_prowall where w_sort='$yg_sort'";
$result=mysqli_query($link,$sql);
while(true){
$product=mysqli_fetch_assoc($result);
if($product){
$list['product'][]=$product;
     
 }else{
break;}
} 
   
//查询图标表
$sql="select b_name,b_img ,b_sort from yg_brand where b_sort='$yg_sort'";
$result=mysqli_query($link,$sql);
while(true){
$brand=mysqli_fetch_assoc($result);
if($brand){
$list['brand'][]=$brand;
 }else{
break;}
}

$floorList[count($floorList)]=$list;
}
if($floorList!=null){
echo json_encode($floorList);
}else{
echo '查询语句有问题';
}