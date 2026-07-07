(function () {
  function loadBase(callback) {
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/mlastra-dana/form-scripts-banesco@main/banesco-pdv-v17-final-patch.js?v=17";
    script.onload = callback;
    document.head.appendChild(script);
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-v18-order-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-v18-order-css";

    style.innerHTML = `
      .banesco-grid-safe {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 36px !important;
        row-gap: 16px !important;
        grid-auto-flow: row dense !important;
        align-items: start !important;
      }

      .banesco-field-safe {
        min-height: auto !important;
        margin-bottom: 0 !important;
      }

      .banesco-question-row {
        order: 1 !important;
        grid-column: 1 / -1 !important;
      }

      .banesco-field-empresa {
        order: 10 !important;
        grid-column: auto !important;
      }

      .banesco-field-actividad {
        order: 20 !important;
        grid-column: auto !important;
      }

      .banesco-field-documento {
        order: 30 !important;
        grid-column: auto !important;
      }

      .banesco-field-nacionalidad {
        order: 40 !important;
        grid-column: auto !important;
      }

      .banesco-field-persona {
        order: 50 !important;
        grid-column: 1 / -1 !important;
      }

      .banesco-field-correo {
        order: 60 !important;
        grid-column: auto !important;
      }

      .banesco-field-telefono {
        order: 70 !important;
        grid-column: auto !important;
      }

      .banesco-field-estado {
        order: 80 !important;
        grid-column: auto !important;
      }

      .banesco-field-agencia {
        order: 90 !important;
        grid-column: 1 / -1 !important;
      }

      .banesco-submit-wrap {
        order: 100 !important;
        grid-column: 1 / -1 !important;
      }

      /* Verde definitivo */
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
        font-size: 34px !important;
        color: #007a63 !important;
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

      /* Mantener fuera la barra gris */
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

      @media screen and (max-width: 768px) {
        .banesco-grid-safe {
          grid-template-columns: 1fr !important;
        }

        .banesco-field-persona,
        .banesco-field-agencia {
          grid-column: auto !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function classifyFields() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll(".banesco-field-safe"));

    blocks.forEach(function (block) {
      var txt = normalize(block.innerText || block.textContent || "");

      block.classList.remove(
        "banesco-field-empresa",
        "banesco-field-actividad",
        "banesco-field-documento",
        "banesco-field-nacionalidad",
        "banesco-field-persona",
        "banesco-field-correo",
        "banesco-field-telefono",
        "banesco-field-estado",
        "banesco-field-agencia"
      );

      if (txt.indexOf("empresa") !== -1) {
        block.classList.add("banesco-field-empresa");
        return;
      }

      if (txt.indexOf("actividad económica") !== -1 || txt.indexOf("actividad economica") !== -1) {
        block.classList.add("banesco-field-actividad");
        return;
      }

      if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) {
        block.classList.add("banesco-field-documento");
        return;
      }

      if (txt.indexOf("nacionalidad") !== -1) {
        block.classList.add("banesco-field-nacionalidad");
        return;
      }

      if (
        txt.indexOf("indícanos nombre de persona contacto") !== -1 ||
        txt.indexOf("indicanos nombre de persona contacto") !== -1 ||
        txt.indexOf("nombre de persona contacto") !== -1
      ) {
        block.classList.add("banesco-field-persona");
        return;
      }

      if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1) {
        block.classList.add("banesco-field-correo");
        return;
      }

      if (txt.indexOf("teléfono") !== -1 || txt.indexOf("telefono") !== -1 || txt.indexOf("celular") !== -1) {
        block.classList.add("banesco-field-telefono");
        return;
      }

      if (txt.indexOf("estado") !== -1) {
        block.classList.add("banesco-field-estado");
        return;
      }

      if (txt.indexOf("selecciona la agencia") !== -1 || txt.indexOf("agencia") !== -1) {
        block.classList.add("banesco-field-agencia");
      }
    });
  }

  function fixGrayCover() {
    if (!document.getElementById("banesco-graybar-cover")) {
      var cover = document.createElement("div");
      cover.id = "banesco-graybar-cover";
      document.body.appendChild(cover);
    }
  }

  function applyPatch() {
    injectCSS();
    classifyFields();
    fixGrayCover();
  }

  loadBase(function () {
    applyPatch();
    setTimeout(applyPatch, 500);
    setTimeout(applyPatch, 1200);
    setTimeout(applyPatch, 2500);
    setTimeout(applyPatch, 4000);
  });
})();
