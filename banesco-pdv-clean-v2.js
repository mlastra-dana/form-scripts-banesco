(function () {
  var tries = 0;
  var maxTries = 80;

  function injectStyles() {
    if (document.getElementById("banesco-pdv-clean-v2-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-clean-v2-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body {
        overflow-x: hidden !important;
      }

      .x-panel,
      .x-panel-body,
      .x-form,
      .x-container,
      .x-fit-item,
      .x-window,
      .x-window-body,
      form {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      .x-panel-header,
      .x-window-header,
      .x-header,
      .x-toolbar,
      .x-docked {
        display: none !important;
      }

      form,
      .x-panel-body {
        padding: 0 !important;
        margin: 0 !important;
      }

      .x-form-item {
        position: relative !important;
        margin: 0 0 14px 0 !important;
        padding-left: 24px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      .x-form-item-label,
      .x-form-cb-label,
      label {
        color: #8bbcaf !important;
        font-size: 11px !important;
        font-weight: 400 !important;
        line-height: 1.2 !important;
        margin-bottom: 3px !important;
        white-space: normal !important;
      }

      .x-form-required-field,
      .x-form-invalid-icon,
      .x-form-invalid-under,
      .x-form-error-msg {
        color: #d94b4b !important;
      }

      input[type="text"],
      input[type="email"],
      input[type="tel"],
      input[type="number"],
      select,
      textarea,
      .x-form-text,
      .x-form-field {
        width: 100% !important;
        height: 24px !important;
        min-height: 24px !important;
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #d6e5df !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 2px 4px !important;
        color: #4a4a4a !important;
        font-size: 12px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      textarea {
        min-height: 32px !important;
        resize: none !important;
      }

      .x-form-item-body,
      .x-form-field-wrap,
      .x-form-trigger-wrap,
      .x-form-trigger-input-cell {
        width: 100% !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      .x-form-trigger {
        background-color: transparent !important;
        border: none !important;
      }

      input::placeholder,
      textarea::placeholder {
        color: #9fc7bc !important;
        opacity: 1 !important;
      }

      .x-form-item::before {
        position: absolute !important;
        left: 0 !important;
        top: 18px !important;
        width: 16px !important;
        height: 16px !important;
        font-size: 14px !important;
        line-height: 16px !important;
        color: #8bc8b9 !important;
      }

      .banesco-icon-empresa::before {
        content: "▣";
      }

      .banesco-icon-persona::before {
        content: "♙";
      }

      .banesco-icon-documento::before {
        content: "▤";
      }

      .banesco-icon-telefono::before {
        content: "☎";
      }

      .banesco-icon-actividad::before {
        content: "⌕";
      }

      .banesco-icon-correo::before {
        content: "✉";
      }

      .banesco-icon-agencia::before,
      .banesco-icon-estado::before {
        content: "⌖";
      }

      .banesco-hide {
        display: none !important;
      }

      .banesco-form-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 28px !important;
        row-gap: 10px !important;
        width: 100% !important;
        background: transparent !important;
      }

      .banesco-full {
        grid-column: 1 / -1 !important;
      }

      .banesco-submit-wrap {
        grid-column: 1 / -1 !important;
        padding-left: 0 !important;
        margin-top: 8px !important;
      }

      input[type="submit"],
      button,
      .x-btn,
      .x-btn-button {
        background: #007a63 !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 18px !important;
        padding: 8px 18px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      @media screen and (max-width: 640px) {
        .banesco-form-grid {
          grid-template-columns: 1fr !important;
        }

        .banesco-full {
          grid-column: auto !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function getBlockText(block) {
    return cleanText(block.innerText || block.textContent || "");
  }

  function findFormContainer() {
    var form = document.querySelector("form");

    if (form && form.querySelectorAll("input, select, textarea").length >= 3) {
      return form;
    }

    var candidates = Array.prototype.slice.call(document.querySelectorAll("div"));
    var best = null;
    var bestCount = 0;

    candidates.forEach(function (el) {
      var count = el.querySelectorAll("input, select, textarea").length;
      if (count > bestCount) {
        best = el;
        bestCount = count;
      }
    });

    return bestCount >= 3 ? best : null;
  }

  function getFieldBlocks(container) {
    var blocks = Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });

    return blocks;
  }

  function classifyBlock(block) {
    var txt = getBlockText(block);

    if (txt.indexOf("empresa") !== -1) {
      block.classList.add("banesco-icon-empresa");
    } else if (txt.indexOf("persona") !== -1 || txt.indexOf("contacto") !== -1) {
      block.classList.add("banesco-icon-persona");
    } else if (
      txt.indexOf("documento") !== -1 ||
      txt.indexOf("rif") !== -1 ||
      txt.indexOf("identidad") !== -1 ||
      txt.indexOf("nacionalidad") !== -1
    ) {
      block.classList.add("banesco-icon-documento");
    } else if (
      txt.indexOf("telefono") !== -1 ||
      txt.indexOf("teléfono") !== -1 ||
      txt.indexOf("celular") !== -1
    ) {
      block.classList.add("banesco-icon-telefono");
    } else if (txt.indexOf("actividad") !== -1) {
      block.classList.add("banesco-icon-actividad");
    } else if (
      txt.indexOf("correo") !== -1 ||
      txt.indexOf("email") !== -1 ||
      txt.indexOf("mail") !== -1
    ) {
      block.classList.add("banesco-icon-correo");
    } else if (
      txt.indexOf("agencia") !== -1 ||
      txt.indexOf("estado") !== -1
    ) {
      block.classList.add("banesco-icon-agencia");
    }

    if (
      txt.indexOf("indícanos nombre de persona contacto") !== -1 ||
      txt.indexOf("indicanos nombre de persona contacto") !== -1 ||
      txt.indexOf("selecciona la agencia") !== -1
    ) {
      block.classList.add("banesco-full");
    }
  }

  function hideProductAndSetValue(block) {
    var txt = getBlockText(block);

    if (txt.indexOf("producto") === -1) {
      return false;
    }

    var field = block.querySelector("input, select, textarea");

    if (field) {
      field.value = "PuntoVenta";
      field.setAttribute("value", "PuntoVenta");
    }

    block.classList.add("banesco-hide");
    return true;
  }

  function hideExtraTexts(container) {
    var nodes = Array.prototype.slice.call(
      container.querySelectorAll("h1, h2, h3, h4, p, .x-panel-header, .x-window-header")
    );

    nodes.forEach(function (node) {
      var txt = cleanText(node.innerText || node.textContent || "");

      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("producto de nómina") !== -1 ||
        txt.indexOf("producto de nomina") !== -1 ||
        txt.indexOf("te gustaría que un ejecutivo") !== -1 ||
        txt.indexOf("te gustaria que un ejecutivo") !== -1
      ) {
        node.classList.add("banesco-hide");
      }
    });
  }

  function applyLayout(container) {
    if (container.querySelector(".banesco-form-grid")) return;

    var blocks = getFieldBlocks(container);

    if (!blocks.length) return;

    var grid = document.createElement("div");
    grid.className = "banesco-form-grid";

    blocks.forEach(function (block) {
      if (hideProductAndSetValue(block)) return;

      var txt = getBlockText(block);

      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("te gustaría que un ejecutivo") !== -1 ||
        txt.indexOf("te gustaria que un ejecutivo") !== -1
      ) {
        block.classList.add("banesco-hide");
        return;
      }

      classifyBlock(block);
      grid.appendChild(block);
    });

    var submit = container.querySelector('input[type="submit"], button[type="submit"], .x-btn');

    if (submit) {
      var submitWrap = document.createElement("div");
      submitWrap.className = "banesco-submit-wrap";
      submitWrap.appendChild(submit);
      grid.appendChild(submitWrap);
    }

    container.appendChild(grid);
  }

  function apply() {
    var container = findFormContainer();

    if (!container) return false;

    injectStyles();
    hideExtraTexts(container);
    applyLayout(container);

    console.log("Banesco PDV clean v2 aplicado.");
    return true;
  }

  function wait() {
    tries++;

    if (apply()) return;

    if (tries < maxTries) {
      setTimeout(wait, 250);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();
