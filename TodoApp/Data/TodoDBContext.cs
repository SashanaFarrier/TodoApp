using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.Data
{
    public class TodoDBContext : DbContext
    {
        public TodoDBContext (DbContextOptions<TodoDBContext> options)
            : base(options)
        {
        }

    //    protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    modelBuilder.Entity<Todo>()
    //        .HasOne(t => t.Priority)
    //        .WithMany(p => p.Todos)
    //        .HasForeignKey(t => t.PriorityID);
    //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Priority>()
        //        .HasNoKey();

        //    modelBuilder.Entity<Todo>()
        //        .HasOne<Priority>()
        //        .WithOne(t => t.Todo);

        //}

        public DbSet<Todo> Todos { get; set; } = default!;
        //public DbSet<Priority> Priorities { get; set; } = default!;
    }
}
