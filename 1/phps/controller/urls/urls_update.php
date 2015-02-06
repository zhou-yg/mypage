<?php
class Urls_update extends Controller{
	function __construct(){
		parent::__construct(TRUE);
	}
	
	public function set_param($param){
		
		return $this->update(json_decode($param));
	}
	private function update($param){
		if(property_exists($param, 'urls')){
			$urls = $param->urls;
			return $urls;
		}
	}
}
?>