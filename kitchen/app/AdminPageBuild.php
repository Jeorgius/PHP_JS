<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 27.05.2018
 * Time: 1:53
 */

namespace admin;


class AdminPageBuild
{

    public $htmlroot = 'http://mysite/';

    public function UserData() {

        $root = $_SERVER['DOCUMENT_ROOT'];
        $visitor = $_SESSION['nickname'];

        $userClassFile = glob('*.txt');
        $contents = file_get_contents($userClassFile['0']);
        return $owner = unserialize($contents);
    }

    public function SaveUserData ($owner) {
        $temp = serialize($owner);
        file_put_contents($owner->nickname.'.txt', $temp);
    }

    /* Define page type and use template */
    public function BuildHeader ($Type, $template) {

        $htmlroot = $this->htmlroot;
        $root = $_SERVER['DOCUMENT_ROOT'];

        $template = file_get_contents($root.'/kitchen/page.html');
        $template = str_replace('{HTMLROOT}', $htmlroot, $template);

        if ($Type === 'Profile') {
            $owner = $this->UserData();
            $addjs = '';
            $addcss = '';
            $toRep = array ('{ADDJS}', '{ADDCSS}', '{HTMLROOT}');
            $Rep = array ($addjs, $addcss, $this->htmlroot);

            $template = str_replace('{TITLE}', $owner->nickname, $template);
            $template = str_replace($toRep, $Rep, $template);

        } elseif ($Type === 'Overview') {
            $addjs = '';
            $addcss = '';
            $toRep = array ('{ADDJS}', '{ADDCSS}', '{HTMLROOT}');
            $Rep = array ($addjs, $addcss, $this->htmlroot);

            $template = str_replace('{TITLE}', 'An Overview', $template);
            $template = str_replace($toRep, $Rep, $template);

        } elseif ($Type === 'AddProduct') {
            $addjs = '<script type="text/javascript" src="{HTMLROOT}admin/addProduct.js"></script>
                      <script type="text/javascript" src="{HTMLROOT}kitchen/structure/content/Products/AddProduct/AddContent.js"></script>';
            $addcss = '<link type="text/css" rel="stylesheet" href="http://mysite/css/admin.css" media="all">';
            $toRep = array ('{ADDJS}', '{ADDCSS}', '{HTMLROOT}');
            $Rep = array ($addjs, $addcss, $this->htmlroot);

            $template = str_replace($toRep, $Rep, $template);
            $template = str_replace('{TITLE}', 'Add Product', $template);
        } else {
            $addjs = '';
            $addcss = '';
            $toRep = array ('{ADDJS}', '{ADDCSS}', '{HTMLROOT}');
            $Rep = array ($addjs, $addcss, $this->htmlroot);

            $template = str_replace('{TITLE}', $Type, $template);
            $template = str_replace($toRep, $Rep, $template);
        }

        return $template;
    }

    /* Define user login and navigation*/
    public function BuildLeftBar ($Type, $template) {
        $htmlroot = $this->htmlroot;
        $visitor = $_SESSION['nickname'];
        $root = $_SERVER['DOCUMENT_ROOT'];


        $leftbar = file_get_contents($root.'/kitchen/structure/leftbar/leftbar.html');

        if (isset($_SESSION['nickname']) == FALSE) {
            $SignUp = file_get_contents($root.'/template/structure/leftbar/visitor.html');
        } elseif ($_SESSION['rank'] == 9) {
            $SignUp = file_get_contents($root.'/template/structure/leftbar/admin.html');
            $SignUp = str_replace('{ADMIN}', $visitor, $SignUp);
        } else {
            $SignUp = file_get_contents($root.'/template/structure/leftbar/user.html');
            $SignUp = str_replace('{USER}', $visitor, $SignUp);
        }

        $leftbar = str_replace('{HTMLROOT}', $htmlroot, $leftbar);

        return $template = str_replace('{LEFTBAR}', $leftbar, $template);
    }

    /* Build right side for editing */

