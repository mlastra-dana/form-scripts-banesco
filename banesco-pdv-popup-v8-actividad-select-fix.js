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
    if (document.getElementById("banesco-actividad-select-fix-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-actividad-select-fix-css";

    style.innerHTML = `
      /* Corrige Actividad Económica */
      .banesco-actividad-field {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        min-height: 58px !important;
        position: relative !important;
        overflow: visible !important;
        background: transparent !important;
        pointer-events: auto !important;
      }

      .banesco-actividad-field * {
        pointer-events: auto !important;
      }

      .banesco-actividad-field .x-form-item-body,
      .banesco-actividad-field .x-form-field-wrap,
      .banesco-actividad-field .x-form-trigger-wrap,
      .banesco-actividad-field .x-form-trigger-input-cell,
      .banesco-actividad-field .x-form-text-wrap {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        min-height: 26px !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        overflow: visible !important;
        pointer-events: auto !important;
      }

      .banesco-actividad-field input,
      .banesco-actividad-field select,
      .banesco-actividad-field textarea,
      .banesco-actividad-field .x-form-field,
      .banesco-actividad-field .x-form-text {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
        height: 26px !important;
        min-height: 26px !important;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        color: #666666 !important;
        font-size: 12px !important;
        padding: 3px 28px 4px 2px !important;
        pointer-events: auto !important;
        cursor: pointer !important;
      }

      .banesco-actividad-field .x-form-trigger,
      .banesco-actividad-field .x-form-arrow-trigger {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 26px !important;
        height: 26px !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 50 !important;
      }

      /* Evita que el error tape el selector */
      .banesco-actividad-field .x-form-invalid-under,
      .banesco-actividad-field .x-form-error-msg {
        position: static !important;
        display: block !important;
        background: transparent !important;
        border: 0 !important;
        padding: 4px 0 0 0 !important;
        margin: 2px 0 0 0 !important;
        color: #d93025 !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        line-height: 1.2 !important;
        box-shadow: none !important;
        pointer-events: none !important;
      }

      /* Quita el fondo amarillo/rosado de error */
      .banesco-actividad-field,
      .banesco-actividad-field td,
      .banesco-actividad-field div {
        background-color: transparent !important;
      }

      .banesco-actividad-field .x-form-invalid-field,
      .banesco-actividad-field .x-form-trigger-wrap-invalid {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        box-shadow: none !important;
      }

      /* Asegura que los dropdowns de ExtJS queden por encima */
      .x-boundlist,
      .x-boundlist-floating,
      .x-layer,
      .x-menu,
      .x-shadow {
        z-index: 9999999 !important;
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

      if (
        txt.indexOf("actividad económica") !== -1 ||
        txt.indexOf("actividad economica") !== -1
      ) {
        block.classList.add("banesco-actividad-field");
        block.classList.remove("banesco-hide");

        block.style.display = "block";
        block.style.visibility = "visible";
        block.style.opacity = "1";
        block.style.pointerEvents = "auto";
        block.style.background = "transparent";

        var wrappers = block.querySelectorAll(
          ".x-form-item-body, .x-form-field-wrap, .x-form-trigger-wrap, .x-form-trigger-input-cell, .x-form-text-wrap"
        );

        Array.prototype.forEach.call(wrappers, function (el) {
          el.style.display = "block";
          el.style.visibility = "visible";
          el.style.opacity = "1";
          el.style.pointerEvents = "auto";
          el.style.background = "transparent";
          el.style.border = "0";
          el.style.boxShadow = "none";
        });

        var fields = block.querySelectorAll(
          "input, select, textarea, .x-form-field, .x-form-text"
        );

        Array.prototype.forEach.call(fields, function (field) {
          field.style.display = "block";
          field.style.visibility = "visible";
          field.style.opacity = "1";
          field.style.pointerEvents = "auto";
          field.style.cursor = "pointer";
          field.style.background = "transparent";
          field.style.border = "0";
          field.style.borderBottom = "1px solid #d9e8e2";
          field.style.boxShadow = "none";
        });

        var triggers = block.querySelectorAll(".x-form-trigger, .x-form-arrow-trigger");

        Array.prototype.forEach.call(triggers, function (trigger) {
          trigger.style.display = "block";
          trigger.style.visibility = "visible";
          trigger.style.opacity = "1";
          trigger.style.pointerEvents = "auto";
          trigger.style.cursor = "pointer";
          trigger.style.zIndex = "50";
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
    setTimeout(applyFix, 300);
    setTimeout(applyFix, 800);
    setTimeout(applyFix, 1500);
    setTimeout(applyFix, 3000);
  });
})();
