class admin {

    // SCHEME = pageName
    // -> get (template,dataList)
    // -> ElementConstruct creates templates and fills them with data
    // -> -> or with 'about' and 'register' just displays template
    // -> -> with 'profile' or 'product' displays data for one object
    // ElementConstuct creates <rightbar></rightbar> only at profile page;
    // CREATE RIGHTBAR

    leftBuild () {
            admin.prototype.scriptCallLeft();
    }

    contentBuild(destination) {
        let htmlroot = 'http://jeorgius/',
            CLASS = admin.prototype,
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer,
            contentHTML,
            d = document,
            dataList,
            content = d.getElementsByTagName('content'),
            visitorNick = d.getElementById('nicknameL'),
            template;


        if (destination === '' || destination === undefined) destination = 'main';

        formSend.append('typeC', destination);

        ajx.open('POST', htmlroot + 'kitchen/admin.php', true);
        ajx.onload = async function () {
            //alert(this.responseText);
            answer = JSON.parse(this.responseText);
            template = answer.template;
            dataList = answer.data;

            //alert(dataList[0]['newsTitle']);
            if (contentHTML === undefined) contentHTML = '<h3>The requsted page does not exist</h3>';

            let a = await CLASS.ElementConstruct('content', template, dataList , destination);

            CLASS.scriptCallCenter(destination);
            CLASS.addEditing(answer.editingAbility);
            let contentEditor = new editor(destination);
        };

        ajx.send(formSend);
    }
    rightBuild (destination) {
        let htmlroot = 'http://jeorgius/',
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer,
            contentHTML = [],
            d = document;

        if (destination === '' || destination === undefined) destination = 'main';

        formSend.append('typeR', destination);

        ajx.open('POST', htmlroot + 'admin.php', true);
        ajx.onload = async function () {
            answer = JSON.parse(this.responseText);

            contentHTML = answer.rightbar;

            if (contentHTML === undefined || contentHTML === 'null') {
                contentHTML = '';
            }
            let a = admin.prototype.ElementConstruct('rightbar', '' , contentHTML, 'rightbar');
            admin.prototype.scriptCallRight();
            admin.prototype.addEditing(answer.editingAbility);
            //InitiateG(pageName);
        };

        ajx.send(formSend);
    }

    ElementConstruct (tagname, templateSet, data , pageName) {
        let d = document,
            tag = d.getElementsByTagName(tagname),
            rightbar = d.getElementsByTagName('rightbar'),
            content = d.getElementsByTagName('content'),
            whole = d.getElementsByClassName('whole'),
            htmlroot = 'http://jeorgius/';
        //alert(pageName);
        tag[0].innerHTML = '';

        if (pageName === 'about' || pageName === 'register') {
            content[0].style.display = 'block';
            tag[0].innerHTML = data;
        }
        else if (pageName === 'news' || '') {
            content[0].style.display = 'block';


            for (let i = data.length-1; i>-1; i--){
                let newsItem = d.createElement('news'),
                    newsTitle = d.createElement('newsTitle'),
                    imgarea = d.createElement('imageArea'),
                    img = d.createElement('img'),
                    newsText = d.createElement('newsText'),
                    newsTextBox = d.createElement('newsTextBox');


                newsTitle.innerText = data[i]['newsTitle'];
                img.src = data[i]['picHTML'];
                newsText.innerText = data[i]['newsText'];

                newsTextBox.appendChild(newsTitle);
                newsTextBox.appendChild(newsText);
                newsItem.appendChild(newsTextBox);
                imgarea.appendChild(img);
                newsItem.appendChild(imgarea);

                tag[0].appendChild(newsItem);
            }
        }
        else if (pageName === 'music'){}
        else if (pageName === 'photos') {
            content[0].style.display = 'grid';
            for (let i = data.length-1; i>-1; i--){
                let photo = d.createElement('photo'),
                    imageArea = d.createElement('imageArea'),
                    img = d.createElement('img');

                img.src = data[i]['picHTML'];
                img.alt = data[i]['alt'];

                imageArea.appendChild(img);
                photo.appendChild(imageArea);
                tag[0].appendChild(photo);
            }
        }
        else if (pageName === 'store') {
            content[0].style.display = 'grid';
            content[0].style.display = 'grid';
            function BuildProduct(title, partnumber, price, hot, pic) {
                let productShort = d.createElement('prodItem'),
                    image = d.createElement('img'),
                    pTitle = d.createElement('pTitle'),
                    pn = d.createElement('pn'),
                    pPrice = d.createElement('price'),
                    hotSale = d.createElement('hotSale'),

                    creds = [title, partnumber, price];
                let pTags = [pTitle, pn, pPrice];
                //userShort.setAttribute('class', 'userShort');

                if (pic === '' || pic === undefined || pic === 0) pic = htmlroot + 'icons/userpic.jpg';
                image.src = pic;
                for (let k = 0; k < creds.length; k++) {
                    pTags[k].innerText = creds[k];
                    //alert(uTags[k].innerText);
                }
                if (hot == 1) {
                    hotSale.style.display = 'block';
                    hotSale.innerText = 'HOTSALE';
                }

                productShort.appendChild(pTitle);
                productShort.appendChild(image);
                productShort.appendChild(pn);
                productShort.appendChild(pPrice);
                productShort.appendChild(hotSale);
                content[0].appendChild(productShort);

            }
            for (let j = data.length-1; j > -1; j--) {
                BuildProduct(data[j].pTitle, data[j].pn, '$'+data[j].price, data[j].hot, data[j].picHTML);
            }
        }
        else if (pageName === 'addProduct') {
            content[0].style.display = 'block';
            tag[0].innerHTML = data;
        }
        else if (pageName === 'users') {
            content[0].style.display = 'grid';
            function BuildUser(nickname, name, surname, pic) {
                let userShort = d.createElement('user'),
                    image = d.createElement('img'),
                    uNick = d.createElement('nickname'),
                    uName = d.createElement('name'),
                    uSurname = d.createElement('surname'),
                    creds = [nickname, name, surname];
                let uTags = [uNick, uName, uSurname];
                //userShort.setAttribute('class', 'userShort');

                if (pic === '' || pic === undefined || pic === 0) pic = htmlroot + 'icons/userpic.jpg';
                image.src = pic;
                for (let k = 0; k < creds.length; k++) {
                    uTags[k].innerText = creds[k];
                    //alert(uTags[k].innerText);
                }

                userShort.appendChild(uNick);
                //userShort.appendChild(br);
                userShort.appendChild(image);
                //userShort.appendChild(br);
                userShort.appendChild(uName);
                //userShort.appendChild(br);
                userShort.appendChild(uSurname);
                content[0].appendChild(userShort);
            }
            for (let j = 0; j < data.length; j++) {
                BuildUser(data[j].nickname, data[j].name, data[j].surname, data[j].picHTML);
            }
        }
        else if (pageName === 'loginBar') {
            tag[0].innerHTML = data;
        }
        return Promise.resolve(1)
        }

