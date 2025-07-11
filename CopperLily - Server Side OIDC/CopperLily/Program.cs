using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Bind OpenIdConnect options from configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    var oidcConfig = builder.Configuration.GetSection("Authentication:OpenIdConnect");
    options.Authority = oidcConfig["Authority"];
    options.ClientId = oidcConfig["ClientId"];
    options.ClientSecret = oidcConfig["ClientSecret"];
    options.ResponseType = oidcConfig["ResponseType"] ?? "code";
    options.SaveTokens = bool.TryParse(oidcConfig["SaveTokens"], out var saveTokens) && saveTokens;
    options.Scope.Clear();
    foreach (var scope in oidcConfig.GetSection("Scopes").Get<string[]>() ?? Array.Empty<string>())
    {
        options.Scope.Add(scope);
    }
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Require authentication for the root path (index.html)
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/" || context.Request.Path == "/index.html")
    {
        if (!context.User.Identity?.IsAuthenticated ?? true)
        {
            await context.RequestServices.GetRequiredService<IAuthenticationService>()
                .ChallengeAsync(context, OpenIdConnectDefaults.AuthenticationScheme, new AuthenticationProperties());
            return;
        }
    }
    await next();
});

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();
app.Run();
