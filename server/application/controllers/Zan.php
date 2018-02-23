<?php

use QCloud_WeApp_SDK\Constants as Constants;
use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use \QCloud_WeApp_SDK\Helper\Util as Util;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Zan extends CI_Controller {

    public $returnCode = -2;
    public $data = array();

    //获取默认的company
    public function index() {
        //先检查登录状态，避免外部入侵
        $loginResult = LoginService::check();
        //获取对应的id值
        $contents = Util::getPostPayload();
        $body = json_decode($contents, TRUE);
        //不符合条件的话，直接返回false
        if ($loginResult['loginState'] === Constants::S_AUTH && $loginResult['userinfo']['openId'] && !empty($body['id'])) {
            //获取这个用户的权限
            $f_open_id = $loginResult['userinfo']['openId'];
            $f_word_id = $body['id'];
            $conditions = "f_word_id=" . $f_word_id . " and f_open_id='" . $f_open_id . "'";
            $zanArray = DB::row('t_zan', ['*'], $conditions);
            //如果没有数据，说明是点赞，并且要新增数据
            if (empty($zanArray)) {
                $f_del_flag = 1;
                //在记录表中加入数据
                DB::insert('t_zan', compact('f_open_id', 'f_word_id', 'f_del_flag'));
            } else {
                $f_del_flag = empty($zanArray->f_del_flag) ? 1 : 0;
                DB::update(
                        't_zan', compact('f_del_flag'), compact('f_open_id', 'f_word_id')
                );
            }
            //f_word表增加或者减少赞的数量
            $f_zan = empty($f_del_flag) ? 'f_zan-1' : 'f_zan+1';
            $f_id = $f_word_id;
            $sql = "UPDATE `t_word` SET f_zan = ".$f_zan." WHERE f_id = :f_id ";
            DB::raw(
                    $sql, array(':f_id'=>$f_id)
            );
            $this->data = $f_del_flag;
            $this->returnCode = 1;
        }
        $this->json([
            'code' => $this->returnCode,
            'data' => $this->data
        ]);
    }

}
