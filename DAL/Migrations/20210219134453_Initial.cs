using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "trip_advisor");

            migrationBuilder.CreateTable(
                name: "place_type",
                schema: "trip_advisor",
                columns: table => new
                {
                    type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place_type", x => x.type_id);
                });

            migrationBuilder.CreateTable(
                name: "tag",
                schema: "trip_advisor",
                columns: table => new
                {
                    tag_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tag", x => x.tag_id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                schema: "trip_advisor",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    first_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    user_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mail = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "place",
                schema: "trip_advisor",
                columns: table => new
                {
                    place_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    desc = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    bed_count = table.Column<int>(type: "int", nullable: false),
                    bath_count = table.Column<int>(type: "int", nullable: false),
                    street = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    city = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    zip_code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    state = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OwnerId = table.Column<int>(type: "int", nullable: true),
                    TypeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place", x => x.place_id);
                    table.ForeignKey(
                        name: "FK_place_owner",
                        column: x => x.OwnerId,
                        principalSchema: "trip_advisor",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_place_type",
                        column: x => x.TypeId,
                        principalSchema: "trip_advisor",
                        principalTable: "place_type",
                        principalColumn: "type_id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "comment",
                schema: "trip_advisor",
                columns: table => new
                {
                    CommentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    rank = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    PlaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comment", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_comment_place_PlaceId",
                        column: x => x.PlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_comment_user_UserId",
                        column: x => x.UserId,
                        principalSchema: "trip_advisor",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "favourite_places",
                schema: "trip_advisor",
                columns: table => new
                {
                    FavouritePlacesPlaceId = table.Column<int>(type: "int", nullable: false),
                    UsersHavingFavouredUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favourite_places", x => new { x.FavouritePlacesPlaceId, x.UsersHavingFavouredUserId });
                    table.ForeignKey(
                        name: "FK_favourite_places_place_FavouritePlacesPlaceId",
                        column: x => x.FavouritePlacesPlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_favourite_places_user_UsersHavingFavouredUserId",
                        column: x => x.UsersHavingFavouredUserId,
                        principalSchema: "trip_advisor",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "places_tags",
                schema: "trip_advisor",
                columns: table => new
                {
                    PlacesPlaceId = table.Column<int>(type: "int", nullable: false),
                    TagsTagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_places_tags", x => new { x.PlacesPlaceId, x.TagsTagId });
                    table.ForeignKey(
                        name: "FK_places_tags_place_PlacesPlaceId",
                        column: x => x.PlacesPlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_places_tags_tag_TagsTagId",
                        column: x => x.TagsTagId,
                        principalSchema: "trip_advisor",
                        principalTable: "tag",
                        principalColumn: "tag_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visited_places",
                schema: "trip_advisor",
                columns: table => new
                {
                    UsersHavingVisitedUserId = table.Column<int>(type: "int", nullable: false),
                    VisitedPlacesPlaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visited_places", x => new { x.UsersHavingVisitedUserId, x.VisitedPlacesPlaceId });
                    table.ForeignKey(
                        name: "FK_visited_places_place_VisitedPlacesPlaceId",
                        column: x => x.VisitedPlacesPlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_visited_places_user_UsersHavingVisitedUserId",
                        column: x => x.UsersHavingVisitedUserId,
                        principalSchema: "trip_advisor",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_comment_PlaceId",
                schema: "trip_advisor",
                table: "comment",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_comment_UserId",
                schema: "trip_advisor",
                table: "comment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_favourite_places_UsersHavingFavouredUserId",
                schema: "trip_advisor",
                table: "favourite_places",
                column: "UsersHavingFavouredUserId");

            migrationBuilder.CreateIndex(
                name: "IX_place_OwnerId",
                schema: "trip_advisor",
                table: "place",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_place_TypeId",
                schema: "trip_advisor",
                table: "place",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_places_tags_TagsTagId",
                schema: "trip_advisor",
                table: "places_tags",
                column: "TagsTagId");

            migrationBuilder.CreateIndex(
                name: "IX_visited_places_VisitedPlacesPlaceId",
                schema: "trip_advisor",
                table: "visited_places",
                column: "VisitedPlacesPlaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "favourite_places",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "places_tags",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "visited_places",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "tag",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "place",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "user",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "place_type",
                schema: "trip_advisor");
        }
    }
}
