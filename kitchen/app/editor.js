class editor {
    constructor(pageName) {
        editor.prototype.addEditPanel(pageName);
        //alert(pageName);
    }
    addEditPanel(pageName) {
        let d = document;

        if (pageName === 'about' || pageName === 'register') {}
        else if (pageName === 'news' || '') {

            let news = d.getElementsByTagName('news'),
                CLASS = editor.prototype;

            CLASS.BuildAddElementButton('adminField_News', 'addNewsButton', news[0], pageName);
            editor.addID(news);

            for (let i = 0; i<news.length;i++){
                let edition = new EditPanel_News(news.length-1-i,pageName);
            }

        }


        else if (pageName === 'music') {}
        else if (pageName === 'photos') {
            let photo = d.getElementsByTagName('photo'),
                CLASS = editor.prototype;

            CLASS.BuildAddElementButton('adminField_Photos', 'addPhotoButton', photo[0], pageName);
            editor.addID(photo);

            for (let i = 0; i<photo.length;i++){
                let edition = new EditPanel_Photos(photo.length-1-i,pageName);
            }
        }
        else if (pageName === 'store') {
            let prodItem = d.getElementsByTagName('prodItem'),
                CLASS = editor.prototype;

            CLASS.BuildAddElementButton('adminField_Store', 'addProductButton', prodItem[0], pageName);
            editor.addID(prodItem);

            for (let i = 0; i<prodItem.length;i++){
                let edition = new EditPanel_Store(prodItem.length-1-i,pageName);
            }
        }
        else if (pageName === 'users') {
        }
        else if (pageName === 'loginBar') {}
        else {}
        //return Promise.resolve(1)
    }

    static addID (tag) {
        for (let j=0; j<tag.length; j++) {
            tag[tag.length-1-j].setAttribute('id', j);
        }
    }

    BuildAddElementButton (FieldId, ButtonId, FirstElement_0, pageName) {
        let d = document,
            Field = d.createElement('div'),
            addItemButton = d.createElement('div');
        addItemButton.setAttribute('id', ButtonId);
        Field.setAttribute('id', FieldId);
        addItemButton.innerText = '+';
        Field.appendChild(addItemButton);
        FirstElement_0.parentNode.insertBefore(Field, FirstElement_0);
        if (pageName === 'news') addItemButton.addEventListener('click', (e) => {EditPanel_News.addNews();}, false);
        else if (pageName === 'photos') addItemButton.addEventListener('click', (e) => {EditPanel_Photos.addPhoto();}, false);
        else if (pageName === 'store') addItemButton.addEventListener('click', (e) => {EditPanel_Store.addProduct();}, false);
    }

}