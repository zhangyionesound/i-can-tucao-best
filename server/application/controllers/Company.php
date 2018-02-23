<?php

use QCloud_WeApp_SDK\Constants as Constants;
use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Company extends CI_Controller {

    public $returnCode = -2;
    public $data = '';

    //获取默认的company
    public function index() {
        //先检查登录状态，避免外部入侵
        $loginResult = LoginService::check();
        if ($loginResult['loginState'] === Constants::S_AUTH && $loginResult['userinfo']['openId']) {
            //先换取所有的公司信息
            $allCompany = DB::select('t_company', ['*']);
            //获取这个用户的权限
            $company = $loginResult['f_company_ids'];
//            var_dump($allCompany,$company);
            $careCompany = explode(',', $company);
//            var_dump($careCompany);
            $data = array();
            foreach ($allCompany as $ckey => $cvalue) {
                $data[$ckey]['f_id'] = $cvalue->f_id;
                $data[$ckey]['f_name'] = $cvalue->f_name;
                $data[$ckey]['f_care_flag'] = (in_array($cvalue->f_id, $careCompany))?1:0;
            }
//            var_dump($data);
//            $conditions = "f_id in (" . $company . ")";
            $this->data = $data;
            $this->returnCode = 1;
        }
        $this->json([
            'code' => $this->returnCode,
            'data' => $this->data
        ]);
    }

}
