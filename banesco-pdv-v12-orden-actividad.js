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

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-v12-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-v12-css";

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

      /* Card y grid */
      .banesco-popup-card {
        background: #ffffff !important;
        border-radius: 44px !important;
        padding: 42px 54px !important;
      }

      .banesco-popup-card form,
      .banesco-popup-card .x-form,
      .banesco-popup-card .x-panel-body {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 36px !important;
        row-gap: 18px !important;
        align-items: start !important;
      }

      .x-form-item {
        min-height: 48px !important;
      }

      .banesco-full-row {
        grid-column: 1 / -1 !important;
      }

      .banesco-hide {
        display: none !important;
      }

      /* Actividad Económica: sin fondo amarillo y con select propio */
      .banesco-actividad-fixed {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: transparent !important;
        min-height: 58px !important;
      }

      .banesco-actividad-fixed,
      .banesco-actividad-fixed div,
      .banesco-actividad-fixed td {
        background: transparent !important;
        background-color: transparent !important;
      }

      .banesco-actividad-fixed .x-form-trigger-wrap,
      .banesco-actividad-fixed .x-form-field-wrap,
      .banesco-actividad-fixed .x-form-item-body {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-activity-proxy {
        width: 100% !important;
        height: 30px !important;
        min-height: 30px !important;
        margin-top: 4px !important;
        padding: 3px 28px 4px 2px !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        border-radius: 0 !important;
        background: transparent !important;
        color: #666666 !important;
        font-size: 15px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        outline: none !important;
        box-shadow: none !important;
        cursor: pointer !important;
        appearance: auto !important;
        -webkit-appearance: menulist !important;
      }

      .banesco-activity-proxy:focus {
        border-bottom-color: #007a63 !important;
      }

      .banesco-activity-original-hidden {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Inputs con línea */
      .x-form-text,
      .x-form-field,
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      input[type="number"],
      textarea,
      select {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: #666666 !important;
      }

      /* Botón */
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

      /* Ocultar barra gris superior */
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
        overflow: hidden !important;
        visibility: hidden !important;
      }

      @media screen and (max-width: 768px) {
        .banesco-popup-card form,
        .banesco-popup-card .x-form,
        .banesco-popup-card .x-panel-body {
          grid-template-columns: 1fr !important;
        }

        .banesco-popup-card {
          padding: 28px 22px !important;
          border-radius: 28px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function getFieldBlocks() {
    return Array.prototype.slice.call(document.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });
  }

  function getOrder(block) {
    var txt = normalize(block.innerText || block.textContent || "");

    if (txt.indexOf("te gustaría") !== -1 || txt.indexOf("te gustaria") !== -1) return 10;
    if (txt.indexOf("empresa") !== -1) return 20;
    if (txt.indexOf("persona") !== -1 || txt.indexOf("contacto") !== -1) return 30;
    if (txt.indexOf("nacionalidad") !== -1) return 40;
    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) return 50;
    if (txt.indexOf("actividad") !== -1) return 60;
    if (txt.indexOf("teléfono") !== -1 || txt.indexOf("telefono") !== -1 || txt.indexOf("celular") !== -1) return 70;
    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1) return 80;
    if (txt.indexOf("estado") !== -1) return 90;
    if (txt.indexOf("selecciona la agencia") !== -1) return 100;

    return 999;
  }

  function applyOrder() {
    var blocks = getFieldBlocks();

    blocks.forEach(function (block) {
      var txt = normalize(block.innerText || block.textContent || "");
      var order = getOrder(block);

      block.style.order = String(order);

      if (
        txt.indexOf("persona") !== -1 ||
        txt.indexOf("contacto") !== -1 ||
        txt.indexOf("selecciona la agencia") !== -1
      ) {
        block.classList.add("banesco-full-row");
      }

      if (txt.indexOf("producto") !== -1) {
        var field = block.querySelector("input, select, textarea");
        if (field) {
          field.value = "PuntoVenta";
          field.setAttribute("value", "PuntoVenta");
        }
        block.classList.add("banesco-hide");
      }

      if (txt === "text" || txt.indexOf("text ") === 0) {
        block.classList.add("banesco-hide");
      }
    });
  }

  function findActividadBlock() {
    var blocks = getFieldBlocks();

    for (var i = 0; i < blocks.length; i++) {
      var txt = normalize(blocks[i].innerText || blocks[i].textContent || "");
      if (txt.indexOf("actividad económica") !== -1 || txt.indexOf("actividad economica") !== -1) {
        return blocks[i];
      }
    }

    return null;
  }

  function findActividadComponent() {
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

  function getOptionsFromComponent(cmp) {
    var options = [];

    if (!cmp || !cmp.getStore) return options;

    try {
      var store = cmp.getStore();
      var displayField = cmp.displayField || "text";
      var valueField = cmp.valueField || "value";

      store.each(function (record) {
        var display =
          record.get(displayField) ||
          record.get("text") ||
          record.get("label") ||
          record.get("name") ||
          record.get("descripcion") ||
          record.get("description");

        var value =
          record.get(valueField) ||
          record.get("value") ||
          record.get("id") ||
          display;

        if (display) {
          options.push({
            label: String(display),
            value: String(value)
          });
        }
      });
    } catch (e) {}

    return options;
  }

  function createActividadProxy() {
    var block = findActividadBlock();
    if (!block) return;

    block.classList.add("banesco-actividad-fixed");
    block.classList.remove("banesco-hide");
    block.style.order = "60";

    if (block.querySelector(".banesco-activity-proxy")) return;

    var cmp = findActividadComponent();
    var options = getOptionsFromComponent(cmp);

    var nativeSelect = document.createElement("select");
    nativeSelect.className = "banesco-activity-proxy";
    nativeSelect.innerHTML = '<option value="">Seleccione una opción</option>';

    options.forEach(function (opt) {
      var option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.label;
      nativeSelect.appendChild(option);
    });

    nativeSelect.addEventListener("change", function () {
      var value = nativeSelect.value;

      if (cmp) {
        try {
          cmp.setValue(value);
          cmp.validate && cmp.validate();
          cmp.fireEvent && cmp.fireEvent("change", cmp, value);
        } catch (e) {}
      }

      var inputs = block.querySelectorAll("input, select, textarea");
      Array.prototype.forEach.call(inputs, function (input) {
        if (!input.classList.contains("banesco-activity-proxy")) {
          input.value = value;
          input.setAttribute("value", value);
        }
      });
    });

    var originalControls = block.querySelectorAll(
      "input, select, textarea, .x-form-field, .x-form-text, .x-form-trigger-wrap"
    );

    Array.prototype.forEach.call(originalControls, function (el) {
      el.classList.add("banesco-activity-original-hidden");
    });

    var body =
      block.querySelector(".x-form-item-body") ||
      block.querySelector(".x-form-field-wrap") ||
      block;

    body.appendChild(nativeSelect);

    if (!options.length && cmp && typeof cmp.expand === "function") {
      nativeSelect.addEventListener("focus", function () {
        try {
          cmp.expand();
        } catch (e) {}
      });

      nativeSelect.addEventListener("click", function () {
        try {
          cmp.expand();
        } catch (e) {}
      });
    }
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

  function applyFixes() {
    injectCSS();
    applyOrder();
    createActividadProxy();
    hideGrayBar();
  }

  loadBaseV8(function () {
    applyFixes();
    setTimeout(applyFixes, 500);
    setTimeout(applyFixes, 1200);
    setTimeout(applyFixes, 2500);
    setTimeout(applyFixes, 4000);
  });
})();
