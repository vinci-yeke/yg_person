<?php
include('config.php');
header('Content-Type:application/json');
$key=$_REQUEST['keywords'];
$link=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
//$key='n';
if(!$key){
echo "err";
return ;
}
mysqli_query($link,'set names utf8');
$sql="select p_name , p_kind,p_img,p_details,p_price from yg_product where p_name or p_kind or p_details like '%$key%' ";
$result=mysqli_query($link,$sql);
$list=[];
while(true){
    $row=mysqli_fetch_assoc($result);
     if(!$row){
         break;
            }
     else{
         $list[]=$row;
          }
}
//print_r($list);
echo json_encode($list);
