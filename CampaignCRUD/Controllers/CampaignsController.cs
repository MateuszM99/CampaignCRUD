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
        public CampaignsController(CampaignContext appDb,ICampaignServices  campaignServices)
        {
            _appDb = appDb;
            _campaignServices = campaignServices;
        }

        public async Task<IActionResult> GetCampaigns()
        {
            return Ok();
        }
        public async Task<IActionResult> CreateCampaign([FromBody] CampaignDTO campaignModel)
        {
            
            var response = await _campaignServices.createCampaign(campaignModel);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);                   
        }
        public async Task<IActionResult> UpdateCampaign()
        {
            return Ok();
        }
        public async Task<IActionResult> DeleteCampaign()
        {
            return Ok();
        }
    }
}
