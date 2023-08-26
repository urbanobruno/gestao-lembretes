using Microsoft.EntityFrameworkCore;

namespace LembretesAPI.Data
{
    public class TestingLembreteContext : LembreteContext
    {
        // Construtor para testes
        public TestingLembreteContext() : base(CreateOptions()) { }

        private static DbContextOptions<LembreteContext> CreateOptions()
        {
            var optionsBuilder = new DbContextOptionsBuilder<LembreteContext>();
            optionsBuilder.UseInMemoryDatabase(databaseName: "TestDb");  // TestDb é um nome arbitrário para o banco de dados em memória.
            return optionsBuilder.Options;
        }

    }
}
