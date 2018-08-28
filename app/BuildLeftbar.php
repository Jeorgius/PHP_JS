<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 04.07.2018
 * Time: 17:19
 */

class BuildLeftbar
{
    public function BuildLDefault () {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $leftbar = file_get_contents($root.'/template/l_v.html');
        return $leftbar;
    }

    public function BuildLogged() {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $leftbar = file_get_contents($root.'/template/l_u.html');
        $leftbar = str_replace('{USER}', $_SESSION['nickname'], $leftbar);
        return $leftbar;
    }

    public function BuildAdmin () {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $nickname = $_SESSION['nickname'];
        $leftbar = file_get_contents($root.'/template/l_a.html');
        $leftbar = str_replace('{ADMIN}', $nickname, $leftbar);
        $leftbar = str_replace('{HTMLROOT}', 'http://jeorgius/', $leftbar);
        return $leftbar;
    }

    public function BuildL () {
        if(isset($_SESSION['nickname'])===FALSE) {
            $leftbar = $this->BuildLDefault();
        }
        elseif (isset($_SESSION['nickname']) and $_SESSION['rank'] == 9){
            $leftbar = $this->BuildAdmin();
        } else {
            $leftbar = $this->BuildLogged();
        }

        return $leftbar;
    }
}