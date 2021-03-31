using AutoMapper;
using CampaignCRUD.Data;
using CampaignCRUD.IServices;
using CampaignCRUD.Models.DTOs;
using CampaignCRUD.Models.Models;
using CampaignCRUD.Models.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace CampaignCRUD.Services
{
    public class CampaignServices : ICampaignServices
    {
        private readonly CampaignContext _appDb;
        private readonly IMapper _mapper;
        public CampaignServices(CampaignContext appDb, IMapper mapper)
        {
            _appDb = appDb;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<CampaignDTO>>> createCampaign(CampaignDTO campaignModel)
        {
            if (campaignModel == null)
            {
                ServiceResponse<List<CampaignDTO>> serviceResponse = new ServiceResponse<List<CampaignDTO>>();
                serviceResponse.Success = false;
                serviceResponse.Message = "No model";
                return serviceResponse;
            }

            try
            {
                var campaign = _mapper.Map<Campaign>(campaignModel);
                await _appDb.AddAsync(campaign);
                var campaigns = await _appDb.Campaigns.ToListAsync();
                var campaignsDTO = _mapper.Map<List<CampaignDTO>>(campaigns);

                ServiceResponse<List<CampaignDTO>> serviceResponse = new ServiceResponse<List<CampaignDTO>>();
                serviceResponse.Data = campaignsDTO;
                serviceResponse.Message = "Successfully added new Campaign";
                return serviceResponse;
            }
            catch (Exception ex)
            {
                ServiceResponse<List<CampaignDTO>> serviceResponse = new ServiceResponse<List<CampaignDTO>>();
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                return serviceResponse;
            }
        }

        public async Task<ServiceResponse<List<CampaignDTO>>> deleteCampaign(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<CampaignDTO>> getCampaigns()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<CampaignDTO>>> updateCampaign(CampaignDTO campaignModel)
        {
            throw new NotImplementedException();
        }
    }
}
