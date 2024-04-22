using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedPriorityDBSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Priority_PriorityID",
                table: "Todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Priority",
                table: "Priority");

            migrationBuilder.RenameTable(
                name: "Priority",
                newName: "Priorities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Priorities",
                table: "Priorities",
                column: "PriorityID");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Priorities_PriorityID",
                table: "Todos",
                column: "PriorityID",
                principalTable: "Priorities",
                principalColumn: "PriorityID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Priorities_PriorityID",
                table: "Todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Priorities",
                table: "Priorities");

            migrationBuilder.RenameTable(
                name: "Priorities",
                newName: "Priority");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Priority",
                table: "Priority",
                column: "PriorityID");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Priority_PriorityID",
                table: "Todos",
                column: "PriorityID",
                principalTable: "Priority",
                principalColumn: "PriorityID");
        }
    }
}
