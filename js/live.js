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
    let HtmlLivetag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["live_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="live-slide-item">
            <a href="${obj.url}" class="live-link">
            <div class="live-img">
                <img src="${obj.image}" alt="" />
            </div>
            <div class="live-info">
                <ul class="live-good-list">
                <li>
                    <p class="live-good-info-tit">
                    태양의서커스 〈루치아〉 - 부산                               
                    </p>
                    </li>
                    <li>
                    <p class="live-good-info-desc">
                    신세계 센텀시티 내 빅탑                                  
                    </p>
                </li>
                <li>
                    <span class="live-good-info-date">                              
                    2024.01.13 - 2024.02.04
                    </span>
                </li>
                <li>
                    <span class="live-good-info-boxb">좌석우위</span>
                </li>
                </ul>

            </div>
            </a>
    
        </div>
      </div>
      `;
    }
  }
});
