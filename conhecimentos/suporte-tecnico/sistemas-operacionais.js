module.exports = {
  windows: {
    verificarConexao: [
      "1. Abra o Prompt de Comando (Win + R -> cmd)",
      "2. Digite: ping 8.8.8.8",
      "3. Se houver resposta, internet OK\n💡 Dica: Se falhar, tente 'ipconfig /flushdns'",
      "4. Para problemas de rede: 'netsh winsock reset catalog' (reinicie após)",
      "5. Para testar a conectividade com DNS: 'nslookup www.google.com'"
    ],
    limpezaNavegador: [
      "No Chrome: Ctrl + Shift + Del -> Selecione 'Cookies' e 'Cache'",
      "💣 Atenção: Isso limpará senhas salvas! Use modo anônimo para evitar",
      "Edge: edge://settings/clearBrowserData -> Escolha intervalo de tempo",
      "🔥 Para o Firefox: use Ctrl + Shift + Del e selecione 'Limpar Tudo' na opção 'Cookies e Cache'"
    ],
    gerenciamentoDisco: [
      "1. Win + S -> Digite 'Limpeza de Disco'",
      "2. Selecione a unidade e tipos de arquivo para limpar",
      "🛑 Importante: Não apague 'Arquivos de despejo de memória do sistema'!",
      "Comando avançado: cleanmgr /sageset:65535 & cleanmgr /sagerun:65535",
      "💡 Use 'Defragmentador de Disco' para otimizar a performance de discos HDD"
    ],
    errosComuns: [
      "Tela azul (BSOD):",
      "1. Verifique código de erro em Win + R -> eventvwr",
      "2. Atualize drivers com Win + X -> Gerenciador de Dispositivos",
      "3. Execute 'sfc /scannow' no Prompt como Administrador",
      "4. Use 'chkdsk /f' para verificar e corrigir erros de disco",
      "5. Desabilite inicialização rápida em 'Painel de Controle -> Opções de Energia'"
    ],
    atualizacoes: [
      "Win + I -> Atualização e Segurança",
      "💻 Histórico de atualizações mostra últimos patches instalados",
      "⚠️ Problemas? Use utilitário de solução de problemas de atualização",
      "🔄 Realize uma atualização manual com: 'wuauclt /detectnow' no Prompt de Comando",
      "📅 Para agendar atualizações: 'Configurações -> Atualização e Segurança -> Agendar reinício'"
    ],
    monitoramentoSistema: [
      "1. Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc) para monitorar uso de CPU, memória e rede",
      "2. Para ver os serviços em execução: Win + R -> services.msc",
      "💡 Dica: Use o 'Desempenho' no Gerenciador de Tarefas para ver gráficos de uso em tempo real",
      "📊 Use o 'Monitor de Recursos' (resmon) para diagnóstico detalhado",
      "🔎 Para monitoramento de rede, use 'netstat -an' no Prompt"
    ],
    restauraçaoSistema: [
      "1. Crie um ponto de restauração: Win + S -> 'Criar um ponto de restauração'",
      "2. Para restaurar: Win + S -> 'Restauração do Sistema'",
      "⚠️ Certifique-se de escolher um ponto antes do problema começar!",
      "💡 Caso não haja pontos de restauração, habilite-os em 'Propriedades do Sistema'",
      "🔄 Para reparar arquivos corrompidos: use 'DISM /Online /Cleanup-Image /RestoreHealth'"
    ]
  },
  linux: {
    verificarConexao: [
      "Abra o terminal e digite: ping google.com -c 4",
      "Para DNS: digite 'nslookup www.google.com' ou 'dig google.com'",
      "🛠️ Comando mágico: sudo systemctl restart NetworkManager",
      "Teste porta específica: nc -zv www.google.com 443",
      "💡 Se estiver com problemas de DNS, verifique os servidores em /etc/resolv.conf",
      "🔧 Para verificar a conectividade com o IP de destino: 'tracepath www.google.com'"
    ],
    limpeza: [
      "Para Firefox: rm -rf ~/.cache/mozilla/firefox/*",
      "💻 Dica pro: Use 'sudo apt autoremove' para limpeza geral",
      "Limpar logs antigos: journalctl --vacuum-time=2d",
      "🔧 Limpeza de pacotes não utilizados: sudo apt-get clean",
      "💡 Use 'BleachBit' para uma limpeza avançada de arquivos temporários"
    ],
    gerenciamentoDisco: [
      "Verifique espaço livre: df -h",
      "Analisar uso: sudo du -sh /home/* | sort -h",
      "🔄 Para expandir partição: sudo lvextend -r -L +5G /dev/ubuntu-vg/root",
      "💡 Use 'gparted' para redimensionar partições de forma gráfica",
      "🖴 Para verificar a integridade do sistema de arquivos: sudo fsck /dev/sda1"
    ],
    pacotesQuebrados: [
      "Reparar dependências: sudo apt --fix-broken install",
      "Forçar reconfiguração: sudo dpkg --configure -a",
      "📦 Recuperação extrema: sudo apt-get purge (pacote-problema)",
      "🔧 Reinstalar pacotes essenciais: sudo apt-get install --reinstall <pacote>",
      "💡 Verifique pacotes quebrados com: dpkg --audit"
    ],
    seguranca: [
      "Verificar portas abertas: sudo netstat -tulpn",
      "Atualizações críticas: sudo unattended-upgrade --dry-run",
      "🛡️ Auditoria: sudo lynis audit system",
      "💡 Verificar integridade de arquivos de sistema: sudo debsums -s",
      "🔒 Use 'fail2ban' para proteger contra ataques de força bruta"
    ],
    processosInutilizados: [
      "Para verificar processos em segundo plano: top ou htop",
      "🛠️ Finalizar um processo: kill -9 <PID>",
      "💡 Dica: Use 'systemctl' para gerenciar serviços no sistema",
      "🔄 Para reiniciar serviços: sudo systemctl restart <serviço>",
      "🧹 Para limpar processos zumbis: sudo pkill -HUP <processo>"
    ]
  },
  crossPlatform: {
    velocidadeInternet: [
      "Teste via speedtest-cli (Linux) ou speedtest.net (Windows)",
      "🌐 Compare com VPN desativada para detectar throttling",
      "📊 Use 'ping' para testar latência entre servidores locais e remotos",
      "💡 Para medir a latência entre servidores, use 'mtr' para uma análise contínua"
    ],
    backupImportante: [
      "Windows: File History ou wbadmin start backup",
      "Linux: rsync -avh --progress origem/ destino/",
      "🔥 Mantenha sempre 3 cópias em mídias diferentes!",
      "🔒 Criptografe backups importantes com 'gpg' ou 'OpenSSL'",
      "🧳 Armazene backups em uma nuvem segura (ex. Google Drive, Dropbox)"
    ],
    dualBootProblemas: [
      "Problemas de horário: sudo timedatectl set-local-rtc 1 (Linux)",
      "Recuperar bootloader Windows: bootrec /fixmbr",
      "🔄 Use EasyUEFI para gerenciar entradas de boot",
      "🖥️ Problemas de inicialização: Verifique a ordem de boot na BIOS/UEFI",
      "💡 Caso o grub não apareça: execute 'sudo update-grub' para reconfigurá-lo"
    ],
    compartilhamentoArquivos: [
      "No Windows: Use 'Compartilhamento de Arquivos' em Propriedades da pasta",
      "No Linux: Use 'Samba' para compartilhar arquivos com Windows",
      "💡 Dica: Use SSH para transferências seguras entre sistemas",
      "📂 Configuração de NFS: Configure compartilhamento entre sistemas Linux",
      "🖥️ Use FTP/SFTP para gerenciar arquivos remotamente"
    ],
    virtualizacao: [
      "No Windows: Use Hyper-V (Windows 10 Pro ou superior)",
      "No Linux: Use KVM ou VirtualBox para criar máquinas virtuais",
      "⚠️ Dica: Para desempenho, configure corretamente as alocações de CPU e memória",
      "💡 Use Vagrant para gerenciar ambientes de desenvolvimento em máquinas virtuais",
      "🔄 Considere o uso de containers Docker para maior eficiência e escalabilidade"
    ]
  },
  mobile: {
    android: {
      verificarConexao: [
        "📲 Teste de conexão: Abra o navegador e acesse 'google.com'",
        "🔧 Use o comando: ping 8.8.8.8 para verificar a conectividade",
        "💡 Dica: Se a rede móvel estiver fraca, tente reiniciar o modem ou roteador",
        "🌍 Verifique as configurações de APN em 'Configurações -> Redes Móveis'"
      ],
      limpeza: [
        "🧹 Limpeza de cache: Settings -> Storage -> Apps -> Selecione o app -> Clear Cache",
        "💣 Limpeza completa: Settings -> Apps -> Selecione o app -> Clear Data",
        "⚡ Libere espaço: Settings -> Storage -> Free up space",
        "💡 Use 'Files by Google' para otimizar e limpar seu dispositivo"
      ],
      desempenho: [
        "🚀 Ativar Modo de Desenvolvedor: Settings -> About Phone -> Tap 'Build number' 7 vezes",
        "⚙️ Habilite a Aceleração de Hardware: Developer options -> Force GPU rendering",
        "🔋 Modo de Economia de Bateria: Settings -> Battery -> Battery saver",
        "💡 Otimize o desempenho: Use 'Settings -> Developer options -> Limit background processes'"
      ],
      diagnostico: [
        "🔧 Modo seguro: Pressione 'Volume Down' ao reiniciar para desativar apps de terceiros",
        "📊 Use o 'Developer Options' para monitorar o uso de CPU e memória",
        "⚠️ Erro de rede: Tente redefinir as configurações de rede em Settings -> System -> Reset",
        "🔋 Teste de bateria: Use a ferramenta 'AccuBattery' para checar a saúde da bateria"
      ]
    },
    ios: {
      verificarConexao: [
        "📱 Verifique a conexão: Settings -> Wi-Fi -> Escolha a rede",
        "🔧 Se não conectar, ative e desative o Modo Avião",
        "💡 Dica: Se estiver usando dados móveis, verifique se a opção de roaming está habilitada",
        "🛠️ Para verificar a conectividade 3G/4G, vá em 'Settings -> Cellular -> Data Options'"
      ],
      limpeza: [
        "🧹 Limpeza de Cache Safari: Settings -> Safari -> Clear History and Website Data",
        "💡 Limpeza do app: Settings -> General -> iPhone Storage -> Selecione o app -> Delete App",
        "⚡ Liberar espaço: Settings -> General -> iPhone Storage -> Review Large Attachments",
        "🔒 Limpeza de mensagens: Settings -> Messages -> Keep Messages -> 30 days"
      ],
      desempenho: [
        "🚀 Ativar Modo de Desenvolvedor: Settings -> Developer -> Enable Developer Mode",
        "📱 Ajuste de animações: Settings -> Accessibility -> Reduce Motion",
        "🔋 Modo de Economia de Bateria: Settings -> Battery -> Low Power Mode",
        "💡 Ajuste de brilho: Settings -> Display -> Auto-Brightness"
      ],
      diagnostico: [
        "🔧 Reiniciar: Pressione 'Power + Volume Down' por 10 segundos para forçar reinicialização",
        "⚠️ Verifique o uso de bateria: Settings -> Battery -> Battery Usage",
        "📊 Teste de conexão: Settings -> Wi-Fi -> Verifique intensidade do sinal",
        "🧪 Use 'Diagnostics' em Settings -> Privacy -> Analytics & Improvements"
      ]
    }
  }
};
