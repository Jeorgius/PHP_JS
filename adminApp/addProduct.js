class createFeature {

    Attributes (element, attributes) {
        for (let k in attributes) {
            element.setAttribute(k, attributes[k]);
        }
    }
    setIndex() {
        let features = document.getElementsByClassName('productFeature');
        for (let i=0; i<features.length; i++) {
            features[i].setAttribute('id', i);
        }
    }

    addControls (fTagControls) {
        let d = document,
            cDelete = d.createElement('delete'),
            content = d.getElementsByClassName('content');

        fTagControls.innerText = 'CLICK TWICE TO DELETE';
        fTagControls.appendChild(cDelete);
        fTagControls.onclick = function () {
            fTagControls.innerText = 'DELETE';

            fTagControls.onclick = function () {
                content[0].removeChild(fTagControls.parentNode);
                createFeature.prototype.setIndex();
            };
        };
    }
    addForm(ImageTag, index) {
        let d = document,
            elements = [d.createElement('form'),
                        d.createElement('p'),
                        d.createElement('input'),
                        d.createElement('progress')];

        createFeature.prototype.Attributes(elements[0], {'method': 'POST',
                                                   'id': 'EditForm' + index});
        elements[2].setAttribute('type', 'file');
        elements[2].style.opacity = '0';
        createFeature.prototype.Attributes(elements[3], {'class': 'ProgressBar',
                                                         'value': '0',
                                                         'max': '100'});
        elements[1].innerHTML = 'Drag<br> img<br> here';
        for (let i = 0; i<elements.length; i++) ImageTag.appendChild(elements[i]);

    }

    addSaveButton () {
        let d = document,
            whole = d.getElementsByClassName('whole'),
            fixedBottom = d.createElement('div'),
            saveAllButton = d.createElement('div');
        saveAllButton.setAttribute('id', 'saveAllButton');
        saveAllButton.innerText = 'SAVE';
        fixedBottom.setAttribute('class', 'fixedBottom');
        fixedBottom.appendChild(saveAllButton);
        whole[0].appendChild(fixedBottom);

        saveAllButton.addEventListener('click', createFeature.prototype.saveAll, false);
    }
    saveAll () {
        let d = document,
            htmlroot = 'http://mysite/',
            feats = d.getElementsByClassName('productFeature'),
            featQ = feats.length,
            fTitles = [],
            fTexts = [],
            tags = [];

        let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData();
        // filling tag names array
        for (let i=0; i<featQ;i++) {
            tags[i] = d.getElementById(i).tagName;
            formSend.append('tag'+i, tags[i]);
            alert(tags[i]);
        }

        //filling in Titles array
        for (let i=0; i<featQ;i++) {
            let titleBox = feats[i].getElementsByClassName('Title');

            if (titleBox[0].value === 0 || titleBox[0].value === undefined ) {
                fTitles[i] = 0;
            }
            else {fTitles[i] = titleBox[0].value;}

            formSend.append('fTitle'+i, fTitles[i]);
        }

        //filling in Texts array
        for (let i=0; i<featQ;i++) {
            let textBox = feats[i].getElementsByClassName('Text');
            if (textBox[0] === 0 || textBox[0] === undefined ||
                textBox[0].value === 0 || textBox[0].value === undefined) {
                fTexts[i] = 0;
            }
            else {fTexts[i] = textBox[0].value;}

            formSend.append('fText'+i, fTexts[i]);
        }

        //Getting other inputs - Title, sku, PN, popularity, category, price
        let creds = [d.getElementById('productTitle'),
                     d.getElementById('sku'),
                     d.getElementById('productPN'),
                     d.getElementById('popularity'),
                     d.getElementById('category'),
                     d.getElementById('price'),
                     d.getElementById('vendor')];

        formSend.append('title', creds[0].value);
        formSend.append('sku', creds[1].value);
        formSend.append('pn', creds[2].value);
        formSend.append('popularity', creds[3].value);
        formSend.append('category', creds[4].value);
        formSend.append('vendor', creds[6].value);
        formSend.append('price', creds[5].value);
        formSend.append('fQ', featQ);           //quantity of features

        ajx.open('POST', htmlroot+'admin/saveProduct.php', true);
        ajx.onload = function() {
            let answer = JSON.parse(this.responseText);
            //let msg = answer.msg;
            //let PicPlace = areaTag.getElementById('ProfilePicFrame');
            //alert (typeof gotPic);

            alert(answer);
        };

        ajx.send(formSend);
    }

    addLeftFeature (i) {

        let d = document,
            empty = d.getElementById('empty'),
            content = d.getElementsByClassName('content');



        let leftF = d.createElement('fLeft'),
            pic = d.createElement('div'),
            textI = d.createElement('textarea'),
            titleI = d.createElement('input'),
            controls = d.createElement('controls');

        createFeature.prototype.Attributes(leftF, {'class': 'productFeature'});
        pic.setAttribute('class', 'Image');
       //pic.style.height = '300px';
        textI.setAttribute('class', 'Text');
        titleI.setAttribute('class', 'Title');

        leftF.appendChild(pic);
        leftF.appendChild(titleI);
        leftF.appendChild(textI);
        leftF.appendChild(controls);
        createFeature.prototype.addControls(controls);
        content[0].replaceChild(leftF, empty);
        createFeature.prototype.addEmptyField();
        createFeature.prototype.removeAdminFeaturePanel();
        createFeature.prototype.addAdminFeaturePanel();

        createFeature.prototype.setIndex();
        let index = leftF.getAttribute('id');
        createFeature.prototype.addForm(pic,index);
        createFeature.prototype.BuildDragNDropSingle(pic,index);

    }
        addLeftFeatureButton() {
            let d = document,
                panel = d.getElementById('addFeaturePanel');

            let button = d.createElement('div');
            button.setAttribute('id', 'addFeatureLeftButton');
            button.addEventListener('click', this.addLeftFeature, false);
            panel.appendChild(button);
        }
    addRightFeature () {

        let d = document,
            empty = d.getElementById('empty'),
            content = d.getElementsByClassName('content');



        let rightF = d.createElement('fRight'),
            pic = d.createElement('div'),
            textI = d.createElement('textarea'),
            titleI = d.createElement('input'),
            controls = d.createElement('controls');

        rightF.setAttribute('class', 'productFeature');
        pic.setAttribute('class', 'Image');
        textI.setAttribute('class', 'Text');
        titleI.setAttribute('class', 'Title');

        rightF.appendChild(pic);
        rightF.appendChild(titleI);
        rightF.appendChild(textI);
        rightF.appendChild(controls);
        createFeature.prototype.addControls(controls);
        content[0].replaceChild(rightF, empty);
        createFeature.prototype.addEmptyField();
        createFeature.prototype.removeAdminFeaturePanel();
        createFeature.prototype.addAdminFeaturePanel();
        createFeature.prototype.setIndex();
        let index = rightF.getAttribute('id');
        createFeature.prototype.addForm(pic,index);
        createFeature.prototype.BuildDragNDropSingle(pic,index);
    }
        addRightFeatureButton () {
            let d = document,
                panel = d.getElementById('addFeaturePanel');

            let button = d.createElement('div');
            button.setAttribute('id', 'addFeatureRightButton');
            button.addEventListener('click', createFeature.prototype.addRightFeature, false);
            panel.appendChild(button);
        }
    addMediaFeature () {
        let d = document,
            empty = d.getElementById('empty'),
            content = d.getElementsByClassName('content');

        let mediaF = d.createElement('fMedia'),
            pic = d.createElement('div'),
            titleI = d.createElement('input'),
            controls = d.createElement('controls');

        mediaF.setAttribute('class', 'productFeature');
        pic.setAttribute('class', 'Image');
        titleI.setAttribute('class', 'Title');

        mediaF.appendChild(pic);
        mediaF.appendChild(titleI);
        mediaF.appendChild(controls);

        createFeature.prototype.addControls(controls);
        content[0].replaceChild(mediaF, empty);
        createFeature.prototype.addEmptyField();
        createFeature.prototype.removeAdminFeaturePanel();
        createFeature.prototype.addAdminFeaturePanel();
        createFeature.prototype.setIndex();
        let index = mediaF.getAttribute('id');
        createFeature.prototype.addForm(pic,index);
        createFeature.prototype.BuildDragNDropSingle(pic,index);
    }
        addMediaFeatureButton () {
            let d = document,
                panel = d.getElementById('addFeaturePanel');

            let button = d.createElement('div');
            button.setAttribute('id', 'addFeatureMediaButton');
            button.addEventListener('click', createFeature.prototype.addMediaFeature, false);
            panel.appendChild(button);
        }
    addTextFeature () {
        let d = document,
            empty = d.getElementById('empty'),
            content = d.getElementsByClassName('content');

        let textF = d.createElement('fText'),
            textI = d.createElement('textarea'),
            titleI = d.createElement('input'),
            controls = d.createElement('controls');

        textF.setAttribute('class', 'productFeature');
        textI.setAttribute('class', 'Text');
        titleI.setAttribute('class', 'Title');

        textF.appendChild(titleI);
        textF.appendChild(textI);
        textF.appendChild(controls);
        createFeature.prototype.addControls(controls);
        content[0].replaceChild(textF, empty);
        createFeature.prototype.addEmptyField();
        createFeature.prototype.removeAdminFeaturePanel();
        createFeature.prototype.addAdminFeaturePanel();
        createFeature.prototype.setIndex();
        let index = textF.getAttribute('id');
    }
        addTextFeatureButton () {
            let d = document,
                panel = d.getElementById('addFeaturePanel');

            let button = d.createElement('div');
            button.setAttribute('id', 'addFeatureTextButton');
            button.addEventListener('click', this.addTextFeature, false);
            panel.appendChild(button);
        }
    addEmptyField () {
        let d = document,
            content = d.getElementsByClassName('content'),
            empty = d.createElement('div');

        empty.setAttribute('id', 'empty');
        content[0].appendChild(empty);

    }

    addAdminFeaturePanel () {
        let AdminFeaturePanel = document.createElement('div'),
            content = document.getElementsByClassName('content');
        AdminFeaturePanel.setAttribute('id', 'addFeaturePanel');
        content[0].appendChild(AdminFeaturePanel);


        createFeature.prototype.addLeftFeatureButton();
        createFeature.prototype.addTextFeatureButton();
        createFeature.prototype.addMediaFeatureButton();
        createFeature.prototype.addRightFeatureButton();
        let buttons = AdminFeaturePanel.getElementsByTagName('div');
        for (let i=0; i<buttons.length; i++) buttons[i].style.cursor = 'pointer';
        }
    removeAdminFeaturePanel () {
        let AdminFeaturePanel = document.getElementById('addFeaturePanel'),
            content = document.getElementsByClassName('content');

        content[0].removeChild(AdminFeaturePanel);
    }
    CreateWrap (toWrap, wrapTag) {/*
        let wrapper = document.createElement(wrapTag);
        wrapper.innerHTML = toWrap.outerHTML;
        toWrap.parentNode.replaceChild(wrapper, toWrap);
        return wrapper;*/
    }

    DeleteWrapper (Wrapped) {/*
        Wrapped.parentNode.parentNode.replaceChild(Wrapped, Wrapped.parentNode);*/
    }

    RejectPicture () {

    }

    BuildDragNDropSingle (areaTag,index) {
        function PreventDefaultRerouts (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        function highlightON (e) {
            areaTag.style.border = 'solid 2px yellow';
        }
        function highlightOFF (e) {
            areaTag.style.border = 'solid 1px whitesmoke';
        }
        function initializeProgress (progressOfFile) {
            ProgressBar[0].value = 0;
            uploadProgress = [];

            for (i=progressOfFile; i>0; i--) uploadProgress.push(0);
        }
        function updateProgress (fileNumber, percent) {
            uploadProgress[fileNumber] = percent;
            let totality = uploadProgress.reduce((tot, curr) => curr + tot, 0)/uploadProgress.length;
            ProgressBar[0].value = totality;
        }
        function DropFiles (e) {
            let files = e.dataTransfer.files;
            IterateFiles(files);
        }
        function uploadFile (file, i) {
            let htmlroot = 'http://mysite/';
            let productProcess = htmlroot + 'tmp/tmpProductPics.php';
            let feature = areaTag.parentNode.tagName;

            let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            let ajx = new AJX();
            let formSend = new FormData();

            ajx.open ('POST', productProcess, true);

            ajx.addEventListener('progress', function (e) {
                updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
            });
            ajx.addEventListener('readystatechange', function (e) {
                if (ajx.readyState === 4 && ajx.status === 200) {
                    updateProgress(i, 100);
                } else if (ajx.readyState === 4 && ajx.status !== 200){
                    alert ('OOPS, something went wrong');
                }
            });

            ajx.onload = function (e) {
                let newPic = JSON.parse(this.responseText);
                let gotPic = newPic.pic;
                //let PicPlace = areaTag.getElementById('ProfilePicFrame');
                //alert (typeof gotPic);

                areaTag.style.background = 'url("' + gotPic + '") no-repeat';
                areaTag.style.backgroundSize = 'contain';
            };

            formSend.append ('index', index);
            formSend.append ('feature', feature);
            formSend.append ('file', file);
            /*let filename = formSend.get('file');
            alert(filename.name);*/

            ajx.send(formSend);
        }
        function IterateFiles (files) {
            initializeProgress(files.length);
            ([...files]).forEach(uploadFile);
            //([...files]).forEach(previewFile);
        }

        let ProgressBar = areaTag.getElementsByClassName('ProgressBar');
        let uploadProgress = [];
        let Events = ['dragenter', 'dragover' , 'dragleave', 'drop'];
        for (i=0; i<Events.length;i++) areaTag.addEventListener(Events[i], PreventDefaultRerouts, false);
        for (let i=0; i<2; i++) areaTag.addEventListener(Events[i], highlightON, false);
        for (let i=2; i<Events.length; i++) areaTag.addEventListener(Events[i], highlightOFF, false);
        areaTag.addEventListener(Events[3], DropFiles, false);

    }

    ReplaceCurrentPic () {
        let d = document;
        let htmlroot = 'http://mysite/';
        let nickname = d.getElementById('ProfileNickname').innerText;
        let NewPicName = d.getElementById('infoContainer').innerText;



        let formSend = new FormData();
        formSend.append('NewPic', NewPicName);
        formSend.append('nickname', nickname);


        let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let ajx = new AJX();

        ajx.open('POST', htmlroot + 'users/infoUpdate.php', true);

        ajx.onload = function () {
            let dlContent = JSON.parse(this.responseText);
            let Pic = d.getElementById('ProfilePicFrame');
            Pic.style.background = 'url("' + htmlroot +
                '/users/_' + nickname + '/' + dlContent.InfoChanged + '") no-repeat;';
            Pic.style.background = '160px auto';
        };
        ajx.onerror = function () {
            alert('OOPS');
        };

        ajx.send(formSend);
    }


    RequestContent (form, Editing) {

        function DeleteWrapper (Wrapped) {
            Wrapped.parentNode.parentNode.replaceChild(Wrapped, Wrapped.parentNode);
        }
        let htmlroot = 'http://mysite/';
        let content = document.getElementsByTagName('content');
        let nickname = document.getElementById('ProfileNickname').innerText;
        form = new FormData(form);
        form.append('nickname', nickname);
        let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let ajx = new AJX();


        ajx.open ('POST', htmlroot + 'users/infoUpdate.php', true);

        ajx.onload = function () {
            let dlContent = JSON.parse(this.responseText);
            DeleteWrapper(Editing.firstChild.firstChild);
            Editing.firstChild.style.display = 'inline';
            Editing.firstChild.innerText = dlContent.InfoChanged;
        };

        ajx.onerror = function () {
            alert ('OOPS');
        };
        ajx.send(form);
    }

    constructor() {
        this.addAdminFeaturePanel();
        this.addSaveButton();
    }
}