<?php
	echo "hello";
	$sqlOp = include 'SqlOp.php';
	$connectTo = $sqlOp->connectTo();
	if ($connectTo) {
		$queryResult = $sqlOp->queryTo('select *from perSonalWebInfoTable');
		if ($queryResult) {
			$webSitInfoArray = mysql_fetch_array($sqlOp->result);
			header ("Content-type: application/json");
		echo json_encode($webSitInfoArray);
		}
	}
?>
