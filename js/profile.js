
class ContentEdit {

    CreateWrap (toWrap, wrapTag) {
        let wrapper = document.createElement(wrapTag);
        wrapper.innerHTML = toWrap.outerHTML;
        toWrap.parentNode.replaceChild(wrapper, toWrap);
        return wrapper;
    }

    DeleteWrapper (Wrapped) {
        Wrapped.parentNode.parentNode.replaceChild(Wrapped, Wrapped.parentNode);
        //let unwrap = Wrapped.parentNode.innerHTML;
    }

    RejectPicture () {

    }

    BuildDragNDropSingle (areaTag) {
        function PreventDefaultRerouts (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        function highlightON (e) {
            areaTag.style.border = 'solid 2px yellow';
        }
        function highlightOFF (e) {
            areaTag.style.border = '0';
        }
        function initializeProgress (progressOfFile) {
            ProgressBar.value = 0;
            uploadProgress = [];

            for (let i=progressOfFile; i>0; i--) uploadProgress.push(0);
        }
        function updateProgress (fileNumber, percent) {
            uploadProgress[fileNumber] = percent;
            let totality = uploadProgress.reduce((tot, curr) => curr + tot, 0)/uploadProgress.length;
            ProgressBar.value = totality;
        }
        function DropFiles (e) {
            let files = e.dataTransfer.files;
            IterateFiles(files);
        }
        function uploadFile (file, i) {
            let htmlroot = 'http://jeorgius/';
            let infoUpdate = htmlroot + 'main.php';
            let nicknameTag = document.getElementById('ProfileNickname');
            let nickname = nicknameTag.innerText;


            let AJX = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            let ajx = new AJX();
            let formSend = new FormData();

            ajx.open ('POST', infoUpdate, true);

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
                let infoContainer = document.getElementById('infoContainer');
                infoContainer.innerText = newPic.PicName;

                let ProfilePicFrame = document.getElementById('ProfilePicFrame');
                ProfilePicFrame.style.background = 'url("'+ htmlroot + 'tmp/_' + nickname + '/' + newPic.PicName + '") no-repeat';
                ProfilePicFrame.style.backgroundSize = '160px auto';
            };

            formSend.append ('upload_preset', 'someInfo');
            formSend.append ('nickname', nickname);
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

        let ProgressBar = document.getElementById('ProgressBar');
        let uploadProgress = [];
        let Events = ['dragenter', 'dragover' , 'dragleave', 'drop'];
        for (let i=0; i<Events.length;i++) areaTag.addEventListener(Events[i], PreventDefaultRerouts, false);
        for (let i=0; i<2; i++) areaTag.addEventListener(Events[i], highlightON, false);
        for (let i=2; i<Events.length; i++) areaTag.addEventListener(Events[i], highlightOFF, false);
        areaTag.addEventListener(Events[3], DropFiles, false);

    }

    ReplaceCurrentPic () {
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


    RequestContent (form, Editing) {

        function DeleteWrapper (Wrapped) {
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


        ajx.open ('POST', htmlroot + 'main.php', true);

        ajx.onload = function () {
            alert(this.responseText);
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

     constructor(toEdit) {

        let CreateWrap = this.CreateWrap,
            DeleteWrapper = this.DeleteWrapper,
            RequestContent = this.RequestContent,
            BuildDragNDropSingle = this.BuildDragNDropSingle,
            ReplaceCurrentPic = this.ReplaceCurrentPic;


        let htmlroot = 'http://jeorgius/';
        this.htmlroot = htmlroot;
        //var Editing = $(toEdit).html();

        let CurrentBar,
            d = document,
            Editing = d.getElementById(toEdit),
            EditBar,
            buttons = [],
            img = [],
            buttonLabels = ['ProfileEditButton',
                            'ProfileCancelButton',
                            'ProfileApplyButton'],

            icons = [htmlroot + 'icons/edit.png',
                     htmlroot + 'icons/cancel.png',
                     htmlroot + 'icons/apply.png'];


        if (toEdit === 'rightbar') {
            Editing = d.getElementsByTagName(toEdit);
            EditBar = d.createElement('div');
            EditBar.setAttribute('class', 'EditBarPic');
            Editing[0].appendChild(EditBar);
            CurrentBar = Editing[0].querySelector('.EditBarPic');





            /*$('<div>').attr('class', 'EditBarPic').appendTo(toEdit);
        var CurrentBar = $(toEdit).children('.EditBarPic');

        $('<div>').attr('class', 'ProfileEditButton').appendTo(CurrentBar);
        var CurrentEdit = $(CurrentBar).children('.ProfileEditButton');
        $('<img>').attr('src', htmlroot + 'icons/edit.png').appendTo(CurrentEdit);

        $('<div>').attr('class', 'ProfileCancelButton').appendTo(CurrentBar);
        var CurrentCancel = $(CurrentBar).children('.ProfileCancelButton');
        $('<img>').attr('src', htmlroot + 'icons/cancel.png').appendTo(CurrentCancel);

        $('<div>').attr('class', 'ProfileApplyButton').appendTo(CurrentBar);
        var CurrentApply = $(CurrentBar).children('.ProfileApplyButton');
        $('<img>').attr('src', htmlroot + 'icons/apply.png').appendTo(CurrentApply);


            $('#'+toEdit).bind({
                mouseover: function () {
                    //$(toEdit).children('.ProfileEditButton').stop().fadeTo(300, 1);
                    $(CurrentBar).children('.ProfileEditButton').css('opacity', '1');}
                , mouseout: function () {
                    $(CurrentBar).children('.ProfileEditButton').css('opacity', '0');}
            });*/

        } else {
            Editing = d.getElementById(toEdit);
            EditBar = d.createElement('div');
            EditBar.setAttribute('class', 'EditBar');
            Editing.appendChild(EditBar);

            CurrentBar = Editing.querySelector('.EditBar');
            /*$('<div>').attr('class', 'EditBar').appendTo(toEdit);

            var CurrentBar = $(toEdit).children('.EditBar');

            $('<div>').attr('class', 'ProfileEditButton').appendTo(CurrentBar);
            var CurrentEdit = $(CurrentBar).children('.ProfileEditButton');
            $('<img>').attr('src', htmlroot + 'icons/edit.png').appendTo(CurrentEdit);

            $('<div>').attr('class', 'ProfileCancelButton').appendTo(CurrentBar);
            var CurrentCancel = $(CurrentBar).children('.ProfileCancelButton');
            $('<img>').attr('src', htmlroot + 'icons/cancel.png').appendTo(CurrentCancel);

            $('<div>').attr('class', 'ProfileApplyButton').appendTo(CurrentBar);
            var CurrentApply = $(CurrentBar).children('.ProfileApplyButton');
            $('<img>').attr('src', htmlroot + 'icons/apply.png').appendTo(CurrentApply);

            $(toEdit).bind({
                mouseover: function () {
                    //$(toEdit).children('.ProfileEditButton').stop().fadeTo(300, 1);
                    $(CurrentBar).children('.ProfileEditButton').css('opacity', '1');}
                , mouseout: function () {
                    $(CurrentBar).children('.ProfileEditButton').css('opacity', '0');}
            });*/
        }

        for (let i = 0; i < buttonLabels.length; i++){
            buttons[i]= d.createElement('button');
            buttons[i].setAttribute('class', buttonLabels[i]);
            buttons[i].setAttribute('type', 'button');
            CurrentBar.appendChild(buttons[i]);

        }

        function Attributes (element, attributes) {
            for (let k in attributes) {
                element.setAttribute(k, attributes[k]);
            }
        }

         Attributes(buttons[2], {'form': 'EditForm',
                                 'type': 'button',
                                 'formmethod': 'POST'});


        function EditButtonAppear(e) {
            buttons[0].style.opacity = 1;
        }
        function EditButtonDisappear(e) {
            buttons[0].style.opacity = 0;
        }
        function EditClick (e) {
            let inputsCollection;
            if(toEdit==='rightbar'){inputsCollection = Editing[0].getElementsByTagName('input');}
            else {inputsCollection = Editing.getElementsByTagName('input');}


            if (inputsCollection.length === 0){

                buttons[1].style.display = 'inline';
                buttons[2].style.display = 'inline';

                if (toEdit === 'rightbar') {
                    //
                    let EditingInfo = Editing[0].firstChild,
                        CurrentValue = EditingInfo.innerText;

                    let EditForm = d.createElement('form');
                    Attributes(EditForm, { 'method': 'POST',
                                           'id': 'EditForm'});


                    let pText = d.createElement('p');
                    pText.innerText = 'Drag your new image here';
                    EditForm.appendChild(pText);

                    let input = d.createElement('input');
                    Attributes(input, {'type': 'file',
                                       'class': 'EditInput',
                                       'name': 'EditForm'});
                    input.style.opacity = '0';
                    EditForm.appendChild(input);

                    let ProgressBar = d.createElement('progress');
                    Attributes(ProgressBar, {'id': 'ProgressBar',
                                             'value': '0',
                                             'max': '100'});
                    EditForm.appendChild(ProgressBar);

                    let infoContainer = d.createElement('div');
                    infoContainer.setAttribute('id', 'infoContainer');
                    infoContainer.style.display = 'none';
                    EditForm.appendChild(infoContainer);

                    Editing[0].appendChild(EditForm);
                    BuildDragNDropSingle(Editing[0]);


                } else {
                    let EditingInfo = Editing.firstChild,
                        CurrentValue = EditingInfo.innerText;
                    Editing.firstChild.style.display = 'none';
                    let input = d.createElement('input');
                    Attributes(input, {'type': 'text',
                                       'value': CurrentValue,
                                       'class': 'EditInput',
                                       'name': toEdit});
                    input.style.display = 'inline';
                    let form = CreateWrap(Editing.firstChild, 'form');
                    form.style.display = 'inline';
                    form.setAttribute('id', 'EditForm');
                    form.setAttribute('method', 'POST');
                    form.appendChild(input);


                }

             }
        }
        function CancelClick(e) {
            if (toEdit === 'rightbar'){
                buttons[1].style.display = 'none';
                buttons[2].style.display = 'none';
                Editing[0].removeChild(EditForm);
            } else {
                buttons[1].style.display = 'none';
                buttons[2].style.display = 'none';
                DeleteWrapper(Editing.firstChild.firstChild);
                Editing.firstChild.style.display = 'inline';
            }
        }
        function ApplyClick(e) {
            if (toEdit === 'rightbar'){
                ReplaceCurrentPic();
                //DeleteWrapper('ProfilePicFrame');
                buttons[1].style.display = 'none';
                buttons[2].style.display = 'none';
                Editing[0].removeChild(EditForm);
            }
            else {
                let toSend = d.getElementById('EditForm');
                //alert(JSON.parse(toSend[0].value));
                buttons[1].style.display = 'none';
                buttons[2].style.display = 'none';
                RequestContent(toSend, Editing);
            }
        }


        if (toEdit==='rightbar') {
            Editing[0].addEventListener('mouseover', EditButtonAppear, false);
            Editing[0].addEventListener('mouseout', EditButtonDisappear, false);
        } else {
            Editing.addEventListener('mouseover', EditButtonAppear, false);
            Editing.addEventListener('mouseout', EditButtonDisappear, false);
        }

        buttons[0].addEventListener('click', EditClick, false);
        buttons[1].addEventListener('click', CancelClick, false);
        buttons[2].addEventListener('click', ApplyClick, false);



        /*$(CurrentEdit).on('click', function(){
            var content = $(toEdit).html();

            $(CurrentCancel).css('display', 'inline');
            $(CurrentApply).css('display', 'inline');
        });

        $(CurrentCancel).on('click', function(){
            $(CurrentCancel).css('display', 'none');
            $(CurrentApply).css('display', 'none');
        });
*/

    }
}