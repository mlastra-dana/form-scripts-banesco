(function () {
  var attempts = 0;
  var maxAttempts = 160;
  var applied = false;

  function normalize(value) {
    return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-stable-v10-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-stable-v10-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
        color: #4a4a4a !important;
      }

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

      .banesco-popup-shell {
        width: 100% !important;
        max-width: 900px !important;
        margin: 10px auto !important;
        padding: 0 10px !important;
        box-sizing: border-box !important;
      }

      .banesco-popup-card {
        background: #ffffff !important;
        border-radius: 44px !important;
        padding: 42px 54px !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
        border: 0 !important;
      }

      .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 34px !important;
        row-gap: 18px !important;
        width: 100% !important;
      }

      .banesco-title-block {
        grid-column: 1 / -1 !important;
      }

      .banesco-title-block h2 {
        margin: 0 0 14px 0 !important;
        padding: 0 0 14px 0 !important;
        color: #007a63 !important;
        font-size: 30px !important;
        line-height: 1.15 !important;
        font-weight: 500 !important;
        border-bottom: 1px dotted #d8d8d8 !important;
      }

      .banesco-question {
        grid-column: 1 / -1 !important;
        margin-bottom: -2px !important;
      }

      .banesco-question-text {
        color: #3f3f3f !important;
        font-size: 17px !important;
        font-weight: 700 !important;
        margin-bottom: 10px !important;
      }

      .banesco-radio-row {
        display: flex !important;
        gap: 120px !important;
        align-items: center !important;
      }

      .banesco-radio-row label,
      .banesco-radio-row .x-form-cb-label {
        color: #007a63 !important;
        font-size: 16px !important;
        font-weight: 700 !important;
      }

      .banesco-radio-row input[type="radio"] {
        accent-color: #007a63 !important;
      }

      .banesco-field {
        position: relative !important;
        margin: 0 !important;
        padding-left: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        min-height: 52px !important;
      }

      .banesco-field.banesco-full {
        grid-column: 1 / -1 !important;
      }

      .banesco-field .x-form-item-label,
      .banesco-field label {
        color: #007a63 !important;
        font-size: 15px !important;
        line-height: 1.15 !important;
        font-weight: 700 !important;
        margin: 0 0 7px 0 !important;
        padding: 0 !important;
        white-space: normal !important;
        text-align: left !important;
      }

      .banesco-field .x-form-item-label *,
      .banesco-field label * {
        color: #007a63 !important;
      }

      .banesco-field .x-form-required-field {
        color: #f04a3a !important;
      }

      /*
        Importante:
        NO forzamos display:block en wrappers internos de ExtJS.
        Eso era lo que rompía el selector de Actividad Económica.
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
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
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
        font-size: 15px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        padding: 4px 2px 6px 2px !important;
        min-height: 26px !important;
        pointer-events: auto !important;
        cursor: text !important;
      }

      .banesco-field select,
      .banesco-field .x-form-trigger-wrap,
      .banesco-field .x-form-trigger,
      .banesco-field .x-form-arrow-trigger {
        cursor: pointer !important;
        pointer-events: auto !important;
      }

      .banesco-field .x-form-trigger,
      .banesco-field .x-form-arrow-trigger {
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .banesco-field input::placeholder,
      .banesco-field textarea::placeholder {
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
        font-size: 15px !important;
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

        .banesco-grid {
          grid-template-columns: 1fr !important;
        }

        .banesco-radio-row {
          gap: 34px !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function getText(el) {
    return normalize(el.innerText || el.textContent || "");
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

  function getOrder(block) {
    var txt = getText(block);

    if (isRadioBlock(block)) return 5;
    if (txt.indexOf("empresa") !== -1) return 10;
    if (txt.indexOf("actividad") !== -1) return 20;
    if (txt.indexOf("nacionalidad") !== -1) return 30;
    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) return 40;
    if (txt.indexOf("persona") !== -1 || txt.indexOf("contacto") !== -1) return 50;
    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1) return 60;
    if (txt.indexOf("teléfono") !== -1 || txt.indexOf("telefono") !== -1 || txt.indexOf("celular") !== -1) return 70;
    if (txt.indexOf("estado") !== -1) return 80;
    if (txt.indexOf("agencia") !== -1) return 90;

    return 999;
  }

  function shouldBeFull(block) {
    var txt = getText(block);

    return (
      txt.indexOf("persona") !== -1 ||
      txt.indexOf("contacto") !== -1 ||
      txt.indexOf("selecciona la agencia") !== -1
    );
  }

  function hideProductAndTechnical(block) {
    var txt = getText(block);

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

  function createTitleBlock() {
    var title = document.createElement("div");
    title.className = "banesco-title-block";
    title.innerHTML = "<h2>¡Nos acercamos a ti!</h2>";
    return title;
  }

  function createQuestionBlock(radioBlocks) {
    var wrapper = document.createElement("div");
    wrapper.className = "banesco-question";

    var question = document.createElement("div");
    question.className = "banesco-question-text";
    question.textContent = "Te gustaría que un ejecutivo de Banesco te contactara?";

    var row = document.createElement("div");
    row.className = "banesco-radio-row";

    radioBlocks.forEach(function (block) {
      block.classList.add("banesco-field");
      row.appendChild(block);
    });

    wrapper.appendChild(question);
    wrapper.appendChild(row);

    return wrapper;
  }

  function buildStableLayout(container) {
    if (document.querySelector(".banesco-grid")) return true;

    var blocks = getFieldBlocks(container);

    if (!blocks.length) return false;

    var radioBlocks = [];
    var fields = [];

    blocks.forEach(function (block) {
      if (hideProductAndTechnical(block)) return;

      if (isRadioBlock(block)) {
        radioBlocks.push(block);
      } else {
        block.classList.add("banesco-field");

        if (shouldBeFull(block)) {
          block.classList.add("banesco-full");
        }

        block.setAttribute("data-banesco-order", String(getOrder(block)));
        fields.push(block);
      }
    });

    fields.sort(function (a, b) {
      return Number(a.getAttribute("data-banesco-order")) - Number(b.getAttribute("data-banesco-order"));
    });

    var grid = document.createElement("div");
    grid.className = "banesco-grid";

    grid.appendChild(createTitleBlock());

    if (radioBlocks.length) {
      grid.appendChild(createQuestionBlock(radioBlocks));
    }

    fields.forEach(function (block) {
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

  function wrapForm(container) {
    if (document.querySelector(".banesco-popup-shell")) return;

    var shell = document.createElement("div");
    shell.className = "banesco-popup-shell";

    var card = document.createElement("div");
    card.className = "banesco-popup-card";

    container.parentNode.insertBefore(shell, container);
    shell.appendChild(card);
    card.appendChild(container);
  }

  function hideGrayBarAggressively() {
    var all = Array.prototype.slice.call(document.querySelectorAll("div, section, header, table, tbody, tr, td"));

    all.forEach(function (el) {
      if (el.querySelector && el.querySelector("input, select, textarea")) return;
      if (el.classList && (el.classList.contains("banesco-popup-shell") || el.classList.contains("banesco-popup-card"))) return;

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = getText(el);

      var inTopArea = rect.top >= -10 && rect.top <= 180;
      var sizeLooksLikeBar = rect.width > 400 && rect.height >= 20 && rect.height <= 90;

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

      if (inTopArea && sizeLooksLikeBar && txt === "" && isGray) {
        el.classList.add("banesco-force-hide");
        el.style.display = "none";
        el.style.height = "0";
        el.style.minHeight = "0";
        el.style.maxHeight = "0";
        el.style.margin = "0";
        el.style.padding = "0";
        el.style.overflow = "hidden";
        el.style.visibility = "hidden";
      }
    });
  }

  function openExtComboOnClick() {
    var blocks = getFieldBlocks(document);

    blocks.forEach(function (block) {
      var txt = getText(block);

      if (txt.indexOf("actividad") === -1) return;

      block.addEventListener("click", function () {
        var trigger = block.querySelector(".x-form-trigger, .x-form-arrow-trigger");
        var input = block.querySelector("input, .x-form-field");

        if (trigger) {
          trigger.click();
        } else if (input) {
          input.focus();
          input.click();
        }
      });
    });
  }

  function apply() {
    injectCSS();

    var container = findFormContainer();

    if (!container) return false;

    wrapForm(container);

    var ok = buildStableLayout(container);

    hideGrayBarAggressively();
    openExtComboOnClick();

    if (ok && !applied) {
      applied = true;
      console.log("Banesco PDV stable v10 aplicado correctamente.");
    }

    return ok;
  }

  function wait() {
    attempts++;

    apply();

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
