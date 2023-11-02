window.addEventListener("load", function () {
  console.log("투어상품");
  //  1. 외부데이터 불러온다.
  const fileName = "tour.json";

  //   외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();
  //   get 방식으로 파일 열기
  xhr.open("GET", fileName);
  //   실제로 실행
  xhr.send();

  //   데이터의 전송 상태를 체크
  xhr.onreadystatechange = function (event) {
    // console.log(event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      // console.log(res);
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // Html 태그 만드는 기능
  function makeHtmlTag(_res) {
    let htmlTourTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="tour-slide-item">
          <a href="${obj.url}" class="tour-link">
            <div class="tour-img">
              <img src="${obj.image}" alt="${obj.desc}"/>
            </div>
            <div class="tour-info">
              <ul class="tour-good-list">
                
                <li>
                  <p class="tour-good-info-desc-header">
                  ${obj.title}                                 
                  </p>
                  </li>
                  <li>
                  <p class="tour-good-info-desc">
                  ${obj.desc}                                  
                  </p>
                </li>
                <li>
                  <span class="tour-good-info-price">                              
                    <em>${obj.price}</em>
                    ${obj.won}
                  </span>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
      `;
      htmlTourTag += tempTag;
    }

    showHtmlTag(htmlTourTag);
  }

  function showHtmlTag(_html) {
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 28,

      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 3,
    });
  }
});
