import React from 'react'

function DeleteCampaign(props) {
    return (
    <div style={{display : props.isShown ? 'block' : 'none',visibility : props.isShown ? 'visible' : 'hidden'}} className="pop-up-container">
        <div className="modal-dialog">
            <div className="modal-content">               
                <div className="modal-header">						
                    <h4 className="modal-title">Delete Campaign</h4>
                    <button type="button" className="close" aria-hidden="true" onClick={() => props.closeTrigger(false)}>&times;</button>
                </div>
                <div className="modal-body">					
                    <p>Are you sure you want to delete this record?</p>
                    <p className="text-warning"><small>This action cannot be undone.</small></p>
                </div>
                <div className="modal-footer">
                    <input type="button" className="btn btn-default" value="Cancel" onClick={() => props.closeTrigger(false)}/>
                    <input type="submit" className="btn btn-danger" value="Delete" onClick={() => {props.deleteCampaign(props.id); props.closeTrigger(false);}}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DeleteCampaign
