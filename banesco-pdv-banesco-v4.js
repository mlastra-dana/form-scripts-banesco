(function () {
  var tries = 0;
  var maxTries = 120;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectStyles() {
    if (document.getElementById("banesco-pdv-banesco-v4-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-banesco-v4-css";

    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
        overflow-x: hidden !important;
        color: #5b5b5b !important;
      }

      body, body > div, form,
      .x-panel, .x-panel-body, .x-form, .x-container,
      .x-fit-item, .x-window, .x-window-body, .x-border-box {
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
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
        border: 0 !important;
      }

      .banesco-root {
        width: 100% !important;
        max-width: 760px !important;
        margin: 0 auto !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 28px !important;
        row-gap: 12px !important;
        width: 100% !important;
        background: transparent !important;
      }

      .banesco-field {
        position: relative !important;
        margin: 0 !important;
        padding: 0 0 0 22px !important;
        width: 100% !important;
        min-width: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-full {
        grid-column: 1 / -1 !important;
      }

      .banesco-field label,
      .banesco-field .x-form-item-label,
      .banesco-field .x-form-cb-label {
        display: block !important;
        margin: 0 0 4px 0 !important;
        padding: 0 !important;
        color: #9CC5B8 !important;
        font-size: 11px !important;
        line-height: 1.15 !important;
        font-weight: 400 !important;
        white-space: normal !important;
        text-align: left !important;
      }

      .banesco-field .x-form-item-label span,
      .banesco-field label span {
        color: #9CC5B8 !important;
      }

      .banesco-field .x-form-item-body,
      .banesco-field .x-form-field-wrap,
      .banesco-field .x-form-trigger-wrap,
      .banesco-field .x-form-trigger-input-cell,
      .banesco-field .x-form-text-wrap {
        width: 100% !important;
        max-width: 100% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .banesco-field input[type="text"],
      .banesco-field input[type="email"],
      .banesco-field input[type="tel"],
      .banesco-field input[type="number"],
      .banesco-field input[type="password"],
      .banesco-field select,
      .banesco-field textarea,
      .banesco-field .x-form-text,
      .banesco-field .x-form-field {
        width: 100% !important;
        max-width: 100% !important;
        height: 22px !important;
        min-height: 22px !important;
        padding: 2px 2px 4px 2px !important;
        margin: 0 !important;
        background: transparent !important;
        border: 0 !important;
        border-bottom: 1px solid #DDE9E4 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        color: #7F7F7F !important;
        font-size: 12px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      .banesco-field textarea {
        resize: none !important;
        min-height: 28px !important;
      }

      .banesco-field input::placeholder,
      .banesco-field textarea::placeholder {
        color: #B7D3CB !important;
        opacity: 1 !important;
      }

      .banesco-field .x-form-trigger {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field .x-form-arrow-trigger,
      .banesco-field .x-form-trigger-wrap-default {
        background: transparent !important;
      }

      .banesco-field::before {
        position: absolute !important;
        left: 0 !important;
        top: 17px !important;
        width: 14px !important;
        height: 14px !important;
        font-size: 14px !important;
        line-height: 14px !important;
        color: #9CC5B8 !important;
      }

      .banesco-icon-empresa::before { content: "▣"; }
      .banesco-icon-persona::before { content: "👤"; font-size: 12px !important; }
      .banesco-icon-documento::before { content: "🪪"; font-size: 12px !important; }
      .banesco-icon-telefono::before { content: "✆"; font-size: 12px !important; }
      .banesco-icon-actividad::before { content: "⌕"; }
      .banesco-icon-correo::before { content: "✉"; font-size: 12px !important; }
      .banesco-icon-estado::before,
      .banesco-icon-agencia::before { content: "⌖"; }

      .banesco-radio {
        grid-column: 1 / -1 !important;
        display: flex !important;
        align-items: center !important;
        gap: 18px !important;
        margin: 0 0 2px 0 !important;
        padding: 0 !important;
      }

      .banesco-radio .x-form-item-label,
      .banesco-radio label {
        color: #2E2E2E !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        margin-right: 8px !important;
      }

      .banesco-radio input[type="radio"] {
        accent-color: #0A8A71 !important;
      }

      .banesco-submit-wrap {
        grid-column: 1 / -1 !important;
        margin-top: 8px !important;
        padding: 0 !important;
      }

      .banesco-submit-wrap input[type="submit"],
      .banesco-submit-wrap button,
      .banesco-submit-wrap .x-btn,
      .banesco-submit-wrap .x-btn-button {
        background: #0A8A71 !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 20px !important;
        padding: 8px 20px !important;
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
        color: #6B6B6B !important;
        font-size: 11px !important;
        line-height: 1.2 !important;
        margin-top: 4px !important;
      }

      .x-form-invalid-under em {
        font-style: italic !important;
      }

      @media screen and (max-width: 640px) {
        .banesco-grid {
          grid-template-columns: 1fr !important;
          row-gap: 12px !important;
        }

        .banesco-full {
          grid-column: auto !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function findContainer() {
    var form = document.querySelector("form");
    if (form && form.querySelectorAll("input, select, textarea").length >= 3) {
      return form;
    }

    var all = Array.prototype.slice.call(document.querySelectorAll("div"));
    var best = null;
    var count = 0;

    all.forEach(function (el) {
      var c = el.querySelectorAll("input, select, textarea").length;
      if (c > count) {
        best = el;
        count = c;
      }
    });

    return count >= 3 ? best : null;
  }

  function findPanel(container) {
    var current = container;
    while (current && current !== document.body) {
      if (
        current.classList &&
        (current.classList.contains("x-panel") || current.classList.contains("x-window"))
      ) {
        return current;
      }
      current = current.parentElement;
    }
    return container;
  }

  function getBlocks(container) {
    return Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });
  }

  function classify(block) {
    var txt = normalize(block.innerText || block.textContent || "");
    block.classList.add("banesco-field");

    if (txt.indexOf("empresa") !== -1) {
      block.classList.add("banesco-icon-empresa");
      block.setAttribute("data-order", "10");
      return;
    }

    if (txt.indexOf("persona") !== -1 || txt.indexOf("contacto") !== -1) {
      block.classList.add("banesco-icon-persona");
      block.classList.add("banesco-full");
      block.setAttribute("data-order", "20");
      return;
    }

    if (txt.indexOf("nacionalidad") !== -1) {
      block.classList.add("banesco-icon-documento");
      block.setAttribute("data-order", "30");
      return;
    }

    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) {
      block.classList.add("banesco-icon-documento");
      block.setAttribute("data-order", "40");
      return;
    }

    if (txt.indexOf("actividad") !== -1) {
      block.classList.add("banesco-icon-actividad");
      block.setAttribute("data-order", "50");
      return;
    }

    if (txt.indexOf("teléfono") !== -1 || txt.indexOf("telefono") !== -1 || txt.indexOf("celular") !== -1) {
      block.classList.add("banesco-icon-telefono");
      block.setAttribute("data-order", "60");
      return;
    }

    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1 || txt.indexOf("mail") !== -1) {
      block.classList.add("banesco-icon-correo");
      block.setAttribute("data-order", "70");
      return;
    }

    if (txt.indexOf("estado") !== -1) {
      block.classList.add("banesco-icon-estado");
      block.classList.add("banesco-full");
      block.setAttribute("data-order", "80");
      return;
    }

    if (txt.indexOf("agencia") !== -1) {
      block.classList.add("banesco-icon-agencia");
      block.classList.add("banesco-full");
      block.setAttribute("data-order", "90");
      return;
    }

    block.setAttribute("data-order", "999");
  }

  function isRadio(block) {
    return block.querySelectorAll('input[type="radio"]').length > 0;
  }

  function hideTechnicalFields(block) {
    var txt = normalize(block.innerText || block.textContent || "");

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

  function cleanDecorativeText(panel) {
    var nodes = panel.querySelectorAll("h1, h2, h3, h4, p");
    Array.prototype.forEach.call(nodes, function (node) {
      var txt = normalize(node.innerText || node.textContent || "");
      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("producto de nómina") !== -1 ||
        txt.indexOf("producto de nomina") !== -1
      ) {
        node.classList.add("banesco-hide");
      }
    });
  }

  function buildLayout(container) {
    if (container.querySelector(".banesco-grid")) return true;

    var blocks = getBlocks(container);
    if (!blocks.length) return false;

    var grid = document.createElement("div");
    grid.className = "banesco-grid";

    var radioBlocks = [];
    var fieldBlocks = [];

    blocks.forEach(function (block) {
      if (hideTechnicalFields(block)) return;

      if (isRadio(block)) {
        block.classList.add("banesco-radio");
        radioBlocks.push(block);
        return;
      }

      classify(block);
      fieldBlocks.push(block);
    });

    fieldBlocks.sort(function (a, b) {
      return parseInt(a.getAttribute("data-order") || "999", 10) - parseInt(b.getAttribute("data-order") || "999", 10);
    });

    radioBlocks.forEach(function (block) {
      grid.appendChild(block);
    });

    fieldBlocks.forEach(function (block) {
      grid.appendChild(block);
    });

    var submit = container.querySelector('input[type="submit"], button[type="submit"], .x-btn');
    if (submit) {
      var wrap = document.createElement("div");
      wrap.className = "banesco-submit-wrap";
      wrap.appendChild(submit);
      grid.appendChild(wrap);
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
    panel.classList.add("banesco-root");
    container.classList.add("banesco-root");

    cleanDecorativeText(panel);

    var ok = buildLayout(container);
    if (!ok) return false;

    applied = true;
    console.log("Banesco PDV v4 aplicado correctamente");
    return true;
  }

  function wait() {
    tries++;
    if (apply()) return;
    if (tries < maxTries) {
      setTimeout(wait, 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();
