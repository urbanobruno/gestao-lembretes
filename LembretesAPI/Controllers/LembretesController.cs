
using Microsoft.AspNetCore.Mvc;
using LembretesAPI.Models;
using LembretesAPI.Data;

namespace LembretesAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LembretesController : ControllerBase
    {
        private readonly LembreteContext _context;

        public LembretesController(LembreteContext context)
        {
            _context = context;
        }

        // GET: api/lembretes
        [HttpGet]
        public ActionResult<IEnumerable<Lembrete>> GetLembretes()
        {
            return _context.Lembretes.ToList();
        }

        // POST: api/lembretes
        [HttpPost]
        public ActionResult<Lembrete> CriaLembrete(Lembrete lembrete)
        {

            _context.Lembretes.Add(lembrete);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetLembretes), new { id = lembrete.Id }, lembrete);
        }

        // DELETE: api/lembretes/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteLembrete(int id)
        {
            var lembrete = _context.Lembretes.Find(id);
            if (lembrete == null)
                return NotFound();

            _context.Lembretes.Remove(lembrete);
            _context.SaveChanges();

            return NoContent();
        }
    }

}