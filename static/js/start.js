const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const statusBar = document.querySelector(".statusBar");
const endPoint = qnaList.length;
// const select = [];
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const answerList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function calcResult() {
    let result = select.indexOf(Math.max(...select));
    return result;
}

function setResult(type) {
    //resultName
    let resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[type].name;

    //resultImg
    let resultImg = document.querySelector('#resultImg');
    let img = document.createElement('img');
    resultImg.appendChild(img);

    img.src = '/static/images/image-' + type + '.png';
    img.alt = type;

    // + 이미지태그 css
    img.classList.add('img-fluid')

    //resultDesc
    let resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[type].desc;

    //answerGroup
    let answerGroupUl = document.querySelector(".answerGroup");
    let titleLi = document.createElement("li");
    titleLi.innerHTML = "선택 과정을 보여줍니다. (공유화면에는 보이지 않아요)"
    answerGroupUl.appendChild(titleLi);
    for (let qIdx = 0; qIdx < answerList.length; qIdx++) {
        let tempLi = document.createElement("li");
        let qText = qnaList[qIdx].q;
        let answerText = qnaList[qIdx].a[answerList[qIdx]].answer;
        tempLi.innerHTML = qText + " -> " + answerText;
        answerGroupUl.appendChild(tempLi);
    }
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 0.5s";
    qna.style.animation = "fadeOut 0.5s";

    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 0.5s";
        result.style.animation = "fadeIn 0.5s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 240);
    }, 240);


    setResult(calcResult())
}

function addAnswer(answerBox, qIdx, answerIdx) {
    // console.log(answerBox);
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
        // 대답을 select배열에 몇번째 대답인지 저장한다.
        // select[qIdx] = answerIdx;
        let type = qnaList[qIdx].a[answerIdx].type;
        for (let i = 0; i < type.length; i++) {
            select[type[i]] += 1;
        }
        //answerList배열에, 질문을 index로 간주하여, 선택한 답지가 몇번째인지 저장한다
        answerList[qIdx] = answerIdx;

        let children = document.querySelectorAll('.answerList');
        //리스너에는 1번 클릭시 disabled되게 만들어서, 중복클릭방지 -> 나머지들도 다 중복방지 시켜야한다.
        this.setAttribute("disabled", "disabled");
        // -> fade아웃하기 전에 중복방지부터 다 적용

        // console.log(children); // NodeList ->  js배열Array가 아니라면,향상된for문 x -> .length로 도는 index반복문
        for (let i = 0; i < children.length; i++) {
            children[i].setAttribute("disabled", "disabled");
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
    // if
    if (qIdx === endPoint) {
        // console.log("리절트로 갑니다.")
        goResult();
        return;
    }

    //statusbar에 qIdx를 이용한 진행상황 알리기
    statusBar.style.width = (100 / endPoint) * (qIdx) + "%";

    //qBox
    let qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q

    //answerBox
    let answerBox = document.querySelector('.answerBox');
    //ansewrBox - answerButton(create -> appendChild)
    // let answerBtn = document.createElement('button');
    // answerBox.appendChild(answerBtn)
    // answerBtn.innerHTML = qnaList[qIdx].a[0].answer
    // console.log(qnaList[qIdx].a);
    for (let answerIdx in qnaList[qIdx].a) {
        addAnswer(answerBox, qIdx, answerIdx);
    }


}

function begin() {

    // main.style.display = "none";
    main.style.WebkitAnimation = "fadeOut 0.5s";
    main.style.animation = "fadeOut 0.5s";


    // qna.style.display = "block";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 0.5s";
        qna.style.animation = "fadeIn 0.5s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 240);
        goNext(0);
    }, 240)

    // 리스너는 맨위에, 일반함수에는 맨 밑에
    this.setAttribute("disabled", "disabled");//중복클릭 방지
}

