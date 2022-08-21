const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

function addAnswer(answerBox, qIdx, answerIdx) {
    console.log(answerBox);
    let answerBtn = document.createElement('button');
    // [삭제를 위한] 생성한 태그 삽입 전, .classList.add()로 클래스 추가하기
    answerBox.appendChild(answerBtn);
    answerBtn.classList.add('answerList');
    // 마진과 패딩은 클래스로 꾸미기
    answerBtn.classList.add('my-3');
    answerBtn.classList.add('py-3');
    answerBtn.classList.add('mx-auto');
    // 애니메이션은 style.animation 이 안되는 create -> append의 경우 적용css셀렉터 정의후 add
    answerBtn.classList.add('fadeIn');

    answerBtn.innerHTML = qnaList[qIdx].a[answerIdx].answer;
    // [클릭시 버튼들 비활성화 및 기존 버튼들 안보이게] 하는 함수 달아주기
    answerBtn.addEventListener("click", function () {
        let children = document.querySelectorAll('.answerList');
        console.log(children); // NodeList ->  js배열Array가 아니라면,향상된for문 x -> .length로 도는 index반복문
        for (let i = 0; i < children.length; i++) {
            children[i].disable = true;
            // children[i].style.display = 'none';
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function goNext(qIdx) {
    //qBox
    let qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q

    //answerBox
    let answerBox = document.querySelector('.answerBox');
    //ansewrBox - answerButton(create -> appendChild)
    // let answerBtn = document.createElement('button');
    // answerBox.appendChild(answerBtn)
    // answerBtn.innerHTML = qnaList[qIdx].a[0].answer
    console.log(qnaList[qIdx].a);
    for (let answerIdx in qnaList[qIdx].a) {
        addAnswer(answerBox, qIdx, answerIdx);
    }

}

function begin() {
    // main.style.display = "none";
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    // qna.style.display = "block";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        goNext(0);
    }, 450)
}

