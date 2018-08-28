


var content_tag = document.getElementById('content');
var el_2 = document.getElementById('zoomWindow');

let ImageLinks = [];
let ele = [];
var item;
var itemGallery;
var ClickedLink;
var ClickedLinkGallery;
var CurrentLink;
var NextPicLink;
let k = [];
let ClickCount = 1;
var l;
let htmlroot = 'http://mysite/';
let d = document;
let pageName = window.location.pathname;
let menu_expand = document.getElementById('menu_expand');
let marker = document.getElementsByClassName('marker'),
    direction = ['main', 'music', 'photos', 'store', 'users' , 'about', 'register'],
    content = d.getElementsByClassName('content');
//alert (Number('-1'));
//alert (pageName.lastIndexOf('kitchen'));
let pageNav = new navigator();
//if (pageName.lastIndexOf('kitchen') === Number('-1')) {let pageNav = new navigator();}


for (let i=0; i<direction.length - 1; i++){
    marker[i].addEventListener('click', function () {
        history.pushState( null, null,  '/' + direction[i]);
        pageNav.clickRebuild();
    }, false);
}
let register = d.getElementById('register');
if (register){
    register.addEventListener('click', function () {
        history.pushState( null, null,  '/' + direction[6]);
        pageNav.clickRebuild();
    }, false);
}
for (let i=0; i<marker.length;i++) marker[i].style.cursor = 'pointer';

let myProfile = d.getElementById('myProfile');
if (myProfile) {
    let nicknameL = d.getElementById('nicknameL');
    let directionProfile = nicknameL.innerText;
    myProfile.addEventListener('click', function () {
        history.pushState( null, null,  '/' + directionProfile);
        pageNav.clickRebuild();
    });
}


/* class CloseButtons {

   CreateButton () {
       $('<div>').attr('class', 'CloseButton').appendTo(parent);
       $('<img>', {src: "../icons/delete.png"}).appendTo(parent);
       }
} */
 /*          
function ZoomIn (el_2) {
                el_2.style.display = 'block';
                        }
                        
function ZoomOut (el_2) {
                el_2.style.display = 'none';
                        }
*/
/*
1. Load all links
2. Set script on all pics when necessary
3. Click - window opens up, loads small pics below(+1 selected), loads clicked pic on
4. Rotation
*/


/*
$('<a>', {
        text: '� ���������-������',
        href: 'http://google.com',
        target: "_blank",
        css: {
            color: 'green',
            backgroundColor: 'black',
            display: 'block',
            position: 'relative',
            padding: '10px',
        },
        width: 200,
        height: 100,
        offset: {
            top: 20,
            left: 120,
        },
        on: {
            click: function(event){
                alert('�� ���� ��������');
            },
            mouseover: function(event){
                alert("�� ���� ������ �����");
                $(this).off('mouseover');
            }
        },
        append: $('<br>')
                .add($('<span>', 
                  { 
                      text: '� ����������� html', 
                      css: { fontWeight: 'bold'}
                  }))
                .add($('<br>'))
                .add($('<span>', {
                    html: '<strong>��� html ����� � ����������</strong>',
                })),
    })
    .appendTo('#wrapper');


    $('<input>', {
        type: 'text',
        name: 'newTextField',
        title: '����� � ����! ����� � ���� ���������!',
        css: {
            position: 'relative',
            top: '50px'
        },
        val: 50,
    }).appendTo('#wrapper');
*/
                                    /* NAVIGATION STEALTH BLOCK*/
menu_expand.onclick = function (){
    let navigation = document.getElementsByClassName('navigation');
    let leftbar = document.getElementsByClassName('leftbar');

    for (let i=0; i<marker.length; i++){
        if (marker[i].className === 'marker') {
            marker[i].className += ' adaptive';
            navigation[1].style.display = 'block';
            leftbar[0].style.display = 'block';

    } else {
            marker[i].className = 'marker';
}}};

function NavClick (l) {
    if (l === 1) {
        $(".login-pass").css('display', 'block');
        $(this).mouseout(function() {
            $(".login-pass").stop().fadeTo(300, 1);});
        l = 2;}
    else if (l === 2) {
        $(".login-pass").stop().fadeTo(300, 0);
        $(this).mouseout(function() {
            $(".login-pass").stop().fadeTo(300, 0);});
        l = 1;
    }
    return l;
}

