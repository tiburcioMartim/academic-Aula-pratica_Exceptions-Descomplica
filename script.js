let form_Funcionarios = document.getElementById("formulario_Funcionarios");
let form_Resultados = document.getElementById("formulario_Resultados");
let registro_Funcionarios = [];


form_Funcionarios.addEventListener('submit', function (event) {
    event.preventDefault();

    class Funcionario {
        constructor(nome, idade, cargo) {
            this.nome = nome;
            this.idade = idade;
            this.cargo = cargo;
        }

        seApresentar() {
            return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e meu cargo atual é de ${this.cargo}.`
        }

        trabalhar() {
            return `Ir atuar no setor de ${this.cargo}.`
        }
    }

    class Gerente extends Funcionario {
        constructor(nome, idade, cargo, departamento) {
            super(nome, idade, cargo);
            this.departamento = departamento;
        }

        seApresentar() {
            return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos, meu cargo atual é de ${this.cargo} e hoje tenho colaborado com o departamento ${this.departamento}.`
        }

        gerenciar() {
            return `O departamento ${this.departamento} precisa de gestão.`
        }
    }

    class Desenvolvedor extends Funcionario {
        constructor(nome, idade, cargo, linguagem) {
            super(nome, idade, cargo);
            this.linguagem = linguagem;
        }

        programar() {
            return `Vou programar na linguagem ${this.linguagem} hoje.`
        }
    }

    const nome = document.getElementById("form_Name").value;
    const idade = document.getElementById("form_idade").value;
    const cargo = Array.from(document.getElementsByName("Cargo")).find(radio => radio.checked)?.id;
    const departamento = Array.from(document.getElementsByName("Departamento")).find(radio => radio.checked)?.id;
    const linguagem = Array.from(document.getElementsByName("Linguagem")).find(radio => radio.checked)?.id;


    // EXCEPTIONS
    function checkIdade(idade, callback) {
        if (idade < 0) {
            callback(new Error("A idade não pode ser negativa."));
            return;
        };

        callback(null, "Idade aceita.")
    };

    checkIdade(idade, (error, result) => {
        if (error) {
            console.log("Ocorreu um problema: ", error.message);
        } else {
            console.log(result);

        }
    });

    let funcionario;
    if (idade < 0) {
        alert("A idade não pode ser negativa.");
        return;
    } else {
        if (cargo === "Gerente") {
            funcionario = new Gerente(nome, idade, cargo, departamento)

        } else if (cargo === "Desenvolvedor") {
            funcionario = new Desenvolvedor(nome, idade, cargo, linguagem)

        } else {
            funcionario = new Funcionario(nome, idade, cargo)
        }
    }

    registro_Funcionarios.push(funcionario);

    function exibir_Funcionarios() {
        form_Resultados.innerHTML = "";

        registro_Funcionarios.forEach(f => {
            const seApresentar = f.seApresentar();
            // const trabalhar = f.trabalhar();
            let extraInfo = '';
            if (f instanceof Gerente) {
                extraInfo = `<span class="form_span">${f.gerenciar()}</span>`;
            } else if (f instanceof Desenvolvedor) {
                extraInfo = `<span class="form_span">${f.programar()}</span>`;
            } else {
                extraInfo = `<span class="form_span">${f.trabalhar()}</span>`;
            }

            const divResulte = document.createElement("div");
            divResulte.innerHTML = `
                <div id="formulario_Resultados" class="form_Resultados">

                    <h2>Funcionário Cadastrado</h2>
                    <hr>
                        <span class="form_span"><strong>Nome</strong>: ${f.nome} </span>
                        <span class="form_span"><strong>Idade</strong>: ${f.idade} </span>
                        <span class="form_span"><strong>Cargo</strong>: ${f.cargo} </span>
                        ${f instanceof Gerente ? `<span class="form_span"><strong>Departamento</strong>: ${f.departamento}</span>` : ""}
                        ${f instanceof Desenvolvedor ? `<span class="form_span"><strong>Linguagem</strong>: ${f.linguagem}</span>` : ""}
                        <br>
                        <span class="form_span">${seApresentar}</span>
                        ${extraInfo}
                </div>
            `;
            form_Resultados.appendChild(divResulte);
        });


    }
    exibir_Funcionarios();
})
