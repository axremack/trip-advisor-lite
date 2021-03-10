using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;

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
		[Column("password"), DataType(DataType.Password), StringLength(255), Required]
		public string Password { get; set; }

		public virtual ICollection<Place> Places { get; set; }
	}

	public class OwnerValidator : AbstractValidator<Owner>
	{
		public OwnerValidator()
		{
			RuleFor(o => o.SurName).NotEmpty().WithMessage("Enter a surname");
			RuleFor(o => o.FirstName).NotEmpty().WithMessage("Enter a first name");
			RuleFor(o => o.MailAddress).NotEmpty().EmailAddress().WithMessage("Enter a valid mail adress");
			RuleFor(o => o.Password).NotEmpty().WithMessage("Enter a password");
		}
	}
}