$('#NavAction').bind(
    {mouseover: function(event) {
            $(".login-pass").stop().fadeTo(300, 1);
        },
        mouseout: function(event){
            $(".login-pass").stop().fadeTo(300, 0);},
        click: function (event){
            ClickCount = NavClick(ClickCount);
        }});
                                                /* COMMENT */

$('#commentButton').click(function (){
    var com = $('#commentForm').val();
    $('<div>', {text: com}).attr('id', 'commentBox').appendTo('.content');
    $('<div>', {html: '&nbsp;'}).attr('class', 'GalleryCloseButton').appendTo('#commentBox');
});

                                                 /* GALLERY */

/*for (let j=0; j<Photos_Gallery.length; j++) {

    Photos_Gallery[j].onclick = function () {
        //$(this).on('click', function (event){
        let item = event.target || event.srcElement;
        let ClickedLink = item.src;
        let c = ImageLinks.length;


        $('.uberlayer').fadeTo(500, 1);
        $('<div>').attr('id', 'GalleryBackground').appendTo('.uberlayer').stop().fadeTo(500, 1);
        $('<div>').attr('id', 'GalleryWindow').appendTo('.uberlayer').stop().fadeTo(500, 1);
        $('<div>', {html: "&nbsp;"}).attr('class', 'GalleryLeftButton').appendTo('#GalleryWindow');
        $('<div>', {html: "&nbsp;"}).attr('class', 'GalleryRightButton').appendTo('#GalleryWindow');
        $('<div>', {text: "abcd"}).attr('class', 'GalleryCloseButton').appendTo('#GalleryWindow');
        $('<img>', {src: ClickedLink}).attr('id', 'GalleryPic').appendTo('#GalleryWindow');


        $('<div>').attr('id', 'GalleryPicSmallContainer').appendTo('#GalleryWindow');
        let CurrentLink = $('#GalleryPic').attr('src');


        for (let i = 0; i < ImageLinks.length; i++) {

            $('<img>', {
                src: ImageLinks[i], on: {
                    click: function (event) {
                        var itemGallery = event.target || event.srcElement;
                        var ClickedLinkGallery = itemGallery.src;
                        $('#GalleryPic').css('display', 'none').attr('src', ClickedLinkGallery).fadeTo(300, 1);
                        var k = PicArrayPosition();
                    }
                }
            }).attr('id', 'GalleryPicSmall').appendTo('#GalleryPicSmallContainer');
        }

        function PicArrayPosition() {
            let Link = $('#GalleryPic').attr('src');

            for (let i = 0; i < ImageLinks.length; i++) {
                if (Link === ImageLinks[i]) {
                    return [i, Link];
                }
            }

        }

        $('.GalleryLeftButton').on('click', function (event) {
                k = PicArrayPosition();
                let l = k[0];
                let m = k[1];
                if (l === 0) {
                    let a = c - 1;
                    $('#GalleryPic').css('display', 'none').attr('src', ImageLinks[a]).fadeTo(300, 1);
                    k = PicArrayPosition();
                } else if (l > 0) {
                    let a = l - 1;
                    $('#GalleryPic').css('display', 'none').attr('src', ImageLinks[a]).fadeTo(300, 1);
                    k = PicArrayPosition();
                }
            }
        );

        $('.GalleryRightButton').on('click', function (event) {
                k = PicArrayPosition();
                let l = k[0];
                let m = k[1];
                if (l === c - 1) {
                    $('#GalleryPic').css('display', 'none').attr('src', ImageLinks[0]).fadeTo(300, 1);
                    k = PicArrayPosition();
                } else if (l < c - 1) {
                    let a = l + 1;
                    $('#GalleryPic').css('display', 'none').attr('src', ImageLinks[a]).fadeTo(300, 1);
                    k = PicArrayPosition();
                }
            }
        );


        $('.GalleryCloseButton').on('click', function (event) {
            $.each($('.uberlayer'), function () {
                $(this).fadeTo(500, 0);
                setTimeout(function () {
                    $('.uberlayer').css('display', 'none').empty();
                }, 500);
            });
        });
    };
}
*/

//alert("GOOD");
