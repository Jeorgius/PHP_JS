class EditPanel_News {
    CreateWrap(toWrap, wrapTag) {
        let wrapper = document.createElement(wrapTag);
        wrapper.innerHTML = toWrap.outerHTML;
        toWrap.parentNode.replaceChild(wrapper, toWrap);
        return wrapper;
    }

    DeleteWrapper(Wrapped) {
        Wrapped.parentNode.parentNode.replaceChild(Wrapped, Wrapped.parentNode);
        //let unwrap = Wrapped.parentNode.innerHTML;
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

            formSend.append('imageType', 'news');
            formSend.append('index', index);
            formSend.append('NewsImage', file);


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

    ReplaceCurrentPic() {
        let d = document;
        let htmlroot = 'http://jeorgius/';
        let nickname = d.getElementById('ProfileNickname').innerText;
        let NewPicName = d.getElementById('infoContainer').innerText;


        let formSend = new FormData();
        formSend.append('NewPic', NewPicName);
        formSend.append('nickname', nickname);


        let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let ajx = new AJX();

        ajx.open('POST', htmlroot + 'main.php', true);

        ajx.onload = function () {
            //alert(this.responseText);
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


    RequestContent(form, Editing) {

        function DeleteWrapper(Wrapped) {
            Wrapped.parentNode.parentNode.replaceChild(Wrapped, Wrapped.parentNode);
            //let unwrap = Wrapped.parentNode.innerHTML;
        }

        let htmlroot = 'http://jeorgius/';
        let content = document.getElementById('content');
        let nickname = document.getElementById('ProfileNickname').innerText;
        form = new FormData(form);
        form.append('nickname', nickname); // roll some new data in. Access = $_POST['nickname']
        let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let ajx = new AJX();


        ajx.open('POST', htmlroot + 'main.php', true);

        ajx.onload = function () {
            alert(this.responseText);
            let dlContent = JSON.parse(this.responseText);
            DeleteWrapper(Editing.firstChild.firstChild);
            Editing.firstChild.style.display = 'inline';
            Editing.firstChild.innerText = dlContent.InfoChanged;
        };

        ajx.onerror = function () {
            alert('OOPS');
        };
        ajx.send(form);
    }

    BuildEditBarAdmin(toEdit, pageType) {
        let htmlroot = 'http://jeorgius/';

        let CurrentBar,
            d = document,
            Editing = d.getElementById(toEdit),
            EditBar,
            buttons = [],
            img = [],
            buttonLabels = ['NewsEditButton',
                'NewsCancelButton',
                'NewsApplyButton',
                'NewsDeleteButton'];

        let EditBarAdmin = d.createElement('div');
        EditBarAdmin.setAttribute('class', 'EditBarAdmin ' + pageType);
        Editing.parentNode.insertBefore(EditBarAdmin,Editing); // Insert Admin Bar before each newsItem


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
    static addNews(){
        let d = document,
            CLASS = EditPanel_News.prototype;

        //Create NewsItem
        let newsItem = d.createElement('news'),
            newsTitle = d.createElement('newsTitle'),
            img = d.createElement('img'),
            newsText = d.createElement('newsText'),
            newsTextBox = d.createElement('newsTextBox'),
            imageArea = d.createElement('imageArea'),
            content = d.getElementsByTagName('content'),
            addNewsButton = d.getElementById('addNewsButton'),
            news = d.getElementsByTagName('news'),
            k = d.getElementById(toString(news.length-1));

        newsTitle.innerText = '';
        img.src = '';
        newsText.innerText = '';


        newsTextBox.appendChild(newsTitle);
        newsTextBox.appendChild(newsText);
        newsItem.appendChild(newsTextBox);
        newsItem.appendChild(imageArea);
        imageArea.appendChild(img);

        content[0].insertBefore(newsItem, content[0].firstChild.nextSibling);

        editor.addID(news);
        //recount the IDs
        let id = newsItem.getAttribute('id');
        new CLASS.constructor(id, 'news');
    }


    EditClick(Editing, buttons) {
        let CLASS = EditPanel_News.prototype,
            inputsCollection = Editing.getElementsByTagName('input'),
            newsTextBox = Editing.getElementsByTagName('newsTextBox'),
            newsTitle = Editing.getElementsByTagName('newsTitle'),
            newsText = Editing.getElementsByTagName('newsText'),
            newsImage = Editing.getElementsByTagName('img'),
            imageArea = Editing.getElementsByTagName('imageArea');


        if (inputsCollection.length === 0) {

            CLASS.ReplaceWithInputs(newsTextBox[0], newsTitle[0], newsText[0]);
            CLASS.Cancel_Apply_Visible(buttons);
            let titleInput = Editing.querySelector('.EditInputAdminNewsTitle'),
                textInput = Editing.querySelector('.EditInputAdminNewsText');

            CLASS.InputValues(titleInput, newsTitle[0], textInput, newsText[0]);
            CLASS.BuildDragNDropSingle(imageArea[0]);
        }
    }
    ReplaceWithInputs(newsTextBox, newsTitle, newsText) {
        let d = document;
        newsTitle.style.display = 'none';
        newsText.style.display = 'none';

        let titleInput = d.createElement('input'),
            textInput = d.createElement('textarea');

        titleInput.setAttribute('class', 'EditInputAdminNewsTitle');
        textInput.setAttribute('class', 'EditInputAdminNewsText');

        newsTextBox.appendChild(titleInput);
        newsTextBox.appendChild(textInput);

    }
    Cancel_Apply_Visible(buttons) {
        buttons[1].style.display = 'inline';
        buttons[2].style.display = 'inline';
        buttons[3].style.display = 'inline-block';
    }
    Cancel_Apply_Invisible (buttons) {
        buttons[1].style.display = 'none';
        buttons[2].style.display = 'none';
        buttons[3].style.display = 'none';
    }
    InputValues(titleInput, newsTitle, textInput, newsText) {
        titleInput.value = newsTitle.innerText;
        textInput.innerText = newsText.innerText;
    }


    CancelClick(Editing, buttons) {

            let textbox = Editing.getElementsByTagName('newstextbox'),
                CLASS = EditPanel_News.prototype;

            CLASS.Cancel_Apply_Invisible(buttons);
            CLASS.RemoveInputs(textbox[0]);

    }
    RemoveInputs(textbox_0) {
        let CLASS = EditPanel_News.prototype,
            inputs = textbox_0.getElementsByTagName('input'),
            textareas = textbox_0.getElementsByTagName('textarea'),
            title = textbox_0.getElementsByTagName('newsTitle'),
            texts = textbox_0.getElementsByTagName('newsText');

        textbox_0.removeChild(inputs[0]);
        textbox_0.removeChild(textareas[0]);
        title[0].style.display = 'block';
        texts[0].style.display = 'block';
    }

    ApplyClick(Editing, buttons) {
            let d = document,
                CLASS = EditPanel_News.prototype,
                textbox = Editing.getElementsByTagName('newstextbox'),
                title = Editing.getElementsByTagName('input'),
                texts = Editing.getElementsByTagName('textarea'),
                newsTitle = textbox[0].getElementsByTagName('newsTitle'),
                newsText = textbox[0].getElementsByTagName('newsText');

        if (title[0].value === '' && texts[0].value === '' ||
            title[0].value === undefined && texts[0].value === undefined) {
            Editing.parentNode.removeChild(Editing);
            buttons[3].parentNode.parentNode.removeChild(buttons[3].parentNode);
        }

            CLASS.SaveContent(Editing);
            CLASS.Cancel_Apply_Invisible(buttons);
            CLASS.DisplayNewContent(title[0],newsTitle[0], texts[0],newsText[0]);
            CLASS.RemoveInputs(textbox[0]);


            //(e) => (this.SaveNewContent();};
    }
    DisplayNewContent (title_0,newsTitle_0, texts_0, newsText_0) {
        newsTitle_0.innerText = title_0.value;
        newsText_0.innerText = texts_0.value;
    }
    SaveContent(Editing) {
        let htmlroot = 'http://jeorgius/',
            index = Editing.getAttribute('id'),
            newsTextbox = Editing.getElementsByTagName('newsTextbox'),
            title = newsTextbox[0].getElementsByTagName('input'),
            texts = newsTextbox[0].getElementsByTagName('textarea'),
            img = Editing.getElementsByTagName('img'),

            AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            ajx = new AJX(),
            formSend = new FormData();

            formSend.append('typeAdmin', 'news');
            formSend.append('index', index);
            formSend.append('newsTitle', title[0].value);
            formSend.append('newsText', texts[0].value);
            //formSend.append

        ajx.open('POST', htmlroot + 'kitchen/admin.php', true);
        ajx.onload = function () {
            //alert(this.responseText);
            let answer = JSON.parse(this.responseText);
            alert(answer.message);
            };

        ajx.onerror = function () {
            alert('OOPS');
        };
        ajx.send(formSend);
    }

    DeleteClick(Editing){
        let textbox = Editing.getElementsByTagName('NewsTextBox'),
            title = textbox[0].getElementsByTagName('input'),
            texts = textbox[0].getElementsByTagName('textarea');

        title[0].value = '';
        texts[0].value = '';
    }

    constructor(toEdit, pageType) {

        let buttons = EditPanel_News.prototype.BuildEditBarAdmin(toEdit, pageType);
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
        // add 'add' button



    }
}