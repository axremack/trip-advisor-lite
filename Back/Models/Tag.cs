using FluentValidation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("tag", Schema = "trip_advisor")]
	public partial class Tag
	{
		public Tag()
		{
			PlaceTags = new HashSet<PlaceTag>();
		}

		[Key, Column("tag_id")]
		public int TagId { get; set; }
		[Column("type"), DataType(DataType.Text), StringLength(255), Required]
		public string Type { get; set; }

		public virtual ICollection<PlaceTag> PlaceTags { get; set; }
	}

	public class TagValidator : AbstractValidator<Tag>
	{
		public TagValidator()
		{
			RuleFor(t => t.Type).NotEmpty().WithMessage("Enter a type");
		}
	}
}
