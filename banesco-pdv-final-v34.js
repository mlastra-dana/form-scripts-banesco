(function () {
  var attempts = 0;
  var maxAttempts = 150;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-v34-css")) return;
    
    var style = document.createElement("style");
    style.id = "banesco-v34-css";
    style.innerHTML = `
      /* HIPER-ESPECIFICIDAD: Al usar 'html body' le ganamos a cualquier clase de DANA */
      
      /* 1. Ocultar la barra gris de ExtJS */
      html body .x-panel-header,
      html body .x-window-header,
      html body .x-docked-top,
      html body .x-toolbar,
      html body .x-panel-header-default,
      html body .x-header {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        opacity: 0 !important;
        border: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* 2. Quitar fondos grises de la plataforma */
      html body,
      html body .x-panel,
      html body .x-panel-body,
      html body .x-form,
      html body .x-window,
      html body .x-window-body,
      html body .x-panel-default,
      html body .x-container {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      /* 3. Contenedores de Banesco */
      html body .banesco-shell {
        width: 100% !important;
        max-width: 800px !important;
        margin: 20px auto !important;
        padding: 0 15px !important;
        box-sizing: border-box !important;
      }
      
      html body .banesco-card {
        background: #ffffff !important;
        border-radius: 40px !important;
        padding: 50px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        box-sizing: border-box !important;
      }

      /* 4. Textos y Títulos en Verde */
      html body .banesco-title {
        color: #007a63 !important;
        font-size: 32px !important;
        font-weight: bold !important;
        text-align: center !important;
        margin: 0 0 15px 0 !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      html body .banesco-question-text {
        color: #555555 !important;
        font-size: 16px !important;
        text-align: center !important;
        margin-bottom: 25px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      html body .banesco-form-root label,
      html body .banesco-form-root .x-form-item-label,
      html body .banesco-form-root .x-form-cb-label {
        color: #007a63 !important;
        font-weight: bold !important;
        font-size: 14px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      /* 5. Inputs Estilo Línea (Material Design) */
      html body .banesco-form-root input[type="text"],
      html body .banesco-form-root input[type="email"],
      html body .banesco-form-root input[type="tel"],
      html body .banesco-form-root select,
      html body .banesco-form-root textarea,
      html body .banesco-form-root .x-form-text,
      html body .banesco-form-root .x-form-field {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        border-top: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
        border-bottom: 1px solid #cccccc !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 6px 0 !important;
        color: #333333 !important;
      }

      html body .banesco-form-root input:focus,
      html body .banesco-form-root select:focus,
      html body .banesco-form-root .x-form-focus {
        border-bottom: 2px solid #007a63 !important;
      }

      /* Quitar las cajas grises alrededor de los inputs de ExtJS */
      html body .banesco-form-root .x-form-text-wrap,
      html body .banesco-form-root .x-form-trigger-wrap,
      html body .banesco-form-root .x-form-item-body {
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      html body .banesco-form-root .x-form-trigger {
        background-color: transparent !important;
        border: 0 !important;
      }

      /* 6. Botón Enviar Verde y Redondo */
      html body .banesco-submit-wrap .x-btn,
      html body .banesco-submit-wrap button,
      html body .banesco-submit-wrap input[type="submit"] {
        background: #007a63 !important;
        background-color: #007a63 !important;
        background-image: none !important;
        border-color: #007a63 !important;
        border-radius: 30px !important;
        padding: 12px 40px !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      html body .banesco-submit-wrap .x-btn-inner,
      html body .banesco-submit-wrap .x-btn-inner-default-small {
        color: #ffffff !important;
        font-weight: bold !important;
        font-size: 16px !important;
        text-shadow: none !important;
      }

      /* 7. Grid Layout Banesco */
      html body .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 50px !important;
        row-gap: 25px !important;
        align-items: end !important;
      }

      html body .banesco-question-row { grid-column: 1 / -1 !important; order: 1 !important; text-align: center !important; margin-bottom: 10px !important; }
      html body .banesco-radio-wrapper { display: flex !important; align-items: center !important; justify-content: center !important; gap: 60px !important; }
      html body .banesco-submit-wrap { order: 100 !important; grid-column: 1 / -1 !important; margin-top: 30px !important; text-align: center !important; }
      
      html body .banesco-field-empresa { order: 10 !important; grid-column: 1 / 2 !important; }
      html body .banesco-field-persona { order: 20 !important; grid-column: 2 / 3 !important; }
      html body .banesco-field-nacionalidad { order: 30 !important; grid-column: 1 / 2 !important; }
      html body .banesco-field-documento { order: 40 !important; grid-column: 2 / 3 !important; }
      html body .banesco-field-actividad { order: 50 !important; grid-column: 1 / 2 !important; }
      html body .banesco-field-telefono { order: 60 !important; grid-column: 2 / 3 !important; }
      html body .banesco-field-estado { order: 70 !important; grid-column: 1 / 2 !important; }
      html body .banesco-field-correo { order: 80 !important; grid-column: 2 / 3 !important; }
      html body .banesco-field-agencia { order: 90 !important; grid-column: 1 / 2 !important; }

      html body .x-form-required-field { display: none !important; }
      html body input[type="radio"] { accent-color: #007a63 !important; }

      @media screen and (max-width: 768px) {
        html body .banesco-card { padding: 30px 20px !important; border-radius: 25px !important; }
        html body .banesco-grid { grid-template-columns: 1fr !important; }
        html body .banesco-field { grid-column: 1 / -1 !important; }
      }
    `;
    document.head.appendChild(style);
  }

  // Truco: Mantiene nuestra etiqueta <style> siempre de última para que DANA no la sobrescriba
  function keepCSSOnTop() {
    setInterval(function() {
      var styleEl = document.getElementById("banesco-v34-css");
      if (styleEl && document.head.lastChild !== styleEl) {
        document.head.appendChild(styleEl);
      }
    }, 500);
  }

  function findFormContainer() {
    var forms = Array.prototype.slice.call(document.querySelectorAll("form"));
    var bestForm = null;
    var bestCount = 0;
    forms.forEach(function (form) {
      var count = form.querySelectorAll("input, select, textarea").length;
      if (count > bestCount) { bestForm = form; bestCount = count; }
    });
    if (bestForm && bestCount >= 3) return bestForm;

    var candidates = Array.prototype.slice.call(document.querySelectorAll("div"));
    var best = null;
    var max = 0;
    candidates.forEach(function (el) {
      var count = el.querySelectorAll("input, select, textarea").length;
      if (count > max) { best = el; max = count; }
    });
    return max >= 3 ? best : null;
  }

  function getFieldBlocks(container) {
    return Array.prototype.slice.call(container.querySelectorAll(".x-form-item")).filter(function (block) { return block.querySelector("input, select, textarea"); });
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
      if (field) { field.value = "Nomina"; field.setAttribute("value", "Nomina"); }
      block.style.display = "none";
      return true;
    }
    if (txt === "text" || txt.indexOf("text ") === 0) {
      block.style.display = "none";
      return true;
    }
    return false;
  }

  function hideOriginalTexts(container) {
    var nodes = Array.prototype.slice.call(container.querySelectorAll("h1, h2, h3, h4, p, .x-component"));
    nodes.forEach(function (node) {
      var txt = normalize(node.innerText || node.textContent || "");
      if (txt.indexOf("nos acercamos") !== -1 || txt.indexOf("notamos que est") !== -1 || txt.indexOf("producto de") !== -1) {
        node.style.display = "none";
      }
    });
  }

  function buildLayout(container) {
    if (applied || document.querySelector(".banesco-grid")) return true;
    var blocks = getFieldBlocks(container);
    if (!blocks.length) return false;

    var hiddenInputs = Array.prototype.slice.call(container.querySelectorAll('input[type="hidden"]'));
    var shell = document.createElement("div"); shell.className = "banesco-shell";
    var card = document.createElement("div"); card.className = "banesco-card";

    var title = document.createElement("div");
    title.className = "banesco-title";
    title.textContent = "¡Nos acercamos a ti!";
    
    var intro = document.createElement("div");
    intro.className = "banesco-question-text";
    intro.textContent = "Notamos que estás interesado en nuestro producto de Nómina.";

    var grid = document.createElement("div"); grid.className = "banesco-grid";
    var radioBlocks = []; var fieldBlocks = [];

    blocks.forEach(function (block) {
      if (hideProductOrTechnical(block)) return;
      if (isRadioBlock(block)) { radioBlocks.push(block); } 
      else { classify(block); fieldBlocks.push(block); }
    });

    if (radioBlocks.length) {
      var questionWrapper = document.createElement("div"); questionWrapper.className = "banesco-question-row";
      var questionText = document.createElement("div"); questionText.className = "banesco-question-text";
      questionText.textContent = "¿Te gustaría que un ejecutivo de Banesco te contactara?";
      var radioWrapper = document.createElement("div"); radioWrapper.className = "banesco-radio-wrapper";
      radioBlocks.forEach(function (block) { block.classList.add("banesco-field"); radioWrapper.appendChild(block); });
      questionWrapper.appendChild(questionText); questionWrapper.appendChild(radioWrapper);
      grid.appendChild(questionWrapper);
    }

    fieldBlocks.forEach(function (block) { grid.appendChild(block); });

    var submit = container.querySelector('input[type="submit"], button[type="submit"], .x-btn');
    if (submit) {
      var submitWrap = document.createElement("div"); submitWrap.className = "banesco-submit-wrap";
      submitWrap.appendChild(submit); grid.appendChild(submitWrap);
    }

    hideOriginalTexts(container);
    while (container.firstChild) { container.removeChild(container.firstChild); }
    container.classList.add("banesco-form-root");
    container.appendChild(title); container.appendChild(intro); container.appendChild(grid);
    hiddenInputs.forEach(function (input) { container.appendChild(input); });

    container.parentNode.insertBefore(shell, container);
    shell.appendChild(card); card.appendChild(container);

    applied = true; return true;
  }

  function apply() {
    injectCSS();
    keepCSSOnTop(); // Activa el escudo anti-DANA
    var container = findFormContainer();
    if (!container) return false;

    var ok = buildLayout(container);
    if (ok) {
      console.log("Banesco PDV final v34 (Anti-ExtJS Shield) aplicado.");
    }
    return ok;
  }

  function wait() {
    attempts++;
    if (apply()) return;
    if (attempts < maxAttempts) {
      setTimeout(wait, 100);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();
