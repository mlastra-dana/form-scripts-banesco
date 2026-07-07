(function () {
  var attempts = 0;
  var maxAttempts = 120;

  function setStyle(el, styles) {
    if (!el) return;

    Object.keys(styles).forEach(function (key) {
      el.style.setProperty(key, styles[key], "important");
    });
  }

  function hide(el) {
    if (!el) return;

    setStyle(el, {
      display: "none",
      height: "0",
      minHeight: "0",
      maxHeight: "0",
      margin: "0",
      padding: "0",
      border: "0",
      overflow: "hidden",
      visibility: "hidden"
    });
  }

  function get(id) {
    return document.getElementById(id);
  }

  function removeOldDecorativeElements(formContainer, form) {
    var candidates = Array.from(
      formContainer.querySelectorAll("h1, h2, h3, h4, p, .form_description, .description")
    );

    candidates.forEach(function (el) {
      var txt = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();

      if (
        txt.indexOf("nos acercamos") !== -1 ||
        txt.indexOf("notamos que") !== -1 ||
        txt.indexOf("puntos de venta") !== -1 ||
        txt === ""
      ) {
        hide(el);
      }
    });

    Array.from(formContainer.children).forEach(function (child) {
      if (child !== form && child.id !== "banesco_custom_header") {
        var hasFormField = child.querySelector && child.querySelector("input, select, textarea, button");
        var txt = (child.innerText || child.textContent || "").replace(/\s+/g, " ").trim();

        if (!hasFormField || txt.indexOf("¡Nos acercamos") !== -1) {
          hide(child);
        }
      }
    });
  }

  function createHeader(form) {
    var existing = document.getElementById("banesco_custom_header");
    if (existing) return existing;

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

    return header;
  }

  function styleBase(formContainer, form, ul) {
    setStyle(document.documentElement, {
      margin: "0",
      padding: "0",
      background: "#ffffff"
    });

    setStyle(document.body, {
      margin: "0",
      padding: "0",
      background: "#ffffff",
      fontFamily: "Arial, Helvetica, sans-serif"
    });

    setStyle(formContainer, {
      width: "760px",
      maxWidth: "calc(100vw - 32px)",
      margin: "28px auto",
      padding: "42px 48px",
      background: "#ffffff",
      backgroundImage: "none",
      border: "0",
      borderRadius: "44px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      boxSizing: "border-box"
    });

    setStyle(form, {
      width: "100%",
      margin: "0",
      padding: "0",
      background: "transparent",
      border: "0",
      boxShadow: "none"
    });

    setStyle(ul, {
      listStyle: "none",
      margin: "0",
      padding: "0",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "28px",
      rowGap: "16px",
      alignItems: "start",
      width: "100%"
    });
  }

  function styleHeader() {
    var header = get("banesco_custom_header");
    var title = get("banesco_custom_title");
    var intro = get("banesco_custom_intro");

    setStyle(header, {
      margin: "0 0 18px 0",
      padding: "0",
      background: "#ffffff"
    });

    setStyle(title, {
      color: "#007a63",
      fontSize: "30px",
      lineHeight: "1.15",
      fontWeight: "700",
      margin: "0 0 14px 0",
      padding: "0 0 14px 0",
      borderBottom: "1px dotted #d8d8d8"
    });

    setStyle(intro, {
      color: "#3f3f3f",
      fontSize: "16px",
      lineHeight: "1.35",
      fontWeight: "400",
      margin: "0 0 16px 0",
      padding: "0"
    });
  }

  function styleLi(li, order, gridColumn) {
    if (!li) return;

    setStyle(li, {
      listStyle: "none",
      margin: "0",
      padding: "0",
      width: "auto",
      minHeight: "auto",
      background: "transparent",
      border: "0",
      boxShadow: "none",
      order: String(order),
      gridColumn: gridColumn
    });
  }

  function styleLabels(li) {
    if (!li) return;

    Array.from(li.querySelectorAll("label, .description")).forEach(function (label) {
      setStyle(label, {
        color: "#007a63",
        fontSize: "15px",
        lineHeight: "1.18",
        fontWeight: "700",
        margin: "0 0 7px 0",
        padding: "0",
        whiteSpace: "normal",
        textAlign: "left"
      });
    });

    Array.from(li.querySelectorAll(".required, .asterisk")).forEach(function (el) {
      setStyle(el, {
        color: "#f04a3a",
        fontWeight: "700"
      });
    });

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      var text = (span.innerText || span.textContent || "").trim();

      if (text === "Si" || text === "No") {
        setStyle(span, {
          color: "#007a63",
          fontSize: "15px",
          fontWeight: "700"
        });
      }
    });
  }

  function styleControls(li) {
    if (!li) return;

    Array.from(li.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[type='number'], select, textarea")).forEach(function (field) {
      setStyle(field, {
        width: "100%",
        height: "34px",
        minHeight: "34px",
        boxSizing: "border-box",
        background: "#ffffff",
        backgroundImage: "none",
        border: "1px solid #d7d7d7",
        borderRadius: "6px",
        boxShadow: "0 0 0 5px #f1f1f1",
        outline: "none",
        color: "#5f5f5f",
        fontSize: "14px",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "4px 10px"
      });
    });

    Array.from(li.querySelectorAll("select")).forEach(function (select) {
      setStyle(select, {
        cursor: "pointer"
      });
    });

    Array.from(li.querySelectorAll(".guidelines, .help, .instruction")).forEach(function (help) {
      setStyle(help, {
        color: "#3f3f3f",
        fontSize: "12px",
        lineHeight: "1.25",
        fontStyle: "normal",
        margin: "6px 0 0 0",
        padding: "0"
      });
    });

    Array.from(li.querySelectorAll("em")).forEach(function (em) {
      setStyle(em, {
        color: "#3f3f3f",
        fontSize: "12px",
        lineHeight: "1.25",
        fontStyle: "italic",
        fontWeight: "700"
      });
    });
  }

  function styleQuestion() {
    var li = get("li_2");
    if (!li) return;

    styleLi(li, 1, "1 / -1");

    var label = li.querySelector("label.description, label");
    if (label) {
      setStyle(label, {
        color: "#3f3f3f",
        fontSize: "15px",
        lineHeight: "1.25",
        fontWeight: "700",
        margin: "0 0 8px 0",
        padding: "0"
      });
    }

    var fieldset = li.querySelector("fieldset");
    if (fieldset) {
      setStyle(fieldset, {
        display: "flex",
        alignItems: "center",
        gap: "120px",
        margin: "0",
        padding: "0",
        border: "0",
        width: "100%"
      });
    }

    Array.from(li.querySelectorAll("span")).forEach(function (span) {
      setStyle(span, {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        width: "auto",
        color: "#007a63",
        fontSize: "15px",
        fontWeight: "700"
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
      styleLi(li, 100, "1 / -1");
      setStyle(li, {
        marginTop: "8px"
      });
    }

    if (submit) {
      setStyle(submit, {
        width: "auto",
        height: "auto",
        background: "#007a63",
        backgroundImage: "none",
        color: "#ffffff",
        border: "0",
        borderRadius: "22px",
        padding: "10px 28px",
        fontSize: "15px",
        lineHeight: "1.2",
        fontWeight: "700",
        boxShadow: "none",
        textShadow: "none",
        cursor: "pointer"
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
      if (el.id === "banesco_custom_header" || el.id === "banesco_custom_title" || el.id === "banesco_custom_intro") return;

      var rect = el.getBoundingClientRect();
      var computed = window.getComputedStyle(el);
      var bg = computed.backgroundColor || "";
      var bgImage = computed.backgroundImage || "";
      var txt = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();

      var looksLikeBar =
        rect.height >= 18 &&
        rect.height <= 80 &&
        rect.width >= 300 &&
        txt === "" &&
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
      background: "#ffffff",
      backgroundImage: "none"
    });
  }

  function applyMobileIfNeeded() {
    if (window.innerWidth > 768) return;

    var ul = document.querySelector("#form_8475 ul");
    if (ul) {
      setStyle(ul, {
        gridTemplateColumns: "1fr",
        columnGap: "0"
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
        gridColumn: "1 / -1"
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
    removeOldDecorativeElements(formContainer, form);
    createHeader(form);
    styleBase(formContainer, form, ul);
    styleHeader();

    styleQuestion();

    styleLi(get("li_3"), 10, "1 / 2");
    styleLi(get("li_6"), 20, "2 / 3");

    styleLi(get("li_4"), 30, "1 / 2");
    styleLi(get("li_5"), 40, "2 / 3");

    styleLi(get("li_7"), 50, "1 / -1");

    styleLi(get("li_10"), 60, "1 / 2");
    styleLi(get("li_9"), 70, "2 / 3");

    styleLi(get("li_16"), 80, "1 / 2");
    styleLi(get("li_11"), 90, "1 / -1");

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

  function applyGlobalClean() {
    setStyle(document.documentElement, {
      margin: "0",
      padding: "0",
      background: "#ffffff"
    });

    setStyle(document.body, {
      margin: "0",
      padding: "0",
      background: "#ffffff",
      fontFamily: "Arial, Helvetica, sans-serif"
    });

    Array.from(document.querySelectorAll(".x-panel-header, .x-window-header, .x-header, .x-toolbar, .x-docked")).forEach(hide);
  }

  function wait() {
    attempts += 1;

    if (apply()) {
      console.log("Banesco PDV final DOM real v25 aplicado correctamente.");
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
