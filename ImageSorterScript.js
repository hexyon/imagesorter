let smallImages = [];
let largeImages = [];

function resizePhotos(size) {
    let uploadButton = document.getElementById(size === 'small' ? 'uploadButton1' : 'uploadButton2');
    let files = uploadButton.files;

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let img = new Image();

        img.onload = function() {
            if ((size === 'small' && (this.width < 1000 || this.height < 1000)) ||
                (size === 'large' && this.width >= 1000 && this.height >= 1000)) {
                let images = size === 'small' ? smallImages : largeImages;
                images.push(URL.createObjectURL(file));
                document.getElementById('count' + (size === 'small' ? '1' : '2')).innerText = images.length + ' ' + size + ' images';
            }
        };

        img.src = URL.createObjectURL(file);
    }
}

function downloadImages(size) {
    let uploadButton = document.getElementById(size === 'small' ? 'uploadButton1' : 'uploadButton2');
    let files = uploadButton.files;
    let images = size === 'small' ? smallImages : largeImages;

    for (let i = 0; i < images.length; i++) {
        let a = document.createElement('a');
        a.href = images[i];
        a.download = files[i].name; // Use the original file name
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

