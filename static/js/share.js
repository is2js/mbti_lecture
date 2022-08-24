function shareKakao() {
  let resultImg = document.querySelector('#resultImg');
  let typeInAlt = resultImg.firstElementChild.alt;

  const url = 'https://dolbum-love-type.netlify.app/'

  const shareTitle = '십이간지 연애유형 결과'
  const shareDesc = infoList[typeInAlt].name;
  const shareImageURL = url + 'images/image-' + typeInAlt + '.png';
  const shareURL = url + 'shareResult.html?type=' + encodeURIComponent(typeInAlt);



  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDesc,
      imageUrl:
        shareImageURL,
      link: {
        mobileWebUrl: shareURL,
        webUrl: shareURL
      },
    },

    buttons: [
      {
        title: '공유자 결과 확인~!',
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL
        },
      },
      {
        title: '나도 참여~!',
        link: {
          mobileWebUrl: url,
          webUrl: url
        },
      },
    ]
  });
}
