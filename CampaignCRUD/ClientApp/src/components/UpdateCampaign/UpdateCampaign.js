import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

function UpdateCampaign(props) {
    return (
    <div style={{display : props.isShown ? 'block' : 'none'}}>
        <div class="modal-dialog">
            <div class="modal-content">
                <Formik>
                    <Form>
                        <div class="modal-header">						
                            <h4 class="modal-title">Edit Employee</h4>
                            <button type="button" class="close" aria-hidden="true" onClick={() => props.closeTrigger(false)}>&times;</button>
                        </div>
                        <div class="modal-body">					
                            <div class="form-group">
                                <label>Name</label>
                                <Field type="text" class="form-control" required/>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" required/>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea class="form-control" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" class="form-control" required/>
                            </div>					
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                            <input type="submit" class="btn btn-success" value="Add"/>
                        </div>
                    </Form>
                </Formik>
            </div>
	    </div>
    </div>
    )
}

export default UpdateCampaign
