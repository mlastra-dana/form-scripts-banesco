(function () {
  var attempts = 0;
  var maxAttempts = 120;

  function setStyle(el, styles) {
    if (!el) return;
    Object.keys(styles).forEach(function (key) {
      el.style.setProperty(key, styles[key], "important");
    });
  }

  function get(id) {
    return document.getElementById(id);
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

  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function applyGlobalClean() {
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

  function removeDecorativeElements(formContainer, form) {
    Array.from(formContainer.children).forEach(function (child) {
      if (child === form || child.id === "banesco_custom_header") return;

      var hasField = child.querySelector && child.querySelector("input, select, textarea, button");
      var text = cleanText(child.innerText || child.textContent || "");

      if (!hasField || text.indexOf("nos acercamos") !== -1) {
        hide(child);
      }
    });

    Array.from(form.querySelectorAll("h1, h2, h3, h4, p, .form_description, .description")).forEach(function (el) {
      var text = cleanText(el.innerText || el.textContent || "");

      if (
        text.indexOf("nos acercamos") !== -1 ||
        text.indexOf("notamos que") !== -1 ||
        text.indexOf("puntos de venta") !== -1
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
    title.textContent = "¡Nos acercamos a ti!";

    var intro = document.createElement("div");
    intro.id = "banesco_custom_intro";
    intro.textContent = "Notamos que estás interesado en nuestros Puntos de Venta";

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

    Array.from(li.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[type='number'], select, textarea")).forEach(function (field) {
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
    var li = get("li_2");
    if (!li) return;

    styleLi("li_2", 1, "1 / -1");

    var label = li.querySelector("label.description, label");
    if (label) {
      setStyle(label, {
        "color": "#3f3f3f",
        "font-size": "15px",
        "line-height": "1.25",
        "font-weight": "700",
        "margin": "0 0 8px 0",
        "padding": "0"
      });
    }

    var fieldset = li.querySelector("fieldset");
    if (fieldset) {
      setStyle(fieldset, {
        "display": "flex",
        "align-items": "center",
        "gap": "120px",
        "margin": "0",
        "padding": "0",
        "border": "0",
        "width": "100%"
      });
    }

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      setStyle(span, {
        "display": "inline-flex",
        "align-items": "center",
        "gap": "8px",
        "width": "auto",
        "color": "#007a63",
        "font-size": "15px",
        "font-weight": "700"
      });
    });

    Array.from(li.querySelectorAll("input[type='radio']")).forEach(function (radio) {
      radio.style.setProperty("accent-color", "#007a63", "important");
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
    var product = get("element_15");
    if (product) {
      product.value = "PuntosVenta";
      product.setAttribute("value", "PuntosVenta");
    }

    hide(get("li_15"));
    hide(get("li_17"));
  }

  function removeGrayBar(formContainer) {
    Array.from(formContainer.querySelectorAll("*")).forEach(function (el) {
      if (el.querySelector && el.querySelector("input, select, textarea")) return;

      var rect = el.getBoundingClientRect();
      var computed = window.getComputedStyle(el);
      var bg = computed.backgroundColor || "";
      var bgImage = computed.backgroundImage || "";
      var text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();

      var looksLikeBar =
        rect.height >= 18 &&
        rect.height <= 90 &&
        rect.width >= 300 &&
        text === "" &&
        (
          bgImage.indexOf("gradient") !== -1 ||
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
          bg.indexOf("rgb(18") === 0
        );

      if (looksLikeBar) {
        hide(el);
      }
    });

    setStyle(formContainer, {
      "background": "#ffffff",
      "background-image": "none"
    });
  }

  function applyMobileIfNeeded() {
    if (window.innerWidth > 768) return;

    var ul = document.querySelector("#form_8475 ul");
    if (ul) {
      setStyle(ul, {
        "grid-template-columns": "1fr",
        "column-gap": "0"
      });
    }

    [
      "li_3",
      "li_6",
      "li_4",
      "li_5",
      "li_7",
      "li_10",
      "li_9",
      "li_16",
      "li_11"
    ].forEach(function (id) {
      setStyle(get(id), {
        "grid-column": "1 / -1"
      });
    });
  }

  function apply() {
    var formContainer = get("form_container");
    var form = get("form_8475");

    if (!formContainer || !form) return false;

    var ul = form.querySelector("ul");
    if (!ul) return false;

    applyGlobalClean();
    removeDecorativeElements(formContainer, form);
    createHeader(form);
    styleBase(formContainer, form, ul);
    styleHeader();

    styleQuestion();

    styleLi("li_3", 10, "1 / 2");
    styleLi("li_6", 20, "2 / 3");

    styleLi("li_4", 30, "1 / 2");
    styleLi("li_5", 40, "2 / 3");

    styleLi("li_7", 50, "1 / -1");

    styleLi("li_10", 60, "1 / 2");
    styleLi("li_9", 70, "2 / 3");

    styleLi("li_16", 80, "1 / 2");
    styleLi("li_11", 90, "1 / -1");

    [
      "li_3",
      "li_6",
      "li_4",
      "li_5",
      "li_7",
      "li_10",
      "li_9",
      "li_16",
      "li_11"
    ].forEach(function (id) {
      var li = get(id);
      styleLabels(li);
      styleControls(li);
    });

    hideTechnicalFields();
    styleSubmit();
    removeGrayBar(formContainer);
    applyMobileIfNeeded();

    return true;
  }

  function wait() {
    attempts += 1;

    if (apply()) {
      console.log("Banesco PDV final v26 aplicado correctamente.");
      return;
    }

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
