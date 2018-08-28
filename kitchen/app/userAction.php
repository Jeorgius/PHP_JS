<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 03.07.2018
 * Time: 19:01
 */

namespace Profile;
//include_once ('tools.php');
use \tools;
use \PDO;
use \PDOException;



class userAction extends user
{
    public $NewData = array();

    public function UserDataSecure($nickname = '') {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $visitor = $_SESSION['nickname'];
        $dirname = $root . '/users/_' . $nickname . '/';

        $jsonArray = file_get_contents($dirname.$nickname.'_S.json');
        return json_decode($jsonArray);
    }
    public function UserDataFree($nickname = '') {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $visitor = $_SESSION['nickname'];
        $dirname = $root . '/users/_' . $nickname . '/';

        $jsonArray = file_get_contents($dirname.$nickname.'_F.json');
        return json_decode($jsonArray);
    }
    public function UserDataShort() {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $jsonFileShort = $root . '/data/users.json';
        $jsonArray = file_get_contents($jsonFileShort);
        $jsonDecoded = json_decode($jsonArray);
        //$userArray = $jsonDecoded[$nickname];
        return $jsonDecoded;
    }
    public function UserDataMessages ($nickname = ''){
        $root = $_SERVER['DOCUMENT_ROOT'];
        $visitor = $_SESSION['nickname'];
        $dirname = $root . '/users/_' . $nickname . '/';

        $jsonArray = file_get_contents($dirname.$nickname.'_M.json');
        $jsonDecoded = json_decode($jsonArray);
    }
    public function SaveUserDataSecure ($secureJsonClass) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $nickname = $secureJsonClass->nickname;
        $filename = $root . '/user/_' . $nickname . '/' . $nickname .'_S.json';

        file_put_contents($filename, json_encode($secureJsonClass));
    }
    public function SaveUserDataFree ($freeJsonClass) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $nickname = $freeJsonClass->nickname;
        $filename = $root . '/user/_' . $nickname . '/' . $nickname .'_F.json';

        file_put_contents($filename, json_encode($freeJsonClass));
    }
    public function SaveUserDataShort ($shortJsonClass) {
        $root = $_SERVER['DOCUMENT_ROOT'];

        $filename = $root . '/data/users.json';


        file_put_contents($filename, json_encode($shortJsonClass));
    }

    public function SaveNewUserDataShort ($shortJsonClass) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $filename = $root . '/data/users.json';
        $jsonDataShort = file_get_contents($filename);

        $jsonDataShort = str_replace(']', ', ', $jsonDataShort);
        $jsonDataShort .= $shortJsonClass . ']';
        file_put_contents($filename, $jsonDataShort);
    }

    public function DBid ($nickname) {
        $findId = "SELECT * FROM users WHERE nickname =\"". $nickname . "\"";
        $user = "root";
        $pw = "";
        $db = "UserInfo";
        $host = "localhost";

        try {
            $conn = new PDO ("mysql:host=$host;dbname=$db", $user, $pw);
            $ExistingUser = $conn->query($findId);

            foreach ($ExistingUser as $UserRow) {
                $id = $UserRow['id'];
            }
        } catch (PDOException $e) {
            echo $findId . $e->getMessage();
            $id = 'N/A';
        }
        $conn = null;
        return $id;
    }

    public function CreateUser($nickname='', $name='', $surname='', $email='', $pw='', $pic='',$picHTML='', $picPHP='', $text='') {


        $root = $_SERVER['DOCUMENT_ROOT'];
        $id = $this->DBid($nickname);


        $dirname = $root . '/user/_' . $nickname . '/';
        $filename = $root . '/user/_' . $nickname . '/' . $nickname .'.txt';
        $jsonFileFree = $root . '/user/_' . $nickname . '/' . $nickname .'_F.json';
        $jsonFileSecure = $root . 'user/_' . $nickname . '/' . $nickname . '_S.json';
        $commonFile = $root . '/data/users.json';

        if (file_exists($dirname) === FALSE) {
            mkdir($root . '/user/_' . $nickname . '/', 0700);
        }

        //create JSON

        $jsonDataSecure = array(/*'id' => $id,*/
            'nickname' => $nickname,
            'email' => $email,
            'pw' => $pw);
        $jsonContentSecure = json_decode(json_encode($jsonDataSecure));


        //$jsonPM['pMessages'] = $this->pMessages;

        $jsonDataFree = array (/*'id' => $id,*/
            'nickname' => $nickname,
            'name' => $name,
            'surname' => $surname,
            'text' => $text,
            'pic' => $pic,
            'picHTML' => $picHTML,
            'picPHP' => $picPHP);
        $jsonContentFree = json_decode(json_encode($jsonDataFree));

        //$jsonDataShort = json_decode(file_get_contents($root . '/user/users.json'));
        $newUser = new \stdClass();
        $newUser->id = $id;
        $newUser->nickname = $nickname;
        $newUser->name = $name;
        $newUser->surname = $surname;
        $newUser->picHTML = $picHTML;

        $jsonContentShort = json_encode($newUser);

        //$userInfo = serialize($this);
        $this->SaveUserDataSecure($jsonContentSecure);
        $this->SaveUserDataFree($jsonContentFree);
        $this->SaveNewUserDataShort($jsonContentShort);
    }

    public function CreateDBUser ($nickname='', $name='', $surname='', $email='', $pw='') {

        include ('../app/tools.php');
        include ('../app/user.php');


        $NewNick = tools::clean($nickname);
        $NewEmail = tools::clean($email);
        $NewName = tools::clean($name);
        $NewSurname = tools::clean($surname);
        $NewPw = tools::clean($pw);

        //$NewFile = '../users/'.$NewNick.'/'.$NewNick .'.txt';

        $user = "root";
        $pw = "";
        $db = "UserInfo";
        $host = "localhost";
        $sql = "INSERT INTO users (nickname, email, name, surname, pw, rank)
                VALUES ('". $NewNick . "','" .
                            $NewEmail . "','" .
                            $NewName. "','".
                            $NewSurname."','".
                            $NewPw."',
                            '1')";

        try {
            $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pw);

            $conn->exec($sql);
            //echo "Check it out - new user is there!";

        } catch (PDOException $e) {
            echo $sql . $e->getMessage();
        }
        $conn=null;
    }

    public function tmpPics () {
        if (isset ($_FILES['file']['name'])) { //getting file from JSON
            $root = $_SERVER['DOCUMENT_ROOT'];
            $nickname = $_POST['nickname'];    // getting nickname from JSON
            $picname = $_FILES['file']['name'];
            $dirname = $root . '/tmp/_' . $nickname . '/';

            if (file_exists($dirname)===FALSE) mkdir($dirname, 0700);

            move_uploaded_file($_FILES['file']['tmp_name'], //current file path with name
                $dirname . basename($_FILES['file']['name'])); // clearing its name of any path details

            $NewContent = array('nickname' => $_POST['nickname'],
                'PicName' => $picname);
        } else {
            $NewContent = array('nickname' => $_POST['nickname'],
                'PicName' => 'Error');
        }

        return json_encode($NewContent);
    }

}