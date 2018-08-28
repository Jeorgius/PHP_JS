<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 25.05.2018
 * Time: 13:00
 */

class product
{
    public $sku_id;
    public $vendor;
    public $category;
    public $title;
    public $pn;
    public $dateModified;
    public $popularity;
    public $price;

    public $heroPic;
    public $galleryPics = array();
    public $features = array();

    public function CreateProduct($vendor=0,
                                  $title=0,
                                  $category = 0,
                                  $pn=0,
                                  $popularity=0,
                                  $price = 0,
                                  $heroPic = 0,
                                  $galleryPics = 0) {
        $this->vendor = $vendor;
        $this->title = $title;
        $this->pn = $pn;
        $this->popularity = $popularity;
        $this->price = $price;
        $this->heroPic = $heroPic;
        $this->galleryPics = $galleryPics;

        //$htmlroot = 'http://mysite/';
        $root = $_SERVER['DOCUMENT_ROOT'];


        $dirname = $root . '/product/_'. $vendor . '/' . $category . '/' . $title . '/_' . $pn . '/';
        $filename = $root . '/product/_'. $vendor . '/' . $category . '/' . $title . '/_' . $pn . '/' . $pn .'.txt';
        $productpage = $root . '/product/_'. $vendor . '/' . $category . '/' . $title . '/_' . $pn . '/' . $pn . '.html';

        if (file_exists($dirname) == TRUE) {
            //
        } else {
            mkdir($dirname, 0700);
        }

        if (file_exists($filename) == TRUE) {
            //
        } else {
            //
        }


        $productInfo = serialize($this);
        file_put_contents($filename,$productInfo, FILE_APPEND);

        /* $ProfileText = file_get_contents($root . '/Profile.html');
        file_put_contents($profilepage, $ProfileText); */

    }

    public function tmpProductPics () {
        if (isset ($_FILES['file']['name'])) { //getting file from JSON

            $root = $_SERVER['DOCUMENT_ROOT'];
            $htmlroot = 'http://mysite/';
            $nickname = $_SESSION['nickname']; // admin nickname to work in his dir
            $index = $_POST['index'];    // getting the form index through JSON
            $picname = $_FILES['file']['name'];
            $dirname = $root . '/tmp/'. $nickname .'/';
            $letter = '';

            if ($_POST['feature'] === "FLEFT") $letter = 'l';
            if ($_POST['feature'] === "FRIGHT") $letter = 'r';
            if ($_POST['feature'] === "FMEDIA") $letter = 'm';



            $NewHTMLPath = $htmlroot . 'tmp/'. $nickname .'/' . 'f' . $letter . $index . '.'. pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
            $NewPHPpath = $root . '/tmp/'. $nickname .'/' . 'f' . $letter . $index . '.'. pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

            if (file_exists($dirname)===FALSE) mkdir($dirname, 0700);

            move_uploaded_file($_FILES['file']['tmp_name'], //current file path with name
                $NewPHPpath); // renaming file to 'f0.jpg', 'f1.png' etc

            $NewContent = array('index' => $index,
                'pic' => $NewHTMLPath);
        } else {
            $NewContent = array('index' => 'Error',
                'pic' => 'Error');
        }

        if (isset ($_FILES['gFile']['name'])) { //getting file from JSON

            $root = $_SERVER['DOCUMENT_ROOT'];
            $htmlroot = 'http://mysite/';
            $nickname = $_SESSION['nickname']; // admin nickname to work in his dir
            $index = $_POST['index'];    // getting the form index through JSON
            $picname = $_FILES['gFile']['name'];
            $dirname = $root . '/tmp/'. $nickname .'/';
            $letter = '';

            $NewHTMLPath = $htmlroot . 'tmp/'. $nickname .'/' . 'g' . $index . '.'. pathinfo($_FILES['gFile']['name'], PATHINFO_EXTENSION);
            $NewPHPpath = $root . '/tmp/'. $nickname .'/' . 'g' . $index . '.'. pathinfo($_FILES['gFile']['name'], PATHINFO_EXTENSION);

            if (file_exists($dirname)===FALSE) mkdir($dirname, 0700);

            move_uploaded_file($_FILES['gFile']['tmp_name'], //current file path with name
                $NewPHPpath); // renaming file to 'f0.jpg', 'f1.png' etc

            $NewContent = array('index' => $index,
                'pic' => $NewHTMLPath);
        } else {
            $NewContent = array('index' => 'Error',
                'pic' => 'Error');
        }

        echo json_encode($NewContent);
    }
}