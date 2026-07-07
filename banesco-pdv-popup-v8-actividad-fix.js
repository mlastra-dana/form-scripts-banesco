(function () {
  function loadBaseScript(callback) {
    if (window.__banescoV8Loaded) {
      callback();
      return;
    }

    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/mlastra-dana/form-scripts-banesco@main/banesco-pdv-popup-v8.js?v=8";
    script.onload = function () {
      window.__banescoV8Loaded = true;
      callback();
    };
    document.head.appendChild(script);
  }

  function injectFixCSS() {
    if (document.getElementById("banesco-actividad-fix-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-actividad-fix-css";

    style.innerHTML = `
      /* Mantener visible Actividad Económica aunque esté inválida */
      .x-form-item,
      .x-form-item-body,
      .x-form-field-wrap,
      .x-form-trigger-wrap,
      .x-form-trigger-input-cell,
      .x-form-text-wrap {
        overflow: visible !important;
      }

      .x-form-invalid-field,
      .x-form-trigger-wrap-invalid,
      .x-form-invalid,
      input.x-form-invalid-field,
      select.x-form-invalid-field,
      textarea.x-form-invalid-field {
        display: block !important;
        visibility: visible !important;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        box-shadow: none !important;
        outline: none !important;
      }

      /* Error debajo del campo, sin tapar el input */
      .x-form-invalid-under,
      .x-form-error-msg {
        display: block !important;
        position: static !important;
        background: transparent !important;
        border: 0 !important;
        padding: 4px 0 0 0 !important;
        margin: 2px 0 0 0 !important;
        color: #d93025 !important;
        font-size: 11px !important;
        line-height: 1.2 !important;
        font-weight: 600 !important;
        box-shadow: none !important;
      }

      /* Quitar caja roja grande de error */
      .x-form-invalid-under > div,
      .x-form-error-msg > div {
        background: transparent !important;
        border: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Campo actividad económica */
      .banesco-actividad-field {
        display: block !important;
        visibility: visible !important;
        min-height: 46px !important;
      }

      .banesco-actividad-field .x-form-item-body,
      .banesco-actividad-field .x-form-field-wrap,
      .banesco-actividad-field .x-form-trigger-wrap {
        display: block !important;
        visibility: visible !important;
        min-height: 24px !important;
      }

      .banesco-actividad-field input,
      .banesco-actividad-field select,
      .banesco-actividad-field .x-form-field,
      .banesco-actividad-field .x-form-text {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        height: 24px !important;
        min-height: 24px !important;
      }

      /* Mantener el aviso general más limpio */
      .x-form-invalid-summary,
      .x-form-error-summary,
      .x-message-box {
        background: transparent !important;
        border: 1px dotted #ff4d4f !important;
        color: #007a63 !important;
        box-shadow: none !important;
      }
    `;

    document.head.appendChild(style);
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function markActividadField() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll(".x-form-item"));

    blocks.forEach(function (block) {
      var txt = normalize(block.innerText || block.textContent || "");

      if (txt.indexOf("actividad económica") !== -1 || txt.indexOf("actividad economica") !== -1) {
        block.classList.add("banesco-actividad-field");
        block.classList.remove("banesco-hide");
        block.style.display = "";
        block.style.visibility = "visible";

        var fields = block.querySelectorAll("input, select, textarea, .x-form-field, .x-form-text");

        Array.prototype.forEach.call(fields, function (field) {
          field.style.display = "block";
          field.style.visibility = "visible";
          field.style.opacity = "1";
          field.style.background = "transparent";
          field.style.border = "0";
          field.style.borderBottom = "1px solid #d9e8e2";
          field.style.boxShadow = "none";
        });
      }
    });
  }

  function applyFix() {
    injectFixCSS();
    markActividadField();
  }

  loadBaseScript(function () {
    applyFix();
    setTimeout(applyFix, 500);
    setTimeout(applyFix, 1200);
    setTimeout(applyFix, 2500);
  });
})();
