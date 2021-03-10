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
    [Route("/placetypes")]
    [ApiController]
    public class PlaceTypesController : ControllerBase
    {
        private readonly TripAdvisorContext _context; //bdd

        public PlaceTypesController(TripAdvisorContext context)
        {
            _context = context;
        }//Constructeur bdd

        // GET: /placetypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceType>>> Get() =>
            await _context.PlaceTypes.ToListAsync();

        // GET /placetypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceType>> GetById(int id)
        {
            var item = await _context.PlaceTypes.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not Found");
            }
            return item;
        }

        // POST /placetypes
        [HttpPost]
        public async Task<ActionResult<PlaceType>> Post([FromBody] PlaceType placetype)
        {
            PlaceTypeValidator validator = new PlaceTypeValidator();
            ValidationResult result = validator.Validate(placetype);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _context.PlaceTypes.Add(placetype);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(Get), new { id = placetype.PlaceTypeId }, placetype);
        }
        // PUT /placetypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] PlaceType placetype)
        {
            if (id != placetype.PlaceTypeId)
            {
                return BadRequest();
            }

            _context.Entry(placetype).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceTypeExists(id))
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
        // DELETE /placetypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PlaceType>> Delete(int id)
        {
            var p = await _context.PlaceTypes.FindAsync(id);
            if (p == null)
            {
                return NotFound();
            }

            _context.PlaceTypes.Remove(p);
            await _context.SaveChangesAsync();

            return p;
        }

        private bool PlaceTypeExists(long id) =>
         _context.PlaceTypes.Any(e => (long)e.PlaceTypeId == id);
    }
}
