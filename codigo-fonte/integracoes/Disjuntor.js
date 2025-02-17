/**
 * Este módulo implementa o padrão “circuit breaker” (disjuntor)
 * para monitorar e limitar o número de falhas consecutivas.
 * Caso o número de falhas ultrapasse um limite, o disjuntor bloqueia as requisições
 * por um período definido (tempo de reset) para evitar sobrecarga e permitir a recuperação.
 */
class Disjuntor {
  constructor() {
    this.contadorFalhas = 0;
    this.ultimaFalha = Date.now();
    this.limiteFalhas = 3;
    this.tempoReset = 30000; // 30 segundos
  }

  /**
   * Verifica se o disjuntor permite a execução da operação.
   * Retorna true se o tempo desde a última falha ultrapassar o tempo de reset, ou se o número de falhas estiver abaixo do limite.
   */
  verificarStatus() {
    if (this.contadorFalhas >= this.limiteFalhas) {
      return Date.now() - this.ultimaFalha > this.tempoReset;
    }
    return true;
  }

  /**
   * Registra uma falha, incrementando o contador e atualizando o timestamp.
   */
  registrarFalha() {
    this.contadorFalhas++;
    this.ultimaFalha = Date.now();
  }
}

module.exports = Disjuntor;
