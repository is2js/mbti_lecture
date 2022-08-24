function moveHome() {
    location.href = '/index.html';
}

function setResult(data) {
    //resultName
    let resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[data.type].name;

    //resultImg
    let resultImg = document.querySelector('#resultImg');
    let img = document.createElement('img');
    resultImg.appendChild(img);

    img.src = '/static/images/image-' + data.type + '.png';
    img.alt = data.type;

    // + 이미지태그 css
    img.classList.add('img-fluid')

    //resultDesc
    let resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[data.type].desc;
}

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    // console.log(data.type);
    setResult(data)
}