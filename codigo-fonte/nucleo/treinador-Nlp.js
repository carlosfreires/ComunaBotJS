const { NlpManager } = require('node-nlp');
const logger = require('../configuracao/logger');
const intencoes = require('../../dados/intencoes/pt-BR.json');
const path = require('path');

class TreinadorNLP {
  constructor() {
    this.versaoModelo = '1.0.0';
    this.gerenciadorNlp = new NlpManager({
      languages: ['pt'],
      autoSave: false,
      modelFileName: path.resolve(__dirname, '../../dados/modelos/nlp/modelo.nlp')
    });
    
    this.exemplosDinamicos = [];
    this.modeloCarregado = false;
  }

  async iniciarTreinamento() {
    try {
      await this.carregarModeloExistente();
      if (!this.modeloCarregado) {
        await this.treinarBaseInicial();
      }
    } catch (erro) {
      logger.error(`Falha na inicializa\\u00e7\\u00e3o: ${erro.stack}`);
      throw erro;
    }
  }

  async carregarModeloExistente() {
    try {
      await this.gerenciadorNlp.load();
      this.modeloCarregado = true;
      logger.info('📚 Modelo NLP pré-treinado carregado');
    } catch (erro) {
      this.modeloCarregado = false;
      logger.warn(`Modelo NLP n\\u00e3o carregado: ${erro.message}`);
    }
  }

  async treinarBaseInicial() {
    try {
      this.processarDadosEstaticos();
      await this.gerenciadorNlp.train();
      await this.gerenciadorNlp.save();
      logger.info('🎓 Treinamento inicial NLP concluído');
    } catch (erro) {
      logger.error(`Erro treinamento inicial: ${erro.stack}`);
      throw erro;
    }
  }

  processarDadosEstaticos() {
    Object.entries(intencoes).forEach(([intencao, dados]) => {
      dados.exemplos.forEach(exemplo => this.adicionarDocumento(intencao, exemplo));
      dados.respostas.forEach(resposta => this.adicionarResposta(intencao, resposta));
    });
  }

  async retreinarModelo() {
    try {
      await this.gerenciadorNlp.train();
      await this.gerenciadorNlp.save();
      logger.info('🔄 Modelo NLP atualizado com novos exemplos');
    } catch (erro) {
      logger.error(`Falha retreinamento: ${erro.stack}`);
    }
  }

  adicionarDocumento(intencao, exemplo) {
    this.gerenciadorNlp.addDocument('pt', exemplo, intencao);
  }

  adicionarResposta(intencao, resposta) {
    this.gerenciadorNlp.addAnswer('pt', intencao, resposta);
  }

  normalizarIntent(texto) {
    return texto
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);
  }

  async adicionarExemploDinamico(mensagem, resposta) {
    try {
      const intent = this.normalizarIntent(resposta);
      this.adicionarDocumento(intent, mensagem);
      this.adicionarResposta(intent, resposta);
      
      this.exemplosDinamicos.push({ mensagem, intent, resposta });
      
      await this.retreinarModelo();
      logger.verbose(`Exemplo dinâmico adicionado: ${mensagem} \u2192 ${intent}`);
    } catch (erro) {
      logger.error(`Falha ao adicionar exemplo: ${erro.stack}`);
    }
  }
}

module.exports = new TreinadorNLP();
