using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApp.Models
{
    public class Todo
    {
        public int TodoID { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        [Required]
        [Display(Name = "Due On")]
        [DisplayFormat(DataFormatString = "ddd, MMMM dd")]
        public DateTime DueOn { get; set; }  
        public DateTime CompletedOn { get; set; } 
        [Required]
        public string? Details { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } 
        public bool IsActive { get; set; }
        public bool IsOverdue { get; set; }
        public string? Status { get; set; }
        public Priority? Priority { get; set; } 
        public string? LoggedInUserID { get; set; }
    }

    public enum Priority { Low, Medium, High }

    //public class OverDue
    //{
    //    public bool overdue { get; set; }

    //    public Todo Todo = new Todo
    //    {
    //        IsOverdue = DueOn.Date < DateTime.Now,
    //    };

        
    //}
  
}
