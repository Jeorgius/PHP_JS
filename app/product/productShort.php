<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 17.07.2018
 * Time: 15:42
 */
include_once ('productBase.php');
use productSpace\productBase;

class productShort extends productBase
{
    public $sku;
    public $title;
    public $price;
    public $pn;
    public $picHTML;

    public function __construct($sku, $title='',$price='',$pn='',$picHTML='')
    {
        $root = $_SERVER['DOCUMENT_ROOT'];
        if (file_exists($root.'/product/_'.$sku.'/'.$sku.'_s.json')) $this->callData($sku);
        else {
            $this->sku = $sku;
            $this->title = $title;
            $this->price = $price;
            $this->pn = $pn;
            $this->picHTML = $picHTML;
        }
    }

    public function callData($sku)
    {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $jsonObject = json_decode(file_get_contents($root.'/product/_'.$sku.'/'.$sku.'_s.json'));
        $this->sku = $sku;
        $this->title = $jsonObject->pTitle;
        $this->pn = $jsonObject->price;
        $this->picHTML = $jsonObject->picHTML;
        return $this;
    }

    public function data (){
        return $this;
    }
}