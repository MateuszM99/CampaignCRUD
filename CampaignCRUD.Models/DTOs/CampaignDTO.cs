using CampaignCRUD.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CampaignCRUD.Models.DTOs
{
    public class CampaignDTO
    {
        public int? Id { get; set; }
        [Required(AllowEmptyStrings = false)]
        [NotNull]
        public string Name { get; set; }
        [Required]
        [NotNull]
        public string[] Keywords { get; set; }
        [Required]
        [Range(200, double.MaxValue, ErrorMessage = "Please enter valid bid Amount Number")]
        public double BidAmount { get; set; }
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Please enter valid campaign fund Number")]
        public double CampaignFund { get; set; }
        [Required(AllowEmptyStrings = false)]
        [NotNull]
        public string Status { get; set; }
        [Required(AllowEmptyStrings = false)]
        [NotNull]
        public string Town { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid radius Number")]
        public int Radius { get; set; }
    }
}
