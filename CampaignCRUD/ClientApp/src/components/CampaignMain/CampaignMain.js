import React,{ useState,useEffect } from 'react'
import CampaignTR from '../CampaignTR/CampaignTR'
import CreateCampaign from '../CreateCampaign/CreateCampaign'
import DeleteCampaign from '../DeleteCampaign/DeleteCampaign';
import UpdateCampaign from '../UpdateCampaign/UpdateCampaign';
import './style.scss'
import {getCampaigns,deleteCampaign} from '../../api/CampaignRequests'

function CampaignMain() {

    const [isCreateDisplayed, setIsCreateDisplayed] = useState(false);
    const [isUpdateDisplayed, setIsUpdateDisplayed] = useState(false);
    const [isDeleteDisplayed, setIsDeleteDisplayed] = useState(false);
    const [updatedCampaignId, setUpdatedCampaignId] = useState(null);
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
        } catch (err) {
            // TODO if error
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
                        <CampaignTR isUpdateDisplayedTrigger={setIsUpdateDisplayed} isDeleteDisplayedTrigger={setIsDeleteDisplayed} idSetter={setUpdatedCampaignId}/>
                        <CampaignTR/>
                        <CampaignTR/>
                    </tbody>
                </table>
            </div>
        </div>  
        <CreateCampaign isShown={isCreateDisplayed} closeTrigger={setIsCreateDisplayed}/>  
        <UpdateCampaign isShown={isUpdateDisplayed} closeTrigger={setIsUpdateDisplayed}/>
        <DeleteCampaign isShown={isDeleteDisplayed} closeTrigger={setIsDeleteDisplayed}/>
    </div>
    )
}

export default CampaignMain
