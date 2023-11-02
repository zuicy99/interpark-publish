window.addEventListener("load", function () {
  // visual 슬라이드 데이터 연동

  // 백엔드 Response 데이터
  const xh = new XMLHttpRequest(); //XHR 네트워크로 데이터 연동할 때,,
  xh.open("GET", "visual.json");
  xh.send();

  xh.onreadystatechange = function (event) {
    // console.log(event.target);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      //문자열을 js에서 사용하는 !!!!json 데이터 !!! 변환
      const result = JSON.parse(event.target.response);
      // 현재 화면 출력에 활용을 하지는 않고 있어요.
      makeVisualSlideHtml(result);
    }
  };

  // visual 슬라이드 내용 채우는 기능
  function makeVisualSlideHtml(_data) {
    const visualRes = _data;
    //출력을 시켜줄 문장을 만들자.
    let visualHtml = "";

    //total만큼 만복하자.
    // for 은 반복을 하는데 True 인 경우만 반복
    for (let i = 1; i <= visualRes.total; i++) {
      let temp = `
    <div class="swiper-slide">
        <div class="visual-slide-item">
            <a href="${visualRes["visual_" + i].url}">
                <img src="${visualRes["visual_" + i].file}" alt="${
        visualRes["visual_" + i].url
      }"/>
            </a>
        </div>
    </div>
  `;
      visualHtml += temp;
    }
    //어디다 자료를 출력할 것인지 지정
    const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
    visualSlide.innerHTML = visualHtml;

    var swiper = new Swiper(".visual-slide", {
      slidesPerView: 2, // 2장식 슬라이더 나오게
      spaceBetween: 24, // 보여지는 슬라이드 사이 간격
      loop: true, // 사진 무한 루프
      // 자동실행
      autoplay: {
        delay: 1000, //대기시간
        disableOnInteraction: false, //사용자 터치후 자동실행 다시
      },
      speed: 500, // 이동속도 1000=1초
      navigation: {
        nextEl: ".visual-slide-next",
        prevEl: ".visual-slide-prev",
      },
    });
  }
});
 