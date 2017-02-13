<?php
 header('Content-Type:text/plain');
 include('config.php');
 $name=$_REQUEST['name'];
  $link=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
  mysqli_query($link,'set names utf8');
  if(!$name){
  echo '请求发送失败';
  return; }
  $sql="select u_name from yg_user where u_name='$name'";
  $result=mysqli_query($link,$sql);
  $list=mysqli_fetch_assoc($result);
  if(!$list){
   echo "ok";
  }else{
    echo "exit";
  }