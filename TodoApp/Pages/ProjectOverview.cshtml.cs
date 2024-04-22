using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages
{
    public class ProjectOverviewModel : PageModel
    {
        private readonly TodoDBContext _context;
        public ProjectOverviewModel(TodoDBContext context)
        {
            _context = context;
        }

        public IList<Todo> Todos { get; set; } = default!;
        public async Task OnGet()
        {
            Todos = await _context.Todos.ToListAsync();
        }


        public async Task<IActionResult> OnPostEditAsync(Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(todo.TodoID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("/ProjectOverview");
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.TodoID == id);
        }

        public async Task<IActionResult> OnPostDeleteAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var todo = await _context.Todos.FindAsync(id);
            if (todo != null)
            {
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("/ProjectOverview");
        }
    }
}
