window.addEventListener("load", function () {
  console.log("티켓상품");

  const fileName = "tiket.json";
  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      //   console.log(res);
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTiketTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      let tempTag = `
      <div class="swiper-slide">
        <div class="tiket-slide-item">
            <a href="${obj.url}" class="tiket-link">
            <div class="tiket-img">
                <img src="${obj.image}" alt="${obj.desc}" />
            </div>
            <div class="ticket-info">
                <ul class="ticket-good-list">
                    
                <li>
                    <p class="ticket-good-info-tit">
                    ${obj.title}                          
                    </p>
                    </li>
                    <li>
                    <p class="ticket-good-info-desc">
                    ${obj.desc}                                 
                    </p>
                </li>
                <li>
                    <span class="ticket-good-info-date">                              
                    ${obj.date}
                    </span>
                </li>
                <li>
                    <span class="ticket-good-info-boxb">좌석우위</span>
                </li>
                </ul>

            </div>
            </a>
    
        </div>
    </div>
      `;

      if (i === _res.total - 1) {
        // 바로가기 버튼 출력한다.
        tempTag = `
        <div class="swiper-slide">
          바로가기
        </div>
        `;
      } else {
        // 일반적인 코드를 출력
        tempTag = `
      <div class="swiper-slide">
        <div class="tiket-slide-item">
            <a href="${obj.url}" class="tiket-link">
            <div class="tiket-img">
                <img src="${obj.image}" alt="${obj.desc}" />
            </div>
            <div class="ticket-info">
                <ul class="ticket-good-list">
                    
                <li>
                    <p class="ticket-good-info-tit">
                    ${obj.title}                          
                    </p>
                    </li>
                    <li>
                    <p class="ticket-good-info-desc">
                    ${obj.desc}                                 
                    </p>
                </li>
                <li>
                    <span class="ticket-good-info-date">                              
                    ${obj.date}
                    </span>
                </li>
                <li>
                    <span class="ticket-good-info-boxb">좌석우위</span>
                </li>
                </ul>

            </div>
            </a>
    
        </div>
    </div>
      `;
      }

      htmlTiketTag += tempTag;
    }

    showHtmlTag(htmlTiketTag);
  }

  function showHtmlTag(_html) {
    const ticketSlide = ".tiket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }
  function makeSwiper() {
    const swiperTiket = new Swiper(".tiket-slide", {
      slidesPerView: 4,
      spaceBetween: 27,

      navigation: {
        nextEl: ".tiket-slide-wrap .slide-next-bt",
        prevEl: ".tiket-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
