/**
 * Script de testes automatizados para o Chatbot.
 * 
 * Este módulo importa o chatbot principal e define cenários de teste para verificar se
 * as respostas estão de acordo com o esperado. Cada cenário inclui:
 * - Descrição do teste.
 * - Entrada (mensagem do usuário).
 * - Expressão regular com o padrão esperado na resposta.
 *
 * Após a execução, o script gera um relatório detalhado no console, incluindo métricas de
 * testes aprovados, reprovados e erros, garantindo a integração e a consistência com o restante
 * do projeto.
 */

const chatbot = require('../nucleo/chatbot'); // Importa o módulo central do Chatbot

class Testador {
  constructor() {
    // Define os cenários de teste com descrição, entrada e padrão esperado (expressão regular)
    this.cenarios = [
      {
        descricao: 'Teste de Saudação Básica',
        entrada: 'olá',
        esperado: /Olá|Oi/
      },
      {
        descricao: 'Teste de Despedida',
        entrada: 'tchau',
        esperado: /Até logo|Volte sempre/
      }
    ];
  }

  /**
   * Executa os cenários de teste definidos.
   * 
   * Para cada cenário, o método:
   * - Registra o tempo de início.
   * - Envia a entrada para o chatbot (usando o método processarMensagem).
   * - Mede a duração da execução.
   * - Verifica se a resposta corresponde ao padrão esperado.
   * - Armazena o resultado (incluindo status, entrada, resposta, duração e erros).
   * - Por fim, gera um relatório detalhado com os resultados.
   *
   * @returns {Promise<void>} - Promise que resolve após a execução de todos os testes.
   */
  async executarTestes() {
    const resultados = []; // Array para armazenar os resultados de cada teste
    
    // Itera sobre cada cenário de teste definido
    for (const cenario of this.cenarios) {
      const inicio = Date.now(); // Registra o início do teste
      try {
        // Chama o método processarMensagem do chatbot com a entrada definida no cenário
        const resposta = await chatbot.processarMensagem(cenario.entrada);
        const duracao = Date.now() - inicio; // Calcula a duração do teste em milissegundos
        
        // Verifica se a resposta obtida corresponde ao padrão esperado (utilizando RegExp)
        const sucesso = cenario.esperado.test(resposta);
        
        // Armazena o resultado do teste com status baseado na verificação
        resultados.push({
          cenario: cenario.descricao,
          status: sucesso ? 'APROVADO' : 'REPROVADO',
          entrada: cenario.entrada,
          resposta,
          duracao: `${duracao}ms`,
          erro: null
        });
        
      } catch (erro) {
        // Em caso de erro durante a execução do teste, armazena o resultado com status "ERRO"
        resultados.push({
          cenario: cenario.descricao,
          status: 'ERRO',
          entrada: cenario.entrada,
          resposta: null,
          duracao: null,
          erro: erro.message
        });
      }
    }
    
    // Após executar todos os testes, gera o relatório com os resultados coletados
    this.gerarRelatorio(resultados);
  }

  /**
   * Gera um relatório detalhado dos testes executados.
   *
   * O relatório inclui:
   * - Número do teste e descrição do cenário.
   * - Entrada enviada e resposta recebida.
   * - Tempo de execução e status do teste.
   * - Caso ocorra, os erros são destacados.
   * - Ao final, são exibidas métricas gerais dos testes (aprovados, reprovados e erros).
   *
   * @param {Array<Object>} resultados - Array com os resultados dos testes.
   */
  gerarRelatorio(resultados) {
    resultados.forEach((teste, index) => {
      // Constrói a mensagem de relatório para cada teste, com detalhes formatados
      const mensagem = [
        `🏷️ Teste #${index + 1}: ${teste.cenario}`,
        `📤 Entrada: ${teste.entrada}`,
        `📥 Resposta: ${teste.resposta || 'N/A'}`, 
        `⏱️ Tempo: ${teste.duracao || 'N/A'}`,
        `✅ Status: ${teste.status}`,
        ...(teste.erro ? [`❗ Erro: ${teste.erro}`] : [])
      ].join('\n');

      // Exibe o relatório do teste no console
      console.log(mensagem);
      console.log('─'.repeat(80)); // Linha separadora para melhor visualização
    });
    
    // Calcula as métricas gerais dos testes
    const metricas = {
      total: resultados.length,
      aprovados: resultados.filter(t => t.status === 'APROVADO').length,
      reprovados: resultados.filter(t => t.status === 'REPROVADO').length,
      erros: resultados.filter(t => t.status === 'ERRO').length
    };
    
    // Exibe as métricas gerais no console
    console.log('📊 Métricas Gerais:');
    console.log(`✅ Aprovados: ${metricas.aprovados}`);
    console.log(`❌ Reprovados: ${metricas.reprovados}`);
    console.log(`⚠️ Erros: ${metricas.erros}`);
    console.log('═'.repeat(80));
  }
}

// Instancia a classe Testador e executa os testes
new Testador().executarTestes();
