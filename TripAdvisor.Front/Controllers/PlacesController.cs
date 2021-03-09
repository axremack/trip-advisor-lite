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
        private readonly TripAdvisorContext _context; 

        public PlacesController(TripAdvisorContext context)
        {
            _context = context;
        }

        // GET: /places
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> Get() =>
            await _context.Places.ToListAsync();

        // GET /places/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Place>> GetById(int id)
        {
            var item = await _context.Places.FindAsync(id);
            if (item == null)
            {
                return NotFound("Item not Found");
            }
            return item;
        }

        // GET: /places/5/tags
        [HttpGet("{id}/tags")]
        public async Task<ActionResult<IEnumerable<Tag>>> GetPlaceTags(int id)
        {
            var item = await _context.Places.FindAsync(id);
            var tabT = new List<Tag>();

            if (item == null)
            {
                return NotFound("Item not Found");
            }
            else
            {
                tabT = await _context.PlaceTags.Where(p => p.PlaceId == id).Select(p => p.Tag).ToListAsync();
            }

            return tabT;
        }

        // GET /places/popular
        [HttpGet("popular")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPopular()
        {
            var items = await _context.Places.ToListAsync();
            if (items == null || !items.Any())
            {
                return NotFound("Item not Found");
            }
            else
            {
                var total = 0;
                var listPlaces = new List<Place>();

                foreach (var place in items)
                {
                    double avg = 0;

                    var lstComments = await _context.Comments.Where(c => c.PlaceId == place.PlaceId).ToListAsync();
                    if(lstComments.Any())
                    {
                        foreach (var comment in lstComments)
                        {
                            avg += comment.Rank;
                        }
                    
                        avg = (double)avg / (double)lstComments.Count;
                        total++;
                    }
                    
                    if (avg != 0 && avg >= 3)
                    {
                        place.Comments = null;
                        listPlaces.Add(place);
                    }
                }

                if (total != 0) { items = listPlaces; }
            }

            return items;
        }

        // GET /places/suggestions/5
        [HttpGet("suggestions/{id}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetSuggestions(int id)
        {
            var items = await _context.Places.ToListAsync();
            if (items == null || !items.Any())
            {
                return NotFound("Item not Found");
            }
            else
            {
                var lstPlaceIds = await _context.Comments.Where(c => c.UserId == id).Select(c => c.PlaceId).ToListAsync();
                var lstPlaces = await _context.Places.Where(p => lstPlaceIds.Contains(p.PlaceId)).ToListAsync();
                var lstTags = new List<Tag>();
                var listPlaces = new List<Place>();
                
                foreach (var place in lstPlaces)
                {
                    var tabTags = await _context.PlaceTags.Where(p => p.PlaceId == place.PlaceId).Select(p => p.Tag).ToListAsync();
                    lstTags = lstTags.Union(tabTags).ToList();
                }

                foreach (var place in items)
                {
                    var tabTags = await _context.PlaceTags.Where(p => p.PlaceId == place.PlaceId).Select(p => p.Tag).ToListAsync();

                    if (lstTags.Intersect(tabTags).Any())
                    {
                        listPlaces.Add(place);
                    }
                }

                if (listPlaces.Any()) { items = listPlaces; }
            }

            return items;
        }

        // GET /places/visited/5
        [HttpGet("visited/{id}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetVisited(int id)
        {
            var items = await _context.Places.ToListAsync();
            if (items == null || !items.Any())
            {
                return NotFound("Item not Found");
            }
            else
            {
                var listPlaces = new List<Place>();
                var lstVisited = await _context.UserVisits.Where(v => v.UserId == id).ToListAsync();

                foreach (var visited in lstVisited)
                {
                    var lstPlaces = await _context.Places.Where(p => p.PlaceId == visited.PlaceId).ToListAsync();
                    listPlaces = listPlaces.Union(lstPlaces).ToList();
                }

                items = listPlaces;
            }

            return items;
        }

        // POST /places
        [HttpPost]
        public async Task<ActionResult<Place>> Post([FromBody] PlaceHelper place)
        {
            PlaceValidator validator = new PlaceValidator();
            ValidationResult result = validator.Validate(place.Place);
            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    Console.WriteLine("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }

            _context.Places.Add(place.Place);

            await _context.SaveChangesAsync();

            foreach (var item in place.Tags)
			{
                _context.PlaceTags.Add(new PlaceTag() { PlaceId = place.Place.PlaceId, TagId = item.TagId });
			}

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = place.Place.PlaceId }, place.Place);
        }

        public class PlaceHelper
		{
            public Place Place { get; set; }

            public List<Tag> Tags { get; set; }
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
