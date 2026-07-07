(function () {
  function loadBase(callback) {
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/mlastra-dana/form-scripts-banesco@main/banesco-pdv-v19-final-order-title.js?v=19";
    script.onload = callback;
    document.head.appendChild(script);
  }

  function injectCoverCSS() {
    if (document.getElementById("banesco-pdv-v20-cover-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-v20-cover-css";

    style.innerHTML = `
      /*
        Mantiene la estructura de v19,
        pero tapa la barra gris superior.
      */

      #banesco-graybar-cover {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 92px !important;
        background: #ffffff !important;
        z-index: 999998 !important;
        pointer-events: none !important;
      }

      .banesco-popup-shell {
        position: relative !important;
        z-index: 999999 !important;
        margin-top: 16px !important;
      }

      .banesco-force-hide,
      .x-panel-header,
      .x-window-header,
      .x-header,
      .x-toolbar,
      .x-docked,
      .x-panel-header-default,
      .x-panel-header-body,
      .x-panel-header-text-container,
      .x-toolbar-default {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
      }

      /*
        Verde definitivo
      */
      .banesco-title,
      .banesco-title *,
      .banesco-field .x-form-item-label,
      .banesco-field label,
      .banesco-field .x-form-item-label *,
      .banesco-field label *,
      .banesco-radio-wrapper label,
      .banesco-radio-wrapper .x-form-cb-label,
      .x-form-cb-label {
        color: #007a63 !important;
        font-weight: 700 !important;
      }

      .banesco-title {
        color: #007a63 !important;
        font-size: 34px !important;
        font-weight: 600 !important;
      }

      .banesco-question-text {
        color: #3f3f3f !important;
      }

      input[type="radio"] {
        accent-color: #007a63 !important;
      }

      input[type="submit"],
      button[type="submit"],
      .x-btn,
      .x-btn-button {
        background: #007a63 !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 22px !important;
      }

      .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
      }
    `;

    document.head.appendChild(style);
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function addCover() {
    if (document.getElementById("banesco-graybar-cover")) return;

    var cover = document.createElement("div");
    cover.id = "banesco-graybar-cover";
    document.body.appendChild(cover);
  }

  function hideGrayBars() {
    var candidates = Array.prototype.slice.call(
      document.querySelectorAll("div, section, header, table, tbody, tr, td")
    );

    candidates.forEach(function (el) {
      if (!el || el.id === "banesco-graybar-cover") return;

      if (el.querySelector && el.querySelector("input, select, textarea")) return;

      if (
        el.classList &&
        (
          el.classList.contains("banesco-popup-shell") ||
          el.classList.contains("banesco-popup-card")
        )
      ) {
        return;
      }

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = normalize(el.innerText || el.textContent || "");

      var isTop = rect.top >= -10 && rect.top <= 180;
      var isBar = rect.width > 400 && rect.height >= 20 && rect.height <= 120;

      var isDarkOrGradient =
        bgImage.indexOf("gradient") !== -1 ||
        bg.indexOf("rgb(8") === 0 ||
        bg.indexOf("rgb(9") === 0 ||
        bg.indexOf("rgb(10") === 0 ||
        bg.indexOf("rgb(11") === 0 ||
        bg.indexOf("rgb(12") === 0 ||
        bg.indexOf("rgb(13") === 0 ||
        bg.indexOf("rgb(14") === 0 ||
        bg.indexOf("rgb(15") === 0 ||
        bg.indexOf("rgb(16") === 0 ||
        bg.indexOf("rgb(17") === 0 ||
        bg.indexOf("rgb(18") === 0 ||
        bg.indexOf("rgb(19") === 0 ||
        bg.indexOf("rgb(20") === 0 ||
        bg.indexOf("rgb(21") === 0 ||
        bg.indexOf("rgb(22") === 0;

      if (isTop && isBar && txt === "" && isDarkOrGradient) {
        el.classList.add("banesco-force-hide");
        el.style.display = "none";
        el.style.height = "0";
        el.style.minHeight = "0";
        el.style.maxHeight = "0";
        el.style.margin = "0";
        el.style.padding = "0";
        el.style.overflow = "hidden";
        el.style.visibility = "hidden";
      }
    });
  }

  function forceTitleAndText() {
    var title = document.querySelector(".banesco-title");

    if (title) {
      title.textContent = "¡Nos acercamos a ti!";
      title.style.color = "#007a63";
      title.style.fontWeight = "600";
      title.style.fontSize = "34px";
    }

    var labels = document.querySelectorAll(
      ".banesco-field .x-form-item-label, .banesco-field label, .x-form-cb-label"
    );

    Array.prototype.forEach.call(labels, function (label) {
      label.style.color = "#007a63";
      label.style.fontWeight = "700";
    });
  }

  function applyPatch() {
    injectCoverCSS();
    addCover();
    hideGrayBars();
    forceTitleAndText();
  }

  loadBase(function () {
    applyPatch();
    setTimeout(applyPatch, 400);
    setTimeout(applyPatch, 1000);
    setTimeout(applyPatch, 2000);
    setTimeout(applyPatch, 3500);
  });
})();
