import React,{ useState,useEffect } from 'react'
import CampaignTR from '../CampaignTR/CampaignTR'
import CreateCampaign from '../CreateCampaign/CreateCampaign'
import DeleteCampaign from '../DeleteCampaign/DeleteCampaign';
import UpdateCampaign from '../UpdateCampaign/UpdateCampaign';
import './style.scss'
import {getCampaigns,deleteCampaign,createCampaign,editCampaign} from '../../api/CampaignRequests'

function CampaignMain() {

    const [isCreateDisplayed, setIsCreateDisplayed] = useState(false);
    const [isUpdateDisplayed, setIsUpdateDisplayed] = useState(false);
    const [isDeleteDisplayed, setIsDeleteDisplayed] = useState(false);
    const [currentCampaignId, setCurrentCampaignId] = useState(null);
    const [campaigns,setCampaigns] = useState(null);

    useEffect(() => {
        if(campaigns == null) {
            getCampaignsCall();
        }
    }, [campaigns])

    const getCampaignsCall = async () => {
        try {
            let response = await getCampaigns();
            setCampaigns(response.data)
        } catch (err) {
            // TODO if error
        }
    }

    const deleteCampaignCall = async (campaignId) => {
        try {
            let response = await deleteCampaign(campaignId);
            setCampaigns(response.data)
        } catch (err) {
            // TODO if error
        }
    }

    const createCampaignCall = async (campaignModel) => {
        try{
            let response = await createCampaign(campaignModel);
            setCampaigns(response.data);
        } catch(err) {

        }
    }

    const editCampaignCall = async (campaignModel) => {
        try {
            let response = await editCampaign(campaignModel);
            setCampaigns(response.data);
        } catch (err) {

        }
    }

    return (
    <div className="container-xl">
        <div className="table-responsive">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage <b>Campaigns</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <a className="btn btn-success" onClick={() => setIsCreateDisplayed(true)}><span>Add New Campaign</span></a>                           						
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>                           
                            <th>Name</th>
                            <th>Keywords</th>
                            <th>Bid amount</th>
                            <th>Campaign fund</th>
                            <th>Status</th>
                            <th>Town</th>
                            <th>Radius</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns != null ?
                        campaigns.map(campaign =>
                            <CampaignTR isUpdateDisplayedTrigger={setIsUpdateDisplayed} isDeleteDisplayedTrigger={setIsUpdateDisplayed} idSetter={setCurrentCampaignId} id={campaign.id} name={campaign.name} keywords={campaign.keywords} bidAmount={campaign.bidAmount} campaignFund={campaign.campaignFund} status={campaign.status} town={campaign.town} radius={campaign.radius}/>
                            )
                            : null
                        }
                    </tbody>
                </table>
            </div>
        </div>  
        <CreateCampaign isShown={isCreateDisplayed} closeTrigger={setIsCreateDisplayed} createCampaign = {createCampaignCall}/>  
        <UpdateCampaign isShown={isUpdateDisplayed} closeTrigger={setIsUpdateDisplayed} updateCampaign = {editCampaignCall} id={currentCampaignId}/>
        <DeleteCampaign isShown={isDeleteDisplayed} closeTrigger={setIsDeleteDisplayed} deleteCampaign = {deleteCampaignCall} id={currentCampaignId}/>
    </div>
    )
}

export default CampaignMain
