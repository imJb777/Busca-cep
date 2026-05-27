    async function myFunction() {

            let cep = document.getElementById("myInput").value;
            let div = document.getElementById("myDiv");

            // Remove caracteres não numéricos
            cep = cep.replace(/\D/g, "");

            if (cep.length !== 8) {
                div.innerHTML = `
                    <div class="alert alert-danger mt-3">
                        Digite um CEP válido com 8 números.
                    </div>
                `;
                return;
            }

            div.innerHTML = `
                <div class="text-center mt-4">
                    <div class="spinner-border text-info"></div>
                </div>
            `;

            try {

                const response = await fetch(
                    `https://viacep.com.br/ws/${cep}/json/`
                );

                const data = await response.json();

                if (data.erro) {
                    div.innerHTML = `
                        <div class="alert alert-warning mt-3">
                            CEP não encontrado.
                        </div>
                    `;
                    return;
                }

                div.innerHTML = `
                    <div class="result-box">

                        <h5 class="mb-3">
                            <i class="bi bi-house-door-fill"></i>
                            Resultado
                        </h5>

                        <p>
                            <span class="info-label">CEP:</span>
                            ${data.cep}
                        </p>

                        <p>
                            <span class="info-label">Logradouro:</span>
                            ${data.logradouro}
                        </p>

                        <p>
                            <span class="info-label">Bairro:</span>
                            ${data.bairro}
                        </p>

                        <p>
                            <span class="info-label">Cidade:</span>
                            ${data.localidade}
                        </p>

                        <p>
                            <span class="info-label">Estado:</span>
                            ${data.uf}
                        </p>

                    </div>
                `;

            } catch (error) {

                div.innerHTML = `
                    <div class="alert alert-danger mt-3">
                        Erro ao consultar o CEP.
                    </div>
                `;
            }
        }