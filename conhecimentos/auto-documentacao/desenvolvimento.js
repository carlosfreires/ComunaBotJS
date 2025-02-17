/**
 * Módulo de Comandos de Desenvolvimento e Instalação do ComunabotJS
 *
 * Este módulo fornece uma lista de comandos úteis para desenvolvedores que desejam
 * trabalhar com o projeto. Ele abrange instruções para iniciar o projeto em modo de desenvolvimento,
 * executar testes, verificar a qualidade do código e realizar a instalação inicial.
 *
 * Baseado nos scripts configurados no package.json, os comandos são:
 *
 * - "npm run dev": Inicia o servidor com nodemon para desenvolvimento, permitindo reinicializações automáticas.
 * - "npm run iniciar": Executa o servidor em modo de produção.
 * - "npm run testar": Roda os testes automatizados do projeto.
 * - "npm run lint": Verifica a qualidade do código utilizando ESLint.
 * - "npm run treinar": Executa o treinamento do modelo NLP antes de iniciar o servidor.
 *
 * Além disso, são fornecidas instruções para clonar e instalar o projeto.
 */

module.exports = {
  comandos: {
    desenvolvimento: [
      "⚙️ Modo Dev: npm run dev (utiliza nodemon para reiniciar automaticamente)",
      "🚀 Iniciar: npm run iniciar (executa o servidor em modo de produção)",
      "🧪 Testes: npm run testar (executa os testes automatizados)",
      "🔍 Lint: npm run lint (verifica a qualidade do código com ESLint)",
      "📚 Treinamento NLP: npm run treinar (executa o treinamento do modelo NLP antes de subir o servidor)"
    ],
    instalacao: [
      "1. git clone https://github.com/seuuser/comunabotjs.git",
      "2. cd comunabotjs",
      "3. npm install",
      "4. npm run treinar (executa o treinamento do modelo NLP)",
      "🎉 Pronto! Agora seus clones são meus irmãos gêmeos digitais!"
    ]
  }
};
