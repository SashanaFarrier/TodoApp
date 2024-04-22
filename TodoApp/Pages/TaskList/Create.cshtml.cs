using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages.TaskList
{
    public class CreateModel : PageModel
    {
        private readonly TodoDBContext _context;

        public CreateModel(TodoDBContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Todo Todo { get; set; } = default!;

    }
}
