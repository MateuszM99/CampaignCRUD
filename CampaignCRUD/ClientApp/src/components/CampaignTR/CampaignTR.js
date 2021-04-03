import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function CampaignTR(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.keywords != null ? props.keywords.map((keyword,index) => <p key={index}>{keyword},</p>) : null}</td>
            <td>{props.bidAmount}$</td>
            <td>{props.campaignFund}$</td>
            <td>{props.status}</td>
            <td>{props.town}</td>
            <td>{props.radius} km</td>
            <td>
                <EditIcon style={{marginRight : '3px',color : 'rgb(196, 172, 36)'}} onClick={() => {props.idSetter(props.id); props.isUpdateDisplayedTrigger(true);}}/>
                <DeleteIcon color="secondary" onClick={() => {props.isDeleteDisplayedTrigger(true); props.idSetter(props.id);}}/>
            </td>
        </tr>
    )
}

export default CampaignTR
