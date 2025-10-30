class Movimentacao {
  constructor(id, id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro) {
    this.id = id;
    this.id_movimentacao = id_movimentacao;
    this.id_usuario = id_usuario;
    this.quantidade = quantidade;
    this.data_movimentacao = data_movimentacao;
    this.id_livro = id_livro;
  }

  static fromPrisma(prismaMovimentacao) {
    return new Movimentacao(
      prismaMovimentacao.id,
      prismaMovimentacao.id_movimentacao,
      prismaMovimentacao.id_usuario,
      prismaMovimentacao.quantidade,
      prismaMovimentacao.data_movimentacao,
      prismaMovimentacao.id_livro
    );
  }

  toPrisma() {
    const data = {
      id_movimentacao: this.id_movimentacao,
      id_usuario: this.id_usuario,
      quantidade: this.quantidade,
      data_movimentacao: this.data_movimentacao,
      id_livro: this.id_livro
    };
    
    if (this.id) {
      data.id = this.id;
    }
    
    return data;
  }
}

module.exports = Movimentacao;
