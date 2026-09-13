var BN_SECTIONS = [
  { id: "index", label: "1면", href: "index.html" },
  { id: "culture", label: "문화예술", href: "culture.html" },
  { id: "harbor", label: "항구 통신", href: "harbor.html" },
  { id: "incidents", label: "사건사고", href: "incidents.html" },
  { id: "society", label: "사교계", href: "society.html" },
  { id: "food", label: "미식 산책", href: "food.html" },
  { id: "neighbors", label: "이웃 소식", href: "neighbors.html" },
  { id: "ads", label: "광고", href: "ads.html" },
  { id: "letters", label: "독자 편지", href: "letters.html" },
  { id: "editorial", label: "편집실 소식", href: "editorial.html" }
];

var BN_ACCENTS = [
  { name: "와인 버건디", color: "#6B4444", tint: "rgba(107,68,68,0.14)" },
  { name: "소프트 슬레이트", color: "#5E7E9C", tint: "rgba(94,126,156,0.14)" },
  { name: "소프트 세이지", color: "#7C8F5E", tint: "rgba(124,143,94,0.14)" },
  { name: "더스티 로즈", color: "#9C4F5E", tint: "rgba(156,79,94,0.14)" }
];

function bnApplyAccent(color, tint) {
  document.documentElement.style.setProperty("--bn-accent", color);
  document.documentElement.style.setProperty("--bn-highlight", tint);
}

function bnLoadAccent() {
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem("bn_accent") || "null"); } catch (e) {}
  var accent = saved || BN_ACCENTS[0];
  bnApplyAccent(accent.color, accent.tint);
  return accent;
}

function bnRenderPalette(current) {
  var box = document.getElementById("bn-palette-row");
  if (!box) return;
  box.innerHTML = BN_ACCENTS.map(function (a) {
    var active = a.color === current.color ? "border:2px solid " + a.color + ";" : "border:0.5px solid var(--bn-border);";
    return '<button class="bn-swatch-btn" data-color="' + a.color + '" data-tint="' + a.tint + '" style="' + active + 'display:inline-flex;align-items:center;gap:6px;font-size:11.5px;padding:5px 10px;background:var(--bn-paper);border-radius:2px;cursor:pointer;font-family:\'Noto Serif KR\',serif;color:var(--bn-ink);">' +
      '<span style="width:9px;height:9px;border-radius:50%;background:' + a.color + ';display:inline-block;"></span>' + a.name + "</button>";
  }).join("");
  box.querySelectorAll(".bn-swatch-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var accent = { color: btn.getAttribute("data-color"), tint: btn.getAttribute("data-tint") };
      localStorage.setItem("bn_accent", JSON.stringify(accent));
      bnApplyAccent(accent.color, accent.tint);
      bnRenderPalette(accent);
    });
  });
}

function bnRenderHeader(activeId) {
  var el = document.getElementById("bn-header");
  if (!el) return;
  var nav = BN_SECTIONS.map(function (s) {
    var cls = s.id === activeId ? "active" : "";
    return '<a href="' + s.href + '" class="' + cls + '">' + s.label + "</a>";
  }).join("");
  el.innerHTML =
    '<div class="bn-masthead" style="position:relative;">' +
    '<i id="bn-palette-toggle" style="position:absolute; right:0; top:4px; font-size:16px; cursor:pointer; color:var(--bn-muted);" title="색상 설정">🎨</i>' +
    '<p class="bn-tagline">ARS IN NOCTE</p>' +
    '<p class="bn-logo"><a href="index.html">THE BELLE CITY <span class="bn-accent">HERALD-TRIBUNE</span></a></p>' +
    "</div>" +
    '<div id="bn-palette-row" style="display:none; justify-content:center; gap:8px; flex-wrap:wrap; margin:10px 0;"></div>' +
    '<div class="bn-dateline"><span>1938년 9월 13일</span><span>제 214호</span></div>' +
    '<nav class="bn-nav">' + nav + "</nav>";

  var current = bnLoadAccent();
  bnRenderPalette(current);
  document.getElementById("bn-palette-toggle").addEventListener("click", function () {
    var row = document.getElementById("bn-palette-row");
    row.style.display = row.style.display === "none" ? "flex" : "none";
  });
}

function bnRenderFooter() {
  var el = document.getElementById("bn-footer");
  if (!el) return;
  el.innerHTML =
    '<p>The Belle City Herald-Tribune &middot; 격주 발행 &middot; 제보 및 편지는 편집부로</p>';
}

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  bnRenderHeader(body.getAttribute("data-page"));
  bnRenderFooter();
});
