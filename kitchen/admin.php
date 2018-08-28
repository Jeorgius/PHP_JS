<?php

include_once ('app/BContent.php');
include_once ('app/user.php');
include_once ('app/userAction.php');
include_once ('app/DataProcess.php');
include_once ('app/tempImage.php');
include_once ('app/tools.php');
include_once ('../app/product/productConstruct.php');
use Profile\user as user;
use Profile\userAction as userAction;
use productSpace\productConstruct as productConstruct;

if ($_SESSION['rank'] == 9) {

    if (isset($_POST['nickname']) and $_POST['email'] and $_POST['name'] and $_POST['surname'] and $_POST['email'] and $_POST['pw']) {
        $userA = new userAction();
        $userA->CreateDBUser($_POST['nickname'], $_POST['name'], $_POST['surname'], $_POST['email'], $_POST['pw']);
        $userA->CreateUser($_POST['nickname'], $_POST['name'], $_POST['surname'], $_POST['email'], $_POST['pw']);
    }
    if (isset($_POST['typeAdmin'])){
        $_POST['nickname'] = $_SESSION['nickname'];

        $pro = new DataProcess($_POST);
        echo json_encode(['message' => 'updated']);
    }

    if (isset($_POST['typeC']) or $_POST['typeC'] === '') {
        $middle = new BContent();

        if ($_POST['typeC'] === 'overview' or $_POST['typeC'] === '' or
            $_POST['typeC'] === 'news' or
            $_POST['typeC'] === 'music' or
            $_POST['typeC'] === 'photos' or
            $_POST['typeC'] === 'products' or
            $_POST['typeC'] === 'users' or
            $_POST['typeC'] === 'about' or
            $_POST['typeC'] === 'addProduct') {
            $typeC = $_POST['typeC'];
            if (isset($_POST['typeC']) === FALSE or $_POST['typeC'] === '') $typeC = 'main';

            $data = $middle->getData($_POST['typeC']);

            $sendHTML = ['data' => $data,
                         'editingAbility' => 0];

        } elseif (isset($_POST['typeC'])) { // user gets at his own page
            if (mb_strtolower($_SESSION['nickname']) == mb_strtolower($_POST['typeC'])) {
                $editingAbility = 1;
            } else {
                $editingAbility = 0;
            }

            $data = $middle->getData($_POST['typeC'], 'profile');;
            $sendHTML = ['data' => $data,
                         'editingAbility' => $editingAbility];
        }
        $middle = null;
        echo json_encode($sendHTML);
    }

    if(isset($_POST['imageType'])){
        $nickname = $_SESSION['nickname'];
        foreach ($_POST as $key => $value) $data[$key] = $_POST[$key];
        $processPics = new tempImage();
        $jsonData = $processPics->Process($data, $nickname, $_FILES);
        echo $jsonData;
    }

    if(isset($_POST['saveProduct'])) {
        $nickname = $_SESSION['nickname'];
        foreach ($_POST as $key => $value) $data[$key] = $_POST[$key];
        $newItem = new productConstruct($_POST);
        echo $jsonData = array('message' => 'product saved');
    }

} else {
    echo 'go play tetris';
}