## 페이지 레이아웃
- 3개의 section을 구현하되 display:block; 나머지 display:none;
  - bootstrap에 의한, 각 section들을 container로 감싸기
- 각 section의 구성 #main, #qna, #result
  - h3
  - img
  - p
  - button
- bootstrap css 사용하기
  - grid: container class안에 선언되어야한다. 
  - grid: `col-12`등분으로 반응형 공간을 가진다.
    - ![image-20220819234910250](https://raw.githubusercontent.com/is3js/screenshots/main/image-20220819234910250.png)
      ```html
      div.col-6[style="background-color:red;"]>p{예시1}
      ```
        - div.container를 만들고 아래 2개를 만들어서 비교하면 된다. 
          - div.col-6 + style="background-color:?;" 
            - p
          - div.col-4
            - p
    - `col-6`에 이어서, col-lg-12  col-md-8 col-sm-2 크기에 따라 변경될 수 있다. 해당 크기에 도달하지 못하면, 기본을 차지한다.

## main 꾸미기
1. default.css, main.css(section별 css) 만들고, html에 링크 시키기
2. default에서는 전체영향을 주는 꾸미기(body )등
   1. body에서 배경색 주기
3. main에서는 main섹션을 챙우기 위한 꾸미기
   1. #main의 id로 배경색 주기
   2. .container 기본마진이 있지만, section이 너무 넓은 것 같아서
      1. #main의 witdth를 80%로 줄이되, 부트스트랩(section#main태그)로는 x축 margin을 자동정렬해서 내용물 가운데 정렬 시킨다.
         1. #main을 width: 80%;만 주면, 왼쪽에서부터 80을 차지한다.
         2. html태그로 가서, 부트스트랩 마진조정인 `mx-auto`를 준다.
            1. 혹은 #main에서 `margin: 0 auto`로 줘도 된다.
   3. 부트스트랩을무시하는 이미지태그는 `img-fluid` 클래스를 줘서, `감싸는 div`를 따라가게 한다.
      1. 이미지는 바깥div를 완전히 따라가는 fluid상태면, `바깥 div.col-x`로 추가해줘야한다.
      2. `div.col-6.mx-auto` 안으로 img태그를 옮긴다
   4. 내부 text들/태그들 가운데 정렬은 바깥의 #main 섹션에 `text-align: center;`를 주면 된다.
   5. #main section의 곡선도 20px정도 준다.
4. section자체를 외부containter와 간격을 주기 위해 `mt-5`으로 마진탑을 줘서 띄운다.
   1. **h3도 마찬가지로 `mt-5`를 주면, 안띄워진다.**
   2. section과 그 내부h3는 `mt-x`로 준 마진은 서로 공유해서 써서, 겹치게 되어 내부요소는 안띄워진다.
   3. **테스트 해보니 바깥section과 `내부 첫 태그`의 마진은 서로 공간을 공유한다.**
      1. section내 첫 요소는 `pt-x`으로 떨어뜨리고 그 뒤로는 `mt-x`로 줘도 된다.
   4. `결론)`section내 첫요소를 통한 pt-5 + 맨 아래 pb-5를 줄거면, 
      1. section자체에 pt-5, pb-5를 걸고
      2. 2개를 합친 `py-5`를 한꺼번에 주자!
      3. 양옆으로 줄거면 `px-3`정도로 준다.
   5. 버튼도 위로 `mt-5`정도 주자.

5. 반응형 기기에서도 예쁘게 보일려면 meta태그를 달아줘야한다.
   ```html
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ```
6. img태그가 따라가는 div를 반응형 그대로 col-6으로 주면, 모바일화면에서 너무 작아진다.
   - 글자와 달리, 모바일에서는 `화면이 줄어듬에 따라, 그림은 커져야한다`
   - col-lg, md, sm을 점점 커지게 주자.
   - 기본`col-x`는 col-sm이 더 작아질때 꽉채우게 하기 위해 col-12를 맨 마지막에 줬다.
     ```html
     <div class="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
     ```
     
7. 폰트 변경후 폰트 크기 조절하기
   1. 구글폰트 검색 > language korean 선택
   2. 폰트 선택후, 원하는 스타일만 + 체크후,  우측상단의 view selected famailies
   3. link 복사, css는 `default.css`에 `*{ }`안에 넣어주기
   4. h태그는 h3->h2로 태그만 바꿔준다.
   5. p태그는 main.css에서 `p { }`로 잡아 font-size를 준다



## qna섹션으로 화면전환하기
1. qna섹션 감추기
   1. qna 섹션에 p태그로 아무거나 집어넣어본다.
   2. 섹션별 css를 만드는 중이므로, `qna.css`를 만들고 html에 link를 걸어준다.
   3. #qna(id)로 셀렉터를 잡아 `display:none;`으로 걸어준다.
2. 전환을 위한 `start.js`를 만들고, **js link는 body의 끝부분에 심어준다.**
   - 어디서든 해도 되는데, body끝나고 하는 것을 권장한다.
3. start.js으로 버튼에 함수 걸어주기
   1. const로 #main, #qna 2개의 섹션을 쿼리셀렉터로 잡아준다.
   2. begin메서드를 만든다.
      ```js
      function begin() {
          main.style.display = "none";
          qna.style.display = "block";
      }
      ```
   3. 시작버튼에 onclick으로 `"begin()"`을 걸어준다.
4. 버튼클릭시 화면전환에 애니메이션 적용하기
   1. `animation.css`를 따로 만들어주고 link를 걸어준다.
   2. [참고링크](http://www.tcpschool.com/css/css3_transform_animation)
   3. `@keyframes`를 활용해서 fadeIn, fadeOut 키프레임을 정의한다.
      1. 시작 투명도0 -> 1, 끝 1 -> 0
   4. 크롬에서는 @webkit-keyframes를 이용하므로 똑같이 따로 `@-webkit-keyframes`정의해준다.
5. 애니메이션 적용을 위하여, begin함수에 애니메이션을 적용해준다.
   1. 일단 테스트하기 위해, 각 섹션 display는 주석처리한다.
   2. main은 fadeOut 2개를, qna에서는 fadeIn을 style에 적용해주는데, 문자열에 시간도 적어줘야한다.
   3. main만 있는 상태이므로, fadeOut이 잘되는지 확인한다.
   4. **fadeIn이 적용될 qna섹션은 display:block이 `fade시간만큼 있다가 작동해야한다`**
      1. main의 fadeOut도, 애니메이션 실행후 display조작이 일어나도록 한다.
   5. 시나리오
      1. main의 fadeout 1초짜리가 실행 중
      2. 0.45초있다가 qnq가 fadein이 실행된다
         1. 다시 내부에서 0.45초 있다가 main이 display:none;된다.
         2. fadeOut 1초에 가까이 사라지게 되면, 깜빡이는 버그가 발생할 수 있다.
      3. main이none되는 바로 밑에 qna를 block시켜준다.

## qna섹션 작성하기
1. data.js에는 qnaList변수에 list내부에 jsobject가 담겨있으며, console에 붙여넣어서 확인할 수 있다.
   1. 그림
      ![image-20220821003150215](https://raw.githubusercontent.com/is3js/screenshots/main/image-20220821003150215.png)
   2. jsobject 특징은 .key으로 찾아갈 수 있다.
   3. list배열은 [0] 인덱싱으로 접근한다.
   4. jsobject는 `.a`로 들어가면 또다른 배열이 있으며
      1. 각 배열에는 답변종류별 answer key + type key의 jsobject가 담겨져있다
         1. answer의 value로는 답변메세지가 있고
         2. type의 value에는 알고리즘 작성을 위해 각 동물type이 다시 배열로 선언되어있다.
   5. 나중에 a 속 type정도만 바꿔서 다른 것으로 수정할 수 있다.
   
2. 질문 + 대답list의 data를 미리 가지고 있으므로, `html에는 공간만`만들어주고 `js의 innerHTML`함수를 이용해서 넣어준다.
   1. qna섹션 안에 `div.qBox`와 `div.answerBox`를 만들어준다.

3. 시작하기를 누를 때, 질문+답변리스트가 떠야하므로
   1. start.js에서 goNext함수를 만들고
   2. begin함수에서 바깥 setTimeout 내부에 끝라인에 goNext();를 호출하도록 작성한다.
   3. goNext()함수에서는, .qBox를 쿼리셀렉터로 찾고, .innerHtml = 에 qnaList[0].q를 가져와 넣어준다.
      1. `qnaList`의 변수를 쓰려면, body맨끝에  start.js보다 더 위에 data.js를 심어줘야한다.
      2. 이제 홈페이지에서 시작하기 버튼 -> begin -> goNext -> .qBox innerHtml로 qnaList의 [0]번째 요소 중 key q의 값이 텍스트로 들어가게 된다.
   4. goNext에 사용되는 qnaList[0]의 0부분을 파라미터화 시키고, begin안에서 호출시 인자로 0을 넣어주게 하자.
      1. qIdx
4. qbox에 텍스트를 삽입하는 .innerHtml과는 달리, answerBox에는 `사용자가 선택할 수 있는 btn을 삽입 -> 텍스트는 따로 innerHTML`해줘야한다.
   1. goNext() 내부에서 qBox는 innerHTML로 텍스트 데이터 바로 삽입한 것과 달리 
      1. `쿼리셀렉터`로 answerBox를 찾고
      2. `createElement`로 button태그를 만들어서 -> answerBox에 `.appendChild`를하고
      3. div(answerBox)에 button(answer)이 appendChild된 상태에서도 `innerHTML`을 할 수 있다.
      4. `qnaList[qIdx].a[0].answer`로 1개의 답변만 버튼 속 텍스트로 출력해보고 -> ` qnaList[qIdx].a`에 담긴 갯수만큼 반복문을 돌린다.
         1. 버튼생성 + 버튼 삽입 + 텍스트 삽입의 과정이 반복되어야한다.
         2. 출력이 잘되면, 반복문내부는 `addAnswer()`함수로 뺀다.

### 답변(버튼)마다 클릭시 기존버튼(비활성화 후) 삭제하기 
1. 생성된 버튼들에 onclick적용할 메서드 만들기(다음 질문으로 넘어가기)
   - **create한 btn에 onclick속성을 주는 것이 아니라 `.addEventListener("click", function(){}, false)`를 준다.**
   - 미리 다 하는게 아니라, `반복문 속 appenChild된 btn 셀럭터 변수`에 달아주면 된다.
2. 버튼에 add리스너로 달아줄 함수는 어떤 작동을 클릭시, 
   1. 기존 버튼들을 모두 사라지게 만들어야한다.
      1. **버튼을 추가만 할거면, 태그로만 추가 가능하지만**
      2. `삭제를 위한 태그생성 직후 .classList.add('')`로 클래스 asnwerList를 추가하고 appendChild되도록 수정한다.
      3. addEventListener 내부에서는, `쿼리셀렉터All`로 버튼들이 달고 있는 class `.answerList`를 찾아서 변수로 받고
      4. 변수children에 등록된 버튼태그들을 길이만큼 반복하면서 
         1. `.style.display = none;`으로 사라지기 전에 **`.disabled = true`를 먼저 줘서, 다른 버튼들 클릭작동이 안되도록 한다**
         2. 버튼들 비활성화후 해당 버튼들을 `.style.display = none;`로 사라지게 한다.
      5. 다 사라지게 했으면 다시 goNext(index)를 1개 늘려서, 다음 q텍스트 + a버튼들이 추가되게 한다.
         1. goNext(qIdx)는 빈공간인 qBox, answerBox에 qnaList에 있는 i번째 데이터를 텍스트와 태그로 다 박아주는역할 중이므로
         2. 인덱스만 하나 증가시켜서 이벤트리느서 끝줄에 추가해준다.


## qna 꾸미기
1. main은 #main 섹션자체를 꾸몄지만,
   - qna는 섹션이 아닌 qna 내부에 `.qBox`를 main 섹션처럼 꾸며야한다.
2. `.qBox`의 배경 + 가운데정렬 + 곡선은 css로 꾸민다.
   - 이후 `margin, padding` 등 bootstrap의 class로 처리한다
     - 제일 바깥박스인 qBox에서 my-5, py-3 정도 더 바깥 + 내부요소 여백이 설정된다.

### append되는 button들 꾸미기
1. append되는 btn태그를 생성할 때, 삭제 등을 `id 혹은 class`를 주므로,해당 `class`를 가져와 css에서 정의해주면 된다.
   - `asnwerList`를 .classList.add()로 더해줫으니 이것을 qna.css에서 입혀준다.
   - 배경 + 곡선 정도만 준다.
   1. 버튼을 1줄에 1개씩만 보여주게 하기 위해서는 `display:block;` 속성을 주면 된다.
   2. `width:100%`을 주면, 꽉 채우게 된다.
   3. `border: 0;`을 주면 버튼도 곡선이 사라진다.
2. btn의 `마진 패딩은 class로` 줘야하므로, appendChild하는 부부네서 classList.add에서 부트스트랩 class로 더해주자.
3. 클릭가능한 btn들은 css로 `:hover, :focus`로 배경 + 글자색의 변화를 주자
4. width를 80%로 조정하면 -> 왼쪽으로 치우치는데 -> `class로 mx-auto`를 주면 된다.
   1. .qBox와 .answerList 둘다 `css에는 width: 80%;` + `html class/ js appendChild class`에  `mx-atuo`를 추가한다

### button에도 애니메이션 효과주기
1. 기존에는 시작하기 버튼 누를시, 사라지는 main, 나타나는 qna섹션에 대해`쿼리셀럭터 -> main.style.animation` 형태로 `js에서 지정`해줬다.
2. 쿼리셀럭터로 잡는게 아니라 `create -> class들 add`해주는 상황이므로, 마찬가지 `애니메이션 클래스를 add로 추가`해줘야한다.
   1. `animation.css`의 하단에 `animation: fadeIn`이 적용되는 `.fadeIn` css셀렉터를 정의해주고, 
   2. appendChild되는 버튼마다 classList.add에서 다시 추가해준다.
3. **반면에 fadeOut이 적용되는 순간은, 클릭이벤트리스너 내부이므로, 그때 적용되도록 `children[i].style.animation = "fadeOut 1s";`형식으로 이미 셀렉터로 잡아놓은 상황에서 처리되게 한다**
4. 이럴 경우, 1초동안 display:none;이 되면 안된다.
   1. 메인에서 썼던 것처럼, `클릭시`버튼은 disabled=true;이후에 fadeOut을 1초동안 지속 시킨다.
   2. `setTimeout(() => {}, 950 )`로 거의 1초가 되기 직전에, style.display = 'none';이 작동하도록
      1. 전체 반복문을 한번 더 돌린다.
   3. 이 때, goNext()도 1초가 미뤄지니, setTimeout내부로 옮긴다.
   4. 너무 느리니, `.fadeIn, .fadeOut  0.5초` + `setTimeout은 450으로` 줄인다.
5. fadeIn은 혹시나해서 만들어둔 것. 사용은 안한다.
   