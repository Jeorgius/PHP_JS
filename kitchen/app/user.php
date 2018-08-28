<?php

/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 09.05.2018
 * Time: 8:41
 */
namespace Profile;
//include_once ('tools.php');
use \PDO;
use \PDOException;
use \tools;

class user
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

    public static function LogIn ($nickname, $pw) {
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

        $conn=null;
    }
    public static function LogOff () {
        unset($_SESSION['nickname']);
        unset($_SESSION['rank']);
        //header("Location: http://jeorgius/");

    }
}




?>