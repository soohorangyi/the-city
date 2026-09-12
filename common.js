var BN_SECTIONS = [
  { id: "index", label: "1면", href: "index.html" },
  { id: "culture", label: "문화예술", href: "culture.html" },
  { id: "harbor", label: "항구 통신", href: "harbor.html" },
  { id: "incidents", label: "사건사고", href: "incidents.html" },
  { id: "society", label: "사교계", href: "society.html" },
  { id: "ads", label: "광고", href: "ads.html" },
  { id: "letters", label: "독자 편지", href: "letters.html" },
  { id: "editorial", label: "편집실 소식", href: "editorial.html" },
  { id: "neighbors", label: "이웃 소식", href: "neighbors.html" },
  { id: "food", label: "미식 산책", href: "food.html" }
];

function bnRenderHeader(activeId) {
  var el = document.getElementById("bn-header");
  if (!el) return;
  var nav = BN_SECTIONS.map(function (s) {
    var cls = s.id === activeId ? "active" : "";
    return '<a href="' + s.href + '" class="' + cls + '">' + s.label + "</a>";
  }).join("");
  el.innerHTML =
    '<div class="bn-masthead">' +
    '<p class="bn-tagline">ARS IN NOCTE</p>' +
    '<p class="bn-logo"><a href="index.html">THE BELLE CITY <span class="bn-accent">HERALD-TRIBUNE</span></a></p>' +
    "</div>" +
    '<div class="bn-dateline"><span>1938년 9월 13일</span><span>제 214호</span></div>' +
    '<nav class="bn-nav">' + nav + "</nav>";
}

function bnRenderFooter() {
  var el = document.getElementById("bn-footer");
  if (!el) return;
  el.innerHTML =
    '<p>Belle Noir &middot; 격주 발행 &middot; 제보 및 편지는 편집부로</p>';
}

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  bnRenderHeader(body.getAttribute("data-page"));
  bnRenderFooter();
});
