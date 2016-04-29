<?php
class Response {

    public function setContent($url){
        $resArr = array(
            'url' => $url
        );
        $res = json_encode($resArr);
        return $res;
    }
}