    public function BuildRightBar ($Type, $template) {
        $htmlroot = $this->htmlroot;
        $visitor = $_SESSION['nickname'];
        $root = $_SERVER['DOCUMENT_ROOT'];

        $rightbar = file_get_contents($root.'/kitchen/structure/rightbar/rightbar.html');

        if ($Type == 'Products') {

            $content = file_get_contents($root . '/kitchen/structure/rightbar/productlist.html');
            $content = str_replace('{HTMLROOT}', $htmlroot, $content);
        } elseif($Type == 'AddProduct'){
            $content = file_get_contents($root . '/kitchen/structure/rightbar/AddProduct.html');
            $content = str_replace('{HTMLROOT}', $htmlroot, $content);
        } else {
            $content = '';
        }

        $rightbar = str_replace('{CONTENT}', $content, $rightbar);
        return $template = str_replace('{RIGHTBAR}', $rightbar, $template);

    }

    public function BuildContent ($Type, $template)
    {
        $htmlroot = $this->htmlroot;
        $root = $_SERVER['DOCUMENT_ROOT'];
        //$owner = $this->UserData();
        $visitor = $_SESSION['nickname'];
        $middle = file_get_contents($root . '/kitchen/structure/content/content.html');

        if ($Type == 'Main') {
            $content = file_get_contents($root . '/template/structure/content/main.html');
        } elseif ($Type == 'Photos') {
            $content = file_get_contents($root . '/template/structure/content/photos.html');
        } elseif ($Type == 'Register') {
            $content = file_get_contents($root . '/template/structure/content/register.html');
        } elseif ($Type == 'Music') {
            $content = file_get_contents($root . '/template/structure/content/music.html');
        } elseif ($Type == 'Profile') {
            $owner = $this->UserData();

            $toRep = array('{OWNER}','{OWNER-NAME}', '{OWNER-SURNAME}', '{OWNER-EMAIL}');
            $credentials = array($owner->nickname, $owner->name, $owner->surname, $owner->email);

            /* if (isset($owner->ProfilePicURL) === FALSE or $owner->ProfilePicURL === 0) {
                 $picture = '<div id="rightbar"><img src="' . $htmlroot . 'icons/userpic.jpg" /></div>
                                 <form enctype="multipart/form-data" method="POST" action="">
                                     <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
                                     <input type="file" name="uploaded" />
                                     <input type="submit" value="Send it already!" />
                                 </form>
                             </div>';
                 echo $owner->ProfilePicURL;
                 if (move_uploaded_file($_FILES['uploaded']['tmp_name'], $root.'/users/_joke2/'.basename($_FILES['uploaded']['name']))){
                     $owner->ProfilePicURL = basename($_FILES['uploaded']['name']);
                     $this->SaveUserData($owner);
                     echo $owner->ProfilePicURL;
                 }
             } else {
                 $picture = '<div id="rightbar"><img id="ProfilePic" src="'.$htmlroot .'users/_'.$owner->nickname.'/'.$owner->ProfilePicURL .'" /></div>
  ';
             }*/

            if ($visitor == $owner->nickname) {
                $content = file_get_contents($root . '/template/structure/content/profile/profile_owner.html');
                $content = str_replace($toRep, $credentials, $content);

            } else {
                $content = file_get_contents($root . '/template/structure/content/profile/profile_visitor.html');
                $content = str_replace($toRep, $credentials, $content);
            }

            if ($owner->text === 0 or isset($owner->text) === FALSE) {
                $text = file_get_contents($root . '/template/structure/content/profile/text.html');
                $content = str_replace('{OWNER-TEXT}', $text, $content);
            } else {
                $content = str_replace('{OWNER-TEXT}', $owner->text, $content);
            }
        }  elseif ($Type == 'Products') {
            $content = file_get_contents($root . '/kitchen/structure/content/Products/products.html');
        } else if ($Type == 'AddProduct') {
            $content = file_get_contents($root . '/kitchen/structure/content/Products/AddProduct/AddProduct.html');
        }
        $content = str_replace('{HTMLROOT}', $htmlroot, $content);
        $middle = str_replace('{CONTENT}', $content, $middle);
        return $template = str_replace('{CONTENT}', $middle, $template);
    }

    public function BuildEditPanel ($Type, $template) {
        $htmlroot = $this->htmlroot;
        $root = $_SERVER['DOCUMENT_ROOT'];
        //$owner = $this->UserData();
        $visitor = $_SESSION['nickname'];

        if ($Type == 'Profile'){
            $owner = $this->UserData();

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
}