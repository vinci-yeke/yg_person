<?php
 header('Content-Type:application/json');
 include('config.php');
 $name=$_REQUEST['uname'];
 $upwd=$_REQUEST['upwd'];
  $link=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
  mysqli_query($link,'set names utf8');
  if(!$name&&!$upwd){
  echo '[]';
  return; }
  $sql="select u_id from yg_user where u_name='$name' and u_pwd='$upwd'";
  $result=mysqli_query($link,$sql);
   $row=mysqli_fetch_assoc($result)['u_id'];
   $output=[];
  if($row){
    $output[]='ok';
    $output[]=$name;
    $output[]=$row;
    echo json_encode($output);
  }else{
  $output[]='err';
  echo json_encode($output);
  }

