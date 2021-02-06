using DAL.Models;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripAdvisor.Controllers
{
    [Route("/owners")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly TripAdvisorContext _context;

        public OwnersController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: api/<OwnersController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Owner>>> Get() =>
            await _context.Owners.ToListAsync();

        // GET api/<OwnersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Owner>> GetById(int id)
        {
            var item = await _context.Owners.FindAsync(id);
            if (item == null)
            {
                return NotFound("Owner not found");
            }
            return item;
        }

        // POST api/<OwnersController>
        [HttpPost]
        public async Task<ActionResult<Owner>> Post([FromBody] Owner owner)
        {
            OwnerValidator validator = new OwnerValidator();
            ValidationResult result = validator.Validate(owner);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _context.Owners.Add(owner);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = owner.UserId }, owner);
        }

        // PUT api/<OwnersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] Owner owner)
        {
            if (id != owner.UserId)
            {
                return BadRequest();
            }

            _context.Entry(owner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnerExists(id))
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

        // DELETE api/<OwnersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Owner>> Delete(long id)
        {
            var p = await _context.Owners.FindAsync((int)id);
            if (p == null)
            {
                return NotFound();
            }

            _context.Owners.Remove(p);
            await _context.SaveChangesAsync();

            return p;
        }

        private bool OwnerExists(long id) =>
         _context.Owners.Any(e => (long)e.UserId == id);
    }
}
