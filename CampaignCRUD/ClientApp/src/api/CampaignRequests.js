import axios from 'axios'

const baseUrl = 'https://localhost:44380';

export function getCampaigns() {
    return axios.get(`${baseUrl}/campaigns/getCampaigns/`);
}

export function deleteCampaign(campaignId) {
    return axios.delete(`${baseUrl}/campaigns/deleteCampaign/` + campaignId);
}

export function createCampaign(campaignModel) {
    return axios.post(`${baseUrl}/campaigns/createCampaign/`, campaignModel);
}

export function editCampaign(campaignModel) {
    return axios.post(`${baseUrl}/campaigns/updateCampaign/`, campaignModel);
}
