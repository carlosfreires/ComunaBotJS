const express = require('express');
const ambiente = require('./configuracao/ambiente');
const logger = require('./configuracao/logger');
const rota = require('./rotas/api');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const process = require('process');

async function main() {
  const app = express();

  // Middlewares de segurança e utilitários
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100
  }));

  // Define a rota principal da API
  app.use('/api', rota);

  // Inicialização do servidor
  const _server = app.listen(ambiente.porta, () => {
    logger.info(`🚀 Servidor rodando na porta ${ambiente.porta}`);
  });

  // Graceful shutdown para desligamento controlado
  process.on('SIGTERM', () => {
    logger.info('Encerrando o servidor...');
    _server.close(() => {
      logger.info('Servidor encerrado com sucesso.');
      process.exit(0);
    });
  });
}

main();
