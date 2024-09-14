using System.ComponentModel.DataAnnotations;

namespace TodoApp.Areas.Identity.Data
{
    public class PersonalDataViewModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? NewEmail { get; set;} = string.Empty;


        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string? Password { get; set; }


        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string? NewPassword { get; set; }


        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string? ConfirmPassword { get; set; }
    }
}
