using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TodoApp.Data;
using TodoApp.Services;
using Microsoft.AspNetCore.Identity;
using TodoApp.Areas.Identity.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddDbContext<TodoDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoDBContext") ?? throw new InvalidOperationException("Connection string 'TodoDBContext' not found.")));

//builder.Services.AddDefaultIdentity<TodoAppUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<TodoAppContext>();
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<UserDBContext>()
    .AddDefaultUI()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<UserDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoAppContextConnection"));
});
builder.Services.AddHostedService<OverdueTaskChecker>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
