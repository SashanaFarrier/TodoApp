using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApp.Models
{
    public class Todo
    {
        public int TodoID { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        [Required]
        [Display(Name = "Due On")]

        [DisplayFormat(DataFormatString = "{MMMM d, yyyy}")]
        public DateTime DueOn { get; set; }
        public DateTime CompletedOn { get; set; }
        [Required]
        public string? Details { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } 
        public bool IsInProgress { get; set; }
        public bool IsOverdue { get; set; }
        public Priority? Priority { get; set; } = null;
    }

    public enum Priority { Low, Medium, High }

}
