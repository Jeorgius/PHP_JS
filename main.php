<?php
session_start();
//include_once('app/BuildPage.php');
// SCHEME = pageName
// -> get (template,dataList) for content (content tag and rightbar)
// -> ElementConstruct fills templates with data
// -> -> with 'about' and 'register' just displays template
// -> -> with 'profile' or 'product' displays data for one object
include_once ('app/BuildLeftbar.php');
include_once ('app/BuildContent.php');
include_once ('app/BuildRightbar.php');
include_once ('app/user.php');
include_once ('app/userAction.php');
include_once ('app/ImageProcess.php');
include_once ('app/ImageProcess.php');
use Profile\user as user;
use Profile\userAction as userAction;

$root = $_SERVER['DOCUMENT_ROOT'];

if($_POST['emptyL'] == 1) {
    $left = new BuildLeftbar();
    $leftbar = $left->BuildL();
    echo json_encode(['leftbar' => $leftbar]);
    $left = null;
    unset ($_POST['emptyL']);
    }
if(isset ($_POST['login']) and isset($_POST['pw'])) {
    user::LogIn($_POST['login'], $_POST['pw']);
    $left = new BuildLeftbar();
    $leftbar = $left->BuildL();
    echo json_encode(['leftbar' => $leftbar]);
    $left = null;
}
if(isset ($_POST['logOff'])) {
    user::LogOff();
    $left = new BuildLeftbar();
    $leftbar = $left->BuildL();
    echo json_encode(['leftbar' => $leftbar]);
}
if(isset($_POST['nickname']) and $_POST['email'] and $_POST['name'] and $_POST['surname'] and $_POST['email'] and $_POST['pw']){
    $userA = new userAction();

    $userA->CreateDBUser($_POST['nickname'], $_POST['name'], $_POST['surname'], $_POST['email'], $_POST['pw']);
    $userA->CreateUser($_POST['nickname'], $_POST['jsonS'], $_POST['jsonF'], $_POST['jsonShort']);
    $userA = null;
    echo json_encode(['data' => 'registered']);
}

if(isset($_POST['typeC']) or $_POST['typeC'] === '') {
    $middle = new BuildContent();

    if ($_POST['typeC'] === 'overview' or $_POST['typeC'] === '' or
        $_POST['typeC'] === 'main' or
        $_POST['typeC'] === 'photos' or
        $_POST['typeC'] === 'store' or
        $_POST['typeC'] === 'users' or
        $_POST['typeC'] === 'about' or
        $_POST['typeC'] === 'register') {
        $typeC = $_POST['typeC'];
        if (isset($_POST['typeC']) === FALSE or $_POST['typeC'] === '') $typeC = 'main';

        $data = $middle->getData($_POST['typeC']);

        $sendHTML = [       'data'    => $data,
                        'editingAbility' => 0];

    }
    elseif(isset($_POST['typeC'])) { // user gets at his own page
        if (mb_strtolower($_SESSION['nickname']) == mb_strtolower($_POST['typeC'])) {$editingAbility = 1;}
        else  {$editingAbility = 0;}

        //$template = file_get_contents($root.'/template/c_profile.html');
        $data = $middle->getData($_POST['typeC'],'profile', $editingAbility);
        $sendHTML = [   'data'        => $data,
                        //'template'    => $template,
                     'editingAbility' => $editingAbility];
    }
    $middle = null;
    echo json_encode($sendHTML);
}

if($_POST['admin'] === '1' and $_SESSION['rank'] == 9) {
   echo json_encode(['adminWWW' => 'http://jeorgius/kitchen/kitchen.php']);
}

if (isset($_POST['ProfileName']) or isset($_POST['ProfileSurname']) or
    isset($_POST['ProfileEmail']) or isset($_POST['NewPic'])){
    user::InfoUpdate($_SESSION['nickname']);
}

if (isset ($_FILES['file']['name'])) { //getting file from JSON
    $imgProcess = new ImageProcess($_FILES['file']['name']);
    $picname = $imgProcess->uploadTmpPic($_POST['nickname']);
    $NewContent = array('nickname' => $_POST['nickname'],
                        'PicName' => $picname);
    $imgProcess = null;
    echo json_encode($NewContent);
}