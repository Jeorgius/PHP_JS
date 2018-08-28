<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 07.05.2018
 * Time: 9:54
 */

//namespace Tooler;


class tools
{
    public static function clean($i){
        $i = trim($i);
        $i = strip_tags($i);
        $i = htmlentities($i);
        return stripslashes($i);
    }
}