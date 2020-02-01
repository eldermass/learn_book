<?php
// 用名字来填充数组
$a=array(123,5235,346457,658,6789,90,657,34,12,3,3124);

$q=$_GET["x"];

//如果 q 大于 0，则查找数组中的所有提示
if (strlen($q) > 0)
  {
  $hint="";
  for($i=0; $i<count($a); $i++)
    {
    if($q==substr($a[$i],0,strlen($q)))
      {
      if ($hint=="")
        {
        	$hint=$a[$i];
        }
      else
        {
       		$hint=$hint." , ".$a[$i];
        }
      }
    }
  }

// 如果未找到提示，则把输出设置为 "no suggestion"
// 否则设置为正确的值
if ($hint == "")
  {
  $res="no suggestion";
  }
else
  {
  $res=$hint;
  }

//输出响应
echo $res;
?>