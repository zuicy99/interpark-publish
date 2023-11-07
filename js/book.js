window.addEventListener("load", function () {
  console.log("오늘의도서");
  const fileName = "book.json";

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
    let htmlBookTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["book_" + index];

      const tempTag = `
        <div class="swiper-slide">
            <div class="book-slide-item">
                <a href="${obj.url}" class="book-link">
                
                   <div class="book-img">
                    <img src="${obj.image}" alt=""/>
                    </div>
                    <!-- book info -->
                    <div class="book-info">
                        <ul class="book-good-list">
                            <li>
                            <p class="book-good-info-tit">${obj.title}</p>
                            </li>
                            <li>
                            <span class="book-good-info-price">
                                <em>${obj.price}</em>
                                원
                            </span>
                            </li>
                        </ul>
                    </div>
                </a>
            </div>
        </div>      
      `;
      htmlBookTag += tempTag;
    }
    showHtmlTag(htmlBookTag);
  }

  function showHtmlTag(_html) {
    const bookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(bookSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }
  function makeSwiper() {
    const swiperBook = new Swiper(".book-slide", {
      slidesPerView: 5,
      spaceBetween: 27,

      navigation: {
        nextEl: ".book-slide-wrap .slide-next-bt",
        prevEl: ".book-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 5,
    });
  }
});
