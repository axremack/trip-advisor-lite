using Microsoft.EntityFrameworkCore;

namespace DAL.Models
{
	public partial class TripAdvisorContext : DbContext
	{
		public TripAdvisorContext() { }

		public TripAdvisorContext(DbContextOptions<TripAdvisorContext> options) : base(options) { }

		public virtual DbSet<Place> Places { get; set; }
		public virtual DbSet<User> Users { get; set; }
		public virtual DbSet<Owner> Owners { get; set; }
		public virtual DbSet<Comment> Comments { get; set; }
		public virtual DbSet<Tag> Tags { get; set; }
		public virtual DbSet<PlaceType> PlaceTypes { get; set; }
		public virtual DbSet<PlaceTag> PlaceTags { get; set; }
		public virtual DbSet<UserVisit> UserVisits { get; set; }
		public virtual DbSet<UserFavourite> UserFavourites { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				optionsBuilder.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=TripAdv;");
			}
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

			modelBuilder.Entity<User>(entity => {
				entity.HasDiscriminator<string>("user_type").HasValue<User>("user").HasValue<Owner>("owner");
			});

			modelBuilder.Entity<Place>(entity => {
				entity.HasOne(p => p.Owner).WithMany(o => o.Places).HasForeignKey(p => p.OwnerId).HasConstraintName("FK_place_owner").OnDelete(DeleteBehavior.SetNull);

				entity.HasOne(p => p.Type).WithMany(t => t.Places).HasForeignKey(p => p.TypeId).HasConstraintName("FK_place_type").OnDelete(DeleteBehavior.SetNull);
			});

			modelBuilder.Entity<PlaceTag>(entity => {
				entity.HasOne(p => p.Place).WithMany(p => p.PlaceTags).HasForeignKey(p => p.PlaceId).HasConstraintName("FK_place_tag_place");

				entity.HasOne(p => p.Tag).WithMany(t => t.PlaceTags).HasForeignKey(p => p.TagId).HasConstraintName("FK_place_tag_tag");
			});

			modelBuilder.Entity<UserVisit>(entity => {
				entity.HasOne(u => u.User).WithMany(u => u.UserVisits).HasForeignKey(u => u.UserId).HasConstraintName("FK_user_visit_user");

				entity.HasOne(u => u.Place).WithMany(p => p.UserVisits).HasForeignKey(u => u.PlaceId).HasConstraintName("FK_user_visit_place");
			});

			modelBuilder.Entity<UserFavourite>(entity => {
				entity.HasOne(u => u.User).WithMany(u => u.UserFavourites).HasForeignKey(u => u.UserId).HasConstraintName("FK_user_favourite_user");

				entity.HasOne(u => u.Place).WithMany(p => p.UserFavourites).HasForeignKey(u => u.PlaceId).HasConstraintName("FK_user_favourite_place");
			});
		}
	}
}