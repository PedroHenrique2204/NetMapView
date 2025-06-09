document.addEventListener("DOMContentLoaded", () => {
    let contadorLocal = 1;
  
    window.adicionarLocal = function () {
      contadorLocal++;
  
      const locaisContainer = document.getElementById("locais-container");
  
      const novoLocal = document.createElement("div");
      novoLocal.className = "local-bloco";
      novoLocal.innerHTML = `
        <h2>Local ${contadorLocal}</h2>
        <input type="text" name="local_nome[]" placeholder="Nome do local" required />
  
        <div class="dispositivos-container">
          <h3>Dispositivo 1</h3>
          <input type="text" name="dispositivo_nome[]" placeholder="Nome do dispositivo" required />
          <input type="text" name="dispositivo_tipo[]" placeholder="Tipo" required />
          <input type="text" name="dispositivo_ip[]" placeholder="Endereço IP" required />
          <input type="text" name="dispositivo_mac[]" placeholder="Endereço MAC" required />
          <input type="text" name="dispositivo_sistema[]" placeholder="Sistema Operacional" required />
        </div>
      `;
  
      locaisContainer.appendChild(novoLocal);
    };
  
    const form = document.getElementById("dispositivos-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const formData = new FormData(this);
      const data = {};
  
      for (const [key, value] of formData.entries()) {
        if (!data[key]) {
          data[key] = [];
        }
        data[key].push(value);
      }
  
      console.log("Dados coletados:", JSON.stringify(data, null, 2));
      alert("Cadastro finalizado! Verifique o console para ver os dados enviados.");
    });
  });
  