using CampaignCRUD.Data;
using CampaignCRUD.IServices;
using CampaignCRUD.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace CampaignCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        private readonly CampaignContext _appDb;
        private readonly ICampaignServices _campaignServices;
        public CampaignsController(CampaignContext appDb, ICampaignServices campaignServices)
        {
            _appDb = appDb;
            _campaignServices = campaignServices;
        }

        [HttpGet]
        [Route("getCampaigns")]
        public async Task<IActionResult> GetCampaigns()
        {
            var response = await _campaignServices.getCampaignsAsync();

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("createCampaign")]
        public async Task<IActionResult> CreateCampaign([FromBody] CampaignDTO campaignModel)
        {
            var response = await _campaignServices.createCampaignAsync(campaignModel);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut]
        [Route("updateCampaign")]
        public async Task<IActionResult> UpdateCampaign([FromBody] CampaignDTO updatedCampaignModel)
        {
            var response = await _campaignServices.updateCampaignAsync(updatedCampaignModel);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete]
        [Route("deleteCampaign")]
        public async Task<IActionResult> DeleteCampaign(int id)
        {
            var response = await _campaignServices.deleteCampaignAsync(id);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
