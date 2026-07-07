(function () {
  function setStyle(el, styles) {
    if (!el) return;

    Object.keys(styles).forEach(function (key) {
      el.style.setProperty(key, styles[key], "important");
    });
  }

  function loadBase(callback) {
    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/mlastra-dana/form-scripts-banesco@main/banesco-pdv-final-v26.js?v=26";
    script.onload = callback;
    document.head.appendChild(script);
  }

  function fixRadioSelection() {
    var li = document.getElementById("li_2");
    if (!li) return;

    var label = li.querySelector("label.description, label");
    var fieldset = li.querySelector("fieldset");

    setStyle(li, {
      "grid-column": "1 / -1",
      "order": "1",
      "margin": "0",
      "padding": "0",
      "background": "transparent",
      "border": "0"
    });

    if (label) {
      setStyle(label, {
        "display": "block",
        "width": "100%",
        "color": "#007a63",
        "font-size": "16px",
        "line-height": "1.25",
        "font-weight": "700",
        "margin": "0 0 12px 0",
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

    var customTitle = document.getElementById("banesco_custom_title");
    if (customTitle) {
      setStyle(customTitle, {
        "color": "#007a63",
        "font-size": "30px",
        "font-weight": "700",
        "text-align": "center"
      });
    }
  }

  function applyPatch() {
    fixRadioSelection();
  }

  loadBase(function () {
    applyPatch();
    setTimeout(applyPatch, 300);
    setTimeout(applyPatch, 800);
    setTimeout(applyPatch, 1500);
  });
})();
