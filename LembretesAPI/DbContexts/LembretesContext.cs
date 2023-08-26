using Microsoft.EntityFrameworkCore;
using LembretesAPI.Models;

namespace LembretesAPI.Data
{
    public class LembreteContext : DbContext
    {

        public LembreteContext(DbContextOptions<LembreteContext> options)
        : base(options) { }

        #nullable disable
        public virtual DbSet<Lembrete> Lembretes { get; set; }
    }
}
