using CampaignCRUD.Models.DTOs;
using CampaignCRUD.Models.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CampaignCRUD.IServices
{
    public interface ICampaignServices
    {
        public Task<List<CampaignDTO>> getCampaigns();
        public Task createCampaign(CampaignDTO campaignModel);
        public Task updateCampaign(int id);
        public Task deleteCampaign(int id);
    }
}
