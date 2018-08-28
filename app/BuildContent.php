<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 04.07.2018
 * Time: 6:41
 */
//include ('BuildLeftbar.php');
//include ('BuildRightbar.php');
include ('BuildPage.php');
include ('user.php');
use Profile\user as user;

class BuildContent
{
    //public $htmlroot = 'http://mysite/';

    public function getData($typeC, $incomingType = '', $editingAbility = 0)
    {
        $root = $_SERVER['DOCUMENT_ROOT'];
        if ($typeC === 'main' or
            $typeC === 'music' or
            $typeC === 'photos' or
            $typeC === 'store' or
            $typeC === 'users') {
            $data = json_decode(file_get_contents($root . '/data/' . $typeC . '.json'));
        }
        elseif ($incomingType === 'profile') {
            $nickname = $typeC;
            if($editingAbility === 1) {
                $data['free'] = json_decode(file_get_contents($root.'/user/_'.$nickname.'/'.$nickname.'_F.json'));
                $data['secure'] = json_decode(file_get_contents($root.'/user/_'.$nickname.'/'.$nickname.'_S.json'));
            } else {
                $data['free'] = json_decode(file_get_contents($root.'/user/_'.$nickname.'/'.$nickname.'_F.json'));
            }
        }
        elseif ($incomingType === 'product') {
            $sku = $typeC;
            $data['free'] = file_get_contents($root.'/_'.$sku.'/'.$sku.'.json');
        }
        elseif ($typeC === 'about' or $typeC === 'register') {
            $data = file_get_contents($root . '/template/c_'. $typeC .'.html');
        }
        else {
            $data = '';
    }
        return $data;
    }
}