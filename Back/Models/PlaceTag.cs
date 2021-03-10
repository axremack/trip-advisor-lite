using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("place_tag", Schema = "trip_advisor")]
	public partial class PlaceTag
	{
		[Key, Column("place_tag_id")]
		public int PlaceTagId { get; set; }
		[Required]
		public int PlaceId { get; set; }
		[Required]
		public int TagId { get; set; }

		[ForeignKey("PlaceId")]
		public virtual Place Place { get; set; }
		[ForeignKey("TagId")]
		public virtual Tag Tag { get; set; }
	}
}
