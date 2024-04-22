using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApp.Migrations
{
    /// <inheritdoc />
    public partial class RemovePriorityDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Priorities_PriorityID",
                table: "Todos");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropIndex(
                name: "IX_Todos_PriorityID",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "PriorityID",
                table: "Todos");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Todos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Todos");

            migrationBuilder.AddColumn<int>(
                name: "PriorityID",
                table: "Todos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    PriorityID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Level = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.PriorityID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Todos_PriorityID",
                table: "Todos",
                column: "PriorityID");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Priorities_PriorityID",
                table: "Todos",
                column: "PriorityID",
                principalTable: "Priorities",
                principalColumn: "PriorityID");
        }
    }
}
