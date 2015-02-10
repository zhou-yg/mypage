<?php
//可以是这种形式绑定
$fn_map = array(
	1001 => 'A.php',
	1100 => 'urls/urls_update.php'
);
/*--------------- 以上不需要new SqlOp --------------------*/
/*--------------- 以下上需要new SqlOp --------------------*/
//也可以这种形式绑定
$fn_map[2001]  = 'user/user_add.php';
$fn_map[2002]  = 'urls/urls_update.php';

return $fn_map;
?>
