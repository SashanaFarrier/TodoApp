using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.Areas.Identity.Data;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages
{
    public class ProjectOverviewModel : PageModel
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TodoDBContext _context;
        public ProjectOverviewModel(TodoDBContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IList<Todo> CurrentUserTodos { get; set; }
        public IList<Todo> Todos { get; set; } = default!;
        public async Task OnGet()
        {
            CurrentUserTodos = new List<Todo>();
            User? user = await _userManager.GetUserAsync(User);

            if (user != null)
            {

                var todos = await _context.Todos.ToListAsync();
                var sortedTodos = todos.OrderByDescending(x => x.CreatedOn).ToList();

                foreach (var todo in sortedTodos)
                {
                    if (todo.LoggedInUserID == user.Id)
                    {
                        CurrentUserTodos.Add(todo);
                    }
                }

                TempData["User"] = user.Name;
                TempData["UserName"] = user.UserName;

                Todos = CurrentUserTodos;

            }
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

        //Logout
        public async Task<IActionResult> OnPostLogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return RedirectToPage("/Index");
        }

    }
}
