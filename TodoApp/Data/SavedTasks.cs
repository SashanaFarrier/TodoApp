using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.Data
{
    public class SavedTasks
    {
        private readonly TodoDBContext _todoDBContext;
        public IList<Todo> Todos { get; set; } = default!;
        public SavedTasks(TodoDBContext todoDBContext)
        {
            _todoDBContext = todoDBContext;
        }

        public async Task GetTodos()
        {
            Todos = await _todoDBContext.Todos.ToListAsync();
        } 
    }
}
