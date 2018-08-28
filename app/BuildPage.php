<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 17.05.2018
 * Time: 10:18
 */

use Profile\user as user;

class BuildPage
{

    //public $htmlroot = 'http://mysite/';
    //public $userClass;

    public function UserDataShort($nickname = '') {
       // return $this->userClass->UserDataShort($nickname);
        /*$root = $_SERVER['DOCUMENT_ROOT'];
        $visitor = $_SESSION['nickname'];
        $dirname = $root . '/users/_' . $nickname . '/';

        if ($nickname = ''){
            $userClassFile = glob('*.txt');
        } else {
            $userClassFile = glob($dirname . '*.txt');
        }
        $contents = file_get_contents($userClassFile['0']);
        return $owner = unserialize($contents);*/
    }
    public function UserDataFree($nickname = '') {
       //return $this->userClass->UserDataFree($nickname);
    }
    public function UserDataSecure($nickname = '') {
        //return $this->userClass->UserDataSecure($nickname);
    }

    public function SaveUserData ($UserClass) {
        //$this->userClass->SaveUserData($UserClass);
        /*$temp = serialize($owner);
        file_put_contents($owner->nickname.'.txt', $temp);*/
    }

    /* Define page type and use template */

    private function EvaluateLogin ($login = '', $pw = '') {

    }

    public function BuildHeader ($Type, $template) {

        $htmlroot = $this->htmlroot;
        $root = $_SERVER['DOCUMENT_ROOT'];

        $template = file_get_contents($root.'/template/page.html');
        $template = str_replace('{HTMLROOT}', $htmlroot, $template);

        if ($Type === 'profile') {
            $owner = $this->UserData();
            $template = str_replace('{TITLE}', $owner->nickname, $template);

        } elseif ($Type === 'main') {
            $template = str_replace('{TITLE}', 'J', $template);

        } else {
            $template = str_replace('{TITLE}', $Type, $template);
        }

        return $template;
    }

    /* Define user login */
    public function BuildLeftBar ($Type, $template) {
        $htmlroot = $this->htmlroot;
        $visitor = $_SESSION['nickname'];
        $root = $_SERVER['DOCUMENT_ROOT'];


        $leftbar = file_get_contents($root.'/template/structure/leftbar/leftbar.html');

        if (isset($_SESSION['nickname']) == FALSE) {
            $SignUp = file_get_contents($root.'/template/structure/leftbar/visitor.html');
        }
        elseif ($_SESSION['rank'] == 9) {
            $SignUp = file_get_contents($root.'/template/structure/leftbar/admin.html');
            $SignUp = str_replace('{ADMIN}', $visitor, $SignUp);
        }
        else {
            $SignUp = file_get_contents($root.'/template/structure/leftbar/user.html');
            $SignUp = str_replace('{USER}', $visitor, $SignUp);
        }

        $leftbar = str_replace('{SIGNUPPED}', $SignUp, $leftbar);
        $leftbar = str_replace('{HTMLROOT}', $htmlroot, $leftbar);

        return $template = str_replace('{LEFTBAR}', $leftbar, $template);
    }

    /* Build right side if needed */

    public function BuildRightBar ($Type, $template, $name = '') {
        $htmlroot = $this->htmlroot;
        $visitor = $_SESSION['nickname'];
        $root = $_SERVER['DOCUMENT_ROOT'];

        //$rightbar = file_get_contents($root.'/template/structure/rightbar/rightbar.html');

        if ($Type == 'profile') {
            $rightbar = file_get_contents($root . '/template/structure/rightbar/profile.html');
            $owner = $this->UserDataFree($name);
            $toRep = '{OWNER-PIC}';
            if (isset($owner->pic) && $owner->pic !== 0 && $owner->pic !== '') {
                $pic = $owner->picHTML;
            } else {
                $pic = 'http://mysite/icons/userpic.jpg';
            }

            $rightbar = str_replace($toRep, $pic, $rightbar);
            $rightbar = str_replace('{HTMLROOT}', $htmlroot, $rightbar);

        } elseif ($Type == 'store') {
            $rightbar = file_get_contents($root . '/template/structure/rightbar/store.html');
        } else {
            $rightbar = '';
        }

        return $template = str_replace('{RIGHTBAR}', $rightbar, $template);

    }



    public function BuildEditPanel ($Type, $template, $name='') {
        $htmlroot = $this->htmlroot;
        $root = $_SERVER['DOCUMENT_ROOT'];
        //$owner = $this->UserData();
        $visitor = $_SESSION['nickname'];

        if ($Type == 'profile'){
            $owner = $this->UserData($name);

            if ($visitor == $owner->nickname) {
                $editPanel = file_get_contents($root.'/template/structure/content/editpanel.html');
                $editPanel = str_replace('{HTMLROOT}', $htmlroot, $editPanel);
            } else {
                $editPanel = '';
            }
        } else {
            $editPanel = '';
        }
        return $template = str_replace('{EDITPANEL}', $editPanel, $template);
    }

    public function BuildAdminPanel ($Type = 0, $template) {
        $htmlroot = $this->htmlroot;
        $root = $_SERVER['DOCUMENT_ROOT'];

        if ($_SESSION['rank'] === 9) {
            $adminPanel = file_get_contents($root . '/template/structure/adminpanel.html');
            $adminPanel = str_replace('{HTMLROOT}', $htmlroot, $adminPanel);
        } else {
            $adminPanel = '';
        }
        return $template = str_replace('{ADMINPANEL}', $adminPanel, $template);
    }

    public function BuildFromScratch ($Type){
        $template = '';
        $template = $this->BuildHeader($Type, $template);

        $template = $this->BuildLeftBar($Type, $template);
        $template = $this->BuildRightBar($Type, $template);
        $template = $this->BuildContent($Type, $template);
        $template = $this->BuildEditPanel($Type, $template);
        $template = $this->BuildAdminPanel($Type, $template);

        echo $template;
    }

    public function __construct()
    {

    }

}