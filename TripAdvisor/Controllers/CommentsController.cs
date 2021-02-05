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
    [Route("/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly TripAdvisorContext _context;

        public CommentsController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: api/<CommentsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> Get() =>
            await _context.Comments.ToListAsync();

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetById(int id)
        {
            var item = await _context.Comments.FindAsync(id);
            if (item == null)
            {
                return NotFound("Comment not found");
            }
            return item;
        }

        // POST api/<CommentsController>
        [HttpPost]
        public async Task<ActionResult<Comment>> Post([FromBody] Comment comment)
        {
            CommentValidator validator = new CommentValidator();
            ValidationResult result = validator.Validate(comment);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = comment.CommentId }, comment);
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] Comment comment)
        {
            if (id != comment.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> Delete(long id)
        {
            var p = await _context.Comments.FindAsync((int)id);
            if (p == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(p);
            await _context.SaveChangesAsync();

            return p;
        }

        private bool CommentExists(long id) =>
         _context.Comments.Any(e => (long)e.CommentId == id);
    }
}
