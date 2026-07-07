(function () {
  var applied = false;
  var tries = 0;
  var maxTries = 80;

  function injectStyles() {
    if (document.getElementById("banesco-pdv-fields-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-fields-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        overflow: hidden !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body > * {
        background: transparent !important;
      }

      .x-panel,
      .x-panel-body,
      .x-form,
      .x-border-box,
      .x-container,
      .x-window,
      .x-window-body,
      .x-fit-item,
      form {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .x-panel-header,
      .x-window-header,
      .x-toolbar,
      .x-docked,
      .x-panel-header-default,
      .x-header {
        display: none !important;
      }

      .banesco-form-clean {
        width: 100% !important;
        max-width: 100% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 26px !important;
        row-gap: 18px !important;
        width: 100% !important;
        align-items: end !important;
        background: transparent !important;
      }

      .banesco-field {
        position: relative !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 0 0 22px !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field.banesco-full {
        grid-column: 1 / -1 !important;
      }

      .banesco-field label,
      .banesco-field .x-form-item-label,
      .banesco-field .x-form-cb-label {
        display: block !important;
        font-size: 11px !important;
        line-height: 1.2 !important;
        font-weight: 400 !important;
        color: #8fb8ad !important;
        margin: 0 0 4px 0 !important;
        padding: 0 !important;
        white-space: normal !important;
      }

      .banesco-field input[type="text"],
      .banesco-field input[type="email"],
      .banesco-field input[type="tel"],
      .banesco-field input[type="number"],
      .banesco-field select,
      .banesco-field textarea,
      .banesco-field .x-form-text,
      .banesco-field .x-form-field {
        width: 100% !important;
        height: 26px !important;
        min-height: 26px !important;
        background: transparent !important;
        border: 0 !important;
        border-bottom: 1px solid #d7e4df !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 3px 2px !important;
        font-size: 12px !important;
        color: #333333 !important;
      }

      .banesco-field textarea {
        min-height: 32px !important;
        resize: none !important;
      }

      .banesco-field .x-form-item-body,
      .banesco-field .x-form-field-wrap,
      .banesco-field .x-form-trigger-wrap,
      .banesco-field .x-form-trigger-input-cell {
        width: 100% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field .x-form-trigger {
        background-color: transparent !important;
        border: 0 !important;
      }

      .banesco-submit {
        grid-column: 1 / -1 !important;
        margin-top: 10px !important;
        text-align: left !important;
      }

      .banesco-submit input[type="submit"],
      .banesco-submit button,
      .banesco-submit .x-btn,
      .banesco-submit .x-btn-button {
        background: #007a63 !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 18px !important;
        padding: 8px 18px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      .banesco-icon::before {
        position: absolute !important;
        left: 0 !important;
        top: 16px !important;
        width: 16px !important;
        height: 16px !important;
        color: #8bc8b9 !important;
        font-size: 15px !important;
        line-height: 16px !important;
      }

      .icon-empresa::before {
        content: "🏢";
      }

      .icon-persona::before {
        content: "👤";
      }

      .icon-documento::before {
        content: "🪪";
      }

      .icon-telefono::before {
        content: "📞";
      }

      .icon-actividad::before {
        content: "🔎";
      }

      .icon-correo::before {
        content: "✉️";
      }

      .icon-agencia::before,
      .icon-estado::before {
        content: "📍";
      }

      .banesco-hidden {
        display: none !important;
      }

      @media screen and (max-width: 640px) {
        body {
          overflow: auto !important;
        }

        .banesco-grid {
          grid-template-columns: 1fr !important;
        }

        .banesco-field.banesco-full {
          grid-column: auto !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function getText(el) {
    return (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findMainContainer() {
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

  function findFieldBlock(field) {
    var current = field;

    while (current && current !== document.body) {
      if (
        current.classList &&
        (
          current.classList.contains("x-form-item") ||
          current.classList.contains("form-group") ||
          current.classList.contains("field")
        )
      ) {
        return current;
      }

      current = current.parentElement;
    }

    return field.parentElement || field;
  }

  function uniqueBlocks(blocks) {
    var result = [];

    blocks.forEach(function (block) {
      if (block && result.indexOf(block) === -1) {
        result.push(block);
      }
    });

    return result;
  }

  function getBlocks(container) {
    var blocks = Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });

    if (blocks.length > 0) {
      return blocks;
    }

    var fields = Array.prototype.slice.call(container.querySelectorAll("input, select, textarea"));
    return uniqueBlocks(fields.map(findFieldBlock));
  }

  function classifyField(block) {
    var txt = getText(block);

    block.classList.add("banesco-field");
    block.classList.add("banesco-icon");

    if (txt.indexOf("empresa") !== -1) {
      block.classList.add("icon-empresa");
      return "empresa";
    }

    if (txt.indexOf("persona") !== -1 || txt.indexOf("contacto") !== -1) {
      block.classList.add("icon-persona");
      return "persona";
    }

    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1 || txt.indexOf("nacionalidad") !== -1) {
      block.classList.add("icon-documento");
      return "documento";
    }

    if (txt.indexOf("teléfono") !== -1 || txt.indexOf("telefono") !== -1 || txt.indexOf("celular") !== -1) {
      block.classList.add("icon-telefono");
      return "telefono";
    }

    if (txt.indexOf("actividad") !== -1) {
      block.classList.add("icon-actividad");
      return "actividad";
    }

    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1 || txt.indexOf("mail") !== -1) {
      block.classList.add("icon-correo");
      return "correo";
    }

    if (txt.indexOf("agencia") !== -1 || txt.indexOf("estado") !== -1) {
      block.classList.add("icon-agencia");
      return "agencia";
    }

    return "otro";
  }

  function hideUnwanted(container) {
    var all = Array.prototype.slice.call(container.querySelectorAll("h1, h2, h3, h4, p, .x-panel-header, .x-window-header"));

    all.forEach(function (el) {
      var txt = getText(el);

      if (
        txt.indexOf("nos acercamos a ti") !== -1 ||
        txt.indexOf("producto de nómina") !== -1 ||
        txt.indexOf("producto de nomina") !== -1 ||
        txt.indexOf("te gustaría que un ejecutivo") !== -1 ||
        txt.indexOf("te gustaria que un ejecutivo") !== -1
      ) {
        el.classList.add("banesco-hidden");
      }
    });
  }

  function hideProduct(block) {
    var txt = getText(block);

    if (txt.indexOf("producto") === -1) {
      return false;
    }

    var input = block.querySelector("input, select, textarea");

    if (input) {
      input.value = "PuntoVenta";
      input.setAttribute("value", "PuntoVenta");
    }

    block.classList.add("banesco-hidden");
    return true;
  }

  function apply() {
    if (applied) return true;

    var container = findMainContainer();

    if (!container) {
      return false;
    }

    injectStyles();

    container.classList.add("banesco-form-clean");

    hideUnwanted(container);

    var blocks = getBlocks(container);
    var visibleBlocks = [];

    blocks.forEach(function (block) {
      if (!block) return;

      if (hideProduct(block)) return;

      var txt = getText(block);

      if (
        txt.indexOf("nos acercamos a ti") !== -1 ||
        txt.indexOf("te gustaría que un ejecutivo") !== -1 ||
        txt.indexOf("te gustaria que un ejecutivo") !== -1
      ) {
        block.classList.add("banesco-hidden");
        return;
      }

      classifyField(block);
      visibleBlocks.push(block);
    });

    var grid = document.createElement("div");
    grid.className = "banesco-grid";

    visibleBlocks.forEach(function (block) {
      grid.appendChild(block);
    });

    var submitButtons = Array.prototype.slice.call(container.querySelectorAll('input[type="submit"], button, .x-btn'))
      .filter(function (btn) {
        return !btn.closest(".banesco-hidden");
      });

    if (submitButtons.length > 0) {
      var submitWrap = document.createElement("div");
      submitWrap.className = "banesco-submit";

      submitButtons.forEach(function (btn) {
        submitWrap.appendChild(btn);
      });

      grid.appendChild(submitWrap);
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(grid);

    applied = true;
    console.log("Banesco PuntoVenta fields loaded");
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
