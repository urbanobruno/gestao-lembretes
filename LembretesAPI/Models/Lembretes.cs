using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LembretesAPI.Models
{
    public class Lembrete
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        private DateTime _dataLembrete;
        public DateTime DataLembrete
        {
            get { return _dataLembrete.Date; }  // Retorna apenas a parte da data
            set { _dataLembrete = value.Date; }  // Armazena apenas a parte da data
        }
    }
}