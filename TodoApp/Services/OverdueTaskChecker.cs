using TodoApp.Data;

namespace TodoApp.Services
{
    public class OverdueTaskChecker : IHostedService, IDisposable
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private Timer _timer;
        private ILogger<OverdueTaskChecker> Logger { get; }

        public OverdueTaskChecker(IServiceScopeFactory scopeFactory, ILogger<OverdueTaskChecker> logger)
        {
            _scopeFactory = scopeFactory;
            Logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromMinutes(1)); // Adjust interval as needed
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            try
            {
                CheckForOverdueTasks();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while checking for overdue tasks");
            }
        }

        private void CheckForOverdueTasks()
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<TodoDBContext>();

                var overdueTasks = context.Todos.Where(t => t.DueOn < DateTime.UtcNow && !t.IsOverdue);
                foreach (var task in overdueTasks)
                {
                    task.IsOverdue = true;
                }

                context.SaveChanges();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.InfiniteTimeSpan.Milliseconds, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
