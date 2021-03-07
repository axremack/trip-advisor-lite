using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripAdvisor.Controllers
{
	[Route("/place-tags")]
    [ApiController]
    public class PlaceTagsController : ControllerBase
    {
        private readonly TripAdvisorContext _context;

        public PlaceTagsController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: /place-tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceTag>>> Get() =>
            await _context.PlaceTags.ToListAsync();

        // GET /place-tags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceTag>> GetById(int id)
        {
            var item = await _context.PlaceTags.FindAsync(id);
            if (item == null)
            {
                return NotFound("Tag not found");
            }
            return item;
        }

        // POST /place-tags
        [HttpPost]
        public async Task<ActionResult<PlaceTag>> Post([FromBody] PlaceTag placeTag)
        {
            _context.PlaceTags.Add(placeTag);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = placeTag.PlaceTagId }, placeTag);
        }

        // PUT /place-tags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] PlaceTag placeTag)
        {
            if (id != placeTag.PlaceTagId)
            {
                return BadRequest();
            }

            _context.Entry(placeTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceTagExists(id))
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

        // DELETE /place-tags/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PlaceTag>> Delete(long id)
        {
            var t = await _context.PlaceTags.FindAsync((int)id);
            if (t == null)
            {
                return NotFound();
            }

            _context.PlaceTags.Remove(t);
            await _context.SaveChangesAsync();

            return t;
        }

        private bool PlaceTagExists(long id) =>
         _context.PlaceTags.Any(e => (long)e.PlaceTagId == id);
    }
}
