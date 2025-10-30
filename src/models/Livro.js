class Livro {
  constructor(id, titulo, data_publicacao, quantidade, isbn) {
    this.id = id;
    this.titulo = titulo;
    this.data_publicacao = data_publicacao;
    this.quantidade = quantidade;
    this.isbn = isbn;
  }

  static fromPrisma(prismaLivro) {
    return new Livro(
      prismaLivro.id,
      prismaLivro.titulo,
      prismaLivro.data_publicacao,
      prismaLivro.quantidade,
      prismaLivro.isbn
    );
  }

  toPrisma() {
    const data = {
      titulo: this.titulo,
      data_publicacao: this.data_publicacao,
      quantidade: this.quantidade,
      isbn: this.isbn
    };
    
    if (this.id) {
      data.id = this.id;
    }
    
    return data;
  }
}

module.exports = Livro;
