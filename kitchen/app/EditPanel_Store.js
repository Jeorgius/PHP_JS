class EditPanel_Store {

    static addProduct(){

            history.pushState(null, null, '/admin/addProduct');
            admin.prototype.clickRebuild();

        //Create NewsItem

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
            buttonLabels = ['StoreEditButton',
                            'StoreCancelButton',
                            'StoreApplyButton',
                            'StoreDeleteButton'];

        let EditBarAdmin = d.createElement('div');
        EditBarAdmin.setAttribute('class', 'EditBarAdmin ' + pageType);
        Editing.insertBefore(EditBarAdmin, imageArea[0]); // insert bar to each photo


        for (let i = 0; i < buttonLabels.length; i++) {
            buttons[i] = d.createElement('button');
            buttons[i].setAttribute('class', buttonLabels[i]);
            buttons[i].setAttribute('type', 'button');
            EditBarAdmin.appendChild(buttons[i]);

        }
        buttons[3].innerText = 'DELETE';

        return buttons;
    }
    EditClick(Editing, buttons) {
        let CLASS = EditPanel_Store.prototype,
            newsImage = Editing.getElementsByTagName('img'),
            imageArea = Editing.getElementsByTagName('imageArea');

        CLASS.Cancel_Apply_Visible(buttons);
        CLASS.BuildDragNDropSingle(imageArea[0]);
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
        let  CLASS = EditPanel_Store.prototype;
        CLASS.Cancel_Apply_Invisible(buttons);

    }

    ApplyClick(Editing, buttons) {
        let d = document,
            CLASS = EditPanel_Store.prototype;

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
        formSend.append('typeAdmin', 'store');
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
        let CLASS = EditPanel_Store.prototype,
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