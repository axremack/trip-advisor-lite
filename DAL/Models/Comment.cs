using FluentValidation;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("comment", Schema = "trip_advisor")]
	public partial class Comment
	{
		[Key]
		public int CommentId { get; set; }
		[Column("title"), DataType(DataType.Text), StringLength(255), Required]
		public string Title { get; set; }
		[Column("content"), DataType(DataType.MultilineText), StringLength(5000), Required]
		public string Content { get; set; }
		[Column("rank"), Required]
		public int Rank { get; set; }
		[Column("date"), DataType(DataType.Date), Required]
		public DateTime Date { get; set; }

		public int? UserId { get; set; }
		[Required]
		public int PlaceId { get; set; }

		[ForeignKey("UserId")]
		public virtual User User { get; set; }
		[ForeignKey("PlaceId"), Required]
		public virtual Place Place { get; set; }
	}
	public class CommentValidator : AbstractValidator<Comment>
	{
		public CommentValidator()
		{
			//Règles à définir
		}
	}
}
