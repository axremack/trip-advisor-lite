using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	public partial class Owner : User
	{
		public Owner() : base()
		{
			Places = new HashSet<Place>();
		}

		[Column("mail"), DataType(DataType.EmailAddress), StringLength(512), Required]
		public string MailAddress { get; set; }

		public virtual ICollection<Place> Places { get; set; }
	}
}
