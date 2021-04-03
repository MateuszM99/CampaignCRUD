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
        public Task<ServiceResponse<CampaignDTO>> getCampaignAsync(int id);
        public Task<ServiceResponse<List<CampaignDTO>>> getCampaignsAsync();
        public Task<ServiceResponse<List<CampaignDTO>>> createCampaignAsync(CampaignDTO campaignModel);
        public Task<ServiceResponse<List<CampaignDTO>>> updateCampaignAsync(CampaignDTO campaignModel);
        public Task<ServiceResponse<List<CampaignDTO>>> deleteCampaignAsync(int id);
    }
}
