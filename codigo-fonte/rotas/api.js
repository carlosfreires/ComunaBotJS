const express = require('express');
const router = express.Router();
const chatbot = require('../nucleo/chatbot');
const logger = require('../configuracao/logger');

router.post('/mensagem', async (req, res) => {
  try {
    const { mensagem } = req.body;
    
    if (!mensagem || !mensagem.trim()) {
      logger.warn('API: Tentativa de requisição sem mensagem');
      return res.status(400).json({ 
        erro: 'Mensagem inválida',
        detalhes: 'O campo mensagem deve conter texto'
      });
    }

    logger.info(`API: Processando mensagem [${mensagem.substring(0, 20)}...]`);
    const resposta = await chatbot.processarMensagem(mensagem);
    
    res.json({
      resposta,
      metadata: {
        timestamp: new Date().toISOString(),
        modelo_origem: chatbot.obterFonteResposta(),
        versao_modelos: chatbot.obterVersoes()
      }
    });

  } catch (erro) {
    logger.error('API: Erro no processamento', {
      erro: erro.message,
      stack: erro.stack
    });
    res.status(500).json({
      erro: 'Falha no processamento',
      detalhes: erro.message
    });
  }
});

module.exports = router;
