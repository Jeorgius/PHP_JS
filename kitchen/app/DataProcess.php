<?php
/**
 * Created by PhpStorm.
 * User: Georgy
 * Date: 13.07.2018
 * Time: 21:03
 */


class DataProcess
{
    public function __construct($data)
    {
        if ($data['typeAdmin'] == 'news') $this->news($data);
        if ($data['typeAdmin'] == 'photos') $this->photos($data);

    }

    private function news ($data) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $htmlroot = 'http://jeorgius/';
        $tmpFolder = $root.'/tmp/_'.$data['nickname'].'/';
        $jsonData = json_decode(file_get_contents($root.'/data/main.json'));
        //1 - there's an element and I want to delete it
        if ($data['newsTitle'] == '' and $data['newsText'] == ''
            or isset($data['newsTitle']) == FALSE and isset($data['newsText']) == FALSE
            and isset($jsonData[$data['index']])==TRUE) {

            array_splice($jsonData, $data['index'], 1); //delete 'length' elements starting with index
            file_put_contents($root . '/data/main.json', json_encode($jsonData));

        }
        //2 - there was a tmp element, so I want not to save it
        elseif ($data['newsTitle'] =='' and $data['newsText'] == ''
                and isset($jsonData[$data['index']])==FALSE) {
          //
        }
        //3 - I want to save it.
        else {
            //a) there was no element before
            if(isset ($jsonData[$data['index']]) == FALSE) $jsonData[$data['index']] = new stdClass(); // new newsItem
            //b) edit element if there's tmp folder
            if(file_exists($tmpFolder)) {

                $tmpImage = glob($tmpFolder.'*');
                $jsonData[$data['index']]->picHTML = $htmlroot.'data/news/'.basename($tmpImage[0]);
                rename($tmpImage[0], $root.'/data/news/'.basename($tmpImage[0]));
                rmdir($tmpFolder);

            } else {}


            $jsonData[$data['index']]->newsTitle = $data['newsTitle'];
            $jsonData[$data['index']]->newsText = $data['newsText'];

            file_put_contents($root . '/data/main.json', json_encode($jsonData));
        }
    }
    private function photos ($data) {
        $root = $_SERVER['DOCUMENT_ROOT'];
        $htmlroot = 'http://jeorgius/';
        $nickname = $data['nickname'];
        $tmpFolder = $root.'/tmp/_'.$data['nickname'].'/';
        $jsonData = json_decode(file_get_contents($root.'/data/photos.json'));
        //1 - there's an element and I want to delete it
        if ($data['picHTML'] == '' or isset($data['picHTML']) == FALSE or $data['picHTML'] == null and
            isset($jsonData[$data['index']])) {

            array_splice($jsonData, $data['index'], 1); //delete 'length' elements starting with index
            file_put_contents($root . '/data/photos.json', json_encode($jsonData));
            $unnecessaryFiles = glob($root.'/data/photos/'.$data['index'].'.*');
            if (isset($tmpFolder)) {
                $tmpUnnecessary = glob($tmpFolder.$data['index'].'*');
                if (isset($tmpUnnecessary[0])) unlink($tmpUnnecessary[0]);
            }
            if(isset($unnecessaryFiles[0])) unlink($unnecessaryFiles[0]);
        }
        //2 - there was a tmp element, so I want not to save it
        elseif ($data['picHTML'] == '' or $data['picHTML'] == null and
            isset($jsonData[$data['index']])==FALSE) {
            if (isset($tmpFolder)) {
                $tmpUnnecessary = glob($tmpFolder.$data['index'].'*');
                if (isset($tmpUnnecessary[0])) unlink($tmpUnnecessary[0]);
                rmdir($tmpFolder);

            }
        }
        //3 - I want to save it.
        else {
            //a) there was no element before
            if(isset ($jsonData[$data['index']]) == FALSE) $jsonData[$data['index']] = new stdClass(); // new newsItem
            //b) edit element if there's tmp folder
            if(file_exists($tmpFolder)) {
                $tmpImage = glob($tmpFolder.'*');
                $jsonData[$data['index']]->picHTML = $htmlroot.'data/photos/'.basename($tmpImage[0]);
                rename($tmpImage[0], $root.'/data/photos/'.basename($tmpImage[0]));
                rmdir($tmpFolder);
            } else {}

            file_put_contents($root . '/data/photos.json', json_encode($jsonData));
        }
    }
}