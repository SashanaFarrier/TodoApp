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


namespace TodoApp.Pages
{
    public class EditModel : PageModel
    {
        private readonly TodoDBContext _context;

        public EditModel(TodoDBContext context)
        {
            _context = context;
        }

        public EditModel() 
        {
           
        }

        [BindProperty]
        public Todo Todo { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);
            if (todo == null)
            {
                return NotFound();
            }
            Todo = todo;
            var data = new EditModel();
            data.Todo = Todo;
            return Page();
        }
    }
}
