class TipoMovimentacao {
  constructor(id, tipo) {
    this.id = id;
    this.tipo = tipo;
  }

  static fromPrisma(prismaTipoMovimentacao) {
    return new TipoMovimentacao(
      prismaTipoMovimentacao.id,
      prismaTipoMovimentacao.tipo
    );
  }

  toPrisma() {
    const data = {
      tipo: this.tipo
    };
    
    if (this.id) {
      data.id = this.id;
    }
    
    return data;
  }
}

module.exports = TipoMovimentacao;
