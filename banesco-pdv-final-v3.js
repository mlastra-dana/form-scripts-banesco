(function () {
  var tries = 0;
  var maxTries = 100;
  var applied = false;

  function injectStyles() {
    if (document.getElementById("banesco-pdv-final-v3-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-final-v3-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
        overflow-x: hidden !important;
      }

      body {
        min-width: 0 !important;
      }

      body > div,
      form,
      .x-panel,
      .x-panel-body,
      .x-form,
      .x-container,
      .x-fit-item,
      .x-window,
      .x-window-body,
      .x-border-box {
        background: transparent !important;
        border: 0 !important;
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
        overflow: hidden !important;
        padding: 0 !important;
        margin: 0 !important;
        border: 0 !important;
      }

      .banesco-pdv-root {
        width: 100% !important;
        max-width: 760px !important;
        margin: 0 auto !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-pdv-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 28px !important;
        row-gap: 16px !important;
        width: 100% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-pdv-field {
        position: relative !important;
        width: 100% !important;
        min-width: 0 !important;
        margin: 0 !important;
        padding: 0 0 0 22px !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-pdv-field.banesco-full {
        grid-column: 1 / -1 !important;
      }

      .banesco-pdv-field label,
      .banesco-pdv-field .x-form-item-label,
      .banesco-pdv-field .x-form-cb-label {
        display: block !important;
        width: auto !important;
        color: #8abfaf !important;
        font-size: 11px !important;
        font-weight: 400 !important;
        line-height: 1.15 !important;
        margin: 0 0 4px 0 !important;
        padding: 0 !important;
        white-space: normal !important;
        text-align: left !important;
      }

      .banesco-pdv-field .x-form-item-body,
      .banesco-pdv-field .x-form-field-wrap,
      .banesco-pdv-field .x-form-trigger-wrap,
      .banesco-pdv-field .x-form-trigger-input-cell,
      .banesco-pdv-field .x-form-text-wrap {
        width: 100% !important;
        max-width: 100% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .banesco-pdv-field input[type="text"],
      .banesco-pdv-field input[type="email"],
      .banesco-pdv-field input[type="tel"],
      .banesco-pdv-field input[type="number"],
      .banesco-pdv-field select,
      .banesco-pdv-field textarea,
      .banesco-pdv-field .x-form-text,
      .banesco-pdv-field .x-form-field {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        height: 24px !important;
        min-height: 24px !important;
        background: transparent !important;
        border: 0 !important;
        border-bottom: 1px solid #d4e5df !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 2px 2px 4px 2px !important;
        margin: 0 !important;
        color: #3f3f3f !important;
        font-size: 12px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      .banesco-pdv-field textarea {
        resize: none !important;
        min-height: 30px !important;
      }

      .banesco-pdv-field .x-form-trigger {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-pdv-field input::placeholder,
      .banesco-pdv-field textarea::placeholder {
        color: #94bfb5 !important;
        opacity: 1 !important;
      }

      .banesco-pdv-field::before {
        position: absolute !important;
        left: 0 !important;
        top: 18px !important;
        width: 15px !important;
        height: 15px !important;
        color: #8bc8b9 !important;
        font-size: 15px !important;
        line-height: 15px !important;
        font-weight: normal !important;
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

      .banesco-pdv-radio {
        grid-column: 1 / -1 !important;
        display: flex !important;
        align-items: center !important;
        gap: 28px !important;
        padding: 0 !important;
        margin: 0 0 4px 0 !important;
        color: #333333 !important;
        font-size: 13px !important;
        font-weight: 600 !important;
      }

      .banesco-pdv-radio .x-form-cb-label,
      .banesco-pdv-radio label {
        color: #8abfaf !important;
        font-size: 12px !important;
        font-weight: 400 !important;
      }

      .banesco-submit-wrap {
        grid-column: 1 / -1 !important;
        padding: 4px 0 0 0 !important;
        margin: 0 !important;
      }

      .banesco-submit-wrap input[type="submit"],
      .banesco-submit-wrap button,
      .banesco-submit-wrap .x-btn,
      .banesco-submit-wrap .x-btn-button {
        background: #007a63 !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 20px !important;
        padding: 8px 22px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      .banesco-submit-wrap .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      .banesco-hide {
        display: none !important;
      }

      .x-form-invalid-under,
      .x-form-error-msg {
        color: #333333 !important;
        font-size: 11px !important;
        line-height: 1.2 !important;
        margin-top: 4px !important;
      }

      .x-form-invalid-under em {
        font-style: italic !important;
      }

      @media screen and (max-width: 640px) {
        .banesco-pdv-root {
          max-width: 100% !important;
        }

        .banesco-pdv-grid {
          grid-template-columns: 1fr !important;
          row-gap: 14px !important;
        }

        .banesco-pdv-field.banesco-full {
          grid-column: auto !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function normalizeText(value) {
    return (value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function blockText(el) {
    return normalizeText(el.innerText || el.textContent || "");
  }

  function findContainer() {
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

  function findPanel(container) {
    var current = container;

    while (current && current !== document.body) {
      if (
        current.classList &&
        (
          current.classList.contains("x-panel") ||
          current.classList.contains("x-window")
        )
      ) {
        return current;
      }

      current = current.parentElement;
    }

    return container;
  }

  function getFieldBlocks(container) {
    var blocks = Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });

    return blocks;
  }

  function classify(block) {
    var txt = blockText(block);

    block.classList.add("banesco-pdv-field");

    if (txt.indexOf("empresa") !== -1) {
      block.classList.add("banesco-icon-empresa");
      block.setAttribute("data-banesco-order", "10");
      return;
    }

    if (txt.indexOf("persona") !== -1 || txt.indexOf("contacto") !== -1) {
      block.classList.add("banesco-icon-persona");
      block.setAttribute("data-banesco-order", "20");
      return;
    }

    if (txt.indexOf("nacionalidad") !== -1) {
      block.classList.add("banesco-icon-documento");
      block.setAttribute("data-banesco-order", "30");
      return;
    }

    if (
      txt.indexOf("documento") !== -1 ||
      txt.indexOf("rif") !== -1 ||
      txt.indexOf("identidad") !== -1
    ) {
      block.classList.add("banesco-icon-documento");
      block.setAttribute("data-banesco-order", "40");
      return;
    }

    if (
      txt.indexOf("teléfono") !== -1 ||
      txt.indexOf("telefono") !== -1 ||
      txt.indexOf("celular") !== -1
    ) {
      block.classList.add("banesco-icon-telefono");
      block.setAttribute("data-banesco-order", "50");
      return;
    }

    if (txt.indexOf("actividad") !== -1) {
      block.classList.add("banesco-icon-actividad");
      block.setAttribute("data-banesco-order", "60");
      return;
    }

    if (
      txt.indexOf("correo") !== -1 ||
      txt.indexOf("email") !== -1 ||
      txt.indexOf("mail") !== -1
    ) {
      block.classList.add("banesco-icon-correo");
      block.setAttribute("data-banesco-order", "70");
      return;
    }

    if (txt.indexOf("estado") !== -1) {
      block.classList.add("banesco-icon-estado");
      block.setAttribute("data-banesco-order", "80");
      return;
    }

    if (txt.indexOf("agencia") !== -1) {
      block.classList.add("banesco-icon-agencia");
      block.setAttribute("data-banesco-order", "90");
      return;
    }

    block.setAttribute("data-banesco-order", "999");
  }

  function isRadioBlock(block) {
    var radios = block.querySelectorAll('input[type="radio"]');
    return radios && radios.length > 0;
  }

  function hideProductOrText(block) {
    var txt = blockText(block);

    if (txt.indexOf("producto") !== -1) {
      var field = block.querySelector("input, select, textarea");

      if (field) {
        field.value = "PuntoVenta";
        field.setAttribute("value", "PuntoVenta");
      }

      block.classList.add("banesco-hide");
      return true;
    }

    if (txt === "text" || txt.indexOf("text") === 0) {
      block.classList.add("banesco-hide");
      return true;
    }

    return false;
  }

  function hideDecorativeText(root) {
    var nodes = Array.prototype.slice.call(
      root.querySelectorAll("h1, h2, h3, h4, p, .x-panel-header, .x-window-header")
    );

    nodes.forEach(function (node) {
      var txt = normalizeText(node.innerText || node.textContent || "");

      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("producto de nómina") !== -1 ||
        txt.indexOf("producto de nomina") !== -1
      ) {
        node.classList.add("banesco-hide");
      }
    });
  }

  function cleanPanel(panel) {
    panel.classList.add("banesco-pdv-root");

    panel.style.background = "transparent";
    panel.style.border = "0";
    panel.style.boxShadow = "none";
    panel.style.padding = "0";
    panel.style.margin = "0 auto";
    panel.style.width = "100%";
    panel.style.maxWidth = "760px";

    var headers = panel.querySelectorAll(".x-panel-header, .x-window-header, .x-header, .x-toolbar, .x-docked");

    Array.prototype.forEach.call(headers, function (header) {
      header.classList.add("banesco-hide");
    });
  }

  function buildGrid(container) {
    if (container.querySelector(".banesco-pdv-grid")) return true;

    var blocks = getFieldBlocks(container);

    if (!blocks.length) return false;

    var grid = document.createElement("div");
    grid.className = "banesco-pdv-grid";

    var radioBlocks = [];
    var fieldBlocks = [];

    blocks.forEach(function (block) {
      if (hideProductOrText(block)) return;

      if (isRadioBlock(block)) {
        block.classList.add("banesco-pdv-radio");
        radioBlocks.push(block);
        return;
      }

      classify(block);
      fieldBlocks.push(block);
    });

    fieldBlocks.sort(function (a, b) {
      var oa = parseInt(a.getAttribute("data-banesco-order") || "999", 10);
      var ob = parseInt(b.getAttribute("data-banesco-order") || "999", 10);
      return oa - ob;
    });

    radioBlocks.forEach(function (block) {
      grid.appendChild(block);
    });

    fieldBlocks.forEach(function (block) {
      grid.appendChild(block);
    });

    var submit = container.querySelector('input[type="submit"], button[type="submit"], .x-btn');

    if (submit) {
      var submitWrap = document.createElement("div");
      submitWrap.className = "banesco-submit-wrap";
      submitWrap.appendChild(submit);
      grid.appendChild(submitWrap);
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(grid);
    return true;
  }

  function apply() {
    if (applied) return true;

    var container = findContainer();

    if (!container) return false;

    injectStyles();

    var panel = findPanel(container);

    cleanPanel(panel);
    hideDecorativeText(panel);

    container.classList.add("banesco-pdv-root");

    var ok = buildGrid(container);

    if (!ok) return false;

    applied = true;
    console.log("Banesco PDV final v3 aplicado correctamente.");
    return true;
  }

  function wait() {
    tries++;

    if (apply()) return;

    if (tries < maxTries) {
      setTimeout(wait, 200);
    } else {
      console.warn("No se pudo aplicar Banesco PDV final v3.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();
