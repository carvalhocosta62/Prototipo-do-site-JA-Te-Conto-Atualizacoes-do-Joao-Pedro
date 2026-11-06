document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // ELEMENTOS PRINCIPAIS
    // ========================================

    const perguntas = document.querySelectorAll(".faq-item");
    const grupos = document.querySelectorAll(".faq-grupo");

    const campoBusca = document.getElementById("buscarPergunta");
    const botaoLimpar = document.getElementById("limparBusca");

    const filtros = document.querySelectorAll(".filtro-topico");

    const contador = document.getElementById("contadorPerguntas");
    const semResultado = document.getElementById("semResultado");
    const botaoVerTodas = document.getElementById("verTodas");


    // ========================================
    // 1. ABRIR E FECHAR AS RESPOSTAS
    // ========================================

    perguntas.forEach(function (item) {

        const botao = item.querySelector(".faq-pergunta");
        const resposta = item.querySelector(".faq-resposta");
        const sinal = item.querySelector(".faq-sinal");

        botao.addEventListener("click", function () {

            const estaAberta = botao.getAttribute("aria-expanded") === "true";

            // Fecha as demais perguntas
            perguntas.forEach(function (outraPergunta) {

                const outroBotao = outraPergunta.querySelector(".faq-pergunta");
                const outraResposta = outraPergunta.querySelector(".faq-resposta");
                const outroSinal = outraPergunta.querySelector(".faq-sinal");

                outroBotao.setAttribute("aria-expanded", "false");
                outraResposta.hidden = true;
                outroSinal.textContent = "+";

                outraPergunta.classList.remove("aberta");

            });

            // Abre a pergunta selecionada
            if (!estaAberta) {

                botao.setAttribute("aria-expanded", "true");
                resposta.hidden = false;
                sinal.textContent = "−";

                item.classList.add("aberta");

            }

        });

    });



    // ========================================
    // 2. FILTRAR PERGUNTAS POR CATEGORIA
    // ========================================

    filtros.forEach(function (filtro) {

        filtro.addEventListener("click", function () {

            // Remove a seleção dos demais filtros
            filtros.forEach(function (outroFiltro) {

                outroFiltro.classList.remove("ativo");
                outroFiltro.setAttribute("aria-pressed", "false");

            });

            // Ativa o filtro selecionado
            filtro.classList.add("ativo");
            filtro.setAttribute("aria-pressed", "true");

            // Atualiza as perguntas exibidas
            atualizarPerguntas();

        });

    });



    // ========================================
    // 3. PESQUISAR PERGUNTAS
    // ========================================

    campoBusca.addEventListener("input", function () {

        atualizarPerguntas();

    });



    // ========================================
    // 4. ATUALIZAR RESULTADOS
    // ========================================

    function atualizarPerguntas() {

        const textoBusca = campoBusca.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        // Identifica o filtro selecionado
        const filtroAtivo = document.querySelector(".filtro-topico.ativo");

        const categoriaSelecionada = filtroAtivo.dataset.filtro;

        let totalEncontrado = 0;

        // Percorre todas as perguntas
        perguntas.forEach(function (item) {

            const grupo = item.closest(".faq-grupo");

            const categoria = grupo.dataset.categoria;

            const conteudo = item.textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const correspondeCategoria =
                categoriaSelecionada === "todos" ||
                categoria === categoriaSelecionada;

            const correspondeBusca =
                conteudo.includes(textoBusca);

            // Define se a pergunta será exibida
            if (correspondeCategoria && correspondeBusca) {

                item.hidden = false;
                totalEncontrado++;

            } else {

                item.hidden = true;

                // Fecha perguntas que deixaram de aparecer
                const botao = item.querySelector(".faq-pergunta");
                const resposta = item.querySelector(".faq-resposta");
                const sinal = item.querySelector(".faq-sinal");

                botao.setAttribute("aria-expanded", "false");
                resposta.hidden = true;
                sinal.textContent = "+";

                item.classList.remove("aberta");

            }

        });


        // ========================================
        // 5. ATUALIZAR OS GRUPOS
        // ========================================

        grupos.forEach(function (grupo) {

            const perguntasVisiveis = grupo.querySelectorAll(
                ".faq-item:not([hidden])"
            );

            grupo.hidden = perguntasVisiveis.length === 0;

        });


        // ========================================
        // 6. ATUALIZAR CONTADOR
        // ========================================

        if (totalEncontrado === 1) {

            contador.textContent = "Exibindo 1 pergunta";

        } else {

            contador.textContent =
                "Exibindo " + totalEncontrado + " perguntas";

        }


        // ========================================
        // 7. EXIBIR MENSAGEM SEM RESULTADOS
        // ========================================

        if (totalEncontrado === 0) {

            semResultado.hidden = false;

        } else {

            semResultado.hidden = true;

        }

    }



    // ========================================
    // 8. LIMPAR CAMPO DE PESQUISA
    // ========================================

    botaoLimpar.addEventListener("click", function () {

        campoBusca.value = "";

        atualizarPerguntas();

        campoBusca.focus();

    });



    // ========================================
    // 9. VISUALIZAR TODAS AS PERGUNTAS
    // ========================================

    botaoVerTodas.addEventListener("click", function () {

        // Limpa a pesquisa
        campoBusca.value = "";

        // Seleciona o filtro Todas
        filtros.forEach(function (filtro) {

            filtro.classList.remove("ativo");
            filtro.setAttribute("aria-pressed", "false");

            if (filtro.dataset.filtro === "todos") {

                filtro.classList.add("ativo");
                filtro.setAttribute("aria-pressed", "true");

            }

        });

        atualizarPerguntas();

    });


    // ========================================
    // 10. INICIALIZAÇÃO
    // ========================================

    atualizarPerguntas();

});