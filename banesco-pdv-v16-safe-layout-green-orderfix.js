(function () {
  var attempts = 0;
  var maxAttempts = 120;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-v16-safe-green-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-v16-safe-green-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
        color: #4a4a4a !important;
      }

      body,
      .x-body,
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
      .x-toolbar-default {
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

      .banesco-popup-shell {
        width: 100% !important;
        max-width: 900px !important;
        margin: 10px auto !important;
        padding: 0 10px !important;
        box-sizing: border-box !important;
        position: relative !important;
        z-index: 2 !important;
      }

      .banesco-popup-card {
        background: #ffffff !important;
        border-radius: 44px !important;
        padding: 42px 54px !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
        border: 0 !important;
        box-sizing: border-box !important;
      }

      .banesco-title {
        color: #007a63 !important;
        font-size: 34px !important;
        line-height: 1.15 !important;
        font-weight: 600 !important;
        margin: 0 0 18px 0 !important;
        padding: 0 0 16px 0 !important;
        border-bottom: 1px dotted #d8d8d8 !important;
      }

      .banesco-grid-safe {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 36px !important;
        row-gap: 18px !important;
        width: 100% !important;
        align-items: start !important;
      }

      .banesco-question-row {
        grid-column: 1 / -1 !important;
        margin-bottom: 2px !important;
      }

      .banesco-question-text {
        color: #3f3f3f !important;
        font-size: 18px !important;
        font-weight: 700 !important;
        line-height: 1.25 !important;
        margin-bottom: 10px !important;
      }

      .banesco-radio-wrapper {
        display: flex !important;
        align-items: center !important;
        gap: 120px !important;
      }

      .banesco-radio-wrapper .x-form-item {
        margin: 0 !important;
      }

      .banesco-radio-wrapper label,
      .banesco-radio-wrapper .x-form-cb-label,
      .x-form-cb-label {
        color: #007a63 !important;
        font-size: 16px !important;
        font-weight: 700 !important;
      }

      input[type="radio"] {
        accent-color: #007a63 !important;
      }

      .banesco-field-safe {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        min-height: 54px !important;
      }

      .banesco-field-safe.banesco-full {
        grid-column: 1 / -1 !important;
      }

      .banesco-field-safe .x-form-item-label,
      .banesco-field-safe label,
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

      .banesco-field-safe .x-form-item-label *,
      .banesco-field-safe label *,
      .x-form-item-label *,
      label * {
        color: #007a63 !important;
        font-weight: 700 !important;
      }

      .banesco-field-safe .x-form-required-field,
      .x-form-required-field {
        color: #f04a3a !important;
      }

      .banesco-field-safe .x-form-item-body,
      .banesco-field-safe .x-form-field-wrap,
      .banesco-field-safe .x-form-trigger-wrap,
      .banesco-field-safe .x-form-trigger-input-cell,
      .banesco-field-safe .x-form-text-wrap {
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-field-safe input[type="text"],
      .banesco-field-safe input[type="email"],
      .banesco-field-safe input[type="tel"],
      .banesco-field-safe input[type="number"],
      .banesco-field-safe select,
      .banesco-field-safe textarea,
      .banesco-field-safe .x-form-text,
      .banesco-field-safe .x-form-field {
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

      .banesco-field-safe .x-form-trigger,
      .banesco-field-safe .x-form-arrow-trigger {
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      .banesco-field-safe input::placeholder,
      .banesco-field-safe textarea::placeholder {
        color: #8dbfb3 !important;
        opacity: 1 !important;
      }

      .banesco-hidden {
        display: none !important;
      }

      .banesco-submit-wrap {
        grid-column: 1 / -1 !important;
        margin-top: 12px !important;
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
        .banesco-popup-card {
          border-radius: 28px !important;
          padding: 28px 22px !important;
        }

        .banesco-grid-safe {
          grid-template-columns: 1fr !important;
        }

        .banesco-radio-wrapper {
          gap: 34px !important;
        }

        .banesco-field-safe.banesco-full {
          grid-column: auto !important;
        }
      }
    `;

    document.head.appendChild(style);
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
    return Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) {
        return block.querySelector("input, select, textarea");
      });
  }

  function isRadioBlock(block) {
    return block.querySelectorAll('input[type="radio"]').length > 0;
  }

  function isPersonaContactoField(txt) {
    return (
      txt.indexOf("indícanos nombre de persona contacto") !== -1 ||
      txt.indexOf("indicanos nombre de persona contacto") !== -1 ||
      txt.indexOf("nombre de persona contacto") !== -1
    );
  }

  function isTelefonoField(txt) {
    return (
      txt.indexOf("teléfono de contacto") !== -1 ||
      txt.indexOf("telefono de contacto") !== -1 ||
      txt.indexOf("telefono") !== -1 ||
      txt.indexOf("teléfono") !== -1 ||
      txt.indexOf("celular") !== -1
    );
  }

  function isCorreoField(txt) {
    return (
      txt.indexOf("correo electrónico") !== -1 ||
      txt.indexOf("correo electronico") !== -1 ||
      txt.indexOf("email") !== -1 ||
      txt.indexOf("correo") !== -1
    );
  }

  function isEstadoField(txt) {
    return txt.indexOf("estado") !== -1 && txt.indexOf("agencia") !== -1;
  }

  function isAgenciaFinalField(txt) {
    return txt.indexOf("selecciona la agencia") !== -1;
  }

  function getOrder(block) {
    var txt = normalize(block.innerText || block.textContent || "");

    if (isRadioBlock(block)) return 5;
    if (txt.indexOf("empresa") !== -1) return 10;
    if (txt.indexOf("actividad") !== -1) return 20;
    if (txt.indexOf("nacionalidad") !== -1) return 30;
    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) return 40;
    if (isPersonaContactoField(txt)) return 50;
    if (isCorreoField(txt)) return 60;
    if (isTelefonoField(txt)) return 70;
    if (isEstadoField(txt)) return 80;
    if (isAgenciaFinalField(txt)) return 90;

    return 999;
  }

  function shouldBeFull(block) {
    var txt = normalize(block.innerText || block.textContent || "");

    return isPersonaContactoField(txt) || isAgenciaFinalField(txt);
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
      block.classList.add("banesco-field-safe");
      radioWrapper.appendChild(block);
    });

    questionWrapper.appendChild(questionText);
    questionWrapper.appendChild(radioWrapper);

    return questionWrapper;
  }

  function wrapAndLayout(container) {
    if (document.querySelector(".banesco-grid-safe")) return true;

    var blocks = getFieldBlocks(container);
    if (!blocks.length) return false;

    var shell = document.createElement("div");
    shell.className = "banesco-popup-shell";

    var card = document.createElement("div");
    card.className = "banesco-popup-card";

    var title = document.createElement("div");
    title.className = "banesco-title";
    title.textContent = "¡Nos acercamos a ti!";

    var grid = document.createElement("div");
    grid.className = "banesco-grid-safe";

    var radioBlocks = [];
    var fieldBlocks = [];

    blocks.forEach(function (block) {
      if (hideProductOrTechnical(block)) return;

      if (isRadioBlock(block)) {
        radioBlocks.push(block);
      } else {
        block.classList.add("banesco-field-safe");

        if (shouldBeFull(block)) {
          block.classList.add("banesco-full");
        }

        block.setAttribute("data-banesco-order", String(getOrder(block)));
        fieldBlocks.push(block);
      }
    });

    fieldBlocks.sort(function (a, b) {
      return Number(a.getAttribute("data-banesco-order")) - Number(b.getAttribute("data-banesco-order"));
    });

    card.appendChild(title);

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

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(grid);

    container.parentNode.insertBefore(shell, container);
    shell.appendChild(card);
    card.appendChild(container);

    return true;
  }

  function hideGrayBar() {
    var shell = document.querySelector(".banesco-popup-shell");

    var candidates = Array.prototype.slice.call(
      document.querySelectorAll("div, section, header, table, tbody, tr, td")
    );

    candidates.forEach(function (el) {
      if (el.querySelector && el.querySelector("input, select, textarea")) return;
      if (el.classList && (el.classList.contains("banesco-popup-shell") || el.classList.contains("banesco-popup-card"))) return;

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = normalize(el.innerText || el.textContent || "");

      var isTop = rect.top >= -10 && rect.top <= 220;
      var isBar = rect.width > 400 && rect.height >= 20 && rect.height <= 110;

      var isDark =
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
        bg.indexOf("rgb(20") === 0 ||
        bgImage.indexOf("gradient") !== -1;

      if (isTop && isBar && txt === "" && isDark) {
        el.classList.add("banesco-force-hide");
        el.style.display = "none";
      }
    });

    if (shell) {
      var prev = shell.previousElementSibling;
      while (prev) {
        if (!(prev.querySelector && prev.querySelector("input, select, textarea"))) {
          prev.classList.add("banesco-force-hide");
          prev.style.display = "none";
        }
        prev = prev.previousElementSibling;
      }
    }
  }

  function apply() {
    injectCSS();

    var container = findFormContainer();
    if (!container) return false;

    var ok = wrapAndLayout(container);
    hideGrayBar();

    if (ok) {
      console.log("Banesco PDV v16 safe layout green orderfix aplicado correctamente.");
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
