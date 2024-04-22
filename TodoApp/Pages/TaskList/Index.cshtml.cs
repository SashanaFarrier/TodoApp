using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages.TaskList
{
    public class IndexModel : PageModel
    {
        private readonly TodoDBContext _context;

        public IndexModel(TodoDBContext context)
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

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD

        //handler for adding new task
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Todos.Add(Todo);
            await _context.SaveChangesAsync();

            return RedirectToPage("/TaskList/Index");
        }

        public async Task<IActionResult> OnGetEditAsync(int? id)
        {
            Todo todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);
            //if (id == null)
            //{
            //    return NotFound();
            //}

            //var todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);
            if (todo == null)
            {
               return NotFound();
            }
            //Todo = todo;
            //return Page();
            return Partial("_UpdatePartialView", todo);
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

            return RedirectToPage("/TaskList/Index");
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

            return RedirectToPage("/TaskList/Index");
        }

    }
}
