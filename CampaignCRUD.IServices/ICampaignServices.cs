using CampaignCRUD.Models.DTOs;
using CampaignCRUD.Models.Models;
using CampaignCRUD.Models.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CampaignCRUD.IServices
{
    public interface ICampaignServices
    {
        public Task<List<CampaignDTO>> getCampaigns();
        public Task<ServiceResponse<List<CampaignDTO>>> createCampaign(CampaignDTO campaignModel);
        public Task<ServiceResponse<List<CampaignDTO>>> updateCampaign(CampaignDTO campaignModel);
        public Task<ServiceResponse<List<CampaignDTO>>> deleteCampaign(int id);
    }
}
