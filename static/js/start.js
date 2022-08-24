const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const statusBar = document.querySelector(".statusBar");
const endPoint = qnaList.length;
// const select = [];
const select = [0,0,0,0,0,0,0,0,0,0,0,0];


function calcResult() {
    // 1. 카운팅을 위한 종류별 name+ default count value 0 + key값배정하여, 배열을 만든다.
    // let pointArray = [
    //     {name: 'mouse', value: 0, key: 0},
    //     {name: 'cow', value: 0, key: 1},
    //     {name: 'tiger', value: 0, key: 2},
    //     {name: 'rabbit', value: 0, key: 3},
    //     {name: 'dragon', value: 0, key: 4},
    //     {name: 'snake', value: 0, key: 5},
    //     {name: 'horse', value: 0, key: 6},
    //     {name: 'sheep', value: 0, key: 7},
    //     {name: 'monkey', value: 0, key: 8},
    //     {name: 'chick', value: 0, key: 9},
    //     {name: 'dog', value: 0, key: 10},
    //     {name: 'pig', value: 0, key: 11},
    // ];
    //
    // // 2. 인덱스로 돌아야지 암죽적으로 묵인, 카운팅배열 + 다른 배열들을 연결할 수 있다.
    // for (let i = 0; i < endPoint; i++) {
    //     // i번째 질문에 대해, 답변.a 중 선택된 답변 select[i]의 type
    //     let typeArray = qnaList[i].a[select[i]].type;
    //     // type배열에 잇는 동물들을 돌면서, -> pointArray를 돌며 같은게 있을 때만 카운팅해준다.
    //     for (const animal of typeArray) {
    //         for (let pointArrayElement of pointArray) {
    //             if (animal === pointArrayElement.name) {
    //                 pointArrayElement.value += 1;
    //             }
    //         }
    //     }
    // }
    // console.log(pointArray);


    // // 3. value 기준으로 정렬
    // let resultArray = pointArray.sort(function (a, b) {
    //     if(a.value > b.value){ //(2) 음수반환의 조건문에서는, [앞에것 반환이 참이 되도록 만든다]
    //         return -1; // (1) 음수를 반환하면 앞에껏이 반환되는 구조이다.
    //     }
    //     if(a.value < b.value){
    //         return 1; // 양수반환 -> 뒤에것반환 -> 뒤에것반환이 되도록하는 참인 문장을 만들어 조건식에 대입
    //     }
    //     return 0;
    // });
    // console.log(resultArray);

    let result = select.indexOf(Math.max(...select));
    return result;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 0.5s";
    qna.style.animation = "fadeOut 0.5s";

    // qna.style.display = "block";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 0.5s";
        result.style.animation = "fadeIn 0.5s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 240);
    }, 240);

    //질문에 대한 답변번호들이 제대로 찍혔는지 확인한다.
    // console.log(select);
    calcResult()
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
        //리스너에는 1번 클릭시 disabled되게 만들어서, 중복클릭방지
        this.setAttribute("disabled", "disabled");

        let children = document.querySelectorAll('.answerList');
        // console.log(children); // NodeList ->  js배열Array가 아니라면,향상된for문 x -> .length로 도는 index반복문
        for (let i = 0; i < children.length; i++) {
            children[i].disable = true;
            // children[i].style.display = 'none';
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            // 대답을 select배열에 몇번째 대답인지 저장한다.
            // select[qIdx] = answerIdx;
            let type = qnaList[qIdx].a[answerIdx].type;
            for (let i = 0; i < type.length; i++) {
                select[type[i]] += 1;
            }

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

