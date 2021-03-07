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
                name: "place_tag",
                schema: "trip_advisor",
                columns: table => new
                {
                    place_tag_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaceId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place_tag", x => x.place_tag_id);
                    table.ForeignKey(
                        name: "FK_place_tag_place",
                        column: x => x.PlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_place_tag_tag",
                        column: x => x.TagId,
                        principalSchema: "trip_advisor",
                        principalTable: "tag",
                        principalColumn: "tag_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_favourite",
                schema: "trip_advisor",
                columns: table => new
                {
                    user_favourite_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PlaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_favourite", x => x.user_favourite_id);
                    table.ForeignKey(
                        name: "FK_user_favourite_place",
                        column: x => x.PlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_favourite_user",
                        column: x => x.UserId,
                        principalSchema: "trip_advisor",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_visit",
                schema: "trip_advisor",
                columns: table => new
                {
                    user_visit__id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PlaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_visit", x => x.user_visit__id);
                    table.ForeignKey(
                        name: "FK_user_visit_place",
                        column: x => x.PlaceId,
                        principalSchema: "trip_advisor",
                        principalTable: "place",
                        principalColumn: "place_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_visit_user",
                        column: x => x.UserId,
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
                name: "IX_place_tag_PlaceId",
                schema: "trip_advisor",
                table: "place_tag",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_place_tag_TagId",
                schema: "trip_advisor",
                table: "place_tag",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_user_favourite_PlaceId",
                schema: "trip_advisor",
                table: "user_favourite",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_user_favourite_UserId",
                schema: "trip_advisor",
                table: "user_favourite",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_user_visit_PlaceId",
                schema: "trip_advisor",
                table: "user_visit",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_user_visit_UserId",
                schema: "trip_advisor",
                table: "user_visit",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "place_tag",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "user_favourite",
                schema: "trip_advisor");

            migrationBuilder.DropTable(
                name: "user_visit",
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
