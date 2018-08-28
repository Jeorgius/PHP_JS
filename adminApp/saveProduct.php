<?php
$root = $_SERVER['DOCUMENT_ROOT'];
include($root . '/app/product.php');
include ($root . '/app/tools.php');
$nickname = $_SESSION['nickname'];
//include ($root . '/template/BuildPage.php');

/*$dbAdmin = 'root';
$dbPw = '';
$dbName = 'UserInfo';
$host = 'localhost';
*/
$product = new product();
$tmpDir = $root . '/tmp/' . $nickname . '/';
$productJSON = array ();
$featurePics = glob($tmpDir . '*'); // returns the whole pass to pictures, so basename it!
//$owner = $page->userData();
if (isset($_POST['sku'])) {
    $sku = $_POST['sku'];
    $product->sku = $sku;
    //$sql = "UPDATE users SET name='". $user->name . "' WHERE nickname = '" . $user->nickname."';";
    if(file_exists($root . '/product/' . $sku)===FALSE) mkdir($root . '/product/' . $sku);
}

if (isset($_POST['title'])) {
    $productTitle = $_POST['title'];
    $product->title = $productTitle;
    $productJSON['title'] = $productTitle;
}
if(isset($_POST['productPN'])){
    $productPN = $_POST['productPN'];
    $product->pn = $productPN;
    $productJSON['productPN'] = $productPN;
} else {
    $productPN = 0;
    $product->pn = $productPN;
    $productJSON['productPN'] = $productPN;
}
if(isset($_POST['popularity'])){
    $popularity = $_POST['popularity'];
    $product->popularity = $popularity;
    $productJSON['popularity'] = $popularity;
} else {
    $popularity = 0;
    $product->popularity = $popularity;
    $productJSON['popularity'] = $popularity;
}

if(isset($_POST['category'])){
    $category = $_POST['category'];
    $product->category = $category;
    $productJSON['category'] = $category;
} else {
    $category = 0;
    $product->category = $category;
    $productJSON['category'] = $category;
}
if(isset($_POST['price'])){
    $price = $_POST['price'];
    $product->price = $price;
    $productJSON['price'] = $price;
} else {
    $price = 0;
    $product->price = $price;
    $productJSON['price'] = $price;
}
if(isset($_POST['vendor'])){
    $vendor = $_POST['vendor'];
    $product->vendor = $vendor;
    $productJSON['vendor'] = $vendor;
} else {
    $vendor = 0;
    $product->vendor = $vendor;
    $productJSON['vendor'] = $vendor;
}

//getting tag names

$skuDir = $root . '/product/' . $sku . '/';

if(file_exists($skuDir)===FALSE) mkdir($skuDir);
for ($i=0; $i<count($featurePics); $i++) {
    rename($tmpDir . basename($featurePics[$i]),
           $skuDir . basename($featurePics[$i]));
}

for ($i=0; $i<$_POST['fQ']; $i++) {
    if (isset($_POST['fTitle'. $i]) === FALSE) $_POST['fTitle' . $i] = 0;
    if (isset($_POST['fText' . $i]) === FALSE) $_POST['fText' . $i] = 0;
    if (glob($skuDir.'fl'.$i.'*')===FALSE or
        glob($skuDir.'fr'.$i.'*')===FALSE or
        glob($skuDir.'fm'.$i.'*')===FALSE   ) {
        $pic = 0;
    } else {
        $pic = glob($skuDir.'fl'.$i.'*') or
        $pic = glob($skuDir.'fr'.$i.'*') or
        $pic = glob($skuDir.'fm'.$i.'*');
    }

    $product->features[$i] = ['tag' => $_POST['tag' . $i],
                              'title' => $_POST['fTitle' . $i],
                              'text' => $_POST['fText' . $i],
                              'image' => $pic];
    $productJSON[$i] = ['tag' => $_POST['tag' . $i],
                        'title' => $_POST['fTitle' . $i],
                        'text' => $_POST['fText' . $i],
                        'image' => $pic];

}
$product_JSON_path[$sku] = ['path' => $skuDir . $sku . '.json',
                            'popularity' => $popularity];

$commonJSON = file_get_contents($root . '/products/products.json');
$commonJSON->$sku = new \stdClass();
$commonJSON->$sku->title = $productTitle;
$commonJSON->$sku->category = $category;
$commonJSON->$sku->price = $price;
//$commonJSON->$sku->picHTML = $picHTML;


$productInfo = serialize($product);
$JSON_content = json_encode($productJSON);
$JSON_path = json_encode($product_JSON_path);

file_put_contents($skuDir . $sku . '.txt', $productInfo);
file_put_contents($skuDir . $sku . '.json', $JSON_content); //JSON-file
file_put_contents($root . '/product/products_node.json', $JSON_path, FILE_APPEND); //JSON-file path for calling from node

if(file_exists($tmpDir)) rmdir($tmpDir);
$msg = 'SAVED SUCCESSFULLY';
echo json_encode($msg);

//$user = $user->SaveUserData($user);
/*
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbName", $dbAdmin, $dbPw);
    $conn->exec($sql);
} catch (PDOException $e) {
    $NewContent['Error'] = 'Error: no updated were made';
}

$conn = null;*/