const tf = require('@tensorflow/tfjs-node');  
const logger = require('../configuracao/logger');
const ambiente = require('../configuracao/ambiente'); 
const path = require('path');
const fs = require('fs/promises');

class ClassificadorTensorFlow {
  #modelo = null;
  #baseConhecimento = new Map();
  #vocabularioDinamico = new Map();
  #novosExemplos = [];
  versaoModelo = '1.2.0';

  constructor() {
    this.inicializarRecursos().catch(err =>
      logger.error('❌ Falha na inicialização', { 
        erro: err.message,
        stack: err.stack 
      })
    );
  }

  async inicializarRecursos() {
    await this.#carregarVocabulario();
    await this.inicializarModelo();
    await this.#carregarBaseConhecimento();
  }

  async inicializarModelo() {
    try {
      const uriModelo = (ambiente.modelos && ambiente.modelos.tensorflow && ambiente.modelos.tensorflow.uri)
        ? ambiente.modelos.tensorflow.uri
        : 'file://' + path.resolve(__dirname, '../../dados/modelos/tensorflow/model.json');
      this.#modelo = await tf.loadLayersModel(uriModelo);
      logger.info('✅ Modelo TensorFlow carregado', { camadas: this.#modelo.layers.map(l => l.name) });
    } catch (err) {
      logger.error('❌ Erro ao carregar modelo TensorFlow', { 
        erro: err.message,
        stack: err.stack 
      });
      throw err;
    }
  }

  async #carregarVocabulario() {
    try {
      const caminhoVocabulario = path.resolve(__dirname, '../../dados/modelos/tensorflow/vocabulario.json');
      const dados = await fs.readFile(caminhoVocabulario, 'utf-8');
      this.#vocabularioDinamico = new Map(JSON.parse(dados));
    } catch (erro) {
      logger.error(`Falha ao carregar vocabulário: ${erro.message}`);
      this.#vocabularioDinamico = new Map(Object.entries(ambiente.vocabulario));
    }
  }

  async #salvarVocabulario() {
    const caminho = path.resolve(__dirname, '../../dados/modelos/tensorflow/vocabulario.json');
    await fs.writeFile(caminho, JSON.stringify([...this.#vocabularioDinamico]));
  }

  async #carregarBaseConhecimento() {
    try {
      const caminhoBase = path.resolve(__dirname, '../../dados/conhecimento/base.json');
      const dados = await fs.readFile(caminhoBase, 'utf-8');
      this.#baseConhecimento = new Map(JSON.parse(dados));
    } catch (erro) {
      logger.error(`Falha ao carregar base: ${erro.message}`);
      this.#baseConhecimento = new Map();
    }
  }

  async #salvarBaseConhecimento() {
    const caminho = path.resolve(__dirname, '../../dados/conhecimento/base.json');
    await fs.writeFile(caminho, JSON.stringify([...this.#baseConhecimento]));
  }

  async atualizarBaseConhecimento(mensagem, resposta) {
    try {
      const intent = this.#gerarIntent(resposta);
      this.#baseConhecimento.set(intent, resposta);
      this.#novosExemplos.push({ mensagem, intent });
      
      await this.#processarNovosDados();
      await this.#salvarBaseConhecimento();
      
      logger.info('📚 Base de conhecimento atualizada', { intent, mensagem });
    } catch (erro) {
      logger.error('Erro ao atualizar base', { erro: erro.stack });
    }
  }

  async #processarNovosDados() {
    if (this.#novosExemplos.length >= 10) { // Treina a cada 10 exemplos novos
      await this.#atualizarModelo();
      this.#novosExemplos = [];
    }
  }

  #gerarIntent(resposta) {
    return resposta
      .substring(0, 50)
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_');
  }

  #atualizarIndicesVocabulario(palavras) {
    palavras.forEach(palavra => {
      if (!this.#vocabularioDinamico.has(palavra)) {
        this.#vocabularioDinamico.set(palavra, this.#vocabularioDinamico.size + 1);
      }
    });
  }

  async #atualizarModelo() {
    try {
      const todasPalavras = this.#novosExemplos
        .flatMap(ex => ex.mensagem.split(' '))
        .map(p => p.toLowerCase());
      
      this.#atualizarIndicesVocabulario(todasPalavras);
      await this.#salvarVocabulario();

      const modelo = await this.#construirNovoModelo();
      this.#modelo = modelo;
      
      logger.info('🔄 Modelo TensorFlow atualizado com novos dados');
    } catch (erro) {
      logger.error('Falha na atualização do modelo', { erro: erro.stack });
    }
  }

  #preprocessarTexto(texto) {
    const textoLimpo = texto.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .substring(0, 500);
    
    const indices = textoLimpo.split(' ')
      .map(palavra => this.#vocabularioDinamico.get(palavra) || 0);
    
    return tf.tensor2d([indices]);
  }

  obterRespostaBase(intent) {
    return this.#baseConhecimento.get(intent) || null;
  }

  async #construirNovoModelo() {
    const novoModelo = tf.sequential({
      layers: [
        tf.layers.embedding({
          inputDim: this.#vocabularioDinamico.size + 1,
          outputDim: 64,
          inputLength: 500
        }),
        tf.layers.lstm({ units: 128, returnSequences: false }),
        tf.layers.dense({
          units: this.#baseConhecimento.size,
          activation: 'softmax'
        })
      ]
    });

    novoModelo.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'sparseCategoricalCrossentropy',
      metrics: ['accuracy']
    });

    const { entradas, saidas } = this.#prepararDadosTreino();
    await novoModelo.fit(entradas, saidas, {
      epochs: 10,
      batchSize: 32,
      validationSplit: 0.2
    });

    return novoModelo;
  }

  #prepararDadosTreino() {
    const entradas = [];
    const saidas = [];
    
    this.#novosExemplos.forEach((ex, index) => {
      entradas.push(this.#preprocessarTexto(ex.mensagem));
      saidas.push(index);
    });

    return {
      entradas: tf.stack(entradas),
      saidas: tf.tensor1d(saidas, 'int32')
    };
  }
}

module.exports = new ClassificadorTensorFlow();
