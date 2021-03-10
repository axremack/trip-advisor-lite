using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("user_visit", Schema = "trip_advisor")]
	public partial class UserVisit
	{
		[Key, Column("user_visit__id")]
		public int UserVisitId { get; set; }
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
