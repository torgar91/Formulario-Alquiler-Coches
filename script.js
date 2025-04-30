// 💡 Función profesional para mostrar mensajes con estilo
function mostrarMensaje(texto, tipo = "ok") {
    const contenedor = document.getElementById("mensajeAlerta");
    contenedor.innerHTML = `<p>${texto}</p>`;
    contenedor.classList.remove("mensaje-ok", "mensaje-error");
    contenedor.classList.add("mensaje", tipo === "error" ? "mensaje-error" : "mensaje-ok");
  }
  
  const edadSelect = document.getElementById("edad");
  
  edadSelect.addEventListener("change", function () {
    const respuestaEdad = edadSelect.value;
    const contenedorMensaje = document.getElementById("mensajeAlerta");
  
    contenedorMensaje.innerHTML = ""; // Limpiar lo anterior
    contenedorMensaje.className = ""; // Limpiar clases
  
    if (respuestaEdad === "no") {
      mostrarMensaje("Eres menor de edad, no puedes alquilar", "error");
    } else if (respuestaEdad === "si") {
      const formCarnet = document.createElement("form");
      formCarnet.id = "formularioCarnet";
  
      const labelCarnet = document.createElement("label");
      labelCarnet.setAttribute("for", "carnet");
      labelCarnet.textContent = "¿Tienes el carnet de conducir?";
  
      const selectCarnet = document.createElement("select");
      selectCarnet.id = "carnet";
  
      const optionselec = document.createElement("option");
      optionselec.value = "";
      optionselec.textContent = "Seleccionar:";
  
      const optionNo = document.createElement("option");
      optionNo.value = "no";
      optionNo.textContent = "No";
  
      const optionSi = document.createElement("option");
      optionSi.value = "si";
      optionSi.textContent = "Si";
  
      selectCarnet.append(optionselec, optionNo, optionSi);
      formCarnet.append(labelCarnet, selectCarnet);
      contenedorMensaje.appendChild(formCarnet);
  
      selectCarnet.addEventListener("change", function () {
        const respuestaCarnet = selectCarnet.value;
  
        contenedorMensaje.innerHTML = "";
        contenedorMensaje.className = "";
  
        if (respuestaCarnet === "no") {
          mostrarMensaje("No tienes carnet de conducir, no puedes alquilar", "error");
        } else if (respuestaCarnet === "si") {
          const formDatos = document.createElement("form");
          formDatos.id = "formularioDatos";
  
          const campos = [
            { label: "Escribe tu nombre:", id: "nombre", type: "text" },
            { label: "Escribe tu apellido:", id: "apellido", type: "text" },
            { label: "Escribe la ciudad de recogida:", id: "ciudad", type: "text" },
            { label: "Escribe los dias que quieres alquilar:", id: "dias", type: "number" }
          ];
  
          campos.forEach(campo => {
            const label = document.createElement("label");
            label.setAttribute("for", campo.id);
            label.textContent = campo.label;
  
            const input = document.createElement("input");
            input.id = campo.id;
            input.type = campo.type;
  
            formDatos.append(label, input);
          });
  
          const botonEnviar = document.createElement("button");
          botonEnviar.textContent = "Calcular alquiler";
          botonEnviar.type = "button";
  
          formDatos.appendChild(botonEnviar);
          contenedorMensaje.appendChild(formDatos);
  
          botonEnviar.addEventListener("click", function () {
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const ciudad = document.getElementById("ciudad").value.trim();
            const dias = parseInt(document.getElementById("dias").value);
  
            if (!nombre || !apellido || !ciudad || isNaN(dias) || dias <= 0) {
              alert("Por favor, rellena todos los campos correctamente.");
              return;
            }
  
            let costeTotal = dias >= 7
              ? (Math.floor(dias / 7) * 150 + (dias % 7) * 25)
              : dias * 25;
  
            mostrarMensaje(`
              <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
              <p><strong>Ciudad de recogida:</strong> ${ciudad}</p>
              <p><strong>Días de alquiler:</strong> ${dias}</p>
              <p><strong>Coste total:</strong> ${costeTotal} €</p>
            `, "ok");
          });
        }
      });
    }
  });
  