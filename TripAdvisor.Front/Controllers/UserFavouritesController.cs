using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripAdvisor.Controllers
{
    [Route("/user-favourites")]
    [ApiController]
    public class UserFavouritesController : ControllerBase
    {
        private readonly TripAdvisorContext _context;

        public UserFavouritesController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: /user-favourites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFavourite>>> Get() =>
            await _context.UserFavourites.ToListAsync();

        // GET /user-favourites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFavourite>> GetById(int id)
        {
            var item = await _context.UserFavourites.FindAsync(id);
            if (item == null)
            {
                return NotFound("Tag not found");
            }
            return item;
        }

        // POST /user-favourites
        [HttpPost]
        public async Task<ActionResult<UserFavourite>> Post([FromBody] UserFavourite userFavourite)
        {
            _context.UserFavourites.Add(userFavourite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = userFavourite.UserFavouriteId }, userFavourite);
        }

        // PUT /user-favourites/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] UserFavourite userFavourite)
        {
            if (id != userFavourite.UserFavouriteId)
            {
                return BadRequest();
            }

            _context.Entry(userFavourite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFavouriteExists(id))
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

        // DELETE /user-favourites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserFavourite>> Delete(long id)
        {
            var t = await _context.UserFavourites.FindAsync((int)id);
            if (t == null)
            {
                return NotFound();
            }

            _context.UserFavourites.Remove(t);
            await _context.SaveChangesAsync();

            return t;
        }

        private bool UserFavouriteExists(long id) =>
         _context.UserFavourites.Any(e => (long)e.UserFavouriteId == id);
    }
}
