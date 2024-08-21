using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.Areas.Identity.Data;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages
{
    public class CalendarModel : PageModel
    {

        private readonly TodoDBContext _context;
        //private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        [BindProperty]
        public Todo Todo { get; set; } = default!;
        public IList<Todo> Todos { get; set; } = default!;

        public CalendarModel(TodoDBContext context, UserManager<User> userManager)
        {
            _context = context;
            //_signInManager = signInManager;
            _userManager = userManager;

        }

        public async Task OnGetAsync()
        {
            User? user = await _userManager.GetUserAsync(User);

            if (user != null)
            {
                TempData["User"] = user.Name;
                TempData["UserName"] = user.UserName;
            }

        }


        //handler for adding new task
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            Todo.LoggedInUserID = _userManager.GetUserId(User);

            _context.Todos.Add(Todo);
            await _context.SaveChangesAsync();

            return RedirectToPage("/TaskList/Index");
        }


    }
}
