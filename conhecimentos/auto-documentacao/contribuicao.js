/**
 * Módulo de Contribuição do ComunabotJS
 *
 * Este módulo define as diretrizes para contribuir com o projeto, detalhando os passos
 * e fornecendo dicas importantes para manter a qualidade e a consistência do código.
 * Ele pode ser utilizado pelo bot para responder a perguntas sobre como contribuir com o projeto.
 */

module.exports = {
  contribuicao: {
    introducao: "Contribuir para o ComunabotJS é simples e colaborativo! Siga os passos abaixo para enviar suas melhorias, correções ou novas funcionalidades.",
    passos: [
      "1. Faça um fork do repositório para sua conta.",
      "2. Clone o fork para sua máquina local: git clone https://github.com/seu-usuario/comunabotjs.git",
      "3. Crie uma branch para sua feature ou correção: git checkout -b feature/nova-funcionalidade",
      "4. Desenvolva suas alterações seguindo as convenções de código do projeto (ex.: ESLint, padrões de commits).",
      "5. Execute os testes localmente para garantir que tudo esteja funcionando: npm testar",
      "6. Faça commit das suas alterações com mensagens claras e descritivas: git commit -m 'feat: adiciona nova funcionalidade X'",
      "7. Envie sua branch para o repositório remoto: git push origin feature/nova-funcionalidade",
      "8. Abra um Pull Request no repositório original com uma descrição detalhada das mudanças realizadas.",
      "9. Aguarde o feedback dos mantenedores e esteja pronto para realizar eventuais ajustes.",
      "🎉 Parabéns! Sua contribuição é valiosa para o crescimento do ComunabotJS! 🚀"
    ],
    dicas: [
      "Verifique se a sua branch está atualizada com a branch principal antes de iniciar as alterações.",
      "Mantenha os commits pequenos e focados em uma única funcionalidade ou correção.",
      "Utilize mensagens de commit que sigam o padrão: feat:, fix:, docs:, style:, refactor:, test:, chore:.",
      "Adicione ou atualize testes sempre que fizer alterações no código.",
      "Consulte o arquivo CONTRIBUTING.md (se existir) para mais detalhes sobre as diretrizes de contribuição."
    ]
  }
};
