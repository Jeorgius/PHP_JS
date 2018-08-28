<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 11.07.2018
 * Time: 10:44
 */
class ImageProcess
{
    public $ImageFile;
    public $ImgTmpAdress;
    public function __construct($img)
    {
        $this->ImageFile = $img;
        if (isset($_FILES['file']['tmp_name'])) $this->ImgTmpAdress = $_FILES['file']['tmp_name'];
    }

    public function uploadTmpPic ($nickname)  {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $picname = $this->ImageFile; // getting nickname from JSON
        $dirname = $root . '/tmp/_' . $nickname . '/';

        if (file_exists($dirname)===FALSE) mkdir($dirname, 0700);

        move_uploaded_file($this->ImgTmpAdress, //current file path with name
            $dirname . basename($_FILES['file']['name'])); // clearing its name of any path details

        return $picname;
    }
}