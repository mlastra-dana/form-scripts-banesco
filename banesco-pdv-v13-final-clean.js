(function () {
  var attempts = 0;
  var maxAttempts = 120;

  function loadBaseV8(callback) {
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

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-v13-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-v13-css";

    style.innerHTML = `
      /* Mantener el diseño bueno de v8 */
      h1, h2, h3, h4,
      .x-component,
      .x-box-item {
        color: #007a63 !important;
      }

      .x-form-item-label,
      .x-form-cb-label,
      label,
      .x-form-item-label *,
      label * {
        color: #007a63 !important;
        font-weight: 700 !important;
      }

      .banesco-field-icon {
        color: #007a63 !important;
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
        box-shadow: none !important;
      }

      .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      /* No romper controles internos ExtJS */
      .x-form-item,
      .x-form-item-body,
      .x-form-field-wrap,
      .x-form-trigger-wrap,
      .x-form-trigger-input-cell,
      .x-form-text-wrap {
        overflow: visible !important;
        pointer-events: auto !important;
      }

      /* Corrección específica de Actividad Económica */
      .banesco-actividad-ok {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: transparent !important;
        pointer-events: auto !important;
        min-height: 56px !important;
      }

      .banesco-actividad-ok * {
        pointer-events: auto !important;
      }

      .banesco-actividad-ok,
      .banesco-actividad-ok div,
      .banesco-actividad-ok td,
      .banesco-actividad-ok table {
        background-color: transparent !important;
        background-image: none !important;
      }

      .banesco-actividad-ok .x-form-item-body,
      .banesco-actividad-ok .x-form-field-wrap,
      .banesco-actividad-ok .x-form-trigger-wrap,
      .banesco-actividad-ok .x-form-trigger-input-cell,
      .banesco-actividad-ok .x-form-text-wrap {
        display: table-cell !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        pointer-events: auto !important;
        height: 28px !important;
        min-height: 28px !important;
      }

      .banesco-actividad-ok .x-form-trigger-wrap {
        display: table !important;
        width: 100% !important;
        border-bottom: 1px solid #d9e8e2 !important;
      }

      .banesco-actividad-ok input,
      .banesco-actividad-ok select,
      .banesco-actividad-ok textarea,
      .banesco-actividad-ok .x-form-field,
      .banesco-actividad-ok .x-form-text {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        color: #666666 !important;
        height: 28px !important;
        min-height: 28px !important;
        font-size: 12px !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }

      .banesco-actividad-ok .x-form-trigger,
      .banesco-actividad-ok .x-form-arrow-trigger {
        display: table-cell !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 28px !important;
        height: 28px !important;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
        cursor: pointer !important;
        pointer-events: auto !important;
        z-index: 99999 !important;
      }

      .banesco-actividad-ok .x-form-invalid-field,
      .banesco-actividad-ok .x-form-trigger-wrap-invalid {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-actividad-ok .x-form-invalid-under,
      .banesco-actividad-ok .x-form-error-msg {
        position: static !important;
        display: block !important;
        background: transparent !important;
        border: 0 !important;
        padding: 4px 0 0 0 !important;
        margin: 2px 0 0 0 !important;
        color: #d93025 !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        box-shadow: none !important;
      }

      /* El dropdown debe salir por encima del popup */
      .x-boundlist,
      .x-boundlist-floating,
      .x-layer,
      .x-menu,
      .x-shadow {
        z-index: 9999999 !important;
      }

      /* Ocultar barra gris superior sin tocar el card */
      .banesco-force-hide {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
      }
    `;

    document.head.appendChild(style);
  }

  function findActividadBlocks() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll(".x-form-item"));

    return blocks.filter(function (block) {
      var txt = normalize(block.innerText || block.textContent || "");
      return (
        txt.indexOf("actividad económica") !== -1 ||
        txt.indexOf("actividad economica") !== -1
      );
    });
  }

  function getActividadComponent(block) {
    if (!window.Ext || !Ext.ComponentManager) return null;

    var found = null;

    Ext.ComponentManager.each(function (key, cmp) {
      try {
        var label = normalize(cmp.fieldLabel || cmp.boxLabel || "");
        var name = normalize(cmp.name || "");
        var id = normalize(cmp.id || "");

        if (
          label.indexOf("actividad económica") !== -1 ||
          label.indexOf("actividad economica") !== -1 ||
          name.indexOf("actividad") !== -1 ||
          id.indexOf("actividad") !== -1
        ) {
          found = cmp;
        }
      } catch (e) {}
    });

    return found;
  }

  function fixActividad() {
    var blocks = findActividadBlocks();

    blocks.forEach(function (block) {
      block.classList.add("banesco-actividad-ok");
      block.classList.remove("banesco-hide");

      block.style.display = "";
      block.style.visibility = "visible";
      block.style.opacity = "1";
      block.style.pointerEvents = "auto";
      block.style.background = "transparent";

      var cmp = getActividadComponent(block);

      if (cmp) {
        try {
          cmp.show();
          cmp.setDisabled(false);
          cmp.setReadOnly(false);
          cmp.updateLayout && cmp.updateLayout();
        } catch (e) {}
      }

      var wrappers = block.querySelectorAll(
        ".x-form-item-body, .x-form-field-wrap, .x-form-trigger-wrap, .x-form-trigger-input-cell, .x-form-text-wrap"
      );

      Array.prototype.forEach.call(wrappers, function (el) {
        el.style.visibility = "visible";
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
        el.style.background = "transparent";
        el.style.border = "0";
        el.style.boxShadow = "none";
      });

      var fields = block.querySelectorAll("input, select, textarea, .x-form-field, .x-form-text");

      Array.prototype.forEach.call(fields, function (field) {
        field.style.visibility = "visible";
        field.style.opacity = "1";
        field.style.pointerEvents = "auto";
        field.style.cursor = "pointer";
        field.style.background = "transparent";
        field.style.border = "0";
        field.style.boxShadow = "none";

        field.onclick = function () {
          var component = getActividadComponent(block);
          if (component && typeof component.expand === "function") {
            try {
              component.focus();
              component.expand();
            } catch (e) {}
          }
        };
      });

      var triggers = block.querySelectorAll(".x-form-trigger, .x-form-arrow-trigger");

      Array.prototype.forEach.call(triggers, function (trigger) {
        trigger.style.visibility = "visible";
        trigger.style.opacity = "1";
        trigger.style.pointerEvents = "auto";
        trigger.style.cursor = "pointer";

        trigger.onclick = function () {
          var component = getActividadComponent(block);
          if (component && typeof component.expand === "function") {
            try {
              component.focus();
              component.expand();
            } catch (e) {}
          }
        };
      });

      block.onclick = function () {
        var component = getActividadComponent(block);
        if (component && typeof component.expand === "function") {
          try {
            component.focus();
            component.expand();
          } catch (e) {}
        }
      };
    });
  }

  function hideGrayBarOnly() {
    var candidates = Array.prototype.slice.call(
      document.querySelectorAll("div, section, header, table, tbody, tr, td")
    );

    candidates.forEach(function (el) {
      if (el.querySelector && el.querySelector("input, select, textarea")) return;
      if (el.classList && (el.classList.contains("banesco-popup-card") || el.classList.contains("banesco-popup-shell"))) return;

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = normalize(el.innerText || el.textContent || "");

      var isTop = rect.top >= -10 && rect.top <= 180;
      var isBar = rect.width > 400 && rect.height >= 20 && rect.height <= 90;

      var isGray =
        bg.indexOf("rgb(11") === 0 ||
        bg.indexOf("rgb(12") === 0 ||
        bg.indexOf("rgb(13") === 0 ||
        bg.indexOf("rgb(14") === 0 ||
        bg.indexOf("rgb(15") === 0 ||
        bg.indexOf("rgb(16") === 0 ||
        bg.indexOf("rgb(17") === 0 ||
        bg.indexOf("rgb(18") === 0 ||
        bgImage.indexOf("gradient") !== -1;

      if (isTop && isBar && txt === "" && isGray) {
        el.classList.add("banesco-force-hide");
        el.style.display = "none";
      }
    });
  }

  function applyFix() {
    injectCSS();
    fixActividad();
    hideGrayBarOnly();
  }

  loadBaseV8(function () {
    applyFix();

    var interval = setInterval(function () {
      attempts++;
      applyFix();

      if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 250);
  });
})();
