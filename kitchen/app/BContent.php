<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 04.07.2018
 * Time: 6:41
 */
//include ('BuildLeftbar.php');
//include ('BuildRightbar.php');
include ('user.php');
use Profile\user as user;

class BContent
{
    //public $htmlroot = 'http://mysite/';

    public function getData($typeC, $incomingType = '', $editingAbility = 0)
    {
        $root = $_SERVER['DOCUMENT_ROOT'];
        if ($typeC === 'music' or
            $typeC === 'photos' or
            $typeC === 'store' or
            $typeC === 'users') {
            $data = json_decode(file_get_contents($root . '/data/' . $typeC . '.json'));
        }
        elseif ($typeC === 'news') {
            $data = json_decode(file_get_contents($root.'/data/main.json'));
        }
        elseif ($typeC === 'about' or $typeC === 'register') {
            $data = file_get_contents($root . '/template/c_'. $typeC .'.html');
        }
        elseif ($typeC === 'addProduct') {
            $data = file_get_contents($root . '/template/addProduct.html');
        }
        elseif ($incomingType === 'profile') {
            $nickname = $typeC;
            if($editingAbility === 1) {
                $data['free'] = file_get_contents($root.'/user/'.$nickname.'/'.$nickname.'_F.json');
                $data['secure'] = file_get_contents($root.'/user'.$nickname.'/'.$nickname.'_S.json');
            } else {
                $data['free'] = file_get_contents($root.'/user/'.$nickname.'/'.$nickname.'_F.json');
            }
        }
        elseif ($incomingType === 'products') {
            $sku = $typeC;
            $data['free'] = file_get_contents($root . '/_' . $sku . '/' . $sku . '.json');
        }
        else {
            $data = '';
    }
        return $data;
    }
}