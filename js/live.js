window.addEventListener("load", function () {
  console.log("인터파크라이브");
  const fileName = "live.json";

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
    let htmlLiveTag = ``;
    // console.log(_res);

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["live_" + index];
      // console.log(obj);

      const tempTag = `
      <div class="swiper-slide" role="group" aria-label="1 / 8" >
      <div class="live-slide-item">
        <a href="${obj.url}" class="live-link">
          <div class="live-contents">
              <img src="${obj.image}" alt="">
              <div class="live-info" >
                  <div class="live-info-bt">${obj.state}</div>
                  <div class="live-info-tit">${obj.brand}</div>
              </div>
              <div class="live-tv">
                <p class="live-date">${obj.date}</p>
                <p class="live-time">${obj.time}</p>
              </div>
              <div class="spec-wrap">
                  <img class="spec-img" src="${obj.good_image}">
                  <div class="spec-desc">
                    <p class="spec-title">${obj.title}</p>
                    <li>
                      <span class="spec-price">
                        <b>81%</b>
                        <em>${obj.good_price}</em>
                        <span>원</span>
                      </span>
                    </li>

                  </div>
              </div>
          </div>
        </a>
      </div>
    </div>
        `;
      htmlLiveTag += tempTag;
    }
    showHtmlTag(htmlLiveTag);
  }

  function showHtmlTag(_html) {
    const liveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(liveSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }
  function makeSwiper() {
    const swiperEvent = new Swiper(".live-slide", {
      slidesPerView: 4,
      spaceBetween: 27,

      navigation: {
        nextEl: ".live-slide-wrap .slide-next-bt",
        prevEl: ".live-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 5,
    });
  }
});
