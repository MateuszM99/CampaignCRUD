import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { yellow } from '@material-ui/core/colors';

function CampaignTR(props) {
    return (
        <tr>
            <td>Name</td>
            <td>Keywords</td>
            <td>Bid amount</td>
            <td>Campaign fund</td>
            <td>Status</td>
            <td>Town</td>
            <td>Radius</td>
            <td>
                <EditIcon color="primary" style={{marginRight : '3px'}} onClick={() => {props.isUpdateDisplayedTrigger(true); props.idSetter("random");}}/>
                <DeleteIcon color="secondary" onClick={() => {props.isDeleteDisplayedTrigger(true); props.idSetter("random");}}/>
            </td>
        </tr>
    )
}

export default CampaignTR
