class gallery {

    CreateArea() {
        let d = document,
        uberlayer = d.getElementsByClassName('uberlayer');

        uberlayer[0].style.display = 'block';

        let GalleryBackground = d.createElement('div');
        GalleryBackground.setAttribute('id', 'GalleryBackground');
        GalleryBackground.style.opacity = '0.7';
        uberlayer[0].appendChild(GalleryBackground);

        let GalleryWindow = d.createElement('div');
        GalleryWindow.setAttribute('id', 'GalleryWindow');
        GalleryWindow.style.opacity = '1';
        uberlayer[0].appendChild(GalleryWindow);

    }

    PicArrayPosition(ImageLinks) {
        let GalleryPic = document.getElementById('GalleryPic'),
            Link = GalleryPic.src;

        for (let m = 0; m<ImageLinks.length; m++) {
            if (Link === ImageLinks[m]){
                return [m, Link];
            }
        }
    }

    addSvg(tag, icon) {
        let object = document.createElement('object');
        object.setAttribute('type', 'image/svg+xml');
        object.setAttribute('data', 'icons/'+ icon + '.svg');
        object.setAttribute('class', 'button');
        tag.appendChild(object);
    }
    CreateGalleryLeftButton(){
        let GalleryLeftButton = document.createElement('div'),
            GalleryWindow = d.getElementById('GalleryWindow');
        GalleryLeftButton.setAttribute('class', 'GalleryLeftButton');
        gallery.prototype.addSvg(GalleryLeftButton, 'left');
        GalleryWindow.appendChild(GalleryLeftButton);
    }

    CreateGalleryRightButton(){
        let GalleryRightButton = document.createElement('div'),
            GalleryWindow = d.getElementById('GalleryWindow');
        GalleryRightButton.setAttribute('class', 'GalleryRightButton');
        gallery.prototype.addSvg(GalleryRightButton, 'right');
        GalleryWindow.appendChild(GalleryRightButton);
    }

    CreateGalleryPic (ClickedLink) {
        let GalleryPic = document.createElement('img'),
            GalleryWindow = d.getElementById('GalleryWindow');
        GalleryPic.setAttribute('id', 'GalleryPic');
        GalleryPic.src = ClickedLink;
        GalleryWindow.appendChild(GalleryPic);
    }

    CreateGallerySmall(ImageLinks){
        let d = document,
            GalleryWindow = d.getElementById('GalleryWindow'),
            GalleryPicSmallContainer = d.createElement('div');
        GalleryPicSmallContainer.setAttribute('id', 'GalleryPicSmallContainer');

        for (let i = 0; i<ImageLinks.length; i++) {
            let image = d.createElement('img');
            image.setAttribute('class', 'GalleryPicSmall');
            image.src = ImageLinks[i];
            GalleryPicSmallContainer.appendChild(image);
        }
        GalleryWindow.appendChild(GalleryPicSmallContainer);
    }

    CreateGalleryCloseButton(){
        let GalleryCloseButton = document.createElement('div'),
            GalleryWindow = d.getElementById('GalleryWindow'),
            uberlayer = d.getElementsByClassName('uberlayer');
        GalleryCloseButton.setAttribute('class', 'GalleryCloseButton');
        gallery.prototype.addSvg(GalleryCloseButton, 'close');
        GalleryWindow.appendChild(GalleryCloseButton);

        GalleryCloseButton.onclick = function () {
            uberlayer[0].innerHTML = '';
            uberlayer[0].style.display = 'none';
        };
    }

    constructor(){
        let Photos_Gallery = d.getElementsByClassName('photosStandard'),
            ImageLinks = [],
            k = [];

        for (let i = 0; i < Photos_Gallery.length; i++) {
            ImageLinks[i] = Photos_Gallery[i].src;
        }


        let item = event.target || event.srcElement;
        let ClickedLink = item.src;

        gallery.prototype.CreateArea();
        gallery.prototype.CreateGalleryPic(ClickedLink);
        gallery.prototype.CreateGallerySmall(ImageLinks);

        let GalleryLeftButton = d.getElementsByClassName('GalleryLeftButton'),
            GalleryRightButton = d.getElementsByClassName('GalleryRightButton'),
            GalleryPic = d.getElementById('GalleryPic'),
            GalleryPicSmall = d.getElementsByClassName('GalleryPicSmall');


        for (let m=0; m<GalleryPicSmall.length; m++) {
            GalleryPicSmall[m].onclick = function () {
                item = event.target || event.srcElement;
                ClickedLink = item.src;
                GalleryPic.src = ClickedLink;
                k = gallery.prototype.PicArrayPosition(ImageLinks);
            };
        }
        gallery.prototype.CreateGalleryLeftButton();
        gallery.prototype.CreateGalleryRightButton();
        gallery.prototype.CreateGalleryCloseButton();
        gallery.prototype.CreateGalleryLeftButton.onload = function (){
            GalleryLeftButton[0].onclick = function () {
            k = gallery.prototype.PicArrayPosition(ImageLinks);
            l = k[0];

            if(l === 0) { // Shift to the end
                let a = ImageLinks.length - 1;
                GalleryPic.style.opacity = '0';
                GalleryPic.src = ImageLinks[a];
                GalleryPic.style.opacity = '1';
                k = gallery.prototype.PicArrayPosition(ImageLinks);
            } else if (l > 0) { // Choose next pic to the left
                let a = k[0] - 1;
                GalleryPic.style.opacity = '0';
                GalleryPic.src = ImageLinks[a];
                GalleryPic.style.opacity = '1';
                k = gallery.prototype.PicArrayPosition(ImageLinks);
            }
        };
        };
        gallery.prototype.CreateGalleryRightButton.onload = function () {
            GalleryRightButton[0].onclick = function () {
                k = gallery.prototype.PicArrayPosition(ImageLinks);
                let l = k[0];

                if (l === ImageLinks.length - 1) {// Return to 0 pic

                    GalleryPic.style.opacity = '0';
                    GalleryPic.src = ImageLinks[0];
                    setTimeout(300);
                    //GalleryPic.stopPropagation();
                    GalleryPic.style.opacity = '1';
                    k = gallery.prototype.PicArrayPosition(ImageLinks);
                }
                else if (l < ImageLinks.length - 1) { // next pic to the right
                    let a = l + 1;
                    GalleryPic.style.opacity = '0';
                    GalleryPic.src = ImageLinks[a];
                    //GalleryPic.stopPropagation();
                    GalleryPic.style.opacity = '1';
                    k = gallery.prototype.PicArrayPosition(ImageLinks);
                }
            };
        };
    }
}