const axios = require('axios');
const logger = require('../configuracao/logger');
const ambiente = require('../configuracao/ambiente');
const Disjuntor = require('./Disjuntor');

class IntegracaoDeepSeek {
  constructor() {
    this.config = {
      url: 'https://api.deepseek.com/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${ambiente.deepseek.chave}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      maxRetries: 3,
      retryDelay: 1000
    };

    this.disjuntor = new Disjuntor();
  }

  async gerarResposta(prompt) {
    if (!this.disjuntor.verificarStatus()) {
      logger.warn('DeepSeek: Circuito aberto - requisição bloqueada');
      throw new Error('Serviço temporariamente indisponível');
    }

    let tentativas = 0;
    
    while (tentativas <= this.config.maxRetries) {
      try {
        const resposta = await axios.post(
          this.config.url,
          {
            model: ambiente.deepseek.modelo,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
          },
          {
            headers: this.config.headers,
            timeout: this.config.timeout
          }
        );

        logger.info(`DeepSeek: Resposta gerada para prompt [${prompt.substring(0, 20)}...]`);
        return resposta.data.choices[0].message.content;

      } catch (erro) {
        tentativas++;
        this.disjuntor.registrarFalha();
        
        if (tentativas > this.config.maxRetries) {
          logger.error('DeepSeek: Falha após todas as tentativas', {
            erro: erro.message,
            stack: erro.stack
          });
          throw erro;
        }

        logger.warn(`DeepSeek: Tentativa ${tentativas} falhou - Nova tentativa em ${this.config.retryDelay}ms`);
        await this.aguardarRetry(tentativas);
      }
    }
  }

  aguardarRetry(tentativa) {
    const delay = this.config.retryDelay * Math.pow(2, tentativa);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

module.exports = new IntegracaoDeepSeek();
