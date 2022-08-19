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

