<?php

use QCloud_WeApp_SDK\Constants as Constants;
use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use \QCloud_WeApp_SDK\Helper\Util as Util;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Care extends CI_Controller {

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
            $company = $loginResult['f_company_ids'];
            $careCompany = !empty($company)?explode(',', $company):array();
            //获取本次要更新的id
            if (in_array($body['id'], $careCompany)) {
                foreach ($careCompany as $cakey1 => $cavalue1) {
                    if ($body['id'] == $cavalue1) {
                        unset($careCompany[$cakey1]);
                    }
                }
            } else {
                $careCompany[] = $body['id'];
            }
            //将数组转成字符，并且保存在数据库中
            $f_company_ids = implode(',', $careCompany);
            $open_id = $loginResult['userinfo']['openId'];
            DB::update(
                'cSessionInfo',
                compact('f_company_ids'),
                compact('open_id')
            );
            //先换取所有的公司信息
            $allCompany = DB::select('t_company', ['*']);
            //重新整合这个用户的关心列表
            foreach ($allCompany as $ckey => $cvalue) {
                $this->data[$ckey]['f_id'] = $cvalue->f_id;
                $this->data[$ckey]['f_name'] = $cvalue->f_name;
                $this->data[$ckey]['f_care_flag'] = (in_array($cvalue->f_id, $careCompany)) ? 1 : 0;
            }
            $this->returnCode = 1;
        }
        $this->json([
            'code' => $this->returnCode,
            'data' => $this->data
        ]);
    }

}
