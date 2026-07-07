(function () {
  var attempts = 0;
  var maxAttempts = 200;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function injectCSS() {
    if (document.getElementById("banesco-pdv-final-v31-css")) return;

    var style = document.createElement("style");
    style.id = "banesco-pdv-final-v31-css";

    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        background-color: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      /* Fondos transparentes generales para matar lo gris de fondo */
      .x-panel, .x-panel-body, .x-form, .x-container, .x-window, .x-window-body, .x-panel-default, .x-body {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .banesco-shell {
        width: 100% !important;
        max-width: 800px !important;
        margin: 0 auto !important;
        padding: 20px 15px !important;
        box-sizing: border-box !important;
      }

      .banesco-card {
        position: relative !important;
        background: #ffffff !important;
        border-radius: 40px !important;
        padding: 50px !important;
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
      }

      .banesco-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 50px !important;
        row-gap: 30px !important;
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
        gap: 60px !important;
      }

      .banesco-field {
        margin: 0 !important;
        padding: 0 !important;
        position: relative !important;
      }

      /* ORDEN DE CAMPOS */
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
        margin-top: 30px !important;
        text-align: center !important;
      }

      .banesco-hidden {
        display: none !important;
        opacity: 0 !important;
        height: 0 !important;
      }

      @media screen and (max-width: 768px) {
        .banesco-card { padding: 30px 20px !important; border-radius: 25px !important; }
        .banesco-grid { grid-template-columns: 1fr !important; }
        .banesco-field { grid-column: 1 / -1 !important; }
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
    return Array.prototype.slice.call(container.querySelectorAll(".x-form-item"))
      .filter(function (block) { return block.querySelector("input, select, textarea"); });
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
      block.classList.add("banesco-hidden");
      return true;
    }
    if (txt === "text" || txt.indexOf("text ") === 0) {
      block.classList.add("banesco-hidden");
      return true;
    }
    return false;
  }

  function hideOriginalTexts(container) {
    var nodes = Array.prototype.slice.call(container.querySelectorAll("h1, h2, h3, h4, p, .x-component"));
    nodes.forEach(function (node) {
      var txt = normalize(node.innerText || node.textContent || "");
      if (txt.indexOf("nos acercamos") !== -1 || txt.indexOf("notamos que est") !== -1 || txt.indexOf("producto de") !== -1) {
        node.classList.add("banesco-hidden");
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

    // Título Inyectado directamente con estilos en línea
    var title = document.createElement("div");
    title.className = "banesco-title";
    title.textContent = "¡Nos acercamos a ti!";
    title.style.color = "#007a63";
    title.style.fontSize = "32px";
    title.style.fontWeight = "bold";
    title.style.textAlign = "center";
    title.style.marginBottom = "15px";

    var intro = document.createElement("div");
    intro.className = "banesco-intro";
    intro.textContent = "Notamos que estás interesado en nuestro producto de Nómina.";
    intro.style.color = "#555555";
    intro.style.textAlign = "center";
    intro.style.marginBottom = "40px";

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

  // --- MODO NUCLEAR: Bucle constante que destruye y formatea el DOM ---
  function nukeAndForceStyles() {
    setInterval(function() {
      // 1. Destruir la barra gris de ExtJS eliminándola del DOM
      var villains = document.querySelectorAll('.x-panel-header, .x-window-header, .x-docked-top, .x-toolbar, .x-border-layout-ct');
      villains.forEach(function(v) {
        if(v && v.parentNode) {
          v.parentNode.removeChild(v);
        }
      });

      // 2. Forzar Textos en VERDE BANESCO (Labels, Checkboxes)
      document.querySelectorAll('.banesco-form-root label, .banesco-form-root .x-form-item-label, .x-form-cb-label').forEach(function(el) {
        el.style.setProperty('color', '#007a63', 'important');
        el.style.setProperty('font-weight', 'bold', 'important');
        el.style.setProperty('font-size', '14px', 'important');
      });

      // 3. Forzar Inputs estilo Material Design (Sin caja, solo línea)
      document.querySelectorAll('.banesco-field input[type="text"], .banesco-field input[type="email"], .banesco-field input[type="tel"], .banesco-field select, .banesco-field .x-form-field').forEach(function(el) {
        el.style.setProperty('border', 'none', 'important');
        el.style.setProperty('border-bottom', '1px solid #cccccc', 'important');
        el.style.setProperty('background', 'transparent', 'important');
        el.style.setProperty('box-shadow', 'none', 'important');
        el.style.setProperty('border-radius', '0', 'important');
        el.style.setProperty('padding', '6px 0', 'important');
      });

      // 4. Limpiar los wrappers que ExtJS pone alrededor de los inputs
      document.querySelectorAll('.banesco-field .x-form-text-wrap, .banesco-field .x-form-trigger-wrap, .banesco-field .x-form-item-body').forEach(function(el) {
        el.style.setProperty('border', 'none', 'important');
        el.style.setProperty('background', 'transparent', 'important');
        el.style.setProperty('box-shadow', 'none', 'important');
      });

      // 5. Botón Enviar
      document.querySelectorAll('.banesco-submit-wrap .x-btn, .banesco-submit-wrap button, .banesco-submit-wrap input[type="submit"]').forEach(function(btn) {
        btn.style.setProperty('background', '#007a63', 'important');
        btn.style.setProperty('background-color', '#007a63', 'important');
        btn.style.setProperty('color', '#ffffff', 'important');
        btn.style.setProperty('border', 'none', 'important');
        btn.style.setProperty('border-radius', '30px', 'important');
        btn.style.setProperty('padding', '12px 35px', 'important');
      });

      // 6. Radio Buttons (Acento verde)
      document.querySelectorAll('input[type="radio"]').forEach(function(rad) {
        rad.style.setProperty('accent-color', '#007a63', 'important');
      });

      // Ocultar asteriscos rojos
      document.querySelectorAll('.x-form-required-field').forEach(function(ast) {
        ast.style.setProperty('display', 'none', 'important');
      });

    }, 200); // Ejecutar cada 200ms para asegurar que DANA no lo sobreescriba
  }

  function apply() {
    injectCSS();
    var container = findFormContainer();
    if (!container) return false;

    var ok = buildLayout(container);
    if (ok) {
      nukeAndForceStyles(); // Iniciar el modo nuclear
      console.log("Banesco PDV final v31 (Nuclear) aplicado.");
    }
    return ok;
  }

  function wait() {
    attempts++;
    if (apply()) return;
    if (attempts < maxAttempts) {
      setTimeout(wait, 150);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wait);
  } else {
    wait();
  }
})();
