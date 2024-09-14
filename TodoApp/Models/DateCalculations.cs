using System.Globalization;

namespace TodoApp.Models
{
    public class DateCalculations
    {
        public DateTime FirstDayOfTheWeek { get; set; }
        public DateTime LastDayOfTheWeek { get; set; }

        public DateCalculations()
        {
            FirstDayOfTheWeek firstDayOfTheWeek = new FirstDayOfTheWeek();
            FirstDayOfTheWeek = firstDayOfTheWeek.FirstDayOfWeek();

            LastDayOfTheWeek lastDayOfTheWeek = new LastDayOfTheWeek();
            LastDayOfTheWeek = lastDayOfTheWeek.LastDayOfWeek();
        }
    }

    public class FirstDayOfTheWeek
    {
        private DateTime currentDate = DateTime.UtcNow;

        private static DateTime CalculateFirstDayOfWeek(DateTime dt)
        {
            var culture = CultureInfo.CurrentCulture;
            var diff = dt.DayOfWeek - culture.DateTimeFormat.FirstDayOfWeek;

            if (diff < 0)
            {
                diff += 7;
            }

            return dt.AddDays(-diff).Date;
        }

        public DateTime FirstDayOfWeek()
        {
            return CalculateFirstDayOfWeek(currentDate);
        }
    }

    public class LastDayOfTheWeek
    {
        private static DateTime CalculateLastDayOfTheWeek()
        {
            var firstDay = new FirstDayOfTheWeek().FirstDayOfWeek();
            return firstDay.AddDays(6).Date;
        }

        public DateTime LastDayOfWeek()
        {
            return CalculateLastDayOfTheWeek();
        }
    }
}

