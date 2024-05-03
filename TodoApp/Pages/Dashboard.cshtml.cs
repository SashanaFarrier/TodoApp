using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages
{
    public class DashboardModel : PageModel
    {
        private readonly TodoDBContext _context;

        //[BindProperty]
        //public Todo Todo { get; set; }

        public DashboardModel(TodoDBContext context)
        {
            _context = context;
        }

        public IList<Todo> Todos { get; set; } = default!;

        public async Task OnGetAsync()
        {
            Todos = await _context.Todos.ToListAsync();
        }

        [BindProperty]
        public Todo Todo { get; set; } = default!;
        public async Task<IActionResult> OnGetEditAsync(int? id)
        {
            Todo todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);

            //var todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);
            if (todo == null)
            {
                return NotFound();
            }


            return Partial("_UpdatePartialView", todo);
        }


        public async Task<IActionResult> OnPostEditAsync(Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }



            //check for updates made 

            if (todo.Status == "Started")
            {
                todo.IsInProgress = true;
            }
            else if (todo.Status == "Completed")
            {
                todo.IsCompleted = true;
                todo.CompletedOn = DateTime.Now;
            }
            else
            {
                todo.IsInProgress = false;
                todo.IsCompleted = false;
            }

            //if(todo.DueOn.Date < DateTime.Now)
            //{
            //    todo.IsOverdue = true;
            //}

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

            return RedirectToPage("/Dashboard");
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

            return RedirectToPage("/Dashboard");
        }


    }
}
