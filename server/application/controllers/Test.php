<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use \QCloud_WeApp_SDK\Auth\LoginService as LoginService;
use QCloud_WeApp_SDK\Constants as Constants;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Test extends CI_Controller {

    public function index() {
        die();
        $company = '1,3,4';
        //
        $conditions = "f_company_id in (" . $company . ")";
        $result = DB::select('t_word', ['f_id,f_company_id,f_desc,f_zan,f_cai,f_timestamp'], $conditions);
        var_dump($result);
        die();
        $skey = '';
        if (!empty($_GET['skey'])) {
            $skey = $_GET['skey'];
        }
        $open_id = DB::row('cSessionInfo', ['open_id'], compact('skey'));
        if ($open_id === NULL) {
            echo 111;
        }
        var_dump($open_id);
        $f_author = $open_id->open_id;
        var_dump($f_author);

        $today = date('Y-m-d 00:00:00');
        $tomorrow = date('Y-m-d 24:00:00');
        $conditions = "f_author=' . $f_author . ' and f_timestamp>='" . $today . "' "
                . "and f_timestamp<='" . $tomorrow . "'";
        $todayNumber = DB::select('t_word', ['count(*) as count'], $conditions);

        var_dump($todayNumber);
        die();

        $f_desc = '111111111';
        $f_company_id = 1;
        $f_zan = 0;
        $f_cai = 0;
        DB::insert('t_word', compact('f_company_id', 'f_desc', 'f_zan', 'f_cai', 'f_author'));

        die();
        $data = array(
            "name" => "Lei",
            "msg" => "Are you OK?"
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, "http://scuuprn0.qcloud.la/weapp/add");
        curl_setopt($ch, CURLOPT_POST, 1);
        //The number of seconds to wait while trying to connect. Use 0 to wait indefinitely.
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $output = curl_exec($ch);

        echo $output;

        curl_close($ch);
    }

}
