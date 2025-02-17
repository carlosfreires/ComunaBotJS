require('dotenv').config();

const validarConfig = () => {
  const chavesObrigatorias = [
    'DEEPSEEK_CHAVE_API',
    'PORTA',
    'DB_HOST',
    'DB_PORTA',
    'DB_USUARIO',
    'DB_SENHA',
    'DB_NOME'
  ];
  
  chavesObrigatorias.forEach(chave => {
    if (!process.env[chave]) {
      throw new Error(`❌ Variável obrigatória faltando: ${chave}`);
    }
  });
};

validarConfig();

module.exports = {
  ambiente: process.env.NOME_AMBIENTE || 'desenvolvimento',
  porta: parseInt(process.env.PORTA, 10),
  
  deepseek: {
    chave: process.env.DEEPSEEK_CHAVE_API,
    modelo: process.env.DEEPSEEK_MODELO || 'deepseek-chat',
    versao: '1.3.2'
  },

  bancoDados: {
    host: process.env.DB_HOST,
    porta: parseInt(process.env.DB_PORTA, 10),
    usuario: process.env.DB_USUARIO,
    senha: process.env.DB_SENHA,
    nome: process.env.DB_NOME,
    dialect: 'postgres'
  },

  tensorflow: {
    uriModelo: process.env.TF_MODEL_URI || 'file://./dados/modelos/tensorflow/model.json'
  },

  logs: {
    nivel: process.env.NIVEL_LOG || 'info'
  }
};