using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.Areas.Identity.Data;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages
{
    public class DashboardModel : PageModel
    {
        private readonly TodoDBContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public DashboardModel(TodoDBContext context, SignInManager<User> signInManager, UserManager<User>userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public IList<Todo> CurrentUserTodos { get; set; }
        public IList<Todo> Todos { get; set; } = default!;

        public async Task OnGetAsync()
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

        [BindProperty]
        public Todo Todo { get; set; } = default!;
        public async Task<IActionResult> OnGetEditAsync(int? id)
        {
            Todo? todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);

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
                todo.IsActive = true;
            }
            else if (todo.Status == "Completed")
            {
                todo.IsCompleted = true;
                todo.CompletedOn = DateTime.Now;
            }
            else
            {
                todo.IsActive = false;
                todo.IsCompleted = false;
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

        //Logout
        public async Task<IActionResult> OnPostLogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return RedirectToPage("/Index");
        }

    }
}
