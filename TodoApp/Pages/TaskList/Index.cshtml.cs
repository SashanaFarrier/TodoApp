﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using TodoApp.Areas.Identity.Data;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Pages.TaskList
{
    public class IndexModel : PageModel
    {
        private readonly TodoDBContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        
        public IndexModel(TodoDBContext context, UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IList<Todo> CurrentUserTodos { get; set; }
        public IList<Todo> Todos { get; set; } = default!;

    
        public async Task OnGetAsync()
        {
            CurrentUserTodos = new List<Todo>();
            User? user = await _userManager.GetUserAsync(User);

            if(user != null)
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

        public async Task<IActionResult> OnGetEditAsync(int? id)
        {
            Todo todo = await _context.Todos.FirstOrDefaultAsync(m => m.TodoID == id);

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

                if(original.IsActive != todo.IsActive)
                {
                    original.IsActive = todo.IsActive;
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
                    original.IsActive = true;
                 } else if (original.Status == "Completed")
                 {
                    original.IsCompleted = true;
                    original.CompletedOn = DateTime.Now;
                 } else
                 {
                    original.IsActive = false;
                    original.IsCompleted = false;
                 }

                _context.Attach(original).State = EntityState.Modified;

            }

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


        //Logout
        public async Task<IActionResult> OnPostLogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return RedirectToPage("/Index");
        }


    }
}
