(function () {
  var attempts = 0;
  var maxAttempts = 200;
  var applied = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  // CSS inyectado en formato clásico (sin comillas invertidas)
  function injectGridCSS() {
    if (document.getElementById("banesco-v36-css")) return;
    var style = document.createElement("style");
    style.id = "banesco-v36-css";
    style.innerHTML = 
      "html body .banesco-shell { width: 100% !important; max-width: 800px !important; margin: 20px auto !important; padding: 0 15px !important; box-sizing: border-box !important; }\n" +
      "html body .banesco-card { background: #ffffff !important; border-radius: 40px !important; padding: 50px !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important; box-sizing: border-box !important; }\n" +
      "html body .banesco-form-root { position: relative !important; z-index: 2 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }\n" +
      "html body .banesco-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; column-gap: 50px !important; row-gap: 25px !important; align-items: end !important; width: 100% !important; }\n" +
      "html body .banesco-question-row { grid-column: 1 / -1 !important; order: 1 !important; text-align: center !important; margin-bottom: 20px !important; }\n" +
      "html body .banesco-radio-wrapper { display: flex !important; align-items: center !important; justify-content: center !important; gap: 60px !important; }\n" +
      "html body .banesco-submit-wrap { order: 100 !important; grid-column: 1 / -1 !important; margin-top: 30px !important; text-align: center !important; }\n" +
      "html body .banesco-field-empresa { order: 10 !important; grid-column: 1 / 2 !important; }\n" +
      "html body .banesco-field-persona { order: 20 !important; grid-column: 2 / 3 !important; }\n" +
      "html body .banesco-field-nacionalidad { order: 30 !important; grid-column: 1 / 2 !important; }\n" +
      "html body .banesco-field-documento { order: 40 !important; grid-column: 2 / 3 !important; }\n" +
      "html body .banesco-field-actividad { order: 50 !important; grid-column: 1 / 2 !important; }\n" +
      "html body .banesco-field-telefono { order: 60 !important; grid-column: 2 / 3 !important; }\n" +
      "html body .banesco-field-estado { order: 70 !important; grid-column: 1 / 2 !important; }\n" +
      "html body .banesco-field-correo { order: 80 !important; grid-column: 2 / 3 !important; }\n" +
      "html body .banesco-field-agencia { order: 90 !important; grid-column: 1 / 2 !important; }\n" +
      "@media screen and (max-width: 768px) {\n" +
      "  html body .banesco-card { padding: 30px 20px !important; border-radius: 25px !important; }\n" +
      "  html body .banesco-grid { grid-template-columns: 1fr !important; }\n" +
      "  html body .banesco-field { grid-column: 1 / -1 !important; }\n" +
      "}";
    document.getElementsByTagName("head")[0].appendChild(style);
  }

  function findFormContainer() {
    var forms = document.getElementsByTagName("form");
    var bestForm = null;
    var bestCount = 0;
    for (var i = 0; i < forms.length; i++) {
      var count = forms[i].getElementsByTagName("input").length + forms[i].getElementsByTagName("select").length;
      if (count > bestCount) { bestForm = forms[i]; bestCount = count; }
    }
    if (bestForm && bestCount >= 3) return bestForm;

    var candidates = document.getElementsByTagName("div");
    var best = null;
    var max = 0;
    for (var j = 0; j < candidates.length; j++) {
      var cCount = candidates[j].getElementsByTagName("input").length;
      if (cCount > max) { best = candidates[j]; max = cCount; }
    }
    return max >= 3 ? best : null;
  }

  function getFieldBlocks(container) {
    var items = container.querySelectorAll(".x-form-item");
    var results = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].querySelector("input, select, textarea")) {
        results.push(items[i]);
      }
    }
    return results;
  }

  function isRadioBlock(block) {
    return block.querySelectorAll('input[type="radio"]').length > 0;
  }

  function classify(block) {
    var txt = normalize(block.innerText || block.textContent || "");
    block.className += " banesco-field";
    if (txt.indexOf("empresa") !== -1) { block.className += " banesco-field-empresa"; return; }
    if (txt.indexOf("actividad econ") !== -1 || txt.indexOf("actividad economica") !== -1) { block.className += " banesco-field-actividad"; return; }
    if (txt.indexOf("nacionalidad") !== -1) { block.className += " banesco-field-nacionalidad"; return; }
    if (txt.indexOf("documento") !== -1 || txt.indexOf("rif") !== -1 || txt.indexOf("identidad") !== -1) { block.className += " banesco-field-documento"; return; }
    if (txt.indexOf("persona contacto") !== -1 || txt.indexOf("nombre") !== -1) { block.className += " banesco-field-persona"; return; }
    if (txt.indexOf("correo") !== -1 || txt.indexOf("email") !== -1) { block.className += " banesco-field-correo"; return; }
    if (txt.indexOf("tel") !== -1 || txt.indexOf("celular") !== -1) { block.className += " banesco-field-telefono"; return; }
    if (txt.indexOf("estado") !== -1) { block.className += " banesco-field-estado"; return; }
    if (txt.indexOf("agencia") !== -1) { block.className += " banesco-field-agencia"; }
  }

  function hideProductOrTechnical(block) {
    var txt = normalize(block.innerText || block.textContent || "");
    if (txt.indexOf("producto") !== -1) {
      var inputs = block.getElementsByTagName("input");
      if (inputs.length > 0) { inputs[0].value = "Nomina"; inputs[0].setAttribute("value", "Nomina"); }
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

    var hiddenInputs = container.querySelectorAll('input[type="hidden"]');
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

    for (var i = 0; i < blocks.length; i++) {
      if (hideProductOrTechnical(blocks[i])) continue;
      if (isRadioBlock(blocks[i])) { radioBlocks.push(blocks[i]); } 
      else { classify(blocks[i]); fieldBlocks.push(blocks[i]); }
    }

    if (radioBlocks.length) {
      var questionWrapper = document.createElement("div"); questionWrapper.className = "banesco-question-row";
      var questionText = document.createElement("div"); questionText.className = "banesco-question-text";
      questionText.textContent = "¿Te gustaría que un ejecutivo de Banesco te contactara?";
      var radioWrapper = document.createElement("div"); radioWrapper.className = "banesco-radio-wrapper";
      
      for (var r = 0; r < radioBlocks.length; r++) {
        radioBlocks[r].className += " banesco-field";
        radioWrapper.appendChild(radioBlocks[r]);
      }
      questionWrapper.appendChild(questionText); questionWrapper.appendChild(radioWrapper);
      grid.appendChild(questionWrapper);
    }

    for (var f = 0; f < fieldBlocks.length; f++) {
      grid.appendChild(fieldBlocks[f]);
    }

    var submits = container.querySelectorAll('input[type="submit"], button[type="submit"], .x-btn');
    if (submits.length > 0) {
      var submitWrap = document.createElement("div"); submitWrap.className = "banesco-submit-wrap";
      submitWrap.appendChild(submits[0]); grid.appendChild(submitWrap);
    }

    // Ocultar basura con bucle seguro
    var nodes = container.querySelectorAll("h1, h2, h3, h4, p, .x-component");
    for (var n = 0; n < nodes.length; n++) {
      var txt = normalize(nodes[n].innerText || nodes[n].textContent || "");
      if (txt.indexOf("nos acercamos") !== -1 || txt.indexOf("notamos que est") !== -1 || txt.indexOf("producto de") !== -1) {
        nodes[n].style.display = "none";
      }
    }

    while (container.firstChild) { container.removeChild(container.firstChild); }
    container.className += " banesco-form-root";
    container.appendChild(title); container.appendChild(intro); container.appendChild(grid);
    
    for (var h = 0; h < hiddenInputs.length; h++) {
      container.appendChild(hiddenInputs[h]);
    }

    container.parentNode.insertBefore(shell, container);
    shell.appendChild(card); card.appendChild(container);

    applied = true; return true;
  }

  // BUCLE DE ESTILOS SEGURO (Sin sintaxis moderna para evitar cuelgues)
  function forceStylesClassic() {
    setInterval(function() {
      try {
        var i, els;

        // 1. Eliminar barra gris de ExtJS
        els = document.querySelectorAll(".x-panel-header, .x-window-header, .x-docked-top, .x-toolbar, .x-panel-header-default, .x-header, .x-border-layout-ct");
        for (i = 0; i < els.length; i++) {
          if (els[i] && els[i].parentNode) {
            els[i].parentNode.removeChild(els[i]);
          }
        }

        // 2. Transparencias en contenedores de DANA
        els = document.querySelectorAll(".x-panel, .x-panel-body, .x-form, .x-window, .x-window-body, .x-panel-default");
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("background", "transparent", "important");
          els[i].style.setProperty("border", "none", "important");
          els[i].style.setProperty("box-shadow", "none", "important");
        }

        // 3. Títulos y etiquetas en Verde Banesco
        els = document.querySelectorAll(".banesco-title, label, .x-form-item-label, .x-form-cb-label");
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("color", "#007a63", "important");
          els[i].style.setProperty("font-weight", "bold", "important");
          els[i].style.setProperty("font-family", "Arial, Helvetica, sans-serif", "important");
        }
        
        els = document.querySelectorAll(".banesco-title");
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("font-size", "30px", "important");
          els[i].style.setProperty("text-align", "center", "important");
          els[i].style.setProperty("margin-bottom", "10px", "important");
        }

        els = document.querySelectorAll(".banesco-question-text");
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("color", "#555555", "important");
          els[i].style.setProperty("font-size", "15px", "important");
          els[i].style.setProperty("font-family", "Arial, Helvetica, sans-serif", "important");
        }

        // 4. Inputs diseño de línea
        els = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select, textarea');
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("border-top", "none", "important");
          els[i].style.setProperty("border-left", "none", "important");
          els[i].style.setProperty("border-right", "none", "important");
          els[i].style.setProperty("border-bottom", "1px solid #cccccc", "important");
          els[i].style.setProperty("background", "transparent", "important");
          els[i].style.setProperty("border-radius", "0", "important");
          els[i].style.setProperty("box-shadow", "none", "important");
          els[i].style.setProperty("padding", "6px 0", "important");
          els[i].style.setProperty("outline", "none", "important");
        }

        // 5. Botones verdes
        els = document.querySelectorAll('input[type="submit"], button[type="submit"], .banesco-submit-wrap .x-btn');
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("background", "#007a63", "important");
          els[i].style.setProperty("background-color", "#007a63", "important");
          els[i].style.setProperty("border", "none", "important");
          els[i].style.setProperty("border-radius", "30px", "important");
          els[i].style.setProperty("padding", "12px 30px", "important");
          els[i].style.setProperty("background-image", "none", "important");
          els[i].style.setProperty("cursor", "pointer", "important");
        }
        
        els = document.querySelectorAll('.x-btn-inner, .x-btn-inner-default-small');
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("color", "#ffffff", "important");
          els[i].style.setProperty("font-weight", "bold", "important");
          els[i].style.setProperty("font-size", "16px", "important");
        }

        // 6. Quitar asteriscos rojos y bordes de cajones
        els = document.querySelectorAll(".x-form-required-field");
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("display", "none", "important");
        }
        els = document.querySelectorAll(".x-form-text-wrap, .x-form-trigger-wrap, .x-form-item-body");
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("border", "none", "important");
          els[i].style.setProperty("background", "transparent", "important");
        }

        // 7. Acento de radio buttons
        els = document.querySelectorAll('input[type="radio"]');
        for (i = 0; i < els.length; i++) {
          els[i].style.setProperty("accent-color", "#007a63", "important");
        }

      } catch (e) {
        console.log("Error aplicando estilos inline:", e);
      }
    }, 100);
  }

  function apply() {
    injectGridCSS(); 
    var container = findFormContainer();
    if (!container) return false;

    var ok = buildLayout(container);
    if (ok) {
      forceStylesClassic(); // Inicia el pintado en verde seguro
      console.log("Banesco PDV final v36 aplicado.");
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
