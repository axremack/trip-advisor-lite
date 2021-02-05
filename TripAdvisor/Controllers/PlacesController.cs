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
        private readonly TripAdvisorContext _repository;//bdd

        public PlacesController(TripAdvisorContext context)
        {
            _repository = context;
        }//Constructeur bdd

        // GET: /places
        [HttpGet]
        public IEnumerable<Place> Get() =>
            _repository.Places.ToList();

        // GET /places/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(long id)
        {
            var item = _repository.Places.SingleOrDefault(t => t.PlaceId == id);
            if (item == null)
            {
                return NotFound("Item not Found");
            }
            return new ObjectResult(item);
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

            _repository.Places.Add(place);
            await _repository.SaveChangesAsync();


            return CreatedAtAction(nameof(Get), new { id = place.PlaceId }, place);
        }
        // PUT /places/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Place>> Put(int id,[FromBody] Place place)
        {
            if (id != place.PlaceId)
            {
                return BadRequest();
            }

            _repository.Entry(place).State = EntityState.Modified;
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = place.PlaceId }, place);
        }
        // DELETE /places/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Place>> Delete(int id)
        {
            var p = await _repository.Places.FindAsync(id);
            if (p == null)
            {
                return NotFound();
            }

            _repository.Places.Remove(p);
            await _repository.SaveChangesAsync();

            return p;
        }
    }
}
