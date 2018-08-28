class EditPanel_Photos {

    static addPhoto(){
        let d = document,
            CLASS = EditPanel_Photos.prototype;

        //Create NewsItem
        let photoItem = d.createElement('photo'),
            img = d.createElement('img'),
            imageArea = d.createElement('imageArea'),
            content = d.getElementsByTagName('content'),
            addPhotoButton = d.getElementById('addPhotoButton'),
            photo = d.getElementsByTagName('photo'),
            k = d.getElementById(toString(photo.length-1));

        imageArea.style.width = '100%';
        imageArea.style.height = '100%';
        img.src = '';


        photoItem.appendChild(imageArea);
        imageArea.appendChild(img);

        content[0].insertBefore(photoItem, content[0].firstChild.nextSibling);

        editor.addID(photo);
        //recount the IDs
        let id = photoItem.getAttribute('id');
        new CLASS.constructor(id, 'photos');
    }

    BuildEditBarAdmin(toEdit, pageType) {
        let htmlroot = 'http://jeorgius/';

        let CurrentBar,
            d = document,
            Editing = d.getElementById(toEdit),
            EditBar,
            buttons = [],
            imageArea = Editing.getElementsByTagName('imageArea'),
            img = Editing.getElementsByTagName('img'),
            buttonLabels = ['PhotosEditButton',
                            'PhotosCancelButton',
                            'PhotosApplyButton',
                            'PhotosDeleteButton'];

        let EditBarAdmin = d.createElement('div');
        EditBarAdmin.setAttribute('class', 'EditBarAdmin ' + pageType);
        Editing.insertBefore(EditBarAdmin, imageArea[0]); // insert bar to each photo


        for (let i = 0; i < buttonLabels.length; i++) {
            buttons[i] = d.createElement('button');
            buttons[i].setAttribute('class', buttonLabels[i]);
            buttons[i].setAttribute('type', 'button');
            EditBarAdmin.appendChild(buttons[i]);

        }

        function Attributes(element, attributes) {
            for (let k in attributes) {
                element.setAttribute(k, attributes[k]);
            }
        }

        Attributes(buttons[2], {
            'form': 'EditForm',
            'type': 'button',
            'formmethod': 'POST'
        });
        buttons[3].innerText = 'DELETE';

        return buttons;
    }
    EditClick(Editing, buttons) {
        let CLASS = EditPanel_Photos.prototype,
            newsImage = Editing.getElementsByTagName('img'),
            imageArea = Editing.getElementsByTagName('imageArea');

            CLASS.Cancel_Apply_Visible(buttons);
            CLASS.BuildDragNDropSingle(imageArea[0]);
    }
    BuildDragNDropSingle(areaTag) {
        function PreventDefaultRerouts(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        function highlightON(e) {
            areaTag.style.border = 'solid 3px yellow';
        }
        function highlightOFF(e) {
            areaTag.style.border = '1px dashed blue';
        }
        function DropFiles(e) {
            let files = e.dataTransfer.files;
            IterateFiles(files);
        }
        function uploadFile(file, i) {
            let htmlroot = 'http://jeorgius/',
                infoUpdate = htmlroot + 'kitchen/admin.php',
                index = areaTag.parentNode.getAttribute('id');


            let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            let ajx = new AJX();
            let formSend = new FormData();

            ajx.open('POST', infoUpdate, true);

            ajx.onload = function (e) {
                //alert(this.responseText);
                let php = JSON.parse(this.responseText);
                let img = areaTag.getElementsByTagName('img');

                img[0].src = php.newPic;
            };

            formSend.append('imageType', 'photos');
            formSend.append('index', index);
            formSend.append('PhotosImage', file);


            ajx.send(formSend);
        }
        function IterateFiles(files) {
            ([...files]).forEach(uploadFile);
            //([...files]).forEach(previewFile);
        }

        let ProgressBar = document.getElementById('ProgressBar');
        let uploadProgress = [];
        let Events = ['dragenter', 'dragover', 'dragleave', 'drop'];
        for (let i = 0; i < Events.length; i++) areaTag.addEventListener(Events[i], PreventDefaultRerouts, false);
        for (let i = 0; i < 2; i++) areaTag.addEventListener(Events[i], highlightON, false);
        for (let i = 2; i < Events.length; i++) areaTag.addEventListener(Events[i], highlightOFF, false);
        areaTag.addEventListener(Events[3], DropFiles, false);

    }

    Cancel_Apply_Visible(buttons) {
        buttons[1].style.display = 'inline-block';
        buttons[2].style.display = 'inline-block';
        buttons[3].style.display = 'inline-block';
    }
    Cancel_Apply_Invisible (buttons) {
        buttons[1].style.display = 'none';
        buttons[2].style.display = 'none';
        buttons[3].style.display = 'none';
    }


    CancelClick(Editing, buttons) {
        let  CLASS = EditPanel_Photos.prototype;
        CLASS.Cancel_Apply_Invisible(buttons);

    }

    ApplyClick(Editing, buttons) {
        let d = document,
            CLASS = EditPanel_Photos.prototype;

        CLASS.SaveContent(Editing);
        CLASS.Cancel_Apply_Invisible(buttons);

    }

    SaveContent(Editing) {
        let htmlroot = 'http://jeorgius/',
            index = Editing.getAttribute('id'),
            img = Editing.getElementsByTagName('img'),
            imgSource,

            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData();

        if(!img[0]) {imgSource = '';}
        else {imgSource = img[0].src}
        formSend.append('typeAdmin', 'photos');
        formSend.append('index', index);
        formSend.append('picHTML', imgSource);
        //formSend.append

        ajx.open('POST', htmlroot + 'kitchen/admin.php', true);
        ajx.onload = function () {
            //alert(this.responseText);
            let php = JSON.parse(this.responseText);
            alert(php.message);
            if(!img[0]) Editing.parentNode.removeChild(Editing);
        };

        ajx.onerror = function () {
            alert('OOPS');
        };
        ajx.send(formSend);
    }

    DeleteClick(Editing){
        let img = Editing.getElementsByTagName('img'),
            imageArea = Editing.getElementsByTagName('imageArea');

        imageArea[0].removeChild(img[0]);
    }

    constructor(toEdit, pageType) {
        let CLASS = EditPanel_Photos.prototype,
            buttons = CLASS.BuildEditBarAdmin(toEdit, pageType);
        let Editing = document.getElementById(toEdit);
        let addNewsButton = document.getElementById('addNewsButton');

        function EditButtonAppear() {
            buttons[0].style.opacity = 1;
        }

        function EditButtonDisappear() {
            buttons[0].style.opacity = 0;
        }

        // add action listeners
        buttons[0].parentNode.addEventListener('mouseover', EditButtonAppear, false);
        buttons[0].parentNode.addEventListener('mouseout', EditButtonDisappear, false);
        Editing.addEventListener('mouseover', EditButtonAppear, false);
        Editing.addEventListener('mouseout', EditButtonDisappear, false);

        buttons[0].addEventListener('click', (e) => {this.EditClick(Editing, buttons);}, false);
        buttons[1].addEventListener('click', (e) => {this.CancelClick(Editing, buttons);}, false);
        buttons[2].addEventListener('click', (e) => {this.ApplyClick(Editing, buttons);}, false);
        buttons[3].addEventListener('click', (e) => {this.DeleteClick(Editing);}, false);
    }
}