(function () {
  var attempts = 0;
  var maxAttempts = 150;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-v35-css")) return;
    
    var style = document.createElement("style");
    style.id = "banesco-v35-css";
    // Usamos selectores universales y !important para aplastar a ExtJS
    style.innerHTML = `
      /* 1. ANIQUILAR BARRA GRIS SUPERIOR Y FONDOS DE EXTJS */
      body .x-panel-header,
      body .x-window-header,
      body .x-docked-top,
      body .x-toolbar,
      body .x-panel-header-default,
      body .x-header,
      body .x-border-layout-ct {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
        position: absolute !important;
        z-index: -9999 !important;
      }

      body,
      body .x-panel,
      body .x-panel-body,
      body .x-form,
      body .x-window,
      body .x-window-body,
      body .x-panel-default,
      body .x-container {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* 2. ESTRUCTURA BANESCO */
      body .banesco-shell {
        width: 100% !important;
        max-width: 800px !important;
        margin: 20px auto !important;
        padding: 0 15px !important;
        box-sizing: border-box !important;
      }
      
      body .banesco-card {
        background: #ffffff !important;
        border-radius: 40px !important;
        padding: 50px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
        box-sizing: border-box !important;
      }

      /* 3. TIPOGRAFÍA Y COLORES VERDES */
      body .banesco-title {
        color: #007a63 !important;
        font-size: 32px !important;
        font-weight: bold !important;
        text-align: center !important;
        margin: 0 0 15px 0 !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body .banesco-question-text {
        color: #555555 !important;
        font-size: 16px !important;
        text-align: center !important;
        margin-bottom: 25px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      /* Etiquetas Verdes */
      body .banesco-form-root label,
      body .banesco-form-root .x-form-item-label,
      body .banesco-form-root .x-form-cb-label,
      body .banesco-form-root .x-form-item-label-inner {
        color: #007a63 !important;
        font-weight: bold !important;
        font-size: 14px !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      /* 4. INPUTS ESTILO LÍNEA INFERIOR */
      body .banesco-form-root input[type="text"],
      body .banesco-form-root input[type="email"],
      body .banesco-form-root input[type="tel"],
      body .banesco-form-root select,
      body .banesco-form-root textarea,
      body .banesco-form-root .x-form-text,
      body .banesco-form-root .x-form-field {
        background: transparent !important;
        background-color: transparent !important;
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid #cccccc !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 6px 0 !important;
        color: #333333 !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 14px !important;
      }

      body .banesco-form-root input:focus,
      body .banesco-form-root select:focus,
      body .banesco-form-root .x-form-focus {
        border-bottom: 2px solid #007a63 !important;
      }

      /* Matar cajas de ExtJS */
      body .banesco-form-root .x-form-text-wrap,
      body .banesco-form-root .x-form-trigger-wrap,
      body .banesco-form-root .x-form-item-body {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      /* 5. BOTÓN ENVIAR VERDE */
      body .banesco-submit-wrap .x-btn,
      body .banesco-submit-wrap button,
      body .banesco-submit-wrap input[type="submit"] {
        background: #007a63 !important;
        background-color: #007a63 !important;
        border-color: #007a63 !important;
        border-radius: 30px !important;
        padding: 12px 40px !important;
        box-shadow: none !important;
        background-image: none !important;
      }

      body .banesco-submit-wrap .x-btn-inner,
      body .banesco-submit-wrap .x-btn-inner-default-small {
        color: #ffffff !important;
        font-weight: bold !important;
        font-size: 16px !important;
      }

      /* 6. GRID LAYOUT Y AJUSTES */
      body .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 50px !important;
        row-gap: 25px !important;
        align-items: end !important;
      }

      body .banesco-question-row { grid-column: 1 / -1 !important; order: 1 !important; text-align: center !important; margin-bottom: 10px !important; }
      body .banesco-radio-wrapper { display: flex !important; align-items: center !important; justify-content: center !important; gap: 60px !important; }
      body .banesco-submit-wrap { order: 100 !important; grid-column: 1 / -1 !important; margin-top: 30px !important; text-align: center !important; }
      
      body .banesco-field-empresa { order: 10 !important; grid-column: 1 / 2 !important; }
      body .banesco-field-persona { order: 20 !important; grid-column: 2 / 3 !important; }
      body .banesco-field-nacionalidad { order: 30 !important; grid-column: 1 / 2 !important; }
      body .banesco-field-documento { order: 40 !important; grid-column: 2 / 3 !important; }
      body .banesco-field-actividad { order: 50 !important; grid-column: 1 / 2 !important; }
      body .banesco-field-telefono { order: 60 !important; grid-column: 2 / 3 !important; }
      body .banesco-field-estado { order: 70 !important; grid-column: 1 / 2 !important; }
      body .banesco-field-correo { order: 80 !important; grid-column: 2 / 3 !important; }
      body .banesco-field-agencia { order: 90 !important; grid-column: 1 / 2 !important; }

      body .x-form-required-field { display: none !important; }
      body input[type="radio"] { accent-color: #007a63 !important; }

      @media screen and (max-width: 768px) {
        body .banesco-card { padding: 30px 20px !important; border-radius: 25px !important; }
        body .banesco-grid { grid-template-columns: 1fr !important; }
        body .banesco-field { grid-column: 1 / -1 !important; }
      }
    `;
    
    // Lo agregamos al final del body para que tenga prioridad sobre el head
    document.body.appendChild(style);

    // EL VIGILANTE: Si algo cambia en el body, nos aseguramos de que nuestro estilo vuelva al final
    var observer = new MutationObserver(function() {
      var myStyle = document.getElementById("banesco-v35-css");
      if (myStyle && document.body.lastChild !== myStyle) {
        document.body.appendChild(myStyle);
      }
    });
    observer.observe(document.body, { childList: true });
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

    // Ocultar textos basura originales
    Array.prototype.slice.call(container.querySelectorAll("h1, h2, h3, h4, p, .x-component")).forEach(function (node) {
      var txt = normalize(node.innerText || node.textContent || "");
      if (txt.indexOf("nos acercamos") !== -1 || txt.indexOf("notamos que est") !== -1 || txt.indexOf("producto de") !== -1) {
        node.style.display = "none";
      }
    });

    while (container.firstChild) { container.removeChild(container.firstChild); }
    container.classList.add("banesco-form-root");
    container.appendChild(title); container.appendChild(intro); container.appendChild(grid);
    hiddenInputs.forEach(function (input) { container.appendChild(input); });

    container.parentNode.insertBefore(shell, container);
    shell.appendChild(card); card.appendChild(container);

    applied = true; return true;
  }

  function apply() {
    var container = findFormContainer();
    if (!container) return false;

    var ok = buildLayout(container);
    if (ok) {
      injectCSS(); // Se inyecta después de construir para que sea lo último
      console.log("Banesco PDV final v35 (Observer Pattern) aplicado.");
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
