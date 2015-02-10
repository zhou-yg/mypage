<?php
class SqlOp extends Model{
	
	private $adress;
	private $port = ":3306";
	private $account;
	private $password;
	
	private $db;
	private $db_name = 'mypage';

	public $connect;
	public $result;
		
	function __construct() {
		$this->adress = "127.0.0.1".$this->port;
		$this->account = "root";
		$this->password = 123456;
		
		$this->connectTo();
	}
	public function setProperty($_ad,$_ac,$_ps,$_dbName){
		$this->adress = $_ad.$this->port;
		$this->account = $_ac;
		$this->password = $_ps;
		$this->db_name = $_dbName;
		return TRUE;
	}
	public function connectTo(){
		$this->connect = mysql_connect($this->adress,$this->account,$this->password);
		mysql_set_charset('utf8',$this->connect);
		if($this->connect){
			$this->db = mysql_select_db($this->db_name);
			if($this->db){
				return TRUE;
			}else{
				return FALSE;
			}
		}else{
			return FALSE;
		}
	}
	public function queryTo($_str){
		$this->result = mysql_query($_str,$this->connect);
		if($this->result!=FALSE){
			return TRUE;
		}else{
			return FALSE;
		}
	}
	public function get_result(){
		return mysql_fetch_array($this->result);
	}
	public function close(){
		mysql_close($this->connect);
	}
	public function reset(){
		$this->result = null;
	}
}
$sqlOp = new SqlOp();
return $sqlOp;
?>
