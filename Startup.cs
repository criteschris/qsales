using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using qsales.Extensions;
using qsales.Models;
using qsales.Repositories;

namespace qsales
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddAzureAd(options => Configuration.Bind("AzureAd", options))
            .AddCookie();

            //Configure Entity Framework with the DbContext and connection string
            services.AddDbContext<QSalesDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("QSales")));

            //Require HTTPS
            services.AddMvc(/* options => options.Filters.Add(new RequireHttpsAttribute()) */);

            //Setup DI services
            services.AddScoped<ISalesRepository, SalesRepository>();
            services.AddScoped<IFacetRepository, FacetRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope()){
                var context = serviceScope.ServiceProvider.GetService<QSalesDbContext>();

                if (context.Database.GetAppliedMigrations().Any()) {
                    context.EnsureSeedData();
                }
            }

            //redirect to HTTPS before handling any requests
            /* var options = new RewriteOptions().AddRedirectToHttps();
            app.UseRewriter(options);
 */
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
