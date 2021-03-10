using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripAdvisor.Controllers
{
	[Route("/user-visits")]
    [ApiController]
    public class UserVisitsController : ControllerBase
    {
        private readonly TripAdvisorContext _context;

        public UserVisitsController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: /user-visits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserVisit>>> Get() =>
            await _context.UserVisits.ToListAsync();

        // GET /user-visits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserVisit>> GetById(int id)
        {
            var item = await _context.UserVisits.FindAsync(id);
            if (item == null)
            {
                return NotFound("Tag not found");
            }
            return item;
        }

        // POST /user-visits
        [HttpPost]
        public async Task<ActionResult<UserVisit>> Post([FromBody] UserVisit userVisit)
        {
            _context.UserVisits.Add(userVisit);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = userVisit.UserVisitId }, userVisit);
        }

        // PUT /user-visits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] UserVisit userVisit)
        {
            if (id != userVisit.UserVisitId)
            {
                return BadRequest();
            }

            _context.Entry(userVisit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserVisitExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE /user-visits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserVisit>> Delete(long id)
        {
            var t = await _context.UserVisits.FindAsync((int)id);
            if (t == null)
            {
                return NotFound();
            }

            _context.UserVisits.Remove(t);
            await _context.SaveChangesAsync();

            return t;
        }

        private bool UserVisitExists(long id) =>
         _context.UserVisits.Any(e => (long)e.UserVisitId == id);
    }
}
