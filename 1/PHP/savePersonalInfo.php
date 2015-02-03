<?php 	

function insertWebSitInfos($websitIds,$websitNames,$websitUrls,$websitCategorys) {
	for ($i = 0;$i < count($websitNames);$i ++) {
		insertWebSitInfo($websitIds[i], $websitNames[i], $websitUrls[i], $websitCategorys[i]);
	}
}

function insertWebSitInfo($websitId,$websitName,$wesitUrl,$websitCategory) {
	$queueResule = $sqlOp->queryTo("insert into perSonalWebInfoTable values(null,'$websitName','$websitCategory','$websitUrl')");
	return $queueResule;
}

function initSqlOpAndWrite() {
	$sqlOp = include 'SqlOp.php';
	$connect = $sqlOp->connectTo();
	if($connect) {
		$post = $_POST;
		$websitUrl = $post["websitUrl"];
		$websitName = $post["websitName"];
		$websitCategory = $post["websitCategory"];
		insertWebSitInfos(null,$websitName,$websitUrl,$websitCategory);
		echo json_decode($websitName);
	}
}
initSqlOpAndWrite();
?>
