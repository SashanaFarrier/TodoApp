using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriptionAndPriorityRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Todos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PriorityID",
                table: "Todos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Priority",
                columns: table => new
                {
                    PriorityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Level = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priority", x => x.PriorityID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_PriorityID",
                table: "Todos",
                column: "PriorityID");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Priority_PriorityID",
                table: "Todos",
                column: "PriorityID",
                principalTable: "Priority",
                principalColumn: "PriorityID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Priority_PriorityID",
                table: "Todos");

            migrationBuilder.DropTable(
                name: "Priority");

            migrationBuilder.DropIndex(
                name: "IX_Todos_PriorityID",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "PriorityID",
                table: "Todos");
        }
    }
}
