<?php


class RegExp{
    //去除字符串空格
    static function strTrim($str)
    {
        return preg_replace("/\s/","",$str);
    }

//    //验证用户名
//    static function userName($str,$type,$len)
//    {
//        $str=self::strTrim($str);
//        if($len<strlen($str))
//        {
//            return false;
//        }else{
//            switch($type)
//            {
//                case "EN"://纯英文
//                    if(preg_match("/^[a-zA-Z]+$/",$str))
//                    {
//                        return true;
//                    }else{
//                        return false;
//                    }
//                    break;
//                case "ENNUM"://英文数字
//                    if(preg_match("/^[a-zA-Z0-9]+$/",$str))
//                    {
//                        return true;
//                    }else{
//                        return false;
//                    }
//                    break;
//                case "ALL":    //允许的符号(|-_字母数字)
//                    if(preg_match("/^[\|\-\_a-zA-Z0-9]+$/",$str))
//                    {
//                        return true;
//                    }else{
//                        return false;
//                    }
//                    break;
//            }
//        }
//    }
//
//    //验证密码长度
//    static function passWord($min,$max,$str)
//    {
//        $str=self::strTrim($str);
//        if(strlen($str)>=$min && strlen($str)<=$max)
//        {
//            return true;
//        }else{
//            return false;
//        }
//    }
//
//    //验证Email
//    static function Email($str)
//    {
//        $str=self::strTrim($str);
//
//        if(preg_match("/^([a-z0-9_]|\\-|\\.)+@(([a-z0-9_]|\\-)+\\.){1,2}[a-z]{2,4}$/i",$str))
//        {
//            return true;
//        }else{
//            return false;
//        }
//
//    }
//
//    //验证身份证(中国)
//    static function idCard($str)
//    {
//        $str=self::strTrim($str);
//        if(preg_match("/^([0-9]{15}|[0-9]{17}[0-9a-z])$/i",$str))
//        {
//            return true;
//        }else{
//            return false;
//        }
//    }
//
//    //验证座机电话
//    static function Phone($type,$str)
//    {
//        $str=self::strTrim($str);
//        switch($type)
//        {
//            case "CHN":
//                if(preg_match("/^([0-9]{3}|0[0-9]{3})-[0-9]{7,8}$/",$str))
//                {
//                    return true;
//                }else{
//                    return false;
//                }
//                break;
//            case "INT":
//                if(preg_match("/^[0-9]{4}-([0-9]{3}|0[0-9]{3})-[0-9]{7,8}$/",$str))
//                {
//                    return true;
//                }else{
//                    return false;
//                }
//                break;
//        }
//    }

    static function VehicleSimID($str){
        $str = self::strTrim($str);
        //if(preg_match("/^8\.[0-9]+E\+11$/", $str)){
        if(preg_match("/^8\.[0-9]+E$/", $str)){
            return true;
        }
        else{
            return false;
        }
    }

    static function PassengerState($str){
        if($str === "1" || $str === "0"){
            return true;
        }
        else return false;
    }
}

?>