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

				entity.HasMany(u => u.FavouritePlaces).WithMany(p => p.UsersHavingFavoured).UsingEntity(j => j.ToTable("favourite_places"));

				entity.HasMany(u => u.VisitedPlaces).WithMany(p => p.UsersHavingVisited).UsingEntity(j => j.ToTable("visited_places"));
			});

			modelBuilder.Entity<Place>(entity => {
				entity.HasOne(p => p.Owner).WithMany(o => o.Places).HasForeignKey(p => p.OwnerId).HasConstraintName("FK_place_owner").OnDelete(DeleteBehavior.SetNull);

				entity.HasOne(p => p.Type).WithMany(t => t.Places).HasForeignKey(p => p.TypeId).HasConstraintName("FK_place_type").OnDelete(DeleteBehavior.SetNull);

				entity.HasMany(p => p.Tags).WithMany(t => t.Places).UsingEntity(j => j.ToTable("places_tags"));
			});
		}
	}
}