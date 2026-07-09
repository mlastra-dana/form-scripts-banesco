(function () {
  var attempts = 0;
  var maxAttempts = 120;

  var CONFIG = {
    formId: "form_8479",
    containerId: "form_container",
    productValue: "PuntosVenta",
    title: "¡Nos acercamos a ti!",
    intro: "Notamos que estás interesado en nuestros Puntos de Venta"
  };

  function get(id) {
    return document.getElementById(id);
  }

  function setStyle(el, styles) {
    if (!el) return;
    Object.keys(styles).forEach(function (key) {
      el.style.setProperty(key, styles[key], "important");
    });
  }

  function hide(el) {
    if (!el) return;
    setStyle(el, {
      "display": "none",
      "height": "0",
      "min-height": "0",
      "max-height": "0",
      "margin": "0",
      "padding": "0",
      "border": "0",
      "overflow": "hidden",
      "visibility": "hidden"
    });
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function applyGlobalBase() {
    setStyle(document.documentElement, {
      "margin": "0",
      "padding": "0",
      "background": "#ffffff"
    });

    setStyle(document.body, {
      "margin": "0",
      "padding": "0",
      "background": "#ffffff",
      "font-family": "Arial, Helvetica, sans-serif"
    });
  }

  function removeOriginalDecorations(formContainer, form) {
    Array.from(formContainer.children).forEach(function (child) {
      if (child === form || child.id === "banesco_custom_header") return;

      var hasField = child.querySelector && child.querySelector("input, select, textarea, button");
      var txt = normalize(child.innerText || child.textContent || "");

      if (!hasField || txt.indexOf("nos acercamos") !== -1) {
        hide(child);
      }
    });

    Array.from(form.querySelectorAll("h1, h2, h3, h4, p, .form_description")).forEach(function (el) {
      var txt = normalize(el.innerText || el.textContent || "");
      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("notamos que") !== -1 ||
        txt.indexOf("puntos de venta") !== -1
      ) {
        hide(el);
      }
    });
  }

  function createHeader(form) {
    var existing = get("banesco_custom_header");
    if (existing) return;

    var header = document.createElement("div");
    header.id = "banesco_custom_header";

    var title = document.createElement("div");
    title.id = "banesco_custom_title";
    title.textContent = CONFIG.title;

    var intro = document.createElement("div");
    intro.id = "banesco_custom_intro";
    intro.textContent = CONFIG.intro;

    header.appendChild(title);
    header.appendChild(intro);
    form.insertBefore(header, form.firstChild);
  }

  function styleBase(formContainer, form, ul) {
    setStyle(formContainer, {
      "width": "760px",
      "max-width": "calc(100vw - 32px)",
      "margin": "28px auto",
      "padding": "42px 48px",
      "background": "#ffffff",
      "background-image": "none",
      "border": "0",
      "border-radius": "44px",
      "box-shadow": "0 8px 24px rgba(0, 0, 0, 0.06)",
      "overflow": "hidden",
      "box-sizing": "border-box"
    });

    setStyle(form, {
      "width": "100%",
      "margin": "0",
      "padding": "0",
      "background": "transparent",
      "border": "0",
      "box-shadow": "none"
    });

    setStyle(ul, {
      "list-style": "none",
      "margin": "0",
      "padding": "0",
      "display": "grid",
      "grid-template-columns": "1fr 1fr",
      "column-gap": "30px",
      "row-gap": "16px",
      "align-items": "start",
      "width": "100%"
    });
  }

  function styleHeader() {
    setStyle(get("banesco_custom_header"), {
      "margin": "0 0 18px 0",
      "padding": "0",
      "background": "#ffffff"
    });

    setStyle(get("banesco_custom_title"), {
      "color": "#007a63",
      "font-size": "30px",
      "line-height": "1.15",
      "font-weight": "700",
      "text-align": "center",
      "margin": "0 0 16px 0",
      "padding": "0 0 14px 0",
      "border-bottom": "1px dotted #d8d8d8"
    });

    setStyle(get("banesco_custom_intro"), {
      "color": "#3f3f3f",
      "font-size": "16px",
      "line-height": "1.35",
      "font-weight": "400",
      "text-align": "center",
      "margin": "0 0 18px 0",
      "padding": "0"
    });
  }

  function styleLi(id, order, gridColumn) {
    var li = get(id);
    if (!li) return;

    setStyle(li, {
      "list-style": "none",
      "margin": "0",
      "padding": "0",
      "width": "auto",
      "min-height": "auto",
      "background": "transparent",
      "border": "0",
      "box-shadow": "none",
      "order": String(order),
      "grid-column": gridColumn,
      "box-sizing": "border-box"
    });
  }

  function styleLabels(li) {
    if (!li) return;

    Array.from(li.querySelectorAll("label, .description")).forEach(function (label) {
      setStyle(label, {
        "color": "#007a63",
        "font-size": "15px",
        "line-height": "1.18",
        "font-weight": "700",
        "margin": "0 0 7px 0",
        "padding": "0",
        "white-space": "normal",
        "text-align": "left"
      });
    });

    Array.from(li.querySelectorAll(".required, .asterisk")).forEach(function (el) {
      setStyle(el, {
        "color": "#f04a3a",
        "font-weight": "700"
      });
    });
  }

  function styleControls(li) {
    if (!li) return;

    Array.from(
      li.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[type='number'], select, textarea")
    ).forEach(function (field) {
      setStyle(field, {
        "width": "100%",
        "height": "34px",
        "min-height": "34px",
        "box-sizing": "border-box",
        "background": "#ffffff",
        "background-image": "none",
        "border": "1px solid #d7d7d7",
        "border-radius": "6px",
        "box-shadow": "0 0 0 5px #f1f1f1",
        "outline": "none",
        "color": "#5f5f5f",
        "font-size": "14px",
        "font-family": "Arial, Helvetica, sans-serif",
        "padding": "4px 10px"
      });
    });

    Array.from(li.querySelectorAll("select")).forEach(function (select) {
      setStyle(select, {
        "cursor": "pointer"
      });
    });

    Array.from(li.querySelectorAll(".guidelines, .help, .instruction, em")).forEach(function (help) {
      setStyle(help, {
        "color": "#3f3f3f",
        "font-size": "12px",
        "line-height": "1.25",
        "font-style": "italic",
        "font-weight": "700",
        "margin": "6px 0 0 0",
        "padding": "0"
      });
    });
  }

  function styleQuestion() {
    var li = get("li_3");
    if (!li) return;

    styleLi("li_3", 1, "1 / -1");

    var label = li.querySelector("label.description, label");
    var fieldset = li.querySelector("fieldset");

    if (label) {
      setStyle(label, {
        "display": "block",
        "width": "100%",
        "color": "#007a63",
        "font-size": "16px",
        "line-height": "1.25",
        "font-weight": "700",
        "margin": "0 0 10px 0",
        "padding": "0",
        "text-align": "left"
      });
    }

    if (fieldset) {
      setStyle(fieldset, {
        "display": "flex",
        "flex-direction": "row",
        "align-items": "center",
        "justify-content": "flex-start",
        "gap": "70px",
        "width": "100%",
        "margin": "0",
        "padding": "0",
        "border": "0",
        "background": "transparent"
      });
    }

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      setStyle(span, {
        "display": "inline-flex",
        "align-items": "center",
        "justify-content": "flex-start",
        "gap": "8px",
        "width": "auto",
        "min-width": "70px",
        "height": "auto",
        "margin": "0",
        "padding": "0",
        "color": "#007a63",
        "font-size": "16px",
        "line-height": "1.2",
        "font-weight": "700",
        "vertical-align": "middle"
      });
    });

    Array.from(li.querySelectorAll("input[type='radio']")).forEach(function (radio) {
      radio.style.setProperty("accent-color", "#007a63", "important");
      setStyle(radio, {
        "width": "14px",
        "height": "14px",
        "min-width": "14px",
        "min-height": "14px",
        "margin": "0",
        "padding": "0",
        "vertical-align": "middle",
        "position": "static"
      });
    });

    Array.from(li.querySelectorAll("label:not(.description)")).forEach(function (radioLabel) {
      setStyle(radioLabel, {
        "display": "inline",
        "width": "auto",
        "height": "auto",
        "margin": "0",
        "padding": "0",
        "color": "#007a63",
        "font-size": "16px",
        "line-height": "1.2",
        "font-weight": "700",
        "position": "static",
        "vertical-align": "middle"
      });
    });
  }

  function styleSubmit() {
    var li = get("li_buttons");
    var submit = get("submit_form");

    if (li) {
      styleLi("li_buttons", 100, "1 / -1");
      setStyle(li, {
        "margin-top": "8px"
      });
    }

    if (submit) {
      submit.value = "Enviar";
      setStyle(submit, {
        "width": "auto",
        "height": "auto",
        "background": "#007a63",
        "background-image": "none",
        "color": "#ffffff",
        "border": "0",
        "border-radius": "22px",
        "padding": "10px 28px",
        "font-size": "15px",
        "line-height": "1.2",
        "font-weight": "700",
        "box-shadow": "none",
        "text-shadow": "none",
        "cursor": "pointer"
      });
    }
  }

  function hideTechnicalFields() {
    var product = get("element_13");
    if (product) {
      product.value = CONFIG.productValue;
      product.setAttribute("value", CONFIG.productValue);
    }

    hide(get("li_13"));
    hide(get("li_14"));
  }

  function applyMobileIfNeeded() {
    if (window.innerWidth > 768) return;

    var ul = document.querySelector("#" + CONFIG.formId + " ul");
    if (ul) {
      setStyle(ul, {
        "grid-template-columns": "1fr",
        "column-gap": "0"
      });
    }

    [
      "li_4",
      "li_5",
      "li_6",
      "li_7",
      "li_8",
      "li_9",
      "li_10",
      "li_11",
      "li_12"
    ].forEach(function (id) {
      setStyle(get(id), {
        "grid-column": "1 / -1"
      });
    });
  }

  function apply() {
    var formContainer = get(CONFIG.containerId);
    var form = get(CONFIG.formId);

    if (!formContainer || !form) return false;

    var ul = form.querySelector("ul");
    if (!ul) return false;

    applyGlobalBase();
    removeOriginalDecorations(formContainer, form);
    createHeader(form);
    styleBase(formContainer, form, ul);
    styleHeader();

    styleQuestion();

    styleLi("li_4", 10, "1 / 2");    // Empresa
    styleLi("li_5", 20, "2 / 3");    // Actividad Económica
    styleLi("li_6", 30, "1 / 2");    // Nacionalidad
    styleLi("li_7", 40, "2 / 3");    // Documento / RIF
    styleLi("li_8", 50, "1 / -1");   // Persona contacto
    styleLi("li_9", 60, "1 / 2");    // Correo
    styleLi("li_10", 70, "2 / 3");   // Teléfono
    styleLi("li_11", 80, "1 / 2");   // Estado
    styleLi("li_12", 90, "1 / -1");  // Agencia

    [
      "li_4",
      "li_5",
      "li_6",
      "li_7",
      "li_8",
      "li_9",
      "li_10",
      "li_11",
      "li_12"
    ].forEach(function (id) {
      var li = get(id);
      styleLabels(li);
      styleControls(li);
    });

    hideTechnicalFields();
    styleSubmit();
    applyMobileIfNeeded();

    console.log("Banesco PDV aplicado correctamente sobre form_8479.");
    return true;
  }

  function wait() {
    attempts += 1;

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
