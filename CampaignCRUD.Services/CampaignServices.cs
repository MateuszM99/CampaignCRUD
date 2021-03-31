using AutoMapper;
using CampaignCRUD.IServices;
using CampaignCRUD.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CampaignCRUD.Services
{
    public class CampaignServices : ICampaignServices
    {
        private readonly IMapper _mapper;
        public Task createCampaign(CampaignDTO campaignModel)
        {
            throw new NotImplementedException();
        }

        public Task deleteCampaign(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<CampaignDTO>> getCampaigns()
        {
            throw new NotImplementedException();
        }

        public Task updateCampaign(int id)
        {
            throw new NotImplementedException();
        }
    }
}
