module.exports = {
  diagnostico: {
    windows: [
      "1. Win + R -> cmd (Admin)",
      "2. Sequência avançada:",
      "   • ipconfig /all > Verifique DHCP habilitado",
      "   • tracert 8.8.8.8 > Analise saltos",
      "   • netsh interface show interface > Status interfaces",
      "🔧 Ferramenta gráfica: perfmon /res (Monitor de Recursos)"
    ],
    linux: [
      "1. Terminal:",
      "   • ip -c a > Interfaces com cores",
      "   • ss -tulpn > Conexões ativas",
      "   • mtr -w google.com > Traceroute melhorado",
      "2. Verifique: journalctl -u NetworkManager --since '5 min ago'"
    ],
    camadaFisica: [
      "🔌 Teste cabos:",
      "Windows: NIC Properties -> Speed/Duplex",
      "Linux: ethtool eth0 | grep 'Speed'",
      "📶 WiFi:",
      "Windows: netsh wlan show interfaces | findstr Signal",
      "Linux: iwconfig | grep 'Quality'",
      "🧪 Teste de interferência Wi-Fi: Use 'inSSIDer' para verificar canais congestionados"
    ]
  },
  solucoes: {
    basicas: [
      "🔁 Ciclo completo:",
      "1. Reinicie modem/roteador",
      "2. Teste com cabo diferente",
      "3. Altere porta switch",
      "⚠️ Isolamento: Conecte dispositivo direto ao modem"
    ],
    dns: [
      "🔄 Alternar DNS:",
      "Windows:",
      "Control Panel > Network > IPv4 Properties",
      "DNS 1.1.1.1 (Cloudflare) ou 8.8.8.8 (Google)",
      "Linux:",
      "sudo nano /etc/resolv.conf",
      "nameserver 9.9.9.9 (Quad9)"
    ],
    routing: [
      "🗺️ Tabela de rotas:",
      "Windows: route print",
      "Linux: ip route show",
      "🔧 Correção Linux:",
      "sudo ip route add default via 192.168.1.1 dev eth0",
      "🛑 Problemas enterprise: Verifique BGP/OSPF em roteadores"
    ],
    avancadas: [
      "🎯 Teste de throughput:",
      "Windows: iperf3 -c servidor -p 5201",
      "Linux: nc -l -p 5201 | pv > /dev/null",
      "📊 Análise pacotes:",
      "tcpdump -i eth0 -w captura.pcap (Linux)",
      "Wireshark (Windows/Linux)",
      "📐 Teste de latência: ping -l 1500 google.com (Ajuste tamanho de pacote)"
    ]
  },
  seguranca: {
    firewall: [
      "🔥 Windows Advanced Firewall:",
      "netsh advfirewall set allprofiles state on",
      "Verifique regras de entrada: netsh advfirewall firewall show rule name=all",
      "🛡️ Linux iptables:",
      "sudo iptables -L -n -v --line-numbers",
      "📛 Bloquear IP: sudo iptables -A INPUT -s IP-MALIGNO -j DROP"
    ],
    monitoramento: [
      "📈 SNMP:",
      "Windows: Services.msc -> Habilitar SNMP Service",
      "Linux: sudo apt install snmpd",
      "🔍 Nmap network scan:",
      "nmap -T4 -A -v 192.168.1.0/24",
      "👀 Verifique tráfego com: tcpdump -i eth0"
    ]
  },
  enterprise: {
    vlan: [
      "🏷️ Configurar VLAN:",
      "Windows: NIC Properties -> VLAN ID",
      "Linux: sudo ip link add link eth0 name eth0.100 type vlan id 100",
      "🔗 Switch Cisco:",
      "interface GigabitEthernet0/1",
      "switchport mode access",
      "switchport access vlan 100"
    ],
    vpn: [
      "🔒 Troubleshoot OpenVPN:",
      "Verifique logs: /var/log/openvpn/status.log",
      "Teste conexão: openssl s_client -connect vpnserver:443",
      "Windows: Verifique certificados em Certificates (Local Computer)"
    ],
    qos: [
      "📶 Priorização tráfego:",
      "Linux (tc):",
      "sudo tc qdisc add dev eth0 root handle 1: htb default 30",
      "Windows GPO:",
      "Computer Config -> Policies -> QoS Policy"
    ],
    linkAggregation: [
      "🔗 Configuração Link Aggregation (LACP):",
      "Linux: sudo nmcli con mod 'Ethernet connection' +ipv4.addresses '192.168.1.10/24'",
      "Switch Cisco: interface range GigabitEthernet0/1 - 2",
      "channel-group 1 mode active"
    ]
  },
  dispositivos: {
    roteadores: [
      "🔄 Reset factory: Segure botão WPS por 30s",
      "📶 Otimização WiFi:",
      "Altere canal 2.4GHz para 1, 6 ou 11",
      "5GHz use canais 36-48",
      "🔒 Segurança: Desative UPnP e WPS"
    ],
    switches: [
      "💡 Cisco: show interface status | include err",
      "💡 HP: display interface brief | exclude up",
      "⚠️ Spanning Tree: Verifique portas bloqueadas"
    ],
    iot: [
      "🔋 Problemas IoT:",
      "1. Verifique alimentação PoE",
      "2. Teste com cabo CAT6",
      "3. Isole em VLAN separada",
      "💡 Dica: Habilite QoS para dispositivos sensíveis"
    ]
  },
  protocolos: {
    dhcp: [
      "Windows: ipconfig /release && ipconfig /renew",
      "Linux: sudo dhclient -v -r && sudo dhclient -v",
      "🔥 Servidor DHCP: Verifique escopo disponível"
    ],
    ipv6: [
      "🌐 Teste conectividade:",
      "ping6 2001:4860:4860::8888",
      "📊 Analise: tcpdump -i eth0 ip6",
      "🛑 Desativar temporariamente:",
      "sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1"
    ],
    arp: [
      "🔍 Verifique ARP: arp -a (Windows/Linux)",
      "📊 Limpar ARP cache: sudo ip -s -s neigh flush all",
      "⚠️ Verifique conflitos ARP: arp -a | grep <IP>"
    ]
  },
  conhecimentosAvancados: {
    monitoramentoDeRede: [
      "📊 Ferramentas de monitoramento:",
      "Zabbix: Ferramenta open-source para monitoramento de rede",
      "Nagios: Plataforma de monitoramento de infraestrutura de TI",
      "Grafana + Prometheus: Solução moderna para métricas e visualizações",
      "🔍 SNMP Traps: Utilize para detectar alterações em dispositivos de rede em tempo real",
      "📡 NetFlow/sFlow: Protocolos de coleta de fluxo para análise de tráfego de rede",
      "🔧 Elastic Stack (ELK): Utilize Elasticsearch, Logstash e Kibana para análise e visualização de logs",
      "💻 SolarWinds: Plataforma para monitoramento de desempenho e resolução de problemas de rede"
    ],
    diagnosticoDeRedes: [
      "🧰 Ferramentas de Diagnóstico Avançado:",
      "Ping flood: ping -f -l 1500 <ip destino> (Teste de carga de rede)",
      "Traceroute avançado com mtr (Linux): ferramenta interativa para análise de saltos",
      "Wireshark: Use para analisar pacotes em tempo real, incluindo visualização de protocolos específicos",
      "🔧 Teste de largura de banda com Iperf3: iperf3 -c <ip servidor> -p 5201 (Teste de desempenho de rede)",
      "🔍 Diagnóstico de Latência: Utilize ping com ajustes de tamanho de pacote para detectar perdas e latência",
      "📈 Monitoramento de Performance com Nagios e Zabbix: Configure para alertar sobre falhas ou quedas na rede",
      "📊 Análise de pacotes: Utilize tcpdump ou Wireshark para identificar tráfego suspeito ou de alta latência"
    ],
    configuracaoAvancadaDeRoteadores: [
      "🔧 Configuração avançada de roteadores:",
      "Roteadores Cisco: configure rotas estáticas com 'ip route' e rotas dinâmicas com OSPF ou BGP",
      "Configuração de NAT: ip nat inside source list 1 interface Ethernet0 overload (Configuração de NAT dinâmico)",
      "🔄 Reset de fábrica: Segure o botão reset por 30 segundos para restaurar as configurações do roteador",
      "🔐 Segurança em roteadores: Habilite ACLs (Access Control Lists) para restringir acessos não autorizados",
      "💡 Configuração de VPN: Configure uma VPN para permitir acesso remoto seguro à rede",
      "🔗 Configuração de VLAN: Segmente sua rede em VLANs para maior controle e segurança",
      "🔒 Implementação de Roteamento Seguro: Utilize IPSec ou GRE para criar túneis seguros entre roteadores"
    ],
    troubleshootingAvancado: [
      "🔧 Resolução de Problemas Avançada:",
      "💥 Interrupções de rede: Realize diagnóstico de falhas no roteamento com ferramentas como traceroute e ping",
      "🔎 Análise de Logs: Utilize 'journalctl' e 'syslog' para verificar erros relacionados à rede",
      "⚠️ Detecção de loops de rede: Utilize o comando 'show spanning-tree' em switches para identificar loops",
      "⚡ Teste de throughput: Use 'iperf3' para medir a largura de banda entre diferentes pontos da rede",
      "🖧 Diagnóstico de problemas de ARP: Utilize 'arp -a' para verificar conflitos de ARP na rede",
      "🔧 Detecção de Packet Loss: Use 'ping' e 'traceroute' para mapear onde ocorrem perdas de pacotes",
      "🔍 Verificação de MTU (Maximum Transmission Unit): Comando 'ping -M do' para identificar problemas de MTU"
    ],
    configuracoesEspeciaisDeRedes: [
      "⚡ Redes Mesh: Configuração e otimização para cobertura sem fio em larga escala",
      "🔐 VPNs em Nuvem: Configure VPNs em provedores de nuvem como AWS e Azure para segurança adicional",
      "📶 Configuração de Redes 5G: Integração e otimização de redes 5G para maior desempenho",
      "💡 Redundância de Rede: Configure agregação de links (LACP) e protocolos como HSRP ou VRRP para alta disponibilidade",
      "🔧 Qualidade de Serviço (QoS): Configure QoS para garantir largura de banda para aplicações críticas",
      "📈 SD-WAN: Configuração de SD-WAN para otimizar e gerenciar a conectividade de filiais",
      "🛠️ Troubleshooting de SD-WAN: Monitore e solucione problemas em redes definidas por software"
    ],
    segurançaDeRedes: [
      "🔒 Segurança em Redes:",
      "💥 Firewall em Linux: Utilize iptables ou firewalld para proteger redes internas",
      "🛡️ Firewalls Cisco: Configure ACLs para controlar o tráfego e proteger suas redes corporativas",
      "🚨 IPS/IDS: Configure sistemas de prevenção de intrusão para detectar atividades maliciosas",
      "🔍 Teste de Penetração: Ferramentas como Nmap, Metasploit, e Nessus para realizar testes de vulnerabilidade",
      "🧑‍💻 Configuração de Segredos em Redes: Armazene credenciais e chaves de forma segura com ferramentas como Vault"
    ]
  }
};
