<?php
header("Content-Type:application/json");
$code="abcdefghjklmnopqrstuvwxyz3456789";
$arry=[];
for($i=0;$i<5;$i++){
$arry[$i]=$code[rand(0,strlen($code)-1)];
}
echo json_encode($arry);