(function () {
  var attempts = 0;
  var maxAttempts = 140;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-final-v23-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-final-v23-css";

    style.innerHTML = `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
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

      /* Ocultar forzosamente cualquier barra gris, encabezados o toolbars de DANA */
      .x-panel-header,
      .x-window-header,
      .x-header,
      .x-toolbar,
      .x-docked,
      .x-docked-top,
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
        opacity: 0 !important;
      }

      .banesco-shell {
        width: 100% !important;
        max-width: 800px !important;
        margin: 40px auto !important;
        padding: 0 15px !important;
        box-sizing: border-box !important;
      }

      .banesco-card {
        position: relative !important;
        background: #ffffff !important;
        border-radius: 40px !important; /* Bordes muy redondeados como en la referencia */
        padding: 40px 50px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        border: 0 !important;
        box-sizing: border-box !important;
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
        color: #007a63 !important; /* Verde Banesco */
        font-size: 28px !important;
        line-height: 1.2 !important;
        font-weight: 700 !important;
        margin: 0 0 10px 0 !important;
        padding: 0 !important;
        text-align: center !important; /* Centrado */
        border: none !important;
      }

      .banesco-intro {
        color: #555555 !important;
        font-size: 16px !important;
        line-height: 1.4 !important;
        font-weight: 400 !important;
        margin: 0 0 30px 0 !important;
        text-align: center !important; /* Centrado */
      }

      .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 40px !important;
        row-gap: 25px !important;
        align-items: end !important;
        width: 100% !important;
      }

      .banesco-question-row {
        grid-column: 1 / -1 !important;
        order: 1 !important;
        text-align: center !important;
        margin-bottom: 20px !important;
      }

      .banesco-question-text {
        color: #333 !important;
        font-size: 16px !important;
        line-height: 1.3 !important;
        font-weight: 400 !important;
        margin: 0 0 15px 0 !important;
      }

      .banesco-radio-wrapper {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 40px !important;
      }

      .banesco-radio-wrapper .x-form-item {
        margin: 0 !important;
        min-height: auto !important;
      }

      .banesco-radio-wrapper label,
      .banesco-radio-wrapper .x-form-cb-label,
      .x-form-cb-label {
        color: #000 !important;
        font-size: 16px !important;
        font-weight: 700 !important;
      }

      input[type="radio"] {
        accent-color: #007a63 !important;
        transform: scale(1.2);
        margin-right: 8px !important;
      }

      .banesco-field {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        position: relative !important;
      }

      .banesco-field-empresa { order: 10 !important; grid-column: 1 / 2 !important; }
      .banesco-field-persona { order: 20 !important; grid-column: 2 / 3 !important; }
      .banesco-field-nacionalidad { order: 30 !important; grid-column: 1 / 2 !important; }
      .banesco-field-documento { order: 40 !important; grid-column: 2 / 3 !important; }
      .banesco-field-actividad { order: 50 !important; grid-column: 1 / 2 !important; }
      .banesco-field-telefono { order: 60 !important; grid-column: 2 / 3 !important; }
      .banesco-field-estado { order: 70 !important; grid-column: 1 / 2 !important; }
      .banesco-field-correo { order: 80 !important; grid-column: 2 / 3 !important; }
      .banesco-field-agencia { order: 90 !important; grid-column: 1 / 2 !important; }

      .banesco-submit-wrap {
        order: 100 !important;
        grid-column: 1 / -1 !important;
        margin-top: 20px !important;
        text-align: center !important;
      }

      /* Estilo de etiquetas simulando placeholders */
      .banesco-field .x-form-item-label,
      .banesco-field label,
      .x-form-item-label,
      label {
        color: #888888 !important;
        font-size: 13px !important;
        line-height: 1 !important;
        font-weight: 400 !important;
        margin: 0 0 5px 0 !important;
        padding: 0 !important;
        white-space: normal !important;
        text-align: left !important;
        display: block !important;
      }

      .x-form-required-field {
        color: #007a63 !important; /* Asteriscos verdes o invisibles si prefieres */
        display: none !important;
      }

      .banesco-field .x-form-item-body,
      .banesco-field .x-form-field-wrap,
      .banesco-field .x-form-trigger-wrap,
      .banesco-field .x-form-trigger-input-cell,
      .banesco-field .x-form-text-wrap {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      /* Inputs estilo Material Design (solo linea inferior) */
      .banesco-field input[type="text"],
      .banesco-field input[type="email"],
      .banesco-field input[type="tel"],
      .banesco-field input[type="number"],
      .banesco-field select,
      .banesco-field textarea,
      .banesco-field .x-form-text,
      .banesco-field .x-form-field {
        background: transparent !important;
        border: 0 !important;
        border-bottom: 1px solid #d8d8d8 !important; /* Solo línea inferior */
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        color: #333 !important;
        font-size: 14px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        padding: 5px 0 !important;
        width: 100% !important;
        transition: border-color 0.3s ease !important;
      }

      .banesco-field input:focus,
      .banesco-field select:focus {
        border-bottom: 2px solid #007a63 !important; /* Resalte en verde al enfocar */
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

      /* Botón verde */
      .banesco-submit-wrap input[type="submit"],
      .banesco-submit-wrap button,
      .banesco-submit-wrap .x-btn,
      .banesco-submit-wrap .x-btn-button,
      input[type="submit"],
      button[type="submit"] {
        background: #007a63 !important;
        color: #ffffff !important;
        border: 0 !important;
        border-radius: 25px !important;
        padding: 12px 35px !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        box-shadow: none !important;
        text-shadow: none !important;
        cursor: pointer !important;
        transition: background 0.3s ease !important;
      }

      .banesco-submit-wrap button:hover {
        background: #005f4d !important;
      }

      .x-btn-inner {
        color: #ffffff !important;
        font-weight: 700 !important;
        text-shadow: none !important;
      }

      .x-form-invalid-under,
      .x-form-error-msg {
        color: #d93025 !important;
        font-size: 11px !important;
        padding: 4px 0 0 0 !important;
      }

      .x-boundlist { z-index: 9999999 !important; }

      @media screen and (max-width: 768px) {
        .banesco-card {
          border-radius: 25px !important;
          padding: 30px 20px !important;
        }

        .banesco-grid {
          grid-template-columns: 1fr !important;
        }

        .banesco-field {
          grid-column: 1 / -1 !important;
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

    if (txt.indexOf("empresa") !== -1) { block.classList.add("banesco-field-empresa"); return; }
    if (txt.indexOf("actividad econ") !== -1 || txt.indexOf("actividad economica") !== -1) { block.classList.add("banesco-field-actividad"); return; }
    if (txt.indexOf("nacionalidad") !== -1) { block.classList.add("banesco-field-nacionalidad"); return; }
    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) { block.classList.add("banesco-field-documento"); return; }
    if (txt.indexOf("persona contacto") !== -1 || txt.indexOf("nombre") !== -1) { block.classList.add("banesco-field-persona"); return; }
    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1) { block.classList.add("banesco-field-correo"); return; }
    if (txt.indexOf("tel") !== -1 || txt.indexOf("celular") !== -1) { block.classList.add("banesco-field-telefono"); return; }
    if (txt.indexOf("estado") !== -1) { block.classList.add("banesco-field-estado"); return; }
    if (txt.indexOf("agencia") !== -1) { block.classList.add("banesco-field-agencia"); }
  }

  function hideProductOrTechnical(block) {
    var txt = normalize(block.innerText || block.textContent || "");

    if (txt.indexOf("producto") !== -1) {
      var field = block.querySelector("input, select, textarea");
      if (field) {
        field.value = "Nomina"; // Ajustado según tu imagen de referencia
        field.setAttribute("value", "Nomina");
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
    questionText.textContent = "¿Te gustaría que un ejecutivo de Banesco te contactara?";

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
        txt.indexOf("notamos que est") !== -1 ||
        txt.indexOf("producto de") !== -1
      ) {
        node.classList.add("banesco-hidden");
      }
    });
  }

  function buildLayout(container) {
    if (applied || document.querySelector(".banesco-grid")) return true;

    var blocks = getFieldBlocks(container);
    if (!blocks.length) return false;

    var hiddenInputs = Array.prototype.slice.call(container.querySelectorAll('input[type="hidden"]'));

    var shell = document.createElement("div");
    shell.className = "banesco-shell";

    var card = document.createElement("div");
    card.className = "banesco-card";

    var title = document.createElement("div");
    title.className = "banesco-title";
    title.textContent = "¡Nos acercamos a ti!";

    var intro = document.createElement("div");
    intro.className = "banesco-intro";
    intro.textContent = "Notamos que estás interesado en nuestro producto de Nómina.";

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

    fieldBlocks.forEach(function (block) { grid.appendChild(block); });

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

    hiddenInputs.forEach(function (input) { container.appendChild(input); });

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
      if (el.classList && (el.classList.contains("banesco-shell") || el.classList.contains("banesco-card"))) return;

      var rect = el.getBoundingClientRect();
      var style = window.getComputedStyle(el);
      var bg = style.backgroundColor || "";
      var bgImage = style.backgroundImage || "";
      var txt = normalize(el.innerText || el.textContent || "");

      var isTop = rect.top >= -10 && rect.top <= 230;
      var isBar = rect.width > 400 && rect.height >= 20 && rect.height <= 130;

      // Detecta degradados o colores oscuros comunes en los wrappers de DANA
      var isDark =
        bgImage.indexOf("gradient") !== -1 ||
        bg.indexOf("rgb(8") === 0 || bg.indexOf("rgb(9") === 0 ||
        bg.indexOf("rgb(10") === 0 || bg.indexOf("rgb(11") === 0 ||
        bg.indexOf("rgb(12") === 0 || bg.indexOf("rgb(13") === 0 ||
        bg.indexOf("rgb(14") === 0 || bg.indexOf("rgb(15") === 0 ||
        bg.indexOf("rgb(16") === 0 || bg.indexOf("rgb(17") === 0 ||
        bg.indexOf("rgb(18") === 0 || bg.indexOf("rgb(19") === 0 ||
        bg.indexOf("rgb(20") === 0 || bg.indexOf("rgb(128") === 0;

      if (isTop && isBar && txt === "" && isDark) {
        el.classList.add("banesco-force-hide");
        el.style.setProperty("display", "none", "important");
      }
    });
  }

  function forceColors() {
    // Asegurarse de que el título siempre sea verde
    var titles = document.querySelectorAll(".banesco-title");
    Array.prototype.forEach.call(titles, function (el) {
      el.style.setProperty("color", "#007a63", "important");
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
      console.log("Banesco PDV final v23 aplicado correctamente.");
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
