using FluentValidation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("user", Schema = "trip_advisor")]
	public partial class User
	{
		public User()
		{
			VisitedPlaces = new HashSet<Place>();
			FavouritePlaces = new HashSet<Place>();
		}

		[Key, Column("user_id")]
		public int UserId { get; set; }
		[Column("surname"), DataType(DataType.Text), StringLength(255), Required]
		public string SurName { get; set; }
		[Column("first_name"), DataType(DataType.Text), StringLength(255), Required]
		public string FirstName { get; set; }

		public virtual ICollection<Place> VisitedPlaces { get; set; }
		public virtual ICollection<Place> FavouritePlaces { get; set; }
	}

	public class UserValidator : AbstractValidator<User>
	{
		public UserValidator()
		{
			RuleFor(u => u.SurName).NotEmpty().WithMessage("Enter a surname");
			RuleFor(u => u.FirstName).NotEmpty().WithMessage("Enter a first name");
		}
	}
}
