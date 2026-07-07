(function () {
  function loadBase(callback) {
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/mlastra-dana/form-scripts-banesco@main/banesco-pdv-v16-safe-layout-green-orderfix.js?v=16";
    script.onload = callback;
    document.head.appendChild(script);
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectPatchCSS() {
    if (document.getElementById("banesco-pdv-v17-patch-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-v17-patch-css";

    style.innerHTML = `
      /* Forzar verde Banesco */
      .banesco-title,
      .banesco-title *,
      .banesco-field-safe .x-form-item-label,
      .banesco-field-safe label,
      .banesco-field-safe .x-form-item-label *,
      .banesco-field-safe label *,
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

      /* Tapa visualmente cualquier barra gris superior que quede */
      #banesco-graybar-cover {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 88px !important;
        background: #ffffff !important;
        z-index: 999998 !important;
        pointer-events: none !important;
      }

      .banesco-force-hide {
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
    `;

    document.head.appendChild(style);
  }

  function addGrayCover() {
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
      if (el.classList && (
        el.classList.contains("banesco-popup-shell") ||
        el.classList.contains("banesco-popup-card")
      )) return;

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = normalize(el.innerText || el.textContent || "");

      var isTop = rect.top >= -10 && rect.top <= 130;
      var isBar = rect.width > 400 && rect.height >= 20 && rect.height <= 100;

      var isGrayOrGradient =
        bgImage.indexOf("gradient") !== -1 ||
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

      if (isTop && isBar && txt === "" && isGrayOrGradient) {
        el.classList.add("banesco-force-hide");
        el.style.display = "none";
      }
    });
  }

  function forceGreen() {
    var nodes = document.querySelectorAll(
      ".banesco-title, .banesco-field-safe .x-form-item-label, .banesco-field-safe label, .x-form-cb-label"
    );

    Array.prototype.forEach.call(nodes, function (node) {
      node.style.color = "#007a63";
      node.style.fontWeight = "700";
    });
  }

  function applyPatch() {
    injectPatchCSS();
    addGrayCover();
    hideGrayBars();
    forceGreen();
  }

  loadBase(function () {
    applyPatch();
    setTimeout(applyPatch, 500);
    setTimeout(applyPatch, 1200);
    setTimeout(applyPatch, 2500);
    setTimeout(applyPatch, 4000);
  });
})();
