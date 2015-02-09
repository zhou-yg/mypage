<?php
class Urls_update extends Controller{
	function __construct(){
		parent::__construct(TRUE);
	}
	
	public function set_param($param){
		$result = TRUE;
		$data = null;
		
		$paramObj = json_decode($param);

		if(property_exists($paramObj, 'type')){
			$type = $paramObj->type;
			switch ($type) {
				case 'get':
					$data = $this->get();
					break;
				default:
					break;
			}
		}else{
			$result = FALSE;
			$data = 'urls param doesnt have type propery';
		}
		return array(
			'result' => $result,
			'data' => $data
		);
	}
	private function get(){
		$urls = '[{"header":"社区","urls":[{"url":"http:\/\/www.zhihu.com\/","name":"知乎"},{"url":"http:\/\/www.acfun.tv\/v\/list63\/index.htm","name":"AC文章"},{"url":"http:\/\/tieba.baidu.com\/","name":"贴吧"},{"url":"http:\/\/weibo.com\/","name":"新浪微博"}]},{"header":"直播","urls":[{"url":"http:\/\/www.douyutv.com\/","name":"斗鱼"},{"url":"http:\/\/zhanqi.tv\/","name":"战棋"},{"url":"http:\/\/www.huomaotv.com\/","name":"火猫"},{"url":"http:\/\/www.kktv5.com\/","name":"KK游戏"}]},{"header":"视频","urls":[{"url":"http:\/\/www.acfun.tv\/","name":"AcFun"},{"url":"http:\/\/www.bilibili.com\/","name":"B站"},{"url":"http:\/\/www.youku.com\/i\/","name":"优酷"},{"url":"http:\/\/www.tudou.com\/","name":"土豆"}]}]';
		return json_decode($urls);		
	}
	private function update($param){
		if(property_exists($param, 'urls')){
			$urls = $param->urls;
			return $urls;
		}
	}
}
?>