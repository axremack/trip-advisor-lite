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
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TripAdvisorContext _repository;

        public UsersController(TripAdvisorContext context)
        {
            _repository = context;
        }

        // GET: /<UsersController>
        [HttpGet]
        public IEnumerable<User> Get() =>
            _repository.Users.ToList();

        // GET /<UsersController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _repository.Users.SingleOrDefault(t => t.UserId == id);
            if (item == null)
            {
                return NotFound("User not found");
            }
            return new ObjectResult(item);
        }

        // POST /<UsersController>
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            UserValidator validator = new UserValidator();
            ValidationResult result = validator.Validate(user);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _repository.Users.Add(user);
            await _repository.SaveChangesAsync();

            //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
            return CreatedAtAction(nameof(Get), new { id = user.UserId }, user);
        }

        // PUT /<UsersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(int id, [FromBody] User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _repository.Entry(user).State = EntityState.Modified;
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = user.UserId }, user);
        }

        // DELETE /<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var p = await _repository.Users.FindAsync(id);
            if (p == null)
            {
                return NotFound();
            }

            _repository.Users.Remove(p);
            await _repository.SaveChangesAsync();

            return p;
        }
    }
}
