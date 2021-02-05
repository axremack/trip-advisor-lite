using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripAdvisor.Controllers
{
    [Route("/places")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly TripAdvisorContext _context; //bdd

        public PlacesController(TripAdvisorContext context)
        {
            _context = context;
        }//Constructeur bdd

        // GET: /places
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> Get() =>
            await _context.Places.ToListAsync();

        // GET /places/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Place>> GetById(long id)
        {
            var item = await _context.Places.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not Found");
            }
            return item;
        }

        // POST /places
        [HttpPost]
        public async Task<ActionResult<Place>> Post([FromBody] Place place)
        {
            PlaceValidator validator = new PlaceValidator();
            ValidationResult result = validator.Validate(place);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _context.Places.Add(place);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(Get), new { id = place.PlaceId }, place);
        }
        // PUT /places/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] Place place)
        {
            if (id != place.PlaceId)
            {
                return BadRequest();
            }

            _context.Entry(place).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
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
        // DELETE /places/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Place>> Delete(int id)
        {
            var p = await _context.Places.FindAsync(id);
            if (p == null)
            {
                return NotFound();
            }

            _context.Places.Remove(p);
            await _context.SaveChangesAsync();

            return p;
        }

        private bool PlaceExists(long id) =>
         _context.Places.Any(e => (long)e.PlaceId == id);
    }
}
