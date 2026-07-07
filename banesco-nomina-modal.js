(function () {
  var APPLIED = false;
  var TRY_COUNT = 0;
  var MAX_TRIES = 60;

  function injectStyles() {
    if (document.getElementById("dc-banesco-fields-styles")) return;

    var style = document.createElement("style");
    style.id = "dc-banesco-fields-styles";
    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        font-family: Arial, Helvetica, sans-serif !important;
      }

      body {
        overflow-x: hidden !important;
      }

      .dc-clean-host,
      .dc-clean-host * {
        box-sizing: border-box !important;
      }

      .dc-clean-host {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .dc-clean-grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        column-gap: 26px !important;
        row-gap: 14px !important;
        width: 100% !important;
        align-items: end !important;
      }

      .dc-clean-item {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        width: 100% !important;
      }

      .dc-clean-item.dc-full {
        grid-column: 1 / -1 !important;
      }

      .dc-clean-item label,
      .dc-clean-item .x-form-item-label,
      .dc-clean-item .x-form-cb-label {
        display: block !important;
        margin: 0 0 6px 0 !important;
        font-size: 12px !important;
        line-height: 1.25 !important;
        color: #98b8ae !important;
        font-weight: 400 !important;
        white-space: normal !important;
      }

      .dc-clean-item input[type="text"],
      .dc-clean-item input[type="email"],
      .dc-clean-item input[type="number"],
      .dc-clean-item input[type="tel"],
      .dc-clean-item input[type="password"],
      .dc-clean-item select,
      .dc-clean-item textarea,
      .dc-clean-item .x-form-text,
      .dc-clean-item .x-form-field {
        width: 100% !important;
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #d9e4e0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        outline: none !important;
        padding: 6px 2px !important;
        font-size: 14px !important;
        color: #4a4a4a !important;
        height: auto !important;
      }

      .dc-clean-item textarea {
        resize: vertical !important;
        min-height: 36px !important;
      }

      .dc-clean-item input::placeholder,
      .dc-clean-item textarea::placeholder {
        color: #a9c1ba !important;
        opacity: 1 !important;
      }

      .dc-clean-item .x-form-item-body,
      .dc-clean-item .x-form-field-wrap,
      .dc-clean-item .x-form-trigger-wrap {
        width: 100% !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .dc-clean-item .x-form-trigger {
        border: 0 !important;
        background-color: transparent !important;
      }

      .dc-clean-host .dc-submit-wrap {
        grid-column: 1 / -1 !important;
        margin-top: 12px !important;
      }

      .dc-clean-host input[type="submit"],
      .dc-clean-host button,
      .dc-clean-host .x-btn button {
        background: #007a63 !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 20px !important;
        padding: 10px 18px !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        box-shadow: none !important;
      }

      .dc-clean-host input[type="submit"]:hover,
      .dc-clean-host button:hover {
        background: #006650 !important;
      }

      @media screen and (max-width: 768px) {
        .dc-clean-grid {
          grid-template-columns: 1fr !important;
        }

        .dc-clean-item.dc-full {
          grid-column: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function textOf(el) {
    return (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function findHost() {
    var form = document.querySelector("form");
    if (form && form.querySelectorAll("input, select, textarea").length >= 3) {
      return form;
    }

    var candidates = Array.from(document.querySelectorAll("div"));
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

  function unique(arr) {
    return Array.from(new Set(arr));
  }

  function closestFieldBlock(el) {
    var current = el;
    while (current && current !== document.body) {
      var t = current.tagName ? current.tagName.toLowerCase() : "";
      if (
        current.classList &&
        (
          current.classList.contains("x-form-item") ||
          current.classList.contains("form-group") ||
          current.classList.contains("field") ||
          current.classList.contains("form-field")
        )
      ) {
        return current;
      }

      if (t === "td" || t === "li") {
        return current;
      }

      current = current.parentElement;
    }
    return el.parentElement || el;
  }

  function collectFieldBlocks(host) {
    var blocks = Array.from(host.querySelectorAll(".x-form-item"))
      .filter(function (el) {
        return el.querySelector("input, select, textarea");
      });

    if (blocks.length) return blocks;

    var fields = Array.from(host.querySelectorAll("input, select, textarea"));
    blocks = unique(
      fields.map(function (field) {
        return closestFieldBlock(field);
      })
    ).filter(Boolean);

    return blocks;
  }

  function hideDecorativeContent(host) {
    var candidates = Array.from(
      host.querySelectorAll("h1, h2, h3, h4, p, .title, .subtitle, .x-panel-header, .x-window-header")
    );

    candidates.forEach(function (el) {
      var txt = textOf(el);

      if (
        txt.indexOf("nos acercamos a ti") !== -1 ||
        txt.indexOf("te gustaría que un ejecutivo") !== -1 ||
        txt.indexOf("producto de nómina") !== -1 ||
        txt.indexOf("producto de nomina") !== -1
      ) {
        el.style.display = "none";
      }
    });
  }

  function markSpecialBlocks(block) {
    var txt = textOf(block);

    if (
      txt.indexOf("indícanos nombre de persona contacto") !== -1 ||
      txt.indexOf("indicanos nombre de persona contacto") !== -1 ||
      txt.indexOf("selecciona la agencia") !== -1 ||
      txt.indexOf("agencia de tu preferencia") !== -1
    ) {
      block.classList.add("dc-full");
    }
  }

  function setProductValue(block) {
    var txt = textOf(block);

    if (txt.indexOf("producto") !== -1) {
      var input = block.querySelector("input, select, textarea");
      if (input) {
        if (input.tagName.toLowerCase() === "select") {
          var found = false;
          Array.from(input.options).forEach(function (opt) {
            if (
              (opt.value || "").toLowerCase() === "puntoventa" ||
              (opt.text || "").toLowerCase() === "puntoventa" ||
              (opt.text || "").toLowerCase() === "punto de venta"
            ) {
              input.value = opt.value;
              found = true;
            }
          });
          if (!found) {
            input.value = "PuntoVenta";
          }
        } else {
          input.value = "PuntoVenta";
        }
        input.readOnly = true;
      }

      block.style.display = "none";
      return true;
    }

    return false;
  }

  function moveFieldsToGrid(host) {
    if (host.querySelector(".dc-clean-grid")) return;

    var fieldBlocks = collectFieldBlocks(host);
    if (!fieldBlocks.length) return;

    var grid = document.createElement("div");
    grid.className = "dc-clean-grid";

    fieldBlocks.forEach(function (block) {
      if (!block || !block.parentNode) return;

      if (setProductValue(block)) return;

      var txt = textOf(block);

      if (
        txt.indexOf("nos acercamos a ti") !== -1 ||
        txt.indexOf("te gustaría que un ejecutivo") !== -1 ||
        txt.indexOf("te gustaria que un ejecutivo") !== -1
      ) {
        block.style.display = "none";
        return;
      }

      block.classList.add("dc-clean-item");
      markSpecialBlocks(block);
      grid.appendChild(block);
    });

    var submitButtons = Array.from(host.querySelectorAll('input[type="submit"], button, .x-btn'));

    if (submitButtons.length) {
      var submitWrap = document.createElement("div");
      submitWrap.className = "dc-submit-wrap";

      submitButtons.forEach(function (btn) {
        if (btn && btn.parentNode) {
          submitWrap.appendChild(btn);
        }
      });

      grid.appendChild(submitWrap);
    }

    while (host.firstChild) {
      host.removeChild(host.firstChild);
    }

    host.appendChild(grid);
  }

  function applyCleanMode() {
    if (APPLIED) return true;

    var host = findHost();
    if (!host) return false;

    injectStyles();
    hideDecorativeContent(host);

    host.classList.add("dc-clean-host");
    moveFieldsToGrid(host);

    APPLIED = true;
    console.log("DANAconnect Banesco fields-only aplicado correctamente.");
    return true;
  }

  function waitForForm() {
    TRY_COUNT++;
    var ok = applyCleanMode();

    if (ok) return;

    if (TRY_COUNT < MAX_TRIES) {
      setTimeout(waitForForm, 250);
    } else {
      console.warn("No se pudo aplicar el modo solo-campos.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForForm);
  } else {
    waitForForm();
  }
})();
