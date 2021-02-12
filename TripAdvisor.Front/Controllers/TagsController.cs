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
    [Route("/tags")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly TripAdvisorContext _context;

        public TagsController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: /tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> Get() =>
            await _context.Tags.ToListAsync();

        // GET /tags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tag>> GetById(int id)
        {
            var item = await _context.Tags.FindAsync(id);
            if (item == null)
            {
                return NotFound("Tag not found");
            }
            return item;
        }

        // POST /tags
        [HttpPost]
        public async Task<ActionResult<Tag>> Post([FromBody] Tag tag)
        {
            TagValidator validator = new TagValidator();
            ValidationResult result = validator.Validate(tag);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = tag.TagId }, tag);
        }

        // PUT /tags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] Tag tag)
        {
            TagValidator validator = new TagValidator();
            ValidationResult result = validator.Validate(tag);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            if (id != tag.TagId)
            {
                return BadRequest();
            }

            _context.Entry(tag).State = EntityState.Modified;
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
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

        // DELETE /tags/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tag>> Delete(long id)
        {
            var t = await _context.Tags.FindAsync((int)id);
            if (t == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(t);
            await _context.SaveChangesAsync();

            return t;
        }

        private bool TagExists(long id) =>
         _context.Tags.Any(e => (long)e.TagId == id);
    }
}
