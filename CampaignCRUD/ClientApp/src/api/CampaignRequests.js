import axios from 'axios'

const baseUrl = 'https://localhost:44380/api';

export function getCampaigns() {
    return axios.get(`${baseUrl}/campaigns/getCampaigns`);
}

export function deleteCampaign(campaignId) {
    return axios.delete(`${baseUrl}/campaigns/deleteCampaign` + campaignId);
}

export function createCampaign(campaignModel) {
    return axios.post(`${baseUrl}/campaigns/createCampaign`, {name : campaignModel.name,keywords : campaignModel.keywords,bidAmount: campaignModel.bidAmount, campaignFund : campaignModel.campaignFund,status : campaignModel.status,town : campaignModel.town,radius : campaignModel.radius});
}

export function editCampaign(campaignModel) {
    return axios.post(`${baseUrl}/campaigns/updateCampaign`, campaignModel);
}
