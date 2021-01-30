using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("place", Schema = "trip_advisor")]
	public partial class Place
	{
		public Place()
		{
			Tags = new HashSet<Tag>();
			Comments = new HashSet<Comment>();
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
		public virtual ICollection<Tag> Tags { get; set; }
		public virtual ICollection<Comment> Comments { get; set; }
		public virtual ICollection<User> UsersHavingVisited { get; set; }
		public virtual ICollection<User> UsersHavingFavoured { get; set; }
	}
}
