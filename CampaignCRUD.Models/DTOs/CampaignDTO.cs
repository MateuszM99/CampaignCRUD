using System;
using System.Collections.Generic;
using System.Text;

namespace CampaignCRUD.Models.DTOs
{
    public class CampaignDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Keywords { get; set; }
        public double BidAmount { get; set; }
        public double CampaignFund { get; set; }
        public bool Status { get; set; }
        public string Town { get; set; }
        public int Radius { get; set; }
    }
}
