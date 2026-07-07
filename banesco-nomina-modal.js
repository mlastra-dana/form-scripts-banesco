(function () {
  function injectStyles() {
    if (document.getElementById("dc-banesco-modal-styles")) return;

    var style = document.createElement("style");
    style.id = "dc-banesco-modal-styles";

    style.innerHTML = `
      #dc-banesco-overlay {
        position: fixed;
        inset: 0;
        background: rgba(22, 78, 120, 0.62);
        z-index: 999999;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding-top: 28px;
        padding-right: 16px;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }

      #dc-banesco-modal {
        width: 470px;
        max-width: calc(100vw - 32px);
        background: #ffffff;
        border-radius: 54px;
        padding: 14px 28px 28px 28px;
        box-sizing: border-box;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
      }

      #dc-banesco-header {
        text-align: center;
        color: #333333;
      }

      #dc-banesco-header h2 {
        margin: 0 0 20px 0;
        font-size: 22px;
        line-height: 1.2;
        color: #007a63;
        font-weight: 700;
      }

      #dc-banesco-header p {
        margin: 0 0 14px 0;
        font-size: 13px;
        line-height: 1.25;
        color: #333333;
      }

      #dc-banesco-radio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 14px;
        margin: 0 0 18px 12px;
        font-size: 14px;
        color: #333333;
      }

      #dc-banesco-radio label {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
      }

      #dc-banesco-radio input[type="radio"] {
        accent-color: #007a63;
      }

      #dc-banesco-modal form {
        width: 100%;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 18px;
        row-gap: 12px;
      }

      #dc-banesco-modal input,
      #dc-banesco-modal select,
      #dc-banesco-modal textarea {
        width: 100%;
        border: none;
        border-bottom: 1px solid #d8d8d8;
        background: transparent;
        padding: 7px 4px 6px 4px;
        box-sizing: border-box;
        font-size: 11px;
        color: #333333;
        outline: none;
        font-family: Arial, Helvetica, sans-serif;
      }

      #dc-banesco-modal input::placeholder,
      #dc-banesco-modal textarea::placeholder {
        color: #7d9f9a;
        opacity: 1;
      }

      #dc-banesco-modal select {
        color: #555555;
      }

      #dc-banesco-modal textarea {
        resize: none;
        min-height: 34px;
      }

      #dc-banesco-modal button,
      #dc-banesco-modal input[type="submit"] {
        grid-column: 1 / -1;
        width: 170px;
        justify-self: center;
        margin-top: 10px;
        background: #007a63;
        color: #ffffff;
        border: none;
        border-radius: 22px;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }

      #dc-banesco-modal button:hover,
      #dc-banesco-modal input[type="submit"]:hover {
        background: #006650;
      }

      @media screen and (max-width: 640px) {
        #dc-banesco-overlay {
          justify-content: center;
          align-items: flex-start;
          padding: 20px 12px;
        }

        #dc-banesco-modal {
          width: 100%;
          border-radius: 32px;
          padding: 18px 22px 24px 22px;
        }

        #dc-banesco-modal form {
          grid-template-columns: 1fr;
        }

        #dc-banesco-header h2 {
          font-size: 20px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function updatePlaceholders(form) {
    var fields = form.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {
      var name = (field.name || "").toLowerCase();
      var id = (field.id || "").toLowerCase();

      if (
        field.type === "hidden" ||
        field.type === "submit" ||
        field.type === "button" ||
        field.type === "radio"
      ) {
        return;
      }

      if (name.includes("empresa") || id.includes("empresa")) {
        field.placeholder = "¿Cuál es el nombre de tu empresa?";
      }

      if (
        name.includes("rif") ||
        id.includes("rif") ||
        name.includes("documento") ||
        id.includes("documento")
      ) {
        field.placeholder = "Documento de identidad / RIF";
      }

      if (name.includes("actividad") || id.includes("actividad")) {
        field.placeholder = "Actividad económica";
      }

      if (name.includes("agencia") || id.includes("agencia")) {
        field.placeholder = "Agencia de preferencia";
      }

      if (
        name.includes("persona") ||
        id.includes("persona") ||
        name.includes("contacto") ||
        id.includes("contacto")
      ) {
        field.placeholder = "Indícanos un nombre de persona contacto";
      }

      if (
        name.includes("telefono") ||
        id.includes("telefono") ||
        name.includes("celular")
      ) {
        field.placeholder = "Teléfono de contacto";
      }

      if (
        name.includes("correo") ||
        id.includes("correo") ||
        name.includes("email")
      ) {
        field.placeholder = "Correo electrónico";
      }
    });
  }

  function buildModal() {
    var form = document.querySelector("form");

    if (!form) {
      console.warn("No se encontró el formulario de DANAconnect.");
      return;
    }

    if (document.getElementById("dc-banesco-overlay")) {
      return;
    }

    injectStyles();

    var overlay = document.createElement("div");
    overlay.id = "dc-banesco-overlay";

    var modal = document.createElement("div");
    modal.id = "dc-banesco-modal";

    var header = document.createElement("div");
    header.id = "dc-banesco-header";
    header.innerHTML =
      '<h2>¡Nos acercamos a ti!</h2>' +
      '<p>Notamos que estás interesado en nuestro producto de Nómina.</p>' +
      '<p>¿Te gustaría que un ejecutivo<br>de Banesco te contactara?</p>';

    var radioBlock = document.createElement("div");
    radioBlock.id = "dc-banesco-radio";
    radioBlock.innerHTML =
      '<label><strong>Sí</strong> <input type="radio" name="contacto_ejecutivo" value="SI" checked></label>' +
      '<label><strong>No</strong> <input type="radio" name="contacto_ejecutivo" value="NO"></label>';

    form.parentNode.insertBefore(overlay, form);
    overlay.appendChild(modal);
    modal.appendChild(header);
    modal.appendChild(radioBlock);
    modal.appendChild(form);

    updatePlaceholders(form);

    var radios = radioBlock.querySelectorAll('input[name="contacto_ejecutivo"]');

    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (this.value === "NO") {
          form.style.opacity = "0.45";
        } else {
          form.style.opacity = "1";
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildModal);
  } else {
    buildModal();
  }
})();
