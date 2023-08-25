using Microsoft.EntityFrameworkCore;


public class LembreteContext : DbContext
{

    public LembreteContext(DbContextOptions<LembreteContext> options)
    : base(options) {}

    public DbSet<Lembrete> Lembretes { get; set; }
}
