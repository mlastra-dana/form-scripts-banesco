(function () {
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

  function injectFinalCSS() {
    if (document.getElementById("banesco-pdv-v11-final-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-v11-final-css";

    style.innerHTML = `
      /* Mantener verde fuerte */
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

      /* No permitir que el error o validación tape el combo */
      .x-form-item,
      .x-form-item-body,
      .x-form-field-wrap,
      .x-form-trigger-wrap,
      .x-form-trigger-input-cell,
      .x-form-text-wrap {
        overflow: visible !important;
      }

      /* Actividad Económica siempre visible y clickeable */
      .banesco-actividad-fix {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        pointer-events: auto !important;
        min-height: 52px !important;
        background: transparent !important;
      }

      .banesco-actividad-fix * {
        pointer-events: auto !important;
      }

      .banesco-actividad-fix .x-form-item-label,
      .banesco-actividad-fix label {
        color: #007a63 !important;
        font-weight: 700 !important;
      }

      .banesco-actividad-fix .x-form-item-body,
      .banesco-actividad-fix .x-form-field-wrap,
      .banesco-actividad-fix .x-form-trigger-wrap,
      .banesco-actividad-fix .x-form-trigger-input-cell,
      .banesco-actividad-fix .x-form-text-wrap {
        display: table !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        pointer-events: auto !important;
      }

      .banesco-actividad-fix input,
      .banesco-actividad-fix select,
      .banesco-actividad-fix textarea,
      .banesco-actividad-fix .x-form-field,
      .banesco-actividad-fix .x-form-text {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        height: 26px !important;
        min-height: 26px !important;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: #666666 !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }

      .banesco-actividad-fix .x-form-trigger,
      .banesco-actividad-fix .x-form-arrow-trigger {
        display: table-cell !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 28px !important;
        height: 26px !important;
        background: transparent !important;
        border: 0 !important;
        cursor: pointer !important;
        pointer-events: auto !important;
        z-index: 9999 !important;
      }

      /* Quitar resaltado amarillo/rojo invasivo */
      .banesco-actividad-fix,
      .banesco-actividad-fix div,
      .banesco-actividad-fix td {
        background-color: transparent !important;
      }

      .banesco-actividad-fix .x-form-invalid-field,
      .banesco-actividad-fix .x-form-trigger-wrap-invalid {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        box-shadow: none !important;
      }

      .banesco-actividad-fix .x-form-invalid-under,
      .banesco-actividad-fix .x-form-error-msg {
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

      .x-boundlist,
      .x-boundlist-floating,
      .x-layer,
      .x-menu,
      .x-shadow {
        z-index: 9999999 !important;
      }

      /* Intento final para ocultar la barra gris */
      .banesco-force-hide,
      .x-panel-header,
      .x-window-header,
      .x-header,
      .x-toolbar,
      .x-docked,
      .x-panel-header-default,
      .x-panel-header-body,
      .x-panel-header-text-container {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
      }
    `;

    document.head.appendChild(style);
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
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

  function getExtComponentFromBlock(block) {
    if (!window.Ext || !Ext.ComponentManager) return null;

    var input = block.querySelector("input[id], .x-form-field[id]");
    if (!input) return null;

    var id = input.id;

    var cmp = Ext.getCmp(id);
    if (cmp) return cmp;

    if (id.indexOf("-inputEl") !== -1) {
      cmp = Ext.getCmp(id.replace("-inputEl", ""));
      if (cmp) return cmp;
    }

    var found = null;

    Ext.ComponentManager.each(function (key, component) {
      try {
        var label = normalize(component.fieldLabel || component.boxLabel || "");
        if (
          label.indexOf("actividad económica") !== -1 ||
          label.indexOf("actividad economica") !== -1
        ) {
          found = component;
        }
      } catch (e) {}
    });

    return found;
  }

  function fixActividad() {
    var blocks = findActividadBlocks();

    blocks.forEach(function (block) {
      block.classList.add("banesco-actividad-fix");
      block.classList.remove("banesco-hide");

      block.style.display = "";
      block.style.visibility = "visible";
      block.style.opacity = "1";
      block.style.pointerEvents = "auto";
      block.style.background = "transparent";

      var cmp = getExtComponentFromBlock(block);

      if (cmp) {
        try {
          cmp.show();
          cmp.setDisabled(false);
          cmp.setReadOnly(false);
          cmp.updateLayout && cmp.updateLayout();
        } catch (e) {}
      }

      block.onclick = function (event) {
        var target = event.target;

        if (
          target &&
          (
            target.tagName === "INPUT" ||
            target.tagName === "SELECT" ||
            target.className.indexOf("x-form-trigger") !== -1
          )
        ) {
          return;
        }

        var component = getExtComponentFromBlock(block);

        if (component) {
          try {
            component.focus();
            if (typeof component.expand === "function") {
              component.expand();
            }
          } catch (e) {}
        }
      };

      var triggers = block.querySelectorAll(".x-form-trigger, .x-form-arrow-trigger");

      Array.prototype.forEach.call(triggers, function (trigger) {
        trigger.onclick = function () {
          var component = getExtComponentFromBlock(block);

          if (component) {
            try {
              component.focus();
              if (typeof component.expand === "function") {
                component.expand();
              }
            } catch (e) {}
          }
        };
      });
    });
  }

  function hideGrayBar() {
    var candidates = Array.prototype.slice.call(
      document.querySelectorAll("div, section, header, table, tbody, tr, td")
    );

    candidates.forEach(function (el) {
      if (el.querySelector && el.querySelector("input, select, textarea")) return;

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

  function applyFinalFix() {
    injectFinalCSS();
    fixActividad();
    hideGrayBar();
  }

  loadBaseV8(function () {
    applyFinalFix();
    setTimeout(applyFinalFix, 500);
    setTimeout(applyFinalFix, 1200);
    setTimeout(applyFinalFix, 2500);
    setTimeout(applyFinalFix, 4000);
  });
})();
