using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("place_type", Schema = "trip_advisor")]
	public partial class PlaceType
	{
		public PlaceType()
		{
			Places = new HashSet<Place>();
		}

		[Key, Column("type_id")]
		public int PlaceTypeId { get; set; }
		[Column("type"), DataType(DataType.Text), StringLength(255), Required]
		public string Type { get; set; }

		public virtual ICollection<Place> Places { get; set; }
	}
}
