function bnShuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function bnGetOwnComments(articleId) {
  try {
    return JSON.parse(localStorage.getItem("bn_news_comments_" + articleId) || "[]");
  } catch (e) {
    return [];
  }
}

function bnSaveOwnComment(articleId, text) {
  var list = bnGetOwnComments(articleId);
  list.push({ text: text, date: "방금" });
  localStorage.setItem("bn_news_comments_" + articleId, JSON.stringify(list));
}

function bnRenderCommentBlock(block) {
  var articleId = block.getAttribute("data-article-id");
  var presetRaw = block.getAttribute("data-preset");
  var preset = [];
  try { preset = JSON.parse(presetRaw || "[]"); } catch (e) { preset = []; }

  var listEl = block.querySelector(".bn-comment-list");
  listEl.innerHTML = "";

  var shown = bnShuffle(preset).slice(0, Math.min(3, preset.length));
  var own = bnGetOwnComments(articleId);

  shown.forEach(function (c) {
    var item = document.createElement("div");
    var head = document.createElement("div");
    head.className = "bn-comment-head";
    head.innerHTML =
      '<span class="bn-comment-name"></span>' +
      '<span class="bn-comment-date"></span>';
    head.querySelector(".bn-comment-name").textContent = c.author;
    head.querySelector(".bn-comment-date").textContent = c.date;
    var text = document.createElement("p");
    text.className = "bn-comment-text";
    text.textContent = c.text;
    item.appendChild(head);
    item.appendChild(text);
    listEl.appendChild(item);
  });

  own.forEach(function (c) {
    var item = document.createElement("div");
    var head = document.createElement("div");
    head.className = "bn-comment-head";
    head.innerHTML =
      '<span class="bn-comment-mine-badge">나</span>' +
      '<span class="bn-comment-date"></span>';
    head.querySelector(".bn-comment-date").textContent = c.date;
    var text = document.createElement("p");
    text.className = "bn-comment-text";
    text.textContent = c.text;
    item.appendChild(head);
    item.appendChild(text);
    listEl.appendChild(item);
  });
}

function bnInitAllComments() {
  var blocks = document.querySelectorAll(".bn-comments-block");
  blocks.forEach(function (block) {
    var articleId = block.getAttribute("data-article-id");
    bnRenderCommentBlock(block);
    var btn = block.querySelector(".bn-comment-submit");
    var input = block.querySelector(".bn-comment-input");
    if (!btn || !input) return;
    btn.addEventListener("click", function () {
      var val = input.value.trim();
      if (!val) return;
      bnSaveOwnComment(articleId, val);
      input.value = "";
      bnRenderCommentBlock(block);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") btn.click();
    });
  });
}

document.addEventListener("DOMContentLoaded", bnInitAllComments);