    scriptCallLeft () {

        let ClickCount = 0;
        let htmlroot = 'http://jeorgius/';
        let d = document;
        let pageName = window.location.pathname;
        let menu_expand = document.getElementsByTagName('menu_expand');
        let marker = document.getElementsByClassName('marker'),
            direction = ['overview', 'news',
                         'music', 'photos',
                         'store', 'users',
                         'about'],
            login = d.getElementsByTagName('login');

        for (let i = 0; i < direction.length; i++) {
            marker[i].addEventListener('click', function () {
                history.pushState(null, null, '/admin/' + direction[i]);
                admin.prototype.clickRebuild();
            }, false);
        }


        /* NAVIGATION STEALTH BLOCK*/

        menu_expand.onclick = function () {
            let navigation = document.getElementsByClassName('navigation');
            let leftbar = document.getElementsByClassName('leftbar');

            for (let i = 0; i < marker.length; i++) {
                if (marker[i].className === 'marker') {
                    marker[i].className += ' adaptive';
                    navigation[1].style.display = 'block';
                    leftbar[0].style.display = 'block';

                } else {
                    marker[i].className = 'marker';
                }
            }
        };
    }
    scriptCallCenter(pageName) {
        if (pageName==='addProduct') {
            let AJX = new XMLHttpRequest();
            let d = document;
            let creation = new createProduct();

            function preventDefaultReRouts (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            function Highlighting (e) {
                Gallery.classList.add('highlight');
            }
            function HighlightingOff (e) {
                Gallery.classList.remove('highlight');
            }
            function uploadFile(file, i) {
                let link = 'http://mysite/tmp';
                let formData = new FormData();

                AJX.open('POST', link, true);


                AJX.upload.addEventListener('progress', function (e) {
                    updateProgress(i, (e.loaded * 100.0 / e.total ) || 100);
                });

                AJX.addEventListener('readystatechange', function (e){
                    if (AJX.readyState === 4 && AJX.status === 200) {
                        updateProgress(i, 100);
                    } else if (AJX.readyState === 4 && AJX.status !== 200) {
                        alert('Wrong');
                    }
                });

                formData.append('gFile', file); /* sets key=>value for data objects */
                alert(formData.get('gFile'));
                AJX.send(formData);
            }
            function previewFile(file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function() {
                    let img = document.createElement('img');
                    img.src = reader.result;
                    document.getElementById('productGallerySmall').appendChild(img);
                }
            }
            function IterateFiles (files) {
                //([...files].forEach(uploadFile));
                initializeProgress(files.length);
                ([...files]).forEach(uploadFile);
                ([...files]).forEach(previewFile);
            }
            function initializeProgress (ProgressOfFile) {
                ProgressBar.value = 0;
                uploadProgress = [];

                for (let i=ProgressOfFile; i>0; i--) {
                    uploadProgress.push(0);
                }
            }
            function updateProgress(fileNumber, percent) {
                uploadProgress[fileNumber] = percent;
                let totality = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
                progressBar.value = totality;
            }
            function DropFiles (e) {
                let files = e.dataTransfer.files;
                IterateFiles(files);
            }

            let Gallery = document.getElementById('productGalleryAdd');
            let uploadProgress = [];

            let progressBar = document.getElementById('ProgressBar');



            ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
                Gallery.addEventListener(eventName, preventDefaultReRouts, false)
            });
            ['dragenter', 'dragover'].forEach(eventName => {
                Gallery.addEventListener(eventName, Highlighting, false);
            });
            ['dragleave', 'drop'].forEach(eventName => {
                Gallery.addEventListener(eventName, HighlightingOff, false);
            });
            Gallery.addEventListener('drop', DropFiles, false);

        }
    }
    scriptCallRight() {}

    BuildLoadedPage (pageName) {
        admin.prototype.leftBuild();
        admin.prototype.contentBuild(pageName);
    }
    BuildCenterRight (pageName) {
        admin.prototype.contentBuild(pageName);
    }

    loginEnter () {
        let htmlroot = 'http://jeorgius/',
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer,
            contentHTML,
            d = document,
            login = d.getElementById('login'),
            pw = d.getElementById('pw');


        formSend.append('login', login.value);
        formSend.append('pw', pw.value);

        ajx.open('POST', htmlroot + 'admin.php', true);
        ajx.onload = async function () {
            //alert(this.responseText);
            answer = JSON.parse(this.responseText);
            let a = await admin.prototype.ElementConstruct ('login', '' , answer.leftbar, 'loginBar');
            admin.prototype.scriptCallLeft();

        };
        ajx.send(formSend);
    }
    LogOut() {
        let htmlroot = 'http://jeorgius/',
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer,
            contentHTML,
            d = document;


        formSend.append('logOff', 1);

        ajx.open('POST', htmlroot + 'kitchen/admin.php', true);
        ajx.onload = async function () {
            answer = JSON.parse(this.responseText);
            //alert(this.responseText);
            let a = await admin.prototype.ElementConstruct ('login', '' , answer.leftbar, 'loginBar');
            admin.prototype.scriptCallLeft();
        };
        ajx.send(formSend);
    }

    InitiateGallery (pageName) {
        if (pageName.substr(pageName.lastIndexOf("/") + 1) === 'photos') {
            let Photos_Gallery = d.getElementsByClassName('photosStandard');
            for (let i = 0; i < Photos_Gallery.length; i++) {
                Photos_Gallery[i].onclick = function () {
                    let PhotoGallery = new gallery();
                };
            }
        }
    }

    jsAddScripts(ClassSrc, AdderSrc) {
        let d = document,
            jsClass = d.createElement('script'),
            jsAdder = d.createElement('script');

        jsClass.src = ClassSrc;
        jsAdder.src = AdderSrc;
        d.body.appendChild(jsClass);
        jsClass.onload = function () {
            d.body.appendChild(jsAdder);
        }
    }

    jsRemoveScripts(ClassSrc, AdderSrc) {
        let scripts = document.getElementsByTagName('script');
        //htmlroot = 'http://mysite/',

        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src === AdderSrc || scripts[i].src === ClassSrc) {
                d.body.removeChild(scripts[i]);
            }
        }
    }

    addEditing(editingAbility) {
        let htmlroot = 'http://jeorgius/',
            classSrc = htmlroot + 'js/profile.js',
            adderSrc = htmlroot + 'js/EditingAdd.js';

        if (editingAbility === 1) { //ADDING editing scripts
            admin.prototype.jsAddScripts(classSrc, adderSrc);
        } else { //REMOVING editing scripts
            admin.prototype.jsRemoveScripts(classSrc, adderSrc);
        }
    }


    clickRebuild() {
        let currentPage = window.location.pathname,
            pageName = currentPage.substr(currentPage.lastIndexOf("/") + 1); //index of ("/") initially

        pageName = pageName.replace('/', '');
        //alert(pageName);
        admin.prototype.BuildCenterRight(pageName);
    }
    constructor() {
        let login = document.getElementsByTagName('login');

        let currentPage = window.location.pathname,
            pageName = currentPage.substr(currentPage.lastIndexOf("/") + 1); //index of ("/") initially
        pageName = pageName.replace('/', ''); // removing '/' from navigation link

        //alert(pageName);
        if (pageName === 'kitchen.php') {
            history.pushState(null, null, '/admin/overview');
            admin.prototype.scriptCallLeft();
        }
        else {admin.prototype.BuildLoadedPage(pageName);}
    }



        /*if (pageName === 'users') {
            admin.prototype.arrangeUsersShort('users');
        } else {
            admin.prototype.contentReceive(pageName, admin.prototype.InitiateGallery);
        }*/

}