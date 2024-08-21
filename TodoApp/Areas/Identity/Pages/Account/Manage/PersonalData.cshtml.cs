// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using System;
using System.Threading.Tasks;
using Elfie.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using TodoApp.Areas.Identity.Data;

namespace TodoApp.Areas.Identity.Pages.Account.Manage
{
    public class PersonalDataModel : PageModel
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<PersonalDataModel> _logger;

        [BindProperty]
        public PersonalDataViewModel PersonalInfo { get; set; } = new PersonalDataViewModel();

        public PersonalDataModel(
            UserManager<User> userManager, SignInManager<User> signInManager,
            ILogger<PersonalDataModel> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        public async Task<IActionResult> OnGet()
        {
            User? user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            PersonalInfo = new PersonalDataViewModel()
            {
                Name = user.Name,
                Email = user.Email,
            };

            return Page();
        }

        public async Task<IActionResult> OnPostUpdateName()
        {
            User? user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }
            
            user.Name = PersonalInfo.Name;
            await _userManager.UpdateAsync(user);

            TempData["Message"] = "You have successfully changed your name!";
            return RedirectToPage("/Account/Manage/PersonalData");

        }

        public async Task<IActionResult> OnPostUpdateEmail()
        {
            User? user = await _userManager.GetUserAsync(User); 

            if (user == null) 
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var oldEmail = user.Email;
            var newEmail = PersonalInfo.NewEmail;

            if(oldEmail != newEmail)
            {
                var setEmailResult = await _userManager.SetEmailAsync(user, newEmail);

                user.UserName = newEmail;

                await _userManager.UpdateNormalizedUserNameAsync(user);
                await _userManager.UpdateAsync(user);

                if (!setEmailResult.Succeeded)
                {
                    foreach (var error in setEmailResult.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return Page();
                }
            }
            TempData["Message"] = "You have successfully changed your email!";
            return RedirectToPage("/Account/Manage/PersonalData");
        }

        public async Task<IActionResult> OnPostUpdatePassword()
        {
            User? user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if(PersonalInfo.Password != null && PersonalInfo.NewPassword != null && PersonalInfo.ConfirmPassword != null)
            {
                // Check the current password
                if (!await _userManager.CheckPasswordAsync(user, PersonalInfo.Password))
                {
                    ModelState.AddModelError(string.Empty, "Invalid current password.");
                    return Page(); // Return the page with the validation error
                }

                // Generate a password reset token
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                // Update the user's password
                var result = await _userManager.ResetPasswordAsync(user, token, PersonalInfo.NewPassword);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    return Page(); // Return the page with the validation errors
                }

                // Password changed successfully
                TempData["Message"] = "You have successfully changed your password!";
                return RedirectToPage("/Account/Manage/PersonalData");

            }
            else
            {
                return Page(); // Return the page with the validation errors
            }

        }



        public async Task<IActionResult> OnPostDeleteAccount()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            //RequirePassword = await _userManager.HasPasswordAsync(user);
            //if (RequirePassword)
            //{
            //    if (!await _userManager.CheckPasswordAsync(user, Input.Password))
            //    {
            //        ModelState.AddModelError(string.Empty, "Incorrect password.");
            //        return Page();
            //    }
            //}

            var result = await _userManager.DeleteAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred deleting user.");
            }

            await _signInManager.SignOutAsync();

            _logger.LogInformation("User with ID '{UserId}' deleted themselves.", userId);

            return Redirect("~/");
        }
    }
}
