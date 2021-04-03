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

        public async Task<ServiceResponse<CampaignDTO>> getCampaignAsync(int id)
        {
            try
            {
                var campaign = await _appDb.Campaigns.FindAsync(id);
                var campaignDTO = _mapper.Map<CampaignDTO>(campaign);

                ServiceResponse<CampaignDTO> serviceResponse = new ServiceResponse<CampaignDTO>();
                serviceResponse.Data = campaignDTO;
                serviceResponse.Message = "Successfully fetched Campaign";
                return serviceResponse;
            }
            catch (Exception ex)
            {
                ServiceResponse<CampaignDTO> serviceResponse = new ServiceResponse<CampaignDTO>();
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                return serviceResponse;
            }
        }

        public async Task<ServiceResponse<List<CampaignDTO>>> getCampaignsAsync()
        {
            try
            {
                var campaigns = await _appDb.Campaigns.ToListAsync();
                var campaignsDTO = _mapper.Map<List<CampaignDTO>>(campaigns);
                
                ServiceResponse<List<CampaignDTO>> serviceResponse = new ServiceResponse<List<CampaignDTO>>();
                serviceResponse.Data = campaignsDTO;
                serviceResponse.Message = "Successfully fetched all Campaigns";
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

        public async Task<ServiceResponse<List<CampaignDTO>>> createCampaignAsync(CampaignDTO campaignModel)
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
                await _appDb.Campaigns.AddAsync(campaign);
                await _appDb.SaveChangesAsync();
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

        public async Task<ServiceResponse<List<CampaignDTO>>> deleteCampaignAsync(int id)
        {
            try
            {
                var campaign = await _appDb.Campaigns.FindAsync(id);
                _appDb.Campaigns.Remove(campaign);
                await _appDb.SaveChangesAsync();
                var campaigns = await _appDb.Campaigns.ToListAsync();
                var campaignsDTO = _mapper.Map<List<CampaignDTO>>(campaigns);

                ServiceResponse<List<CampaignDTO>> serviceResponse = new ServiceResponse<List<CampaignDTO>>();
                serviceResponse.Data = campaignsDTO;
                serviceResponse.Message = "Successfully removed Campaign";
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

        public async Task<ServiceResponse<List<CampaignDTO>>> updateCampaignAsync(CampaignDTO updatedCampaignModel)
        {
            try
            {
                var campaign = await _appDb.Campaigns.FindAsync(updatedCampaignModel.Id);
               
                campaign.Name = updatedCampaignModel.Name;              
                campaign.Keywords = updatedCampaignModel.Keywords;
                campaign.BidAmount = updatedCampaignModel.BidAmount;
                campaign.CampaignFund = updatedCampaignModel.CampaignFund;
                campaign.Status = updatedCampaignModel.Status;
                campaign.Town = updatedCampaignModel.Town;
                campaign.Radius = updatedCampaignModel.Radius;
                await _appDb.SaveChangesAsync();
                var campaigns = await _appDb.Campaigns.ToListAsync();
                var campaignsDTO = _mapper.Map<List<CampaignDTO>>(campaigns);

                ServiceResponse<List<CampaignDTO>> serviceResponse = new ServiceResponse<List<CampaignDTO>>();
                serviceResponse.Data = campaignsDTO;
                serviceResponse.Message = "Successfully updated Campaign";
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
    }
}
