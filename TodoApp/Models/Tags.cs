namespace TodoApp.Models
{
    public class Tags
    {
        public int TagID { get; set; }

        public readonly string Important;
        public readonly string DueSoon;
        public readonly string Urgent;
        public readonly string Meeting;

        public int TodoID { get; set; }
        public Todo? Todo { get; set; }
        public Tags()
        {
            Important = "Important";
            DueSoon = "Due Soon";
            Urgent = "Urgent";
            Meeting = "Meeting";
        }
    }
}
