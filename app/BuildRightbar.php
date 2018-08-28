<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 04.07.2018
 * Time: 9:14
 */


class BuildRightbar
{
    public function BuildR ($Type) {
        $root = $_SERVER['DOCUMENT_ROOT'];


        if ($Type == 'profile') {
            $rightbar = file_get_contents($root . '/template/r_profile.html');
        } elseif ($Type == 'store') {
            $rightbar = file_get_contents($root . '/template/r_store.html');
        } else {
            $rightbar = '';
        }

        return $rightbar;
    }
}