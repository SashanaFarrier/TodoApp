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
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        [BindProperty]
        public Todo Todo { get; set; } = default!;
        public IList<Todo> Todos { get; set; } = default!;

        public CalendarModel(TodoDBContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
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

        //Logout
        public async Task<IActionResult> OnPostLogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return RedirectToPage("/Index");
        }

    }
}
