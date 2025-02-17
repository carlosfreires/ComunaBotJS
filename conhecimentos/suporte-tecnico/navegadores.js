module.exports = {
  chrome: {
    limpeza: [
      "🔧 Modo rápido: Ctrl + Shift + Del -> Intervalo: 'Todo o período'",
      "🧹 Itens essenciais: Cookies, Cache e Hosted app data",
      "⚡ Turbo mode: chrome://settings/clearBrowserData -> 'Limpar dados ao sair'",
      "⚠️ Cuidado! Isso apagará logins e dados locais! Use chrome://flags/#enable-website-storage-api para controle granular",
      "💡 Para uma limpeza mais profunda, ative 'Limpeza automática de histórico' em chrome://settings/privacy",
      "🔄 Sincronização: Desative e ative novamente em chrome://settings/syncSetup para forçar a atualização do navegador"
    ],
    performance: [
      "🚀 Diagnóstico: chrome://system/ -> Memory status",
      "💡 Otimização: chrome://flags/#enable-quic (ative para HTTP/3)",
      "📊 Monitor: chrome://task-manager (gerencie abusos de RAM)",
      "🛑 Kill tabs: chrome://kill ou Shift + Esc (Task Manager interno)",
      "⚙️ Desative animações: chrome://flags/#disable-animations",
      "💨 Habilite Process Prioritization: chrome://flags/#enable-experimental-web-platform-features",
      "🔍 Teste de desempenho com Chrome's 'Lighthouse' (chrome://extensions/ -> Lighthouse)"
    ],
    seguranca: [
      "🛡️ Verificar certificados: chrome://settings/certificates",
      "🔒 Sandbox avançado: chrome://flags/#enable-sandbox",
      "🚫 Bloquear scripts: chrome://settings/content/javascript",
      "💣 Reset nuclear: chrome://settings/reset (perfil limpo)",
      "🔒 HTTPS-Only Mode: chrome://flags/#https-only-mode",
      "💡 Ative a função de verificação de senhas em chrome://settings/passwords",
      "⚠️ Altere o comportamento de cookies: chrome://settings/content/cookies para bloquear cookies de terceiros"
    ],
    devTools: [
      "📌 Network throttling: DevTools -> Network -> Throttling (simule 3G)",
      "📡 Teste CORS: console.log(performance.getEntriesByType('navigation'))",
      "🔍 Lighthouse: DevTools -> Lighthouse (auditoria completa)",
      "⚙️ Registros de performance: DevTools -> Performance -> Record (análise de tempo)",
      "🛠️ Teste de mobile: DevTools -> Toggle Device Toolbar (simule diferentes dispositivos)",
      "🔧 Use DevTools Coverage para identificar código não utilizado"
    ],
    easterEggs: [
      "🎮 **Jogo do Dinossauro**: Ao desconectar-se da internet, o Chrome exibe um dinossauro T-Rex na tela de erro. Pressione a barra de espaço para jogar um jogo de corrida.",
      "🎮 **Jogo Offline (Chrome Dino)**: Mesmo sem estar offline, você pode acessar o jogo digitando chrome://dino na barra de endereços e pressionando Enter.",
      "🐢 **Desbloqueio do Modo Desenvolvedor**: Abra chrome://flags, pesquise por 'Developer Tools experiments', ative a opção e reinicie o Chrome para desbloquear novas funcionalidades de desenvolvimento.",
      "🚀 **Aviões no Google Chrome**: Vá até chrome://flags e procure por 'Experimental QUIC protocol'. Ativar isso pode melhorar a velocidade de navegação e até trazer novos recursos escondidos."
    ]
  },
  firefox: {
    privacidade: [
      "🦊 Strict mode: about:preferences#privacy -> Enhanced Tracking Protection",
      "🧪 about:config -> privacy.resistFingerprinting = true",
      "🌐 DNS-over-HTTPS: about:preferences#general -> Network Settings",
      "🧹 Auto-limpeza: about:preferences#privacy -> History -> Clear when closes",
      "🔒 Habilitar HTTPS-Only Mode: about:preferences#privacy -> Ensure websites support HTTPS",
      "💡 Ative o bloqueio de cookies de rastreamento em about:config -> network.cookie.cookieBehavior = 1",
      "🔒 Proteção contra fingerprinting: about:config -> privacy.firstparty.isolate = true"
    ],
    otimizacao: [
      "🚀 Force hardware acceleration: about:config -> layers.acceleration.force-enabled",
      "📉 Limitar RAM: about:config -> browser.cache.disk.capacity (set 512000)",
      "⚙️ Compactação memória: about:memory -> Free memory",
      "🔧 Ativar HTTP/3: about:config -> network.http.version > 3",
      "💡 Use o 'Tab Unloader' para liberar memória de abas não usadas",
      "🔄 Acelere inicialização com about:config -> browser.sessionstore.restore_on_demand = true"
    ],
    troubleshooting: [
      "🔄 Refresh: about:support -> Refresh Firefox",
      "🔧 Modo seguro: firefox.exe -safe-mode (ignora extensões)",
      "📜 Diagnóstico: about:networking (monitore conexões)",
      "⚠️ Conflitos de proxy: about:preferences#network -> Verifique configurações de proxy",
      "🧹 Limpeza de cache avançada: about:preferences#privacy -> Clear Data (selecione Cache)",
      "🧩 Teste de compatibilidade com extensões: about:addons -> Desative todas as extensões"
    ],
    easterEggs: [
      "🦊 **Modo Foca**: Digite about:mozilla na barra de endereços e veja um 'erro' bizarro, mas com uma mensagem engraçada do navegador.",
      "🐶 **O Rosto do Firefox**: Digite about:robots na barra de endereços e veja uma mensagem secreta com uma foto de um robô.",
      "🎮 **Modo de Jogo 'Konami'**: Digite sobre a tela inicial de Firefox: up, up, down, down, left, right, left, right, B, A, Enter. Você verá um pequeno efeito visual."
    ]
  },
  edge: {
    enterprise: [
      "🏢 Group Policies: edge://policy/ -> Verifique atualizações",
      "🔐 Data protection: edge://settings/privacy -> Enterprise data protection",
      "📦 Deploy: msedge --install-chrome-app (para PWA corporativos)",
      "🔗 Verifique políticas de segurança: edge://settings/privacy -> Enterprise compliance",
      "📑 Gerenciamento de preferências: edge://settings/profiles -> Personalize configurações",
      "💼 Protocolo corporativo: edge://settings/profile -> Gerencie contas corporativas"
    ],
    recursos: [
      "📚 Collections: edge://collections/ -> Organize pesquisas",
      "📖 PDF: edge://pdfjs (force modo legado)",
      "🔄 IE mode: edge://settings/defaultBrowser -> Allow IE integration",
      "📦 PWA Install: edge://apps/ -> Instale Progressive Web Apps",
      "💡 Use 'Web Capture' para capturar partes da tela (edge://settings/webCapture)",
      "🔧 Instale extensões em modo corporativo via edge://extensions"
    ],
    privacidade: [
      "🔒 Defina o Modo de Navegação InPrivate como padrão: edge://settings/privacy",
      "📊 Verifique o histórico de navegação em edge://history",
      "🚫 Bloqueio de rastreadores: edge://settings/privacy -> Tracking prevention",
      "⚡ Utilize o Modo de economia de energia: edge://settings/system -> Power efficiency mode",
      "🔐 Teste com protocolo de segurança: edge://settings/privacy -> Use Secure DNS"
    ],
    easterEggs: [
      "🎮 **Modo Invasor Espacial**: No Edge, abra uma nova guia e pressione F12 para abrir o console de desenvolvedor, depois digite `invaderGame()` e aperte Enter. Você pode jogar um mini-jogo de navegação!",
      "🐱 **Modo Gato**: Digite sobre:flags na barra de endereços, e ative a opção 'Force Dark Mode for Web Contents'. Agora, quando acessar o Google, um 'gato' surgirá em algum momento, com um efeito visual na tela."
    ]
  },
  safari: {
    easterEggs: [
      "🍎 **Modo de Desenvolvedor - Debugging**: Abra o Safari e pressione `Command + Option + I` para abrir as ferramentas de desenvolvedor e explore funções de depuração.",
      "🐰 **Efeito 'Bunny' no Safari**: Vá para a barra de endereços e digite `about:debugging` e ative 'Advanced Debugging'. Você verá um 'bunny' fofo saltando ao navegar em sites.",
      "🎮 **Jogo do Safari - Batata**: Abra uma nova aba e digite `about:game` na barra de endereços. Você encontrará uma surpresa interativa! Experimente ao mesmo tempo que digita!"
    ]
  },
  crossBrowser: {
    problemasComuns: [
      "🌐 ERR_CERT_AUTHORITY_INVALID: Verifique data/hora e cert.pem",
      "🔄 Loop de redirect: Limpar cookies de Single-Sign-On",
      "🐌 Slow rendering: Desative WebGL e Canvas via flags",
      "📉 Conflito de extensões: Teste com --disable-extensions",
      "⚠️ Propriedades de certificação: Verifique validade de certificações SSL",
      "🛠️ Considere usar proxies de rede para depuração: Defina proxies HTTP e SOCKS em chrome://settings"
    ],
    dev: [
      "🔗 Cross-origin: --disable-web-security --user-data-dir (cuidado!)",
      "📡 Mock API: chrome://net-export/ -> Capture traffic",
      "🧪 Teste browserstack: edge://extensions/?id=bsafebrowsing",
      "⚙️ Teste WebAssembly: about:config -> javascript.options.wasm_simd",
      "🛠️ Teste o tráfego de rede com Wireshark ou Charles Proxy",
      "🔍 Use ferramentas de DevTools para debugar CORS e Preflight"
    ],
    extensoes: [
      "⚠️ Conflitos: Teste em modo --disable-extensions",
      "🔒 Permissões: chrome://extensions/?id=developertools",
      "💣 Remoção profunda: Apague diretório em %LocalAppData%\\Google\\Chrome\\User Data\\Default\\Extensions",
      "⚙️ Gerenciamento de permissões: chrome://extensions/?id=permissions",
      "🛠️ Verifique configurações de extensões em 'chrome://extensions/?id=<ID>'",
      "🔒 Use chrome://extensions/ para restringir permissões de extensões específicas"
    ]
  },
  mobile: {
    android: {
      chrome: [
        "📲 Chrome Android: chrome://inspect/#devices (debug remoto)",
        "🧹 Nuclear: Settings -> Apps -> Chrome -> Clear storage",
        "🌐 Forçar desktop: chrome://flags/#request-desktop-site",
        "🔒 Modo de navegação segura: Settings -> Privacy -> Safe Browsing",
        "📡 Conexão remota: Use adb shell para inspeção avançada",
        "🔋 Modo economia de bateria: Settings -> Battery -> Battery Saver"
      ],
      firefox: [
        "🦊 Firefox Android: about:debugging -> Connect device for remote debugging",
        "🧹 Limpeza de cache: Settings -> Apps -> Firefox -> Clear Cache",
        "🌐 Forçar versão desktop: about:config -> general.useragent.override",
        "🔒 Modo de navegação segura: Settings -> Privacy -> Enhanced Tracking Protection",
        "📲 Verifique a performance com 'about:performance'",
        "⚡ Ativar aceleração de hardware: about:config -> layers.acceleration.force-enabled"
      ]
    },
    ios: {
      safari: [
        "📱 Debug remoto: Settings -> Safari -> Advanced -> Web Inspector",
        "🧊 Reset: Settings -> Safari -> Clear History and Website Data",
        "🔒 Privacy: Settings -> Safari -> Prevent Cross-Site Tracking",
        "🌐 DNS personalizado: Settings -> Safari -> Privacy -> Manage Website Data",
        "⚙️ Gerenciamento de cache: Settings -> Safari -> Advanced -> Website Data"
      ],
      chromeIOS: [
        "⚠️ Limitações: Use chrome://bookmarks para importação",
        "🌐 Alternate DNS: App Settings -> Privacy and Security",
        "🔐 Modo de segurança: Settings -> Privacy -> Use secure DNS",
        "🔧 Teste de desempenho: chrome://inspect/#devices",
        "💨 Aceleração de hardware: Settings -> Chrome -> Use hardware acceleration"
      ]
    }
  },
  avancado: {
    webAssembly: [
      "🚀 chrome://flags/#enable-webassembly-baseline",
      "📊 Firefox: about:config -> javascript.options.wasm_simd",
      "⚙️ Ativar SIMD: about:config -> javascript.options.wasm_simd",
      "🔧 Debug WebAssembly: Use DevTools -> Sources -> WebAssembly",
      "💡 Teste WebAssembly com codelabs em DevTools"
    ],
    protocolHandlers: [
      "🔗 Teste deep links: chrome://settings/handlers",
      "🔄 Registrar app: navigator.registerProtocolHandler('mailto', ...)",
      "🧩 Teste apps registrados: chrome://apps/",
      "🔑 Teste de link personalizado: chrome://settings/handlers -> Registrar protocolos",
      "🛠️ Verifique chamadas de protocolo com DevTools -> Network"
    ],
    pwa: [
      "📱 Instalação silenciosa: chrome://flags/#bypass-app-banner-engagement-checks",
      "📦 Manifest debug: chrome://inspect/#apps",
      "🔧 Verifique recursos: chrome://inspect/#service-workers",
      "🚀 Teste PWA offline: chrome://serviceworker-internals",
      "⚡ Otimize o desempenho de PWA com precaching e gerenciamento de service workers"
    ]
  }
};
