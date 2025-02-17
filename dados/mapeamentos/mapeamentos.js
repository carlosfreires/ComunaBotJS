/**
 * Mapeamentos de Categorias e Subtópicos para os Conhecimentos do ComunabotJS
 *
 * Este módulo define as regras de mapeamento que permitem ao chatbot direcionar a consulta
 * para o arquivo de conhecimento correto, com base em palavras-chave extraídas da mensagem do usuário.
 *
 * As categorias abrangem desde suporte técnico e desenvolvimento até ciência, cultura pop,
 * movimentos sociais e política. Os subtópicos permitem uma segmentação mais detalhada dentro de cada categoria.
 *
 * A função validarCaminho garante que os acessos se restrinjam à pasta de conhecimentos, evitando
 * tentativas de acesso indevido a outros diretórios.
 */

const path = require('path');

module.exports = {
  categorias: {
    // Suporte Técnico
    'linux|ubuntu|debian|terminal|bash': 'suporte-tecnico/sistemas-operacionais',
    'windows|powershell|edge|cmd': 'suporte-tecnico/sistemas-operacionais',
    'rede|ip|dns|conexão|router': 'suporte-tecnico/redes',
    // Desenvolvimento e Instalação
    'github|clone|instalar|fork': 'auto-documentacao/desenvolvimento',
    // Conhecimentos de Ciência e Tecnologia - Inteligência Artificial
    'machine learning|deep learning|nlp|supervised learning|unsupervised learning|reinforcement learning|feature engineering|model training': 'conhecimentos/inteligencia-artificial',
    // Programação
    'javascript|node|react|vue|angular|typescript|python|django|flask|java|spring|hibernate|c#|asp\\.net|ruby|rails|php|laravel|go|golang|rust|swift|kotlin|lua|sql|devops': 'conhecimentos/programacao',
    // Cultura Pop
    'starwars|matrix|guia mochileiro|harrypotter|cyberpunk|game of thrones|lord of the rings|pokemon|stranger things|marvel|games|startrek|anime|naruto|attack on titan': 'conhecimentos/cultura-pop',
    // Movimentos Sociais
    'movimento|direitos civis|feminismo|guerrilha|panteras|black lives matter': 'conhecimentos/movimentos-sociais',
    // Política e História
    'brics|mercosul|unasul|globalização|política internacional|revolução|governo|ditadura|impeachment|eleição': 'conhecimentos/politica'
  },

  subtopicos: {
    // Suporte Técnico
    'windows|edge|powershell|cmd': 'windows',
    'linux|ubuntu|debian|terminal|bash': 'linux',
    'rede|ip|dns|conexão|router': 'diagnostico',
    // Desenvolvimento e Instalação
    'github|clone|instalar|fork': 'instalacao',
    // Inteligência Artificial (ML)
    'machine learning|deep learning|nlp|supervised learning|unsupervised learning|reinforcement learning|feature engineering|model training': 'ml',
    // Programação - subdividindo por linguagem ou tecnologia
    'javascript|node|react|vue|angular|typescript': 'js',
    'python|django|flask': 'python',
    'java|spring|hibernate': 'java',
    'c#|asp\\.net': 'cSharp',
    'ruby|rails': 'ruby',
    'php|laravel': 'php',
    'go|golang': 'go',
    'rust': 'rust',
    'swift': 'swift',
    'kotlin': 'kotlin',
    'lua': 'lua',
    'sql': 'sql',
    'devops': 'devOps',
    // Cultura Pop
    'starwars': 'starWars',
    'matrix': 'matrix',
    'guia mochileiro': 'guiaMochileiro',
    'harrypotter': 'harryPotter',
    'cyberpunk': 'cyberpunk',
    'game of thrones': 'gameOfThrones',
    'lord of the rings': 'lordOfTheRings',
    'pokemon': 'pokemon',
    'stranger things': 'strangerThings',
    'marvel': 'marvel',
    'games': 'games',
    'startrek': 'starTrek',
    'anime|naruto|attack on titan': 'anime',
    // Movimentos Sociais
    'direitos civis|feminismo|guerrilha|panteras|black lives matter': 'direitos_civis',
    // Política
    'brics|mercosul|unasul|globalização|política internacional|revolução|governo|ditadura|impeachment|eleição': 'politica'
  },

  /**
   * Valida o caminho de acesso aos arquivos de conhecimento.
   * Garante que apenas caminhos dentro do diretório "conhecimentos" sejam acessados,
   * prevenindo acesso indevido a outros diretórios do sistema.
   *
   * @param {string} caminhoRelativo - O caminho relativo solicitado.
   * @returns {string} - O caminho absoluto validado.
   * @throws {Error} - Se o caminho absoluto não iniciar com o diretório base de conhecimentos.
   */
  validarCaminho: (caminhoRelativo) => {
    const caminhoBase = path.resolve(__dirname, '../conhecimentos');
    const caminhoAbsoluto = path.resolve(caminhoBase, caminhoRelativo);
    if (!caminhoAbsoluto.startsWith(caminhoBase)) {
      throw new Error('Tentativa de acesso a caminho inválido');
    }
    return caminhoAbsoluto;
  }
};
