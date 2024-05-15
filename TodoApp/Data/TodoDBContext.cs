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
        public DbSet<Todo> Todos { get; set; } = default!;

    }
}
