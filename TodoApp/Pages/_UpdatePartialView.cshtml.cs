using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages
{
    public class _UpdatePartialViewModel : PageModel
    {
        private readonly TodoDBContext _context;

        public _UpdatePartialViewModel(TodoDBContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Todo? Todo { get; set; }

        public _UpdatePartialViewModel(Todo todo)
        {

            if(todo == null)
            {
                Todo = new Todo();
            } else
            {
                Todo = todo;
            }
        }
        public void OnGet()
        {

        }

      
    }
}
