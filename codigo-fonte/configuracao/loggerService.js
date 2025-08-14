/**
 * Classe responsável por configurar e gerenciar o sistema de logging
 * utilizando a biblioteca Winston.
 * 
 * Este logger registra:
 * - Erros em arquivo específico.
 * - Interações gerais em outro arquivo.
 * - Saída no console com cores.
 * 
 * O formato inclui timestamps, níveis de log e metadados contextuais.
 */

const { createLogger, format, transports } = require('winston'); 
const { combine, timestamp, printf, colorize, metadata } = format; // Funções de formatação do Winston
const path = require('path'); 
const config = require('./configService');

// Classe para encapsular toda a lógica de logging
class LoggerService {
  
  /**
   * Construtor - inicializa o logger com base nas configurações do ambiente.
   */
  constructor() {
    this.NOME_SERVICO = 'comunabotjs'; // Nome do serviço que será incluído nos metadados padrão
    this.CAMINHO_LOGS = path.join(__dirname, '../../logs'); // Diretório base para os logs

    // Inicializa a instância principal do logger
    this.logger = createLogger({
      level: config.logs.nivel, // Nível mínimo de log (info, warn, error, etc.)
      transports: this.#criarTransportes(), // Transportes para arquivo e console
      defaultMeta: { service: this.NOME_SERVICO } // Metadados padrão
    });
  }

  /**
   * Define o formato customizado das mensagens de log.
   * Inclui:
   * - Timestamp
   * - Nível de log
   * - Mensagem
   * - Metadados (quando presentes)
   */
  #formatarLog() {
    return printf(({ level, message, timestamp, metadata }) => {
      let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (metadata && Object.keys(metadata).length > 0) {
        msg += `\n  ↳ Contexto: ${JSON.stringify(metadata)}`;
      }
      return msg;
    });
  }

  /**
   * Cria os diferentes transportes do Winston para armazenar e exibir logs.
   * - Arquivo de erros
   * - Arquivo de interações
   * - Console com cores
   */
  #criarTransportes() {
    return [
      // Transporte para registrar erros
      new transports.File({
        filename: path.join(this.CAMINHO_LOGS, 'erros/erros.log'),
        level: 'error',
        format: combine(
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
          this.#formatarLog()
        )
      }),

      // Transporte para registrar interações gerais
      new transports.File({
        filename: path.join(this.CAMINHO_LOGS, 'interacoes/interacoes.log'),
        format: combine(
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          metadata({ fillWith: ['ip', 'userAgent'] }),
          this.#formatarLog()
        )
      }),

      // Transporte para exibir no console
      new transports.Console({
        format: combine(
          colorize(),
          timestamp({ format: 'HH:mm:ss' }),
          metadata({ fillWith: ['tempoResposta'] }),
          this.#formatarLog()
        )
      })
    ];
  }

  /**
   * Métodos de logging expostos para uso externo
   */

  info(mensagem, dados = {}) {
    this.logger.info(mensagem, dados);
  }

  warn(mensagem, dados = {}) {
    this.logger.warn(mensagem, dados);
  }

  error(mensagem, dados = {}) {
    this.logger.error(mensagem, dados);
  }

  debug(mensagem, dados = {}) {
    this.logger.debug(mensagem, dados);
  }

}

module.exports = new LoggerService();