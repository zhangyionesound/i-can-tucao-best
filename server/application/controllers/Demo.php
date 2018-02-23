<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends CI_Controller {
    public function index() {
        $getInfo = json_encode($_REQUEST);
        $this->json([
            'code' => 0,
            'data' => [
                'msg' => 'Hello World-媳妇是个小宝贝',
                'getmsg' => $getInfo
            ]
        ]);
    }
}