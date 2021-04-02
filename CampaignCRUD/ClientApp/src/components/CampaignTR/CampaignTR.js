import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function CampaignTR(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.keywords}</td>
            <td>{props.bidAmount}</td>
            <td>{props.campaignFund}</td>
            <td>{props.status}</td>
            <td>{props.town}</td>
            <td>{props.radius}</td>
            <td>
                <EditIcon style={{marginRight : '3px',color : 'rgb(196, 172, 36)'}} onClick={() => {props.isUpdateDisplayedTrigger(true); props.idSetter("random");}}/>
                <DeleteIcon color="secondary" onClick={() => {props.isDeleteDisplayedTrigger(true); props.idSetter("random");}}/>
            </td>
        </tr>
    )
}

export default CampaignTR
