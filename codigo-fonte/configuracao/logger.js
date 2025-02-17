/**
 * Este módulo configura o sistema de logging utilizando a biblioteca Winston.
 * Ele define diferentes "transportes" para armazenar logs em arquivos (erros e interações)
 * e exibi-los no console, além de formatar as mensagens com timestamps, níveis e metadados.
 */

const { createLogger, format, transports } = require('winston'); // Importa funções essenciais do Winston.
const { combine, timestamp, printf, colorize, metadata } = format;   // Extrai métodos de formatação.
const caminho = require('path');                                     // Módulo para manipulação de caminhos.
const ambiente = require('./ambiente');                              // Configurações do ambiente, incluindo nível de logs.

// Define o formato padrão para as mensagens de log.
const formatoLog = printf(({ level, message, timestamp, metadata }) => {
  // Constrói a mensagem inicial com timestamp, nível e mensagem principal.
  let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  // Se houver metadados, adiciona-os de forma formatada abaixo da mensagem principal.
  if (metadata && Object.keys(metadata).length > 0) {
    msg += `\n  ↳ Contexto: ${JSON.stringify(metadata)}`;
  }
  return msg;
});

// Função que cria os transportes para os logs (arquivos e console).
const criarTransportes = () => [
  // Transporte para registrar erros em um arquivo específico.
  new transports.File({
    filename: caminho.join(__dirname, '../../logs/erros/erros.log'),
    level: 'error', // Apenas mensagens de nível 'error' serão gravadas neste arquivo.
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona timestamp com o formato definido.
      metadata({ fillExcept: ['message', 'level', 'timestamp'] }), // Insere metadados ignorando campos principais.
      formatoLog // Aplica o formato customizado definido acima.
    )
  }),
  // Transporte para registrar interações (logs gerais) em outro arquivo.
  new transports.File({
    filename: caminho.join(__dirname, '../../logs/interacoes/interacoes.log'),
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Usa o mesmo formato de timestamp para consistência.
      metadata({ fillWith: ['ip', 'userAgent'] }), // Insere metadados específicos (como IP e userAgent).
      formatoLog
    )
  }),
  // Transporte para exibir os logs no console com formatação colorida.
  new transports.Console({
    format: combine(
      colorize(), // Adiciona cores aos níveis de log para facilitar a leitura.
      timestamp({ format: 'HH:mm:ss' }), // Timestamp com um formato mais simples para o console.
      metadata({ fillWith: ['tempoResposta'] }), // Insere metadados (ex.: tempo de resposta).
      formatoLog
    )
  })
];

// Cria o logger utilizando as configurações definidas, incluindo o nível de log obtido do ambiente.
const logger = createLogger({
  level: ambiente.logs.nivel, // Define o nível mínimo de log (ex.: info, warn, error) conforme configurado.
  transports: criarTransportes(), // Associa os transportes criados ao logger.
  defaultMeta: { service: 'comunabotjs' } // Meta-dado padrão que identifica o serviço.
});

// Exporta o logger para ser utilizado em toda a aplicação, garantindo integração com os demais módulos.
module.exports = logger;
