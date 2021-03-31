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
    }
}
