<?php
/*
 * 
 * 
 */
class Urls_update extends Controller{
	
	private $urlsTname = 'user_urls';
	
	function __construct(){
		parent::__construct(TRUE);
	}
	
	public function set_param($paramArr){
		$result = TRUE;
		$data = null;
		
		
		if(isset($paramArr['type'])){
			$type = $paramArr['type'];
			switch ($type) {
				case 'init':
					$data = $this->init();
					break;
				case 'get':
					$data = $this->get();
					break;
				case 'update':
					$data = $this->update($paramArr);
					break;
				default:
					break;
			}
		}else{
			$result = FALSE;
			$data = 'urls param doesnt have type propery or paramObj isnt a Array or Object';
		}
		return array(
			'result' => $result,
			'data' => $data
		);
	}
	//默认
	private function defaults(){
		$urls = '[{"header":"社区","urls":[{"url":"http:\/\/www.zhihu.com\/","name":"知乎"},{"url":"http:\/\/www.acfun.tv\/v\/list63\/index.htm","name":"AC文章"},{"url":"http:\/\/tieba.baidu.com\/","name":"贴吧"},{"url":"http:\/\/weibo.com\/","name":"新浪微博"}]},{"header":"直播","urls":[{"url":"http:\/\/www.douyutv.com\/","name":"斗鱼"},{"url":"http:\/\/zhanqi.tv\/","name":"战棋"},{"url":"http:\/\/www.huomaotv.com\/","name":"火猫"},{"url":"http:\/\/www.kktv5.com\/","name":"KK游戏"}]},{"header":"视频","urls":[{"url":"http:\/\/www.acfun.tv\/","name":"AcFun"},{"url":"http:\/\/www.bilibili.com\/","name":"B站"},{"url":"http:\/\/www.youku.com\/i\/","name":"优酷"},{"url":"http:\/\/www.tudou.com\/","name":"土豆"}]}]';
		return json_decode($urls);		
	}
	//初始化
	private function init(){
		$urlArr = $this->defaults();
		$urlStr = serialize($urlArr);
		
		$tname = $this->urlsTname;
		
		$insertSql = "INSERT INTO $tname VALUES (NULL,1,'$urlStr')";
		$this->SqlOp->queryTo($insertSql);

		return $this->SqlOp->result;
	}
	private function get(){
		$tname = $this->urlsTname;

		$getSql = "select urls from $tname where user_id=1";
		$this->SqlOp->queryTo($getSql);

		$urlStr = $this->SqlOp->get_result();
		
		return unserialize($urlStr[0]);
	}
	private function update($param){
		if(isset($param['urls'])){
			$urls = $param['urls'];
				
			$urlStr = serialize(json_decode($urls));

			$tname = $this->urlsTname;
			
			$updateSql = "UPDATE $tname SET urls='$urlStr' ";
			$this->SqlOp->queryTo($updateSql);
			
			return 'success';
		}else{
			return 'param doesnt has urls ';	
		}
	}
}
?>