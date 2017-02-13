<?php
header("Content-Type:application/json;charset:utf8");
include("config.php");
$link=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];
$email=$_REQUEST['uemail'];
$uphone=$_REQUEST['uphone'];
if(empty($uname)){
echo '[]';
return;
}
$sql="insert into yg_user values(null,'$uname','$upwd','$email','$uphone')";
//$sql="insert into yg_user values(null,'ytk','123456','772967050@qq.com','18671779660')";
$result=mysqli_query($link,$sql);
$uid=mysqli_insert_id($link);
$output=[];
if($result!=false){
	$output['msg']='succ';
	$output['uid']=$uid;
	echo json_encode($output);
}else{
	$output['msg']='err';
	$output['sql']="INSERT...";
	echo json_encode($output);
}

