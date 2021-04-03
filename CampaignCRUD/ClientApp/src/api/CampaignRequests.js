import axios from 'axios'

const baseUrl = 'https://localhost:44380/api';

export function getCampaign(campaignId) {
    return axios.get(`${baseUrl}/campaigns/getCampaign?id=` + campaignId);
}

export function getCampaigns() {
    return axios.get(`${baseUrl}/campaigns/getCampaigns`);
}

export function deleteCampaign(campaignId) {
    return axios.delete(`${baseUrl}/campaigns/deleteCampaign?id=` + campaignId);
}

export function createCampaign(campaignModel) {
    return axios.post(`${baseUrl}/campaigns/createCampaign`, {name : campaignModel.name,keywords : campaignModel.keywords,bidAmount: campaignModel.bidAmount, campaignFund : campaignModel.campaignFund,status : campaignModel.status,town : campaignModel.town,radius : campaignModel.radius});
}

export function editCampaign(campaignModel,campaignId) {
    return axios.put(`${baseUrl}/campaigns/updateCampaign`, {id: campaignId,name : campaignModel.name,keywords : campaignModel.keywords,bidAmount: campaignModel.bidAmount, campaignFund : campaignModel.campaignFund,status : campaignModel.status,town : campaignModel.town,radius : campaignModel.radius});
}
