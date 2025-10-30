class Usuario {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static fromPrisma(prismaUsuario) {
    return new Usuario(
      prismaUsuario.id,
      prismaUsuario.nome,
      prismaUsuario.email,
      prismaUsuario.senha
    );
  }

  toPrisma() {
    const data = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };
    
    if (this.id) {
      data.id = this.id;
    }
    
    return data;
  }
}

module.exports = Usuario;
