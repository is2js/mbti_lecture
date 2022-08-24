function shareKakao() {
  let resultImg = document.querySelector('#resultImg');
  let typeInAlt = resultImg.firstElementChild.alt;

  const url = 'https://dolbum-love-type.netlify.app/'

  const shareTitle = '십이간지 연애유형 결과'
  const shareDesc = infoList[typeInAlt].name;
  const shareImageURL = url + 'static/images/image-' + typeInAlt + '.png';
  const shareURL = url + 'shareResult.html?type=' + encodeURIComponent(typeInAlt);

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDesc,
      imageUrl: shareImageURL,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL
      },
    },

    buttons: [
      {
        title: '결과 확인후 참여',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL
        },
      },
    ]
  });
}
