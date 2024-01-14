using AspChat.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSignalR();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("aspchat", builder =>
    {
        builder.WithOrigins("http://localhost:3000");
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowCredentials();
    });
});

builder.Services.AddSingleton<Shared>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseRouting();

app.UseCors("aspchat");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapHub<ChatHub>("/chat");
app.UseAuthorization();

app.Run();
