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
            

            //if(Todo.DueOn.Date < DateTime.Now)
            //{
            //    Todo.IsOverdue = true;
            //}

            _context.Todos.Add(Todo);
            await _context.SaveChangesAsync();

            return RedirectToPage("/TaskList/Index");
        }

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

            var original = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == todo.TodoID);
            //check for updates made 

            if(original != null && todo != null)
            {

                if(original.Description != todo.Description)
                {
                    original.Description = todo.Description;
                } 

                if(original.Details != todo.Details)
                {
                    original.Details = todo.Details;
                }

                if(original.Status != todo.Status)
                {
                    original.Status = todo.Status;
                }

                if (original.DueOn != todo.DueOn)
                {
                    original.DueOn = todo.DueOn;
                }

                if (original.CompletedOn != todo.CompletedOn)
                {
                    original.CompletedOn = todo.CompletedOn;
                }

                if(original.IsInProgress != todo.IsInProgress)
                {
                    original.IsInProgress = todo.IsInProgress;
                }

                if(original.IsCompleted != todo.IsCompleted)
                {
                    original.IsCompleted = todo.IsCompleted;
                }

                if(original.Priority != todo.Priority)
                {
                    original.Priority = todo.Priority;
                }

                 if (original.Status == "Started")
                 {
                    original.IsInProgress = true;
                 } else if (original.Status == "Completed")
                 {
                    original.IsCompleted = true;
                    original.CompletedOn = DateTime.Now;
                 } else
                 {
                    original.IsInProgress = false;
                    original.IsCompleted = false;
                 }

                _context.Attach(original).State = EntityState.Modified;

            }

           
            //if(todo.DueOn.Date < DateTime.Now)
            //{
            //    todo.IsOverdue = true;
            //}

           

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
