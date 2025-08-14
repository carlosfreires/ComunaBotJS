const { NlpManager } = require('node-nlp');
const TreinadorNLP = require('./treinador-Nlp');
const ClassificadorTensorFlow = require('./classificador-TensorFlow');
const IntegracaoDeepSeek = require('../integracoes/deepseek');
const logger = require('../configuracao/loggerService');
const Disjuntor = require('../integracoes/Disjuntor');
const path = require('path');

class Chatbot {
  constructor() {
    // Inicializa o gerenciador NLP com o caminho para o modelo pré-treinado.
    this.gerenciadorNlp = new NlpManager({ 
      languages: ['pt'],
      nlu: { log: false },
      modelFileName: path.resolve(__dirname, '../../dados/modelos/nlp/modelo.nlp')
    });
    
    // Instancia os módulos de classificação e integração.
    this.classificadorTF = ClassificadorTensorFlow;
    this.deepseek = IntegracaoDeepSeek;
    this.treinadorNLP = TreinadorNLP;
    this.circuitoBackend = new Disjuntor();
    
    // Contexto para armazenamento do histórico e estatísticas das interações.
    this.contexto = {
      historico: [],
      baseConhecimento: new Map(),
      estatisticas: {
        nlp: 0,
        tensorflow: 0,
        deepseek: 0
      }
    };

    // Inicia o sistema (carregando modelos ou treinando conforme necessário).
    this.iniciarSistema().catch(erro => {
      logger.error(`Falha crítica: ${erro.stack}`);
      process.exit(1);
    });
  }

  async iniciarSistema() {
    try {
      // Carrega o modelo NLP pré-treinado ou inicia o treinamento inicial.
      await this.treinadorNLP.iniciarTreinamento();
      // Inicializa o modelo TensorFlow.
      await this.classificadorTF.inicializarModelo();
      logger.info('🚀 Sistema totalmente inicializado');
    } catch (erro) {
      logger.error(`🔥 Falha na inicialização: ${erro.stack}`);
      throw erro;
    }
  }

  // Método principal para processar a mensagem do usuário
  async processarMensagem(mensagem) {
    try {
      const resposta = await this._processarHierarquico(mensagem);
      this._registrarHistorico(mensagem, resposta);
      return resposta;
    } catch (erro) {
      return this._lidarComFalha(erro);
    }
  }

  // Função que tenta processar a mensagem utilizando, em sequência, NLP, TensorFlow e DeepSeek
  async _processarHierarquico(mensagem) {
    let resposta = await this.processarViaNLP(mensagem);
    if (resposta) return resposta;

    resposta = await this.processarViaTensorFlow(mensagem);
    if (resposta) return resposta;

    resposta = await this.processarViaDeepSeek(mensagem);
    if (resposta) return resposta;

    return this.gerarRespostaFallback();
  }

  // Trata falhas no processamento, logando o erro e retornando uma resposta de fallback
  _lidarComFalha(erro) {
    logger.error(`Erro processando mensagem: ${erro.stack}`);
    return this.gerarRespostaFallback();
  }

  _registrarHistorico(mensagem, resposta) {
    this.contexto.historico.push({
      input: mensagem,
      output: resposta,
      fonte: this.obterFonteResposta(),
      timestamp: new Date().toISOString()
    });
  }

  async processarViaNLP(mensagem) {
    const resultado = await this.gerenciadorNlp.process('pt', mensagem);
    if (resultado.score > 0.8) {
      this.contexto.estatisticas.nlp++;
      logger.debug(`Resposta NLP: ${resultado.answer}`);
      return resultado.answer;
    }
    return null;
  }

  async processarViaTensorFlow(mensagem) {
    try {
      const classificacao = await this.classificadorTF.classificar(mensagem);
      const melhorIntencao = classificacao.intencoes[0];
      
      if (melhorIntencao && melhorIntencao.score > 0.7) {
        const resposta = this.classificadorTF.obterRespostaBase(melhorIntencao.nome);
        if (resposta) {
          this.contexto.estatisticas.tensorflow++;
          logger.debug(`Resposta TensorFlow: ${resposta}`);
          return resposta;
        }
      }
      return null;
    } catch (erro) {
      logger.error(`Falha na classificação TF: ${erro.stack}`);
      return null;
    }
  }

  async processarViaDeepSeek(mensagem) {
    const resposta = await this.deepseek.gerarResposta(mensagem);
    this.contexto.estatisticas.deepseek++;
    
    // Aprendizado contínuo: integra a interação aos sistemas de conhecimento
    await this.aprenderComInteracao(mensagem, resposta);
    
    logger.debug(`Resposta DeepSeek: ${resposta}`);
    return resposta;
  }

  async aprenderComInteracao(mensagem, resposta) {
    try {
      // Atualiza a base de conhecimento do TensorFlow
      await this.classificadorTF.atualizarBaseConhecimento(mensagem, resposta);
      // Adiciona um novo exemplo dinâmico ao treinamento do NLP
      await this.treinadorNLP.adicionarExemploDinamico(
        mensagem, 
        resposta.replace(/\s+/g, '_').substring(0, 20),
        resposta
      );
      logger.info('🧠 Novo conhecimento adquirido');
    } catch (erro) {
      logger.error(`Falha no aprendizado: ${erro.stack}`);
    }
  }

  gerarRespostaFallback() {
    const fallbacks = [
      "Estou processando sua solicitação...",
      "Preciso de mais informações para ajudar.",
      "Vou consultar meus recursos técnicos..."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  obterFonteResposta() {
    const ultimaInteracao = this.contexto.historico.slice(-1)[0];
    return ultimaInteracao?.fonte || 'indeterminada';
  }

  obterVersoes() {
    return {
      nlp: this.treinadorNLP.versaoModelo,
      tensorflow: this.classificadorTF.versaoModelo,
      deepseek: ambiente.deepseek.versao
    };
  }
}

module.exports = new Chatbot();
