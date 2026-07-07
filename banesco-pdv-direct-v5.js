(function () {
  var attempts = 0;
  var maxAttempts = 100;

  function injectCSS() {
    if (document.getElementById("banesco-pdv-direct-v5-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-direct-v5-css";

    style.innerHTML = `
      html,
      body {
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body,
      body *,
      .x-body,
      .x-panel,
      .x-panel-body,
      .x-form,
      .x-container,
      .x-window,
      .x-window-body,
      form {
        box-shadow: none !important;
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
        border: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
      }

      form,
      .x-panel,
      .x-panel-body,
      .x-form,
      .x-container {
        background: transparent !important;
        border: 0 !important;
      }

      .x-form-item,
      .x-field,
      .x-form-type-text,
      .x-form-type-radio,
      .x-form-type-combo {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .x-form-item-label,
      .x-form-cb-label,
      label {
        color: #8dbfb3 !important;
        font-size: 11px !important;
        line-height: 1.2 !important;
        font-weight: 400 !important;
        text-shadow: none !important;
      }

      .x-form-item-label *,
      label * {
        color: #8dbfb3 !important;
      }

      .x-form-required-field,
      .x-form-item-label .x-form-required-field {
        color: #e64b3c !important;
      }

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
        outline: none !important;
        color: #5f5f5f !important;
        font-size: 12px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        padding: 3px 2px 4px 2px !important;
      }

      .x-form-trigger-wrap,
      .x-form-field-wrap,
      .x-form-text-wrap,
      .x-form-trigger-input-cell,
      .x-form-item-body {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .x-form-trigger,
      .x-form-arrow-trigger {
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field-icon {
        position: absolute !important;
        left: 0 !important;
        top: 18px !important;
        width: 15px !important;
        height: 15px !important;
        color: #8dbfb3 !important;
        font-size: 14px !important;
        line-height: 15px !important;
        z-index: 2 !important;
        pointer-events: none !important;
      }

      .banesco-field-has-icon {
        position: relative !important;
        padding-left: 23px !important;
      }

      .banesco-submit-clean input,
      .banesco-submit-clean button,
      .banesco-submit-clean .x-btn,
      .banesco-submit-clean .x-btn-button,
      input[type="submit"],
      button[type="submit"] {
        background: #007a63 !important;
        background-image: none !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 22px !important;
        padding: 8px 20px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }

      .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
        text-shadow: none !important;
      }

      .banesco-hide {
        display: none !important;
      }
    `;

    document.head.appendChild(style);
  }

  function text(el) {
    return (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findFieldBlocks() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll(".x-form-item"));

    blocks = blocks.filter(function (block) {
      return block.querySelector("input, select, textarea");
    });

    if (blocks.length) return blocks;

    var fields = Array.prototype.slice.call(document.querySelectorAll("input, select, textarea"));

    return fields.map(function (field) {
      var current = field;

      while (current && current !== document.body) {
        if (current.classList && current.classList.contains("x-form-item")) {
          return current;
        }

        current = current.parentElement;
      }

      return field.parentElement;
    });
  }

  function iconFor(blockText) {
    if (blockText.indexOf("empresa") !== -1) return "▣";
    if (blockText.indexOf("persona") !== -1 || blockText.indexOf("contacto") !== -1) return "♙";
    if (blockText.indexOf("documento") !== -1 || blockText.indexOf("rif") !== -1 || blockText.indexOf("identidad") !== -1) return "▤";
    if (blockText.indexOf("teléfono") !== -1 || blockText.indexOf("telefono") !== -1 || blockText.indexOf("celular") !== -1) return "☎";
    if (blockText.indexOf("actividad") !== -1) return "⌕";
    if (blockText.indexOf("correo") !== -1 || blockText.indexOf("email") !== -1) return "✉";
    if (blockText.indexOf("agencia") !== -1 || blockText.indexOf("estado") !== -1) return "⌖";
    if (blockText.indexOf("nacionalidad") !== -1) return "▤";
    return "";
  }

  function cleanNativeContainers() {
    var selectors = [
      ".x-panel",
      ".x-panel-body",
      ".x-form",
      ".x-container",
      ".x-window",
      ".x-window-body",
      "form"
    ];

    selectors.forEach(function (selector) {
      Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
        el.style.background = "transparent";
        el.style.border = "0";
        el.style.boxShadow = "none";
      });
    });

    Array.prototype.forEach.call(
      document.querySelectorAll(".x-panel-header, .x-window-header, .x-header, .x-toolbar, .x-docked"),
      function (el) {
        el.classList.add("banesco-hide");
      }
    );
  }

  function styleFields() {
    var blocks = findFieldBlocks();

    if (!blocks.length) return false;

    blocks.forEach(function (block) {
      var blockText = text(block);

      if (blockText.indexOf("producto") !== -1) {
        var productField = block.querySelector("input, select, textarea");

        if (productField) {
          productField.value = "PuntoVenta";
          productField.setAttribute("value", "PuntoVenta");
        }

        block.classList.add("banesco-hide");
        return;
      }

      if (blockText === "text" || blockText.indexOf("text ") === 0) {
        block.classList.add("banesco-hide");
        return;
      }

      var icon = iconFor(blockText);

      if (icon && !block.querySelector(".banesco-field-icon")) {
        block.classList.add("banesco-field-has-icon");

        var span = document.createElement("span");
        span.className = "banesco-field-icon";
        span.textContent = icon;

        block.insertBefore(span, block.firstChild);
      }

      var labels = block.querySelectorAll(".x-form-item-label, .x-form-cb-label, label");

      Array.prototype.forEach.call(labels, function (label) {
        label.style.color = "#8dbfb3";
        label.style.fontSize = "11px";
        label.style.fontWeight = "400";
      });

      var fields = block.querySelectorAll("input, select, textarea, .x-form-text, .x-form-field");

      Array.prototype.forEach.call(fields, function (field) {
        field.style.background = "transparent";
        field.style.border = "0";
        field.style.borderBottom = "1px solid #d9e8e2";
        field.style.borderRadius = "0";
        field.style.boxShadow = "none";
        field.style.color = "#5f5f5f";
        field.style.fontSize = "12px";
      });
    });

    return true;
  }

  function cleanButtons() {
    Array.prototype.forEach.call(
      document.querySelectorAll('input[type="submit"], button[type="submit"], .x-btn'),
      function (btn) {
        btn.classList.add("banesco-submit-clean");
        btn.style.background = "#007a63";
        btn.style.border = "0";
        btn.style.borderRadius = "22px";
        btn.style.color = "#ffffff";
        btn.style.boxShadow = "none";
      }
    );
  }

  function apply() {
    injectCSS();
    cleanNativeContainers();

    var ok = styleFields();

    cleanButtons();

    if (ok) {
      console.log("Banesco PDV direct v5 aplicado correctamente.");
      return true;
    }

    return false;
  }

  function wait() {
    attempts++;

    if (apply()) return;

    if (attempts < maxAttempts) {
      setTimeout(wait, 200);
    } else {
      console.warn("No se pudo aplicar Banesco PDV direct v5.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }

  setTimeout(apply, 800);
  setTimeout(apply, 1600);
  setTimeout(apply, 3000);
})();
