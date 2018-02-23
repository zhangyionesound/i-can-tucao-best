<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use \QCloud_WeApp_SDK\Helper\Util as Util;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Add extends CI_Controller {

    public $returnCode = -1;
    public $data = '';

    public function index() {
        //先检查登录状态，避免外部入侵
        $result = LoginService::check();
        //如果登录正常，并且有openid的话
        if ($result['loginState'] === Constants::S_AUTH && $result['userinfo']['openId']) {
            $f_author = $result['userinfo']['openId'];
            //一天如果吐槽太多次，达到上限就不能吐槽了
            $today = date('Y-m-d 00:00:00');
            $tomorrow = date('Y-m-d 24:00:00');
            $conditions = "f_author='" . $f_author . "' and f_timestamp>='" . $today . "' "
                    . "and f_timestamp<='" . $tomorrow . "'";
            $todayNumber = DB::row('t_word', ['count(*) as count'], $conditions);
            //var_dump($todayNumber->count,$todayNumber->count < Constants::MAX_ADD_NUMBER);die();
            //一天最多可以吐槽5条
            if (isset($todayNumber->count) && ($todayNumber->count < Constants::MAX_ADD_NUMBER)) {
                //如果没有达到上限就新增一条吐槽数据，并且返回结果
                $contents = Util::getPostPayload();
                $body = json_decode($contents, TRUE);
                $f_desc = $body['text'];
                $f_company_id = intval($body['companyId']);
                $f_zan = 0;
                $f_cai = 0;
                DB::insert('t_word', compact('f_company_id', 'f_desc', 'f_zan', 'f_cai', 'f_author'));
                //一判断是否要更新cSessionInfo，如果cSessionInfo的f_company_ids已经有就不需要更新，没有就要更新
                //（1）首先获取这个用户的权限
                $company = $result['f_company_ids'];
                $careCompany = !empty($company) ? explode(',', $company) : array();
                //（2）获取本次要更新的id,如果不在已经关注的数组里面就更新进去
                if (!in_array($f_company_id, $careCompany)) {
                    $careCompany[] = $f_company_id;
                    $f_company_ids = implode(',', $careCompany);
                    $open_id = $result['userinfo']['openId'];
                    DB::update(
                            'cSessionInfo', compact('f_company_ids'), compact('open_id')
                    );
                }
                //获取用户的关心列表（1）先换取所有的公司信息
                $allCompany = DB::select('t_company', ['*']);
                //（2）重新整合这个用户的关心列表
                foreach ($allCompany as $ckey => $cvalue) {
                    $this->data[$ckey]['f_id'] = $cvalue->f_id;
                    $this->data[$ckey]['f_name'] = $cvalue->f_name;
                    $this->data[$ckey]['f_care_flag'] = (in_array($cvalue->f_id, $careCompany)) ? 1 : 0;
                }
                $this->returnCode = 1;
            } else {
                $this->returnCode = -2;
            }
        }
        $this->json([
            'code' => $this->returnCode,
            'data' => $this->data
        ]);
    }

}
