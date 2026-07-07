(function () {
  var attempts = 0;
  var maxAttempts = 140;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-final-v22-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-final-v22-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body,
      form,
      .x-panel,
      .x-panel-body,
      .x-form,
      .x-container,
      .x-window,
      .x-window-body {
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
      .x-panel-header-text-container,
      .x-toolbar-default,
      .x-toolbar-text,
      .banesco-force-hide {
        display: none !important;
        height: 0 !important;
        min-height: 0 !important;
        max-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
      }

      .banesco-shell {
        width: 100% !important;
        max-width: 900px !important;
        margin: 24px auto !important;
        padding: 0 10px !important;
        box-sizing: border-box !important;
      }

      .banesco-card {
        position: relative !important;
        background: #ffffff !important;
        border-radius: 44px !important;
        padding: 56px 54px 42px 54px !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05) !important;
        border: 0 !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      /* Máscara para tapar cualquier barra gris interna superior */
      .banesco-card::before {
        content: "" !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 54px !important;
        background: #ffffff !important;
        z-index: 1 !important;
        pointer-events: none !important;
      }

      .banesco-form-root {
        position: relative !important;
        z-index: 2 !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-title {
        color: #007a63 !important;
        font-size: 34px !important;
        line-height: 1.15 !important;
        font-weight: 600 !important;
        margin: 0 0 12px 0 !important;
        padding: 0 0 16px 0 !important;
        border-bottom: 1px dotted #d8d8d8 !important;
      }

      .banesco-intro {
        color: #3f3f3f !important;
        font-size: 18px !important;
        line-height: 1.35 !important;
        font-weight: 400 !important;
        margin: 0 0 18px 0 !important;
      }

      .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 36px !important;
        row-gap: 18px !important;
        align-items: start !important;
        width: 100% !important;
      }

      .banesco-question-row {
        grid-column: 1 / -1 !important;
        order: 1 !important;
      }

      .banesco-question-text {
        color: #3f3f3f !important;
        font-size: 17px !important;
        line-height: 1.25 !important;
        font-weight: 700 !important;
        margin: 0 0 10px 0 !important;
      }

      .banesco-radio-wrapper {
        display: flex !important;
        align-items: center !important;
        gap: 120px !important;
      }

      .banesco-radio-wrapper .x-form-item {
        margin: 0 !important;
        min-height: auto !important;
      }

      .banesco-radio-wrapper label,
      .banesco-radio-wrapper .x-form-cb-label,
      .x-form-cb-label {
        color: #007a63 !important;
        font-size: 16px !important;
        line-height: 1.2 !important;
        font-weight: 700 !important;
      }

      input[type="radio"] {
        accent-color: #007a63 !important;
      }

      .banesco-field {
        margin: 0 !important;
        padding: 0 !important;
        min-height: 54px !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field-empresa {
        order: 10 !important;
        grid-column: 1 / 2 !important;
      }

      .banesco-field-actividad {
        order: 20 !important;
        grid-column: 2 / 3 !important;
      }

      .banesco-field-nacionalidad {
        order: 30 !important;
        grid-column: 1 / 2 !important;
      }

      .banesco-field-documento {
        order: 40 !important;
        grid-column: 2 / 3 !important;
      }

      .banesco-field-persona {
        order: 50 !important;
        grid-column: 1 / -1 !important;
      }

      .banesco-field-correo {
        order: 60 !important;
        grid-column: 1 / 2 !important;
      }

      .banesco-field-telefono {
        order: 70 !important;
        grid-column: 2 / 3 !important;
      }

      .banesco-field-estado {
        order: 80 !important;
        grid-column: 1 / 2 !important;
      }

      .banesco-field-agencia {
        order: 90 !important;
        grid-column: 1 / -1 !important;
      }

      .banesco-submit-wrap {
        order: 100 !important;
        grid-column: 1 / -1 !important;
        margin-top: 12px !important;
      }

      .banesco-field .x-form-item-label,
      .banesco-field label,
      .x-form-item-label,
      label {
        color: #007a63 !important;
        font-size: 16px !important;
        line-height: 1.15 !important;
        font-weight: 700 !important;
        margin: 0 0 7px 0 !important;
        padding: 0 !important;
        white-space: normal !important;
        text-align: left !important;
      }

      .banesco-field .x-form-item-label *,
      .banesco-field label *,
      .x-form-item-label *,
      label * {
        color: #007a63 !important;
        font-weight: 700 !important;
      }

      .x-form-required-field {
        color: #f04a3a !important;
      }

      /*
        No se fuerzan display/visibility/position/pointer-events
        en wrappers internos de ExtJS para no romper selects.
      */
      .banesco-field .x-form-item-body,
      .banesco-field .x-form-field-wrap,
      .banesco-field .x-form-trigger-wrap,
      .banesco-field .x-form-trigger-input-cell,
      .banesco-field .x-form-text-wrap {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field input[type="text"],
      .banesco-field input[type="email"],
      .banesco-field input[type="tel"],
      .banesco-field input[type="number"],
      .banesco-field select,
      .banesco-field textarea,
      .banesco-field .x-form-text,
      .banesco-field .x-form-field {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-bottom: 1px solid #d9e8e2 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        color: #5f5f5f !important;
        font-size: 16px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        padding: 4px 2px 6px 2px !important;
      }

      .banesco-field .x-form-trigger,
      .banesco-field .x-form-arrow-trigger {
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      .banesco-hidden {
        display: none !important;
      }

      .banesco-submit-wrap input[type="submit"],
      .banesco-submit-wrap button,
      .banesco-submit-wrap .x-btn,
      .banesco-submit-wrap .x-btn-button,
      input[type="submit"],
      button[type="submit"] {
        background: #007a63 !important;
        background-image: none !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 22px !important;
        padding: 10px 26px !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        text-shadow: none !important;
        cursor: pointer !important;
      }

      .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
        text-shadow: none !important;
      }

      .x-form-invalid-under,
      .x-form-error-msg {
        position: static !important;
        display: block !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        color: #d93025 !important;
        font-size: 12px !important;
        line-height: 1.25 !important;
        font-weight: 600 !important;
        padding: 4px 0 0 0 !important;
        margin: 2px 0 0 0 !important;
      }

      .x-boundlist,
      .x-boundlist-floating,
      .x-layer,
      .x-menu,
      .x-shadow {
        z-index: 9999999 !important;
      }

      @media screen and (max-width: 768px) {
        .banesco-card {
          border-radius: 28px !important;
          padding: 48px 22px 28px 22px !important;
        }

        .banesco-grid {
          grid-template-columns: 1fr !important;
        }

        .banesco-field-empresa,
        .banesco-field-actividad,
        .banesco-field-nacionalidad,
        .banesco-field-documento,
        .banesco-field-persona,
        .banesco-field-correo,
        .banesco-field-telefono,
        .banesco-field-estado,
        .banesco-field-agencia {
          grid-column: 1 / -1 !important;
        }

        .banesco-radio-wrapper {
          gap: 34px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function findFormContainer() {
    var forms = Array.prototype.slice.call(document.querySelectorAll("form"));
    var bestForm = null;
    var bestCount = 0;

    forms.forEach(function (form) {
      var count = form.querySelectorAll("input, select, textarea").length;
      if (count > bestCount) {
        bestForm = form;
        bestCount = count;
      }
    });

    if (bestForm && bestCount >= 3) return bestForm;

    var candidates = Array.prototype.slice.call(document.querySelectorAll("div"));
    var best = null;
    var max = 0;

    candidates.forEach(function (el) {
      var count = el.querySelectorAll("input, select, textarea").length;
      if (count > max) {
        best = el;
        max = count;
      }
    });

    return max >= 3 ? best : null;
  }

  function getFieldBlocks(container) {
    return Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });
  }

  function isRadioBlock(block) {
    return block.querySelectorAll('input[type="radio"]').length > 0;
  }

  function classify(block) {
    var txt = normalize(block.innerText || block.textContent || "");

    block.classList.add("banesco-field");

    if (txt.indexOf("empresa") !== -1) {
      block.classList.add("banesco-field-empresa");
      return;
    }

    if (txt.indexOf("actividad económica") !== -1 || txt.indexOf("actividad economica") !== -1) {
      block.classList.add("banesco-field-actividad");
      return;
    }

    if (txt.indexOf("nacionalidad") !== -1) {
      block.classList.add("banesco-field-nacionalidad");
      return;
    }

    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) {
      block.classList.add("banesco-field-documento");
      return;
    }

    if (
      txt.indexOf("indícanos nombre de persona contacto") !== -1 ||
      txt.indexOf("indicanos nombre de persona contacto") !== -1 ||
      txt.indexOf("nombre de persona contacto") !== -1
    ) {
      block.classList.add("banesco-field-persona");
      return;
    }

    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1) {
      block.classList.add("banesco-field-correo");
      return;
    }

    if (txt.indexOf("teléfono") !== -1 || txt.indexOf("telefono") !== -1 || txt.indexOf("celular") !== -1) {
      block.classList.add("banesco-field-telefono");
      return;
    }

    if (txt.indexOf("estado") !== -1) {
      block.classList.add("banesco-field-estado");
      return;
    }

    if (txt.indexOf("selecciona la agencia") !== -1 || txt.indexOf("agencia") !== -1) {
      block.classList.add("banesco-field-agencia");
    }
  }

  function hideProductOrTechnical(block) {
    var txt = normalize(block.innerText || block.textContent || "");

    if (txt.indexOf("producto") !== -1) {
      var field = block.querySelector("input, select, textarea");
      if (field) {
        field.value = "PuntoVenta";
        field.setAttribute("value", "PuntoVenta");
      }

      block.classList.add("banesco-hidden");
      return true;
    }

    if (txt === "text" || txt.indexOf("text ") === 0) {
      block.classList.add("banesco-hidden");
      return true;
    }

    return false;
  }

  function buildQuestionBlock(radioBlocks) {
    var questionWrapper = document.createElement("div");
    questionWrapper.className = "banesco-question-row";

    var questionText = document.createElement("div");
    questionText.className = "banesco-question-text";
    questionText.textContent = "Te gustaría que un ejecutivo de Banesco te contactara?";

    var radioWrapper = document.createElement("div");
    radioWrapper.className = "banesco-radio-wrapper";

    radioBlocks.forEach(function (block) {
      block.classList.add("banesco-field");
      radioWrapper.appendChild(block);
    });

    questionWrapper.appendChild(questionText);
    questionWrapper.appendChild(radioWrapper);

    return questionWrapper;
  }

  function hideOriginalTexts(container) {
    var nodes = Array.prototype.slice.call(
      container.querySelectorAll("h1, h2, h3, h4, p, .x-component")
    );

    nodes.forEach(function (node) {
      var txt = normalize(node.innerText || node.textContent || "");

      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("notamos que estás interesado") !== -1 ||
        txt.indexOf("notamos que estas interesado") !== -1 ||
        txt.indexOf("producto de nómina") !== -1 ||
        txt.indexOf("producto de nomina") !== -1
      ) {
        node.classList.add("banesco-hidden");
      }
    });
  }

  function buildLayout(container) {
    if (applied || document.querySelector(".banesco-grid")) return true;

    var blocks = getFieldBlocks(container);
    if (!blocks.length) return false;

    var hiddenInputs = Array.prototype.slice.call(
      container.querySelectorAll('input[type="hidden"]')
    );

    var shell = document.createElement("div");
    shell.className = "banesco-shell";

    var card = document.createElement("div");
    card.className = "banesco-card";

    var title = document.createElement("div");
    title.className = "banesco-title";
    title.textContent = "¡Nos acercamos a ti!";

    var intro = document.createElement("div");
    intro.className = "banesco-intro";
    intro.textContent = "Notamos que estás interesado en nuestros Puntos de Venta";

    var grid = document.createElement("div");
    grid.className = "banesco-grid";

    var radioBlocks = [];
    var fieldBlocks = [];

    blocks.forEach(function (block) {
      if (hideProductOrTechnical(block)) return;

      if (isRadioBlock(block)) {
        radioBlocks.push(block);
      } else {
        classify(block);
        fieldBlocks.push(block);
      }
    });

    if (radioBlocks.length) {
      grid.appendChild(buildQuestionBlock(radioBlocks));
    }

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

    hideOriginalTexts(container);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.classList.add("banesco-form-root");

    container.appendChild(title);
    container.appendChild(intro);
    container.appendChild(grid);

    hiddenInputs.forEach(function (input) {
      container.appendChild(input);
    });

    container.parentNode.insertBefore(shell, container);
    shell.appendChild(card);
    card.appendChild(container);

    applied = true;
    return true;
  }

  function removeGrayBars() {
    var candidates = Array.prototype.slice.call(
      document.querySelectorAll("div, section, header, table, tbody, tr, td")
    );

    candidates.forEach(function (el) {
      if (!el) return;

      if (el.querySelector && el.querySelector("input, select, textarea")) return;

      if (
        el.classList &&
        (
          el.classList.contains("banesco-shell") ||
          el.classList.contains("banesco-card")
        )
      ) {
        return;
      }

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = normalize(el.innerText || el.textContent || "");

      var isTop = rect.top >= -10 && rect.top <= 230;
      var isBar = rect.width > 400 && rect.height >= 20 && rect.height <= 130;

      var isDark =
        bgImage.indexOf("gradient") !== -1 ||
        bg.indexOf("rgb(8") === 0 ||
        bg.indexOf("rgb(9") === 0 ||
        bg.indexOf("rgb(10") === 0 ||
        bg.indexOf("rgb(11") === 0 ||
        bg.indexOf("rgb(12") === 0 ||
        bg.indexOf("rgb(13") === 0 ||
        bg.indexOf("rgb(14") === 0 ||
        bg.indexOf("rgb(15") === 0 ||
        bg.indexOf("rgb(16") === 0 ||
        bg.indexOf("rgb(17") === 0 ||
        bg.indexOf("rgb(18") === 0 ||
        bg.indexOf("rgb(19") === 0 ||
        bg.indexOf("rgb(20") === 0;

      if (isTop && isBar && txt === "" && isDark) {
        el.classList.add("banesco-force-hide");
        el.style.display = "none";
      }
    });
  }

  function forceColors() {
    var selectors = [
      ".banesco-title",
      ".banesco-field .x-form-item-label",
      ".banesco-field label",
      ".x-form-cb-label"
    ];

    selectors.forEach(function (selector) {
      Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
        el.style.setProperty("color", "#007a63", "important");
        el.style.setProperty("font-weight", "700", "important");
      });
    });
  }

  function apply() {
    injectCSS();

    var container = findFormContainer();
    if (!container) return false;

    var ok = buildLayout(container);

    removeGrayBars();
    forceColors();

    if (ok) {
      console.log("Banesco PDV final v22 aplicado correctamente.");
    }

    return ok;
  }

  function wait() {
    attempts++;

    if (apply()) return;

    if (attempts < maxAttempts) {
      setTimeout(wait, 250);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();
