using CampaignCRUD.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CampaignCRUD.Data
{
    public class CampaignContext : DbContext
    {
        public CampaignContext(DbContextOptions<CampaignContext> options) : base(options)
        {
        }
        public DbSet<Campaign> Campaigns { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Campaign>()
                .HasKey(c => c.Id);

            builder.Entity<Campaign>()
                .Property(c => c.Keywords)
                .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

        }
    }
}
