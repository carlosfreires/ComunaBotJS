/**
 * Classe responsável por carregar, validar e disponibilizar
 * as variáveis de ambiente para a aplicação.
 * 
 */

require('dotenv').config();

class ConfigService {

  /**
   * Lista de variáveis obrigatórias para funcionamento da aplicação.
   */
  #CHAVES_OBRIGATORIAS = [
    'DEEPSEEK_CHAVE_API',
    'PORTA',
    'DB_SQLITE_CAMINHO'
  ];

  constructor() {
    this.#validarConfig();
  }

  /**
   * Valida se todas as variáveis obrigatórias estão definidas no .env.
   * Lança erro caso alguma esteja ausente.
   */
  #validarConfig() {
    this.#CHAVES_OBRIGATORIAS.forEach(chave => {
      if (!process.env[chave]) {
        throw new Error(`❌ Variável obrigatória faltando: ${chave}`);
      }
    });
  }

  /**
   * Retorna o ambiente atual (desenvolvimento ou produção).
   */
  get ambiente() {
    return process.env.NOME_AMBIENTE || 'desenvolvimento';
  }

  /**
   * Retorna a porta que o servidor deve utilizar.
   */
  get porta() {
    return parseInt(process.env.PORTA, 10);
  }

  /**
   * Retorna as credenciais e configurações para API Deepseek.
   */
  get deepseek() {
    return {
      chave: process.env.DEEPSEEK_CHAVE_API,
      modelo: process.env.DEEPSEEK_MODELO || 'deepseek-chat',
      versao: '1.3.2'
    };
  }

  /**
   * Retorna as configurações de banco de dados para SQLite.
   */
  get bancoDados() {
    return {
      dialect: 'sqlite',
      storage: process.env.DB_SQLITE_CAMINHO || './dados/banco.sqlite'
    };
  }

  /**
   * Retorna as configurações para uso do TensorFlow.
   */
  get tensorflow() {
    return {
      uriModelo: process.env.TF_MODEL_URI || 'file://./dados/modelos/tensorflow/model.json'
    };
  }

  /**
   * Retorna configurações de logging.
   */
  get logs() {
    return {
      nivel: process.env.NIVEL_LOG || 'info'
    };
  }
}

// Exporta instância única
module.exports = new ConfigService();
