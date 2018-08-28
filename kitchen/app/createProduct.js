class createProduct {

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
            content = d.getElementsByTagName('content'),
            CLASS = createProduct.prototype;

        fTagControls.innerText = 'CLICK TWICE TO DELETE';
        fTagControls.appendChild(cDelete);
        fTagControls.onclick = function () {
            fTagControls.innerText = 'DELETE';

            fTagControls.onclick = function () {
                content[0].removeChild(fTagControls.parentNode);
                CLASS.setIndex();
            };
        };
    }
    addForm(ImageTag, index) {
        let d = document,
            CLASS = createProduct.prototype,
            elements = [d.createElement('form'),
                d.createElement('p'),
                d.createElement('input'),
                d.createElement('progress')];

        CLASS.Attributes(elements[0], {'method': 'POST',
            'id': 'EditForm' + index});
        elements[2].setAttribute('type', 'file');
        elements[2].style.opacity = '0';
        CLASS.Attributes(elements[3], {'class': 'ProgressBar',
            'value': '0',
            'max': '100'});
        elements[1].innerHTML = 'Drag<br> img<br> here';
        for (let i = 0; i<elements.length; i++) ImageTag.appendChild(elements[i]);

    }

    addSaveButton () {
        let d = document,
            CLASS = createProduct.prototype,
            whole = d.getElementsByClassName('whole'),
            fixedBottom = d.createElement('div'),
            saveAllButton = d.createElement('div');
        saveAllButton.setAttribute('id', 'saveAllButton');
        saveAllButton.innerText = 'SAVE';
        fixedBottom.setAttribute('class', 'fixedBottom');
        fixedBottom.appendChild(saveAllButton);
        whole[0].appendChild(fixedBottom);

        saveAllButton.addEventListener('click', CLASS.saveAll, false);
    }
    saveAll () {
        let d = document,
            htmlroot = 'http://jeorgius/',
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
            //alert(tags[i]);
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
        formSend.append('saveProduct', 1);

        ajx.open('POST', htmlroot+'kitchen/admin.php', true);
        ajx.onload = function() {
            let answer = JSON.parse(this.responseText);
            //let msg = answer.msg;
            //let PicPlace = areaTag.getElementById('ProfilePicFrame');
            //alert (typeof gotPic);

            alert(answer);
        };

        ajx.send(formSend);
    }

    addLeftFeature () {

        let d = document,
            CLASS = createProduct.prototype,
            empty = d.getElementById('empty'),
            //content = d.getElementsByTagName('content'),
            createProdL = d.getElementsByTagName('createProdL');


        let leftF = d.createElement('fLeft'),
            pic = d.createElement('div'),
            textI = d.createElement('textarea'),
            titleI = d.createElement('input'),
            controls = d.createElement('controls');

        CLASS.Attributes(leftF, {'class': 'productFeature'});
        pic.setAttribute('class', 'Image');
        //pic.style.height = '300px';
        textI.setAttribute('class', 'Text');
        titleI.setAttribute('class', 'Title');

        leftF.appendChild(pic);
        leftF.appendChild(titleI);
        leftF.appendChild(textI);
        leftF.appendChild(controls);
        CLASS.addControls(controls);
        createProdL[0].replaceChild(leftF, empty);
        CLASS.addEmptyField();
        CLASS.removeAdminFeaturePanel();
        CLASS.addAdminFeaturePanel();

        CLASS.setIndex();
        let index = leftF.getAttribute('id');
        CLASS.addForm(pic,index);
        CLASS.BuildDragNDropSingle(pic,index);

    }
    addLeftFeatureButton() {
        let d = document,
            panel = d.getElementById('addFeaturePanel');

        let button = d.createElement('div');
        button.setAttribute('id', 'addFeatureLeftButton');
        button.addEventListener('click', ()=>{this.addLeftFeature();}, false);
        panel.appendChild(button);
    }
    addRightFeature () {

        let d = document,
            CLASS = createProduct.prototype,
            empty = d.getElementById('empty'),
            //content = d.getElementsByTagName('content'),
            createProdL = d.getElementsByTagName('createProdL');



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
        CLASS.addControls(controls);
        createProdL[0].replaceChild(rightF, empty);
        CLASS.addEmptyField();
        CLASS.removeAdminFeaturePanel();
        CLASS.addAdminFeaturePanel();
        CLASS.setIndex();
        let index = rightF.getAttribute('id');
        CLASS.addForm(pic,index);
        CLASS.BuildDragNDropSingle(pic,index);
    }
    addRightFeatureButton () {
        let d = document,
            CLASS = createProduct.prototype,
            panel = d.getElementById('addFeaturePanel');

        let button = d.createElement('div');
        button.setAttribute('id', 'addFeatureRightButton');
        button.addEventListener('click', CLASS.addRightFeature, false);
        panel.appendChild(button);
    }
    addMediaFeature () {
        let d = document,
            CLASS = createProduct.prototype,
            empty = d.getElementById('empty'),
            createProdL = d.getElementsByTagName('createProdL');
            //content = d.getElementsByTagName('content');

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

        CLASS.addControls(controls);
        createProdL[0].replaceChild(mediaF, empty);
        CLASS.addEmptyField();
        CLASS.removeAdminFeaturePanel();
        CLASS.addAdminFeaturePanel();
        CLASS.setIndex();
        let index = mediaF.getAttribute('id');
        CLASS.addForm(pic,index);
        CLASS.BuildDragNDropSingle(pic,index);
    }
    addMediaFeatureButton () {
        let d = document,
            CLASS = createProduct.prototype,
            panel = d.getElementById('addFeaturePanel');

        let button = d.createElement('div');
        button.setAttribute('id', 'addFeatureMediaButton');
        button.addEventListener('click', CLASS.addMediaFeature, false);
        panel.appendChild(button);
    }
    addTextFeature () {
        let d = document,
            CLASS = createProduct.prototype,
            empty = d.getElementById('empty'),
            createProdL = d.getElementsByTagName('createProdL');
            //content = d.getElementsByTagName('content');

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
        CLASS.addControls(controls);
        createProdL[0].replaceChild(textF, empty);
        CLASS.addEmptyField();
        CLASS.removeAdminFeaturePanel();
        CLASS.addAdminFeaturePanel();
        CLASS.setIndex();
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
            createProdL = d.getElementsByTagName('createProdL'),
            //content = d.getElementsByTagName('content'),
            empty = d.createElement('div');

        empty.setAttribute('id', 'empty');
        createProdL[0].appendChild(empty);

    }

    addAdminFeaturePanel () {
        let AdminFeaturePanel = document.createElement('div'),
            CLASS = createProduct.prototype,
            content = document.getElementsByTagName('content');
        AdminFeaturePanel.setAttribute('id', 'addFeaturePanel');
        content[0].appendChild(AdminFeaturePanel);


        CLASS.addLeftFeatureButton();
        CLASS.addTextFeatureButton();
        CLASS.addMediaFeatureButton();
        CLASS.addRightFeatureButton();
        let buttons = AdminFeaturePanel.getElementsByTagName('div');
        for (let i=0; i<buttons.length; i++) buttons[i].style.cursor = 'pointer';
    }
    removeAdminFeaturePanel () {
        let AdminFeaturePanel = document.getElementById('addFeaturePanel'),
            content = document.getElementsByTagName('content');

        content[0].removeChild(AdminFeaturePanel);
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

            for (let i=progressOfFile; i>0; i--) uploadProgress.push(0);
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
            let htmlroot = 'http://jeorgius/';
            let productProcess = htmlroot + 'kitchen/admin.php';
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

            formSend.append('imageType', 'feature');
            formSend.append ('index', index);
            formSend.append ('feature', feature);
            formSend.append ('fFile', file);
            //let filename = formSend.get('fFile');
            //alert(filename.name);

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
        for (let i=0; i<Events.length;i++) areaTag.addEventListener(Events[i], PreventDefaultRerouts, false);
        for (let i=0; i<2; i++) areaTag.addEventListener(Events[i], highlightON, false);
        for (let i=2; i<Events.length; i++) areaTag.addEventListener(Events[i], highlightOFF, false);
        areaTag.addEventListener(Events[3], DropFiles, false);

    }

    constructor() {
        this.addAdminFeaturePanel();
        this.addSaveButton();
    }
}