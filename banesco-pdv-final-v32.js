(function () {
  var attempts = 0;
  var maxAttempts = 200;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  // Mantenemos solo el CSS estrictamente necesario para la estructura de la grilla
  function injectGridCSS() {
    if (document.getElementById("banesco-pdv-grid-css")) return;
    var style = document.createElement("style");
    style.id = "banesco-pdv-grid-css";
    style.innerHTML = `
      .banesco-shell { width: 100% !important; max-width: 800px !important; margin: 0 auto !important; padding: 20px 15px !important; box-sizing: border-box !important; }
      .banesco-card { position: relative !important; background: #ffffff !important; border-radius: 40px !important; padding: 50px !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important; box-sizing: border-box !important; }
      .banesco-form-root { position: relative !important; z-index: 2 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
      .banesco-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; column-gap: 50px !important; row-gap: 25px !important; align-items: end !important; width: 100% !important; }
      .banesco-question-row { grid-column: 1 / -1 !important; order: 1 !important; text-align: center !important; margin-bottom: 20px !important; }
      .banesco-radio-wrapper { display: flex !important; align-items: center !important; justify-content: center !important; gap: 60px !important; }
      .banesco-submit-wrap { order: 100 !important; grid-column: 1 / -1 !important; margin-top: 30px !important; text-align: center !important; }
      
      .banesco-field-empresa { order: 10 !important; grid-column: 1 / 2 !important; }
      .banesco-field-persona { order: 20 !important; grid-column: 2 / 3 !important; }
      .banesco-field-nacionalidad { order: 30 !important; grid-column: 1 / 2 !important; }
      .banesco-field-documento { order: 40 !important; grid-column: 2 / 3 !important; }
      .banesco-field-actividad { order: 50 !important; grid-column: 1 / 2 !important; }
      .banesco-field-telefono { order: 60 !important; grid-column: 2 / 3 !important; }
      .banesco-field-estado { order: 70 !important; grid-column: 1 / 2 !important; }
      .banesco-field-correo { order: 80 !important; grid-column: 2 / 3 !important; }
      .banesco-field-agencia { order: 90 !important; grid-column: 1 / 2 !important; }
      
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

    // Títulos creados e inyectados por JS
    var title = document.createElement("div");
    title.className = "banesco-title";
    title.textContent = "¡Nos acercamos a ti!";
    
    var intro = document.createElement("div");
    intro.className = "banesco-question-text";
    intro.textContent = "Notamos que estás interesado en nuestro producto de Nómina.";
    intro.style.marginBottom = "30px";

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

  // EL MOTOR JAVASCRIPT: Inyecta los estilos línea por línea en el DOM cada 50ms
  function forceStylesPureJS() {
    setInterval(function() {
      // 1. DESTRUIR LA BARRA GRIS
      var headers = document.querySelectorAll('.x-panel-header, .x-window-header, .x-docked-top, .x-toolbar, .x-panel-header-default, .x-header');
      headers.forEach(function(h) {
        h.style.setProperty('display', 'none', 'important');
        h.style.setProperty('height', '0', 'important');
        h.style.setProperty('visibility', 'hidden', 'important');
      });

      // 2. FONDOS TOTALMENTE TRANSPARENTES
      var bgs = document.querySelectorAll('.x-panel, .x-panel-body, .x-form, .x-window, .x-window-body, body, html, .x-panel-default');
      bgs.forEach(function(bg) {
        bg.style.setProperty('background', 'transparent', 'important');
        bg.style.setProperty('background-color', 'transparent', 'important');
        bg.style.setProperty('background-image', 'none', 'important');
        bg.style.setProperty('border', 'none', 'important');
        bg.style.setProperty('box-shadow', 'none', 'important');
      });

      // 3. TEXTOS EN VERDE (#007a63)
      var texts = document.querySelectorAll('.banesco-title, label, .x-form-item-label, .x-form-cb-label');
      texts.forEach(function(t) {
        t.style.setProperty('color', '#007a63', 'important');
        t.style.setProperty('font-family', 'Arial, Helvetica, sans-serif', 'important');
        t.style.setProperty('font-weight', 'bold', 'important');
        t.style.setProperty('font-size', '14px', 'important');
      });

      var normalTexts = document.querySelectorAll('.banesco-question-text');
      normalTexts.forEach(function(nt) {
        nt.style.setProperty('color', '#333333', 'important');
        nt.style.setProperty('font-family', 'Arial, Helvetica, sans-serif', 'important');
        nt.style.setProperty('font-size', '16px', 'important');
        if (nt.textContent.indexOf('¡Nos acercamos') !== -1) {
           nt.style.setProperty('color', '#007a63', 'important');
           nt.style.setProperty('font-size', '30px', 'important');
           nt.style.setProperty('font-weight', 'bold', 'important');
        }
      });

      // 4. INPUTS ESTILO LÍNEA (MATERIAL DESIGN)
      var inputs = document.querySelectorAll('.banesco-field input[type="text"], .banesco-field input[type="email"], .banesco-field input[type="tel"], .banesco-field select, .x-form-text, .x-form-field');
      inputs.forEach(function(i) {
        if (i.type === 'submit' || i.type === 'button' || i.type === 'radio') return;
        i.style.setProperty('background', 'transparent', 'important');
        i.style.setProperty('background-color', 'transparent', 'important');
        i.style.setProperty('border-top', 'none', 'important');
        i.style.setProperty('border-left', 'none', 'important');
        i.style.setProperty('border-right', 'none', 'important');
        i.style.setProperty('border-bottom', '1px solid #007a63', 'important');
        i.style.setProperty('border-radius', '0', 'important');
        i.style.setProperty('box-shadow', 'none', 'important');
        i.style.setProperty('outline', 'none', 'important');
        i.style.setProperty('color', '#333333', 'important');
        i.style.setProperty('padding', '6px 0', 'important');
      });

      // 5. LIMPIAR CAJAS ENVOLVENTES DE EXTJS
      var wraps = document.querySelectorAll('.x-form-text-wrap, .x-form-trigger-wrap, .x-form-item-body');
      wraps.forEach(function(w) {
        w.style.setProperty('border', 'none', 'important');
        w.style.setProperty('background', 'transparent', 'important');
        w.style.setProperty('box-shadow', 'none', 'important');
      });

      // 6. BOTÓN DE ENVIAR VERDE REDONDO
      var btns = document.querySelectorAll('input[type="submit"], button[type="submit"], .banesco-submit-wrap .x-btn, .x-btn-default-small');
      btns.forEach(function(b) {
        b.style.setProperty('background', '#007a63', 'important');
        b.style.setProperty('background-color', '#007a63', 'important');
        b.style.setProperty('background-image', 'none', 'important');
        b.style.setProperty('border', 'none', 'important');
        b.style.setProperty('border-radius', '25px', 'important');
        b.style.setProperty('padding', '10px 40px', 'important');
        b.style.setProperty('box-shadow', 'none', 'important');
        // Quitar estilos por defecto
        b.style.setProperty('min-width', '150px', 'important');
      });
      document.querySelectorAll('.x-btn-inner').forEach(function(inner) {
        inner.style.setProperty('color', '#ffffff', 'important');
        inner.style.setProperty('font-weight', 'bold', 'important');
        inner.style.setProperty('font-size', '16px', 'important');
      });

      // 7. RADIO BUTTONS VERDES Y QUITAR ASTERISCOS
      document.querySelectorAll('input[type="radio"]').forEach(function(r) {
        r.style.setProperty('accent-color', '#007a63', 'important');
        r.style.setProperty('transform', 'scale(1.2)', 'important');
      });
      document.querySelectorAll('.x-form-required-field').forEach(function(req) {
        req.style.setProperty('display', 'none', 'important');
      });

    }, 50); // Se ejecuta extremadamente rápido (20 veces por segundo) para forzar los estilos inline
  }

  function apply() {
    injectGridCSS(); // Solo para la maqueta
    var container = findFormContainer();
    if (!container) return false;

    var ok = buildLayout(container);
    if (ok) {
      forceStylesPureJS(); // Inyecta el diseño puro en los atributos
      console.log("Banesco PDV final v32 (SIEMPRE JS) aplicado.");
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
