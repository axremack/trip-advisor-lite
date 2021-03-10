using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FluentValidation;

namespace DAL.Models
{
	[Table("place", Schema = "trip_advisor")]
	public partial class Place
	{
		public Place()
		{
			PlaceTags = new HashSet<PlaceTag>();
			Comments = new HashSet<Comment>();
			UserVisits = new HashSet<UserVisit>();
			UserFavourites = new HashSet<UserFavourite>();
		}

		[Key, Column("place_id")]
		public int PlaceId { get; set; }
		[Column("title"), DataType(DataType.Text), StringLength(255), Required]
		public string Title { get; set; }
		[Column("desc"), DataType(DataType.MultilineText), StringLength(5000), Required]
		public string Description { get; set; }
		[Column("bed_count"), Required]
		public int BedRoomCount { get; set; }
		[Column("bath_count"), Required]
		public int BathRoomCount { get; set; }
		[Column("street"), DataType(DataType.Text), StringLength(512), Required]
		public string Street { get; set; }
		[Column("city"), DataType(DataType.Text), StringLength(128), Required]
		public string City { get; set; }
		[Column("zip_code"), DataType(DataType.PostalCode), StringLength(20), Required]
		public string ZipCode { get; set; }
		[Column("state"), DataType(DataType.Text), StringLength(128), Required]
		public string State { get; set; }
		[Column("price"), Required]
		public decimal Price { get; set; }

		public int? OwnerId { get; set; }
		public int? TypeId { get; set; }

		[ForeignKey("OwnerId")]
		public virtual Owner Owner { get; set; }
		[ForeignKey("TypeId")]
		public virtual PlaceType Type { get; set; }
		public virtual ICollection<PlaceTag> PlaceTags { get; set; }
		public virtual ICollection<Comment> Comments { get; set; }
		public virtual ICollection<UserVisit> UserVisits { get; set; }
		public virtual ICollection<UserFavourite> UserFavourites { get; set; }
	}

	public class PlaceValidator : AbstractValidator<Place>
	{
		public PlaceValidator()
		{
			RuleFor(p => p.Title).NotEmpty().WithMessage("Enter a title");
			RuleFor(p => p.Description).NotEmpty().WithMessage("Enter a description");
			RuleFor(p => p.BedRoomCount).NotEqual(0).WithMessage("Enter a valid number");
			RuleFor(p => p.BathRoomCount).NotEqual(0).WithMessage("Enter a valid number");
			RuleFor(p => p.Street).NotEmpty().WithMessage("Enter a street");
			RuleFor(p => p.City).NotEmpty().WithMessage("Enter a city");
			RuleFor(p => p.ZipCode).NotEmpty().WithMessage("Enter a zip code");
			RuleFor(p => p.State).NotEmpty().WithMessage("Enter a state");
			RuleFor(p => p.Price).NotEqual(0).WithMessage("Enter a real price");
		}
	}
}
