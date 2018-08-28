class navigator {

    // SCHEME = pageName
    // -> get (dataList)
    // -> ElementConstruct creates templates and fills them with data from dataList
    // -> -> or with 'about' and 'register' just displays template
    // -> -> with 'profile' or 'product' displays data for one object
    // ElementConstuct creates <rightbar></rightbar> only at profile page;
    // CREATE RIGHTBAR

    leftBuild () {
        let htmlroot = 'http://jeorgius/',
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer,
            contentHTML,
            d = document,
            leftbar;


        formSend.append('emptyL', '1');

        ajx.open('POST', htmlroot + 'main.php', true);
        ajx.onload = async function () {
            answer = JSON.parse(this.responseText);
            //alert(this.responseText);
            let a = await navigator.prototype.ElementConstruct ('login', '' , answer.leftbar, 'loginBar');
            navigator.prototype.scriptCallLeft();

        };

        ajx.send(formSend);
        //return Promise.resolve('1');
    }
    contentBuild(destination) {
        let htmlroot = 'http://jeorgius/',
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

        ajx.open('POST', htmlroot + 'main.php', true);
        ajx.onload = async function () {
            //alert(this.responseText);
            answer = JSON.parse(this.responseText);
            template = answer.template;
            dataList = answer.data;

            //alert(dataList[0]['newsTitle']);
            if (contentHTML === undefined) contentHTML = '<h3>The requsted page does not exist</h3>';

            let a = await navigator.prototype.ElementConstruct('content', template, dataList , destination);

            navigator.prototype.scriptCallCenter(destination);
            navigator.prototype.addEditing(answer.editingAbility);
        };

        ajx.send(formSend);
    }
    adminRedirect() {
        let htmlroot = 'http://jeorgius/',
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer;


        formSend.append('admin', '1');

        ajx.open('POST', htmlroot + 'main.php', true);
        ajx.onload = async function () {
            answer = JSON.parse(this.responseText);
            //alert(this.responseText);
            window.location.href = answer.adminWWW;
            let a = await navigator.prototype.ElementConstruct ('login', '' , answer.leftbar, 'loginBar');
            navigator.prototype.scriptCallLeft();
        };

        ajx.send(formSend);
        //return Promise.resolve('1');
    }

    ElementConstruct (tagname, templateSet, data , pageName) {
        let d = document,
            htmlroot = 'http://jeorgius/',
            tag = d.getElementsByTagName(tagname),
            rightbar = d.getElementsByTagName('rightbar'),
            content = d.getElementsByTagName('content'),
            whole = d.getElementsByClassName('whole');
        //alert(pageName);
        tag[0].innerHTML = '';

        if (pageName === 'about' || pageName === 'register') {
            content[0].style.display = 'block';
            tag[0].innerHTML = data;
        }
        else if (pageName === 'main' || '') {
            content[0].style.display = 'block';
            for (let i = data.length-1; i>-1; i--){
                let newsItem = d.createElement('news'),
                    newsTitle = d.createElement('newsTitle'),
                    img = d.createElement('img'),
                    newsText = d.createElement('newsText'),
                    newsTextBox = d.createElement('newsTextBox');


                newsTitle.innerText = data[i]['newsTitle'];
                img.src = data[i]['picHTML'];
                newsText.innerText = data[i]['newsText'];

                newsTextBox.appendChild(newsTitle);
                newsTextBox.appendChild(newsText);
                newsItem.appendChild(newsTextBox);
                newsItem.appendChild(img);

                tag[0].appendChild(newsItem);
            }
        }
        else if (pageName === 'music'){}
        else if (pageName === 'photos') {
            content[0].style.display = 'grid';
            for (let i = data.length-1; i>-1; i--){
                let photo = d.createElement('photo'),
                    img = d.createElement('img');

                img.src = data[i]['picHTML'];
                img.alt = data[i]['alt'];

                photo.appendChild(img);
                tag[0].appendChild(photo);
            }
        }
        else if (pageName === 'store') {
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
                userShort.appendChild(image);
                userShort.appendChild(uName);
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
        else {
            content[0].style.display = 'block';
            let profile = d.createElement('profile'),
                profileLeftBox = d.createElement('div'),
                h3 = d.createElement('h3'),
                ProfileNickname = d.createElement('div'),
                nameTag = d.createElement('name'),
                ProfileName = d.createElement('div'),
                pName = d.createElement('div'),
                surnameTag = d.createElement('surname'),
                pSurname = d.createElement('div'),
                ProfileSurname = d.createElement('div'),
                email = d.createElement('email'),
                ProfileText = d.createElement('div'),
                rightbar = d.createElement('rightbar'),
                ProfilePicFrame = d.createElement('div'),
                br = d.createElement('br');

            ProfileNickname.setAttribute('id', 'ProfileNickname');
            ProfileName.setAttribute('id', 'ProfileName');
            pName.setAttribute('id', 'name');
            ProfileSurname.setAttribute('id', 'ProfileSurname');
            pSurname.setAttribute('id', 'surname');
            ProfileText.setAttribute('id', 'text');


            ProfileNickname.innerText = data['free']['nickname'];
            pName.innerText = data['free']['name'];
            pSurname.innerText = data['free']['surname'];

            if(data['secure']!== undefined) {
                let ProfileEmail = d.createElement('div'),
                    pEmail = d.createElement('div');
                pEmail.setAttribute('id', 'email');
                email.innerText = "Email: ";
                ProfileEmail.setAttribute('id', 'ProfileEmail');
                email.appendChild(ProfileEmail);
                ProfileEmail.appendChild(pEmail);
                pEmail.innerText = data['secure']['email'];
            }

            if(data['free']['picHTML'] === '' || 0 || undefined) data['free']['picHTML'] = 'http://jeorgius/icons/userpic.jpg';
            ProfilePicFrame.setAttribute('id', 'ProfilePicFrame');
            ProfilePicFrame.style.background = "url('"+data['free']['picHTML'] +"') no-repeat";
            ProfilePicFrame.style.backgroundSize = 'contain';

            content[0].appendChild(profile);
            profile.appendChild(profileLeftBox);
            profile.appendChild(rightbar);

            profileLeftBox.appendChild(h3);
            h3.appendChild(ProfileNickname);

            profileLeftBox.appendChild(nameTag);
            nameTag.innerText = 'Name: ';
            nameTag.appendChild(ProfileName);
            ProfileName.appendChild(pName);

            profileLeftBox.appendChild(surnameTag);
            surnameTag.innerText = 'Surname: ';
            surnameTag.appendChild(ProfileSurname);
            ProfileSurname.appendChild(pSurname);
            //profileLeftBox.appendChild(ProfileSurname);

            profileLeftBox.appendChild(email);
            profileLeftBox.appendChild(br);
            profileLeftBox.appendChild(br);
            profileLeftBox.appendChild(ProfileText);
            if (data['free']['text']===''||0||undefined) data['free']['text'] = '<p>Now you can:</p>\n' +
                '<ul>\n' +
                '    <li>Delete this freaking text and set yours</li>\n' +
                '    <li>Private message me or the other users</li>\n' +
                '    <li>Submit a new thread in a forum section</li>\n' +
                '    <li>Post comments to the news and forum threads</li>\n' +
                '    <li>Make a request to me to make a video</li>\n' +
                '    <li>Support my evil deeds</li>\n' +
                '</ul>';
            ProfileText.innerHTML = data['free']['text'];
            rightbar.appendChild(ProfilePicFrame);
        }

        /*if (pageName === 'rightbar' && data === '' || undefined) {
            if (rightbar[0]) whole[0].removeChild(rightbar[0]);
            whole[0].style.gridTemplateColums = '160px auto';
        }
        else {
            if (!rightbar[0]) rightbar = d.createElement('rightbar');
            whole[0].style.gridTemplateColums = '160px auto 160px';
            whole[0].appendChild(rightbar);
            rightbar[0].style.display = 'block';

        }*/
        return Promise.resolve(1)
    }
    scriptCallLeft () {

        let ClickCount = 0;
        let htmlroot = 'http://jeorgius/';
        let d = document;
        let pageName = window.location.pathname;
        let menu_expand = document.getElementsByTagName('menu_expand');
        let marker = document.getElementsByClassName('marker'),
            direction = ['main', 'music', 'photos', 'store', 'users', 'about', 'register'],
            login = d.getElementsByTagName('login');

        for (let i = 0; i < direction.length - 1; i++) {
            marker[i].addEventListener('click', function () {
                history.pushState(null, null, '/' + direction[i]);
                navigator.prototype.clickRebuild();
            }, false);
        }

        let register = d.getElementById('register');
        if (register) {
            register.addEventListener('click', function () {
                history.pushState(null, null, '/' + direction[6]);
                navigator.prototype.clickRebuild();
            }, false);
        }

        let MyProfile = d.getElementById('MyProfile');
        if (MyProfile) {
            let nicknameL = d.getElementById('nicknameL');
            let directionProfile = nicknameL.innerText;
            MyProfile.addEventListener('click', function () {
                history.pushState(null, null, '/' + directionProfile);
                navigator.prototype.clickRebuild();
            });
        }

        /* NAVIGATION STEALTH BLOCK*/
        function YourActionClick (ClickCount) {
            if (ClickCount === 0) {
                login[0].style.opacity = '1';
                marker[6].addEventListener('mouseout', function () {
                    login[0].style.opacity = '1'
                }, false);
                ClickCount = 1;
            } else if (ClickCount === 1) {
                login[0].style.opacity = '0';
                marker[6].addEventListener('mouseout', function () {
                    login[0].style.opacity = '0'
                }, false);
                ClickCount = 0;
            }
            return ClickCount;
        }

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
        marker[6].addEventListener('mouseover', function(){login[0].style.opacity = '1'}, false);
        marker[6].addEventListener('mouseout', function(){login[0].style.opacity = '0'}, false);
        marker[6].onclick = function () {
            ClickCount = YourActionClick(ClickCount);
        };

        /* LOGIN BUTTON             */
        let LoginButton = d.getElementById('LoginButton');
        if (LoginButton) {
            LoginButton.onclick = function () {
                navigator.prototype.loginEnter();
            }
        }

        let LogOutButton = d.getElementById('LogOutButton');
        if (LogOutButton) {
            LogOutButton.onclick = function () {
                navigator.prototype.LogOut();
            }
        }

    }
    scriptCallCenter(type) {
        let d = document;
        if(type === 'register') {
            let registerButton = d.getElementById('registerButton');
            registerButton.onclick = function () {
                navigator.prototype.register();
            }
        }

        if(type !== ''||'main'||'music'||'photos'||'store'||'users'||'about'||'register'){

        }
        else {

        }
    }

    BuildLoadedPage (pageName) {
        navigator.prototype.leftBuild();
        navigator.prototype.contentBuild(pageName);
        //navigator.prototype.rightBuild(pageName);
    }
    BuildCenterRight (pageName) {
        navigator.prototype.contentBuild(pageName);
        //navigator.prototype.rightBuild(pageName);
    }

    register(){
        let d = document,
            nickname = d.getElementById('nickname'),
            email = d.getElementById('email'),
            name = d.getElementById('name'),
            surname = d.getElementById('surname'),
            pw = d.getElementById('registerPW'),
            UserDataF = {'id': '', 'nickname': nickname.value, 'name': name.value,
                        'surname': surname.value,'text': '', 'pic': '', 'picHTML': '', 'picPHP': ''},
            UserDataS = {'id': '', 'nickname': nickname.value, 'email': email.value, 'pw': pw.value},
            UserDataShort = {'id': '', 'nickname': nickname.value, 'name': name.value,
                'surname': surname.value, 'picHTML': ''},

            htmlroot = 'http://jeorgius/',
            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData(),
            answer;

        formSend.append('jsonF', JSON.stringify(UserDataF));
        formSend.append('jsonS', JSON.stringify(UserDataS));
        formSend.append('jsonShort', JSON.stringify(UserDataShort));
        formSend.append('nickname', UserDataF.nickname);
        formSend.append('email', UserDataS.email);
        formSend.append('name', UserDataF.name);
        formSend.append('surname', UserDataF.surname);
        formSend.append('pw', UserDataS.pw);

        ajx.open('POST', htmlroot + 'main.php', true);
        ajx.onload = function () {
            //alert(this.responseText);
            answer = JSON.parse(this.responseText);
            //alert(answer.data);
        };

        ajx.send(formSend);


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

        ajx.open('POST', htmlroot + 'main.php', true);
        ajx.onload = async function () {
            //alert(this.responseText);
            answer = JSON.parse(this.responseText);
            let a = await navigator.prototype.ElementConstruct ('login', '' , answer.leftbar, 'loginBar');
            navigator.prototype.scriptCallLeft();
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

        ajx.open('POST', htmlroot + 'main.php', true);
        ajx.onload = async function () {
            answer = JSON.parse(this.responseText);
            //alert(this.responseText);
            let a = await navigator.prototype.ElementConstruct ('login', '' , answer.leftbar, 'loginBar');
            navigator.prototype.scriptCallLeft();
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
            jsAdder = d.createElement('script'),
            scripts = document.getElementsByTagName('script'),
            areThere = 0;

        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src === AdderSrc || scripts[i].src === ClassSrc) {
                d.body.removeChild(scripts[i]);
            }
        }
            jsClass.src = ClassSrc;
            jsAdder.src = AdderSrc;
            d.body.appendChild(jsClass);
            jsClass.onload = function () {
                d.body.appendChild(jsAdder);
            }

    }
    jsRemoveScripts(ClassSrc, AdderSrc) {
        let d = document,
            scripts = document.getElementsByTagName('script');

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
            navigator.prototype.jsAddScripts(classSrc, adderSrc);
        } else { //REMOVING editing scripts
            navigator.prototype.jsRemoveScripts(classSrc, adderSrc);
        }
    }


    clickRebuild() {
        let currentPage = window.location.pathname,
            pageName = currentPage.substr(currentPage.lastIndexOf("/") + 1); //index of ("/") initially

        pageName = pageName.replace('/', '');
        navigator.prototype.BuildCenterRight(pageName);
    }
    constructor() {
        let login = document.getElementsByTagName('login');

        let currentPage = window.location.pathname,
            pageName = currentPage.substr(currentPage.lastIndexOf("/") + 1); //index of ("/") initially
        pageName = pageName.replace('/', ''); // removing '/' from navigation link
        if (currentPage.indexOf('admin') > -1) {
            navigator.prototype.adminRedirect();
        }
        if(login[0].innerHTML = '' || !login[0].innerHTML) {
            navigator.prototype.BuildLoadedPage(pageName);
        }


    }
}