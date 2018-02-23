<?php

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Helper\Util as Util;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Tucaolist extends CI_Controller {

    public $returnCode = -1;
    public $data = '';
    public $pageSize = 30;


    public function index() {
        //先检查登录状态，避免外部入侵
        $loginResult = LoginService::check();
        if ($loginResult['loginState'] === Constants::S_AUTH && $loginResult['userinfo']['openId'] 
                && !empty($loginResult['f_company_ids'])) {
            //根据用户的openID确定用户的权限
            $company = $loginResult['f_company_ids'];
            //有指定的categoryId，优先使用 categoryId
            $contents = Util::getPostPayload();
            $body = json_decode($contents, TRUE);
            $categoryId = intval($body['categoryId']);
            if (isset($categoryId) && !empty($categoryId)) {
                $company = $categoryId;
            }
            //获取页数-暂时不做这个需求，我准备先把这个需求发布，看看有没有人用。
            //根据company_id获取数据
            $conditions = "f_company_id in (" . $company . ") and f_cai<10";
            $suffix = "order by f_id desc limit 300";
            $this->data = DB::select('t_word', ['f_id,f_company_id,f_desc,f_zan,f_cai,f_timestamp'], $conditions,
                    'and', $suffix);
            $this->returnCode = 1;
        }
        $this->json([
            'code' => $this->returnCode,
            'data' => $this->data
        ]);
    }

}
