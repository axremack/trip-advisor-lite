using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("user_favourite", Schema = "trip_advisor")]
	public partial class UserFavourite
	{
		[Key, Column("user_favourite_id")]
		public int UserFavouriteId { get; set; }
		[Required]
		public int UserId { get; set; }
		[Required]
		public int PlaceId { get; set; }

		[ForeignKey("UserId")]
		public virtual User User { get; set; }
		[ForeignKey("PlaceId")]
		public virtual Place Place { get; set; }
	}
}
