<?php

/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 09.05.2018
 * Time: 8:41
 */

namespace Profile;
include_once ('tools.php');
include_once ('userAction.php');
use \PDO;
use \PDOException;
use \tools;

class user extends userAction
{
    public $nickname;
    public $name;
    public $surname;
    public $email;
    public $pw;
    public $text;
    public $pic;
    public $picHTML;
    public $picPHP;
    public $pMessages = array();

    public static function LogIn($nickname, $pw)
    {
        $user = "root";
        $DBpw = "";
        $db = "UserInfo";
        $host = "localhost";
        $sql = "SELECT * FROM users WHERE nickname=\"" . tools::clean($nickname) . "\"";

        $root = $_SERVER['DOCUMENT_ROOT'];
        $htmlroot = 'http://jeorgius/';

        try {
            $conn = new PDO ("mysql:host=$host;dbname=$db", $user, $DBpw);
            $ExistingUser = $conn->query($sql);

            foreach ($ExistingUser as $UserRow) {
                if (tools::clean($pw) === $UserRow['pw']) {
                    $_SESSION['nickname'] = $UserRow['nickname'];
                    $_SESSION['rank'] = $UserRow['rank'];

                    //header('location: ../Main');
                } else {
                    echo "Get out of here!";
                }

            }
        } catch (PDOException $e) {
            echo $sql . $e->getMessage();
        }

        $conn = null;
    }

    public static function LogOff()
    {
        unset($_SESSION['nickname']);
        unset($_SESSION['rank']);
        //header("Location: http://jeorgius/");

    }
    public static function UserShortIndex ($jsonData, $nickname) {

        for ($i=0; $i<count($jsonData); $i++) {
            if ($nickname == $jsonData[$i]->nickname) $index = $i;
        }
        return $index;
    }


    public static function InfoUpdate($nickname) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        //include ($root . '/app/user.php');
        //include ($root . '/template/PageBuild.php');

        $dbAdmin = 'root';
        $dbPw = '';
        $dbName = 'UserInfo';
        $host = 'localhost';

        $userA = new userAction();
        $userFree = $userA->UserDataFree($nickname);
        $userSecure = $userA->UserDataSecure($nickname);
        $userShort = $userA->UserDataShort();
        //$nickname = $_POST['nickname'];
        //$nickname = $_POST['nickname'];
        //$id = $userA->DBid($nickname);
        $userIndex = user::UserShortIndex($userShort, $nickname);



//
        if (isset($_POST['ProfileName'])) {
            $NewContent = array('InfoChanged' => $_POST['ProfileName'],
                                'nickname' => $_POST['nickname']);
            $userFree->name = $NewContent['InfoChanged'];
            $userShort[$userIndex]->name = $NewContent['InfoChanged'];
            $sql = "UPDATE users SET name='". $userFree->name . "' WHERE nickname = '" . $userFree->nickname."';";
        }
        elseif (isset($_POST['ProfileSurname'])) {
            $NewContent = array('InfoChanged' => $_POST['ProfileSurname'],
                'nickname' => $_POST['nickname']);
            $userFree->surname = $NewContent['InfoChanged'];
            $userShort[$userIndex]->surname = $NewContent['InfoChanged'];
            $sql = "UPDATE users SET surname = '". $userFree->surname . "' WHERE nickname = '" . $userFree->nickname ."'";
        }
        elseif (isset($_POST['ProfileEmail'])) {
            $NewContent = array('InfoChanged' => $_POST['ProfileEmail'],
                'nickname' => $_POST['nickname']);
            $userSecure->email = $NewContent['InfoChanged'];
            $sql = "UPDATE users SET email = '". $userSecure->email . "' WHERE nickname = '" . $userSecure->nickname."'";
        }
        elseif (isset($_POST['NewPic'])){
            $htmlroot = 'http://jeorgius/';
            $newPic = $_POST['NewPic'];
            $dirname = $root . '/user/_' . $nickname . '/';
            $tmpPicname = $root . '/tmp/_' . $nickname .'/'. $newPic; // WITHOUT USERS DIR
            rename($tmpPicname, $dirname . $newPic);

            //$tmpFiles = glob($root . '/tmp/_' . $nickname .'/*.jpg');

            $NewContent = array ('InfoChanged' => $dirname . $newPic,
                                 'nickname' => $nickname);
            $userFree->pic = $newPic;
            $userFree->picHTML = $htmlroot . "user/_$nickname/$newPic";
            $userFree->picPHP = $NewContent['InfoChanged'];

            $userShort[$userIndex]->picHTML = $htmlroot . "user/_$nickname/$newPic";

            rmdir($root. '/tmp/_'. $nickname);
        }
        else {
            $NewContent = array ('InfoChanged' => 'Error');
        }

        $userA->SaveUserDataFree($userFree);
        $userA->SaveUserDataShort($userShort);
        $userA->SaveUserDataSecure($userSecure);
        if (isset($sql)) {
            try {
                $conn = new PDO("mysql:host=$host;dbname=$dbName", $dbAdmin, $dbPw);
                $conn->exec($sql);
            } catch (PDOException $e) {
                $NewContent['Error'] = 'Error: no updated were made';
            }
        }
        $conn = null;
        echo json_encode($NewContent);
    }

}

