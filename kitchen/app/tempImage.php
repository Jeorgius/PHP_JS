<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 14.07.2018
 * Time: 21:49
 */

class tempImage
{

    public function Process ($data, $nickname, $file){
        if ($data['imageType'] == 'news') $jsonData = $this->newsImage($data, $nickname, $file);
        if ($data['imageType'] == 'photos') $jsonData = $this->photosImage ($data, $nickname, $file);
        if ($data['imageType'] == 'feature') $jsonData = $this->featureImage ($data, $nickname, $file);

        return $jsonData;
    }

    public function newsImage ($data, $nickname,$file) {
        if (isset ($file['NewsImage']['name'])) { //getting file from JSON

            $root = $_SERVER['DOCUMENT_ROOT'];
            $dirname = $root . '/tmp/_' . $nickname . '/';
            $index = $data['index'];
            $ext = pathinfo($file['NewsImage']['name'], PATHINFO_EXTENSION);
            $newImageName = $index.'.'.$ext;

            if (file_exists($dirname)===FALSE) mkdir($dirname, 0700); //create tmpDir

            move_uploaded_file($file['NewsImage']['tmp_name'], //current file path with name
                $dirname.$newImageName); // clearing its name of any path details

           $newImage = 'http://jeorgius/tmp/_'.$nickname.'/' . $newImageName;

        } else {$newImage = 'error';}
        return $jsonData = json_encode(['newPic' => $newImage]);
    }
    public function photosImage ($data, $nickname,$file) {
        if (isset ($file['PhotosImage']['name'])) { //getting file from JSON

            $root = $_SERVER['DOCUMENT_ROOT'];
            $dirname = $root . '/tmp/_' . $nickname . '/';
            $index = $data['index'];
            $ext = pathinfo($file['PhotosImage']['name'], PATHINFO_EXTENSION);
            $newImageName = $index.'.'.$ext;

            if (file_exists($dirname)===FALSE) mkdir($dirname, 0700); //create tmpDir

            move_uploaded_file($file['PhotosImage']['tmp_name'], //current file path with name
                $dirname.$newImageName); // clearing its name of any path details

            $newImage = 'http://jeorgius/tmp/_'.$nickname.'/' . $newImageName;

        } else {$newImage = 'error';}
        return $jsonData = json_encode(['newPic' => $newImage]);
    }

    public function featureImage ($data, $nickname, $file) {
        if (isset ($file['fFile']['name'])) { //getting file from JSON

            $root = $_SERVER['DOCUMENT_ROOT'];
            $htmlroot = 'http://jeorgius/';
            //$nickname = $_SESSION['nickname']; // admin nickname to work in his dir
            $index = $data['index'];    // getting the form index through JSON
            $picname = $file['fFile']['name'];
            $dirname = $root . '/tmp/'. $nickname .'/';
            $letter = '';

            if ($data['feature'] === "FLEFT") $letter = 'l';
            if ($data['feature'] === "FRIGHT") $letter = 'r';
            if ($data['feature'] === "FMEDIA") $letter = 'm';



            $NewHTMLPath = $htmlroot . 'tmp/'. $nickname .'/' . 'f' . $letter . $index . '.'. pathinfo($file['fFile']['name'], PATHINFO_EXTENSION);
            $NewPHPpath = $root . '/tmp/'. $nickname .'/' . 'f' . $letter . $index . '.'. pathinfo($file['fFile']['name'], PATHINFO_EXTENSION);

            if (file_exists($dirname)===FALSE) mkdir($dirname, 0700);

            move_uploaded_file($file['fFile']['tmp_name'], //current file path with name
                $NewPHPpath); // renaming file to 'f0.jpg', 'f1.png' etc

            $NewContent = array('index' => $index,
                        'pic' => $NewHTMLPath);
        } else {
            $NewContent = array('index' => 'Error',
                        'pic' => 'Error');
        }

        if (isset ($file['gFile']['name'])) { //getting file from JSON

            $root = $_SERVER['DOCUMENT_ROOT'];
            $htmlroot = 'http://jeorgius/';
            $nickname = $_SESSION['nickname']; // admin nickname to work in his dir
            $index = $data['index'];    // getting the form index through JSON
            $picname = $file['gFile']['name'];
            $dirname = $root . '/tmp/' . $nickname . '/';
            $letter = '';

            $NewHTMLPath = $htmlroot . 'tmp/' . $nickname . '/' . 'g' . $index . '.' . pathinfo($file['gFile']['name'], PATHINFO_EXTENSION);
            $NewPHPpath = $root . '/tmp/' . $nickname . '/' . 'g' . $index . '.' . pathinfo($file['gFile']['name'], PATHINFO_EXTENSION);

            if (file_exists($dirname) === FALSE) mkdir($dirname, 0700);

            move_uploaded_file($file['gFile']['tmp_name'], //current file path with name
                $NewPHPpath); // renaming file to 'f0.jpg', 'f1.png' etc

            $NewContent = array('index' => $index,
                'pic' => $NewHTMLPath);
        }

        return json_encode($NewContent);
    }
}