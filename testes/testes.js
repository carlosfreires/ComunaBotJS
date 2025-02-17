const chatbot = require('../codigo-fonte/nucleo/chatbot');
const logger = require('../codigo-fonte/configuracao/logger');

class TestadorResiliencia {
  constructor() {
    this.cenarios = [
      {
        nome: 'Cenário Ideal',
        config: {},
        testes: 100
      },
      {
        nome: 'Falha DeepSeek',
        config: { DEEPSEEK_CHAVE_API: 'invalida' },
        testes: 50
      }
    ];
  }

  async executarTestes() {
    for (const cenario of this.cenarios) {
      await this.executarCenario(cenario);
    }
  }

  async executarCenario(cenario) {
    logger.info(`Iniciando cenário: ${cenario.nome}`);
    process.env = { ...process.env, ...cenario.config };
    
    const resultados = [];
    for (let i = 0; i < cenario.testes; i++) {
      resultados.push(await this.executarTeste(i));
    }
    
    this.gerarRelatorio(cenario, resultados);
  }

  async executarTeste(indice) {
    const inicio = Date.now();
    try {
      const resposta = await chatbot.processarMensagem(`Mensagem teste ${indice}`);
      return {
        sucesso: true,
        tempo: Date.now() - inicio,
        resposta
      };
    } catch (erro) {
      return {
        sucesso: false,
        tempo: Date.now() - inicio,
        erro: erro.message
      };
    }
  }

  gerarRelatorio(cenario, resultados) {
    console.log(`\n📊 Relatório do Cenário: ${cenario.nome}`);
    console.log('═'.repeat(60));
    
    const metricas = {
      total: resultados.length,
      sucessos: resultados.filter(r => r.sucesso).length,
      tempoMedio: resultados.reduce((sum, r) => sum + r.tempo, 0) / resultados.length
    };
    
    console.log(`✅ Taxa de Sucesso: ${((metricas.sucessos / metricas.total) * 100).toFixed(1)}%`);
    console.log(`⏱️ Tempo Médio de Resposta: ${metricas.tempoMedio.toFixed(2)}ms`);
    console.log('─'.repeat(60));
    
    if (metricas.sucessos < metricas.total) {
      console.log('🔍 Detalhes das Falhas:');
      resultados.filter(r => !r.sucesso).forEach((falha, index) => {
        console.log(`  ${index + 1}. Erro: ${falha.erro} (${falha.tempo}ms)`);
      });
    }
    
    console.log('═'.repeat(60));
  }
}

new TestadorResiliencia().executarTestes();