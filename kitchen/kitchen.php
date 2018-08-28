<?php
if ($_SESSION['rank'] !== '9') echo 'gtfo';
else {
    include_once ($_SERVER['DOCUMENT_ROOT'].'/kitchen/kitchen.html');
}