/**
 * Módulo de Operação do ComunabotJS
 *
 * Este módulo fornece instruções e comandos úteis para operar o sistema em diferentes ambientes:
 * - Modo Desenvolvimento: para desenvolvimento ativo com hot reload, monitoramento e debug.
 * - Modo Produção: para iniciar, monitorar logs e atualizar a aplicação em ambiente produtivo.
 *
 * Baseado nos scripts configurados no package.json, os comandos sugeridos são:
 * 
 * Desenvolvimento:
 * - "npm run dev": Inicia o servidor com nodemon (hot reload).
 * - "NODE_ENV=monitor npm run iniciar": Inicia o servidor com variáveis para monitoramento.
 * - "DEBUG=comunabot* npm run iniciar": Inicia o servidor com debug ativado.
 *
 * Produção:
 * - "npm run iniciar": Inicia o servidor em modo de produção.
 * - Verifique os logs em: logs/ (arquivos de erros e interações).
 * - "git pull && npm install && npm run treinar": Atualiza o repositório, instala dependências e re-treina os modelos.
 */

module.exports = {
  modos: {
    desenvolvimento: [
      "⚙️ Modo Dev: npm run dev (hot reload com nodemon)",
      "📊 Monitoramento: NODE_ENV=monitor npm run iniciar",
      "🔧 Debug: DEBUG=comunabot* npm run iniciar"
    ],
    producao: [
      "🚀 Iniciar: npm run iniciar",
      "📈 Logs: Verifique os arquivos em logs/ (erros e interações)",
      "🔄 Atualizar: git pull && npm install && npm run treinar"
    ]
  }
};
