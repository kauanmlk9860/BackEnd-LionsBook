const prisma = require('../../generated/prisma');

class Database {
  static async connect() {
    try {
      await prisma.$connect();
      console.log('✅ Conectado ao banco de dados com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao conectar com o banco de dados:', error);
      process.exit(1);
    }
  }

  static async disconnect() {
    try {
      await prisma.$disconnect();
      console.log('✅ Desconectado do banco de dados com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao desconectar do banco de dados:', error);
    }
  }

  static async healthCheck() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', message: 'Database connection is working' };
    } catch (error) {
      return { status: 'unhealthy', message: error.message };
    }
  }
}

module.exports = Database;
