import React from 'react'
import { Formik, Form, Field, ErrorMessage,FieldArray } from 'formik';
import * as Yup from 'yup'

function CreateCampaign(props) {
    return (
    <div style={{display : props.isShown ? 'block' : 'none'}}>
        <div className="modal-dialog">
            <div className="modal-content">
                <Formik
                
                initialValues = {{                   
                    name : '',
                    keywords : [''],
                    bidAmount : '',
                    campaignFund : '',
                    status : '',
                    town: '',
                    radius: '',
                }}
                validationSchema = {Yup.object({
                      
                })}
                >
                    {({ errors, touched,isSubmitting,status,setFieldValue }) => (
                    <Form>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Employee</h4>
                            <button type="button" className="close" aria-hidden="true" onClick={() => props.closeTrigger(false)}>&times;</button>
                        </div>
                        <div className="modal-body">					
                            <div className="form-group">
                                <label>Name</label>
                                <Field type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Keywords</label>
                                <FieldArray name="keywords">
                                    {
                                        (fieldArrayProps) => {
                                            const {push,remove,form} = fieldArrayProps;
                                            const {values} = form;
                                            const {keywords} = values;
                                            return <div>
                                                {
                                                    keywords.map((keyword,index) => (
                                                        <div key={index} style={{position : 'relative'}}>
                                                            <Field name={`keywords[${index}]`} className="form-control" style={{marginTop: '10px'}}/>
                                                            {
                                                                index > 0 &&
                                                            <button type="button" className="close btn-absolute" onClick={() => remove(index)}>&times;</button>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                                <button onClick={() => push('')} type="button" className="btn btn-primary btn-sm" style={{marginTop : '10px'}}>Add keyword</button>
                                            </div>
                                        }
                                    }
                                </FieldArray>
                            </div>
                            <div className="form-group">
                                <label>Bid amount</label>
                                <Field type="number" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Campaign fund</label>
                                <Field type="number" className="form-control" />
                            </div>	
                            <div className="form-group">
                                <label>Status</label>
                                <Field as="select" type="text" className="form-control">
                                    <option>On</option>
                                    <option>Off</option>
                                </Field>
                            </div>
                            <div className="form-group">
                                <label>Town</label>
                                <Field as="select" type="text" className="form-control">
                                    <option>New York City</option>
                                    <option>Los Angeles</option>
                                    <option>Chicago</option>
                                    <option>Houston</option>
                                    <option>Phoenix</option>
                                    <option>Philadelphia</option>
                                    <option>San Antonio</option>
                                    <option>San Diego</option>
                                    <option>Dallas</option>
                                    <option>San Jose</option>
                                </Field>
                            </div>	
                            <div className="form-group">
                                <label>Radius</label>
                                <Field type="number" className="form-control" />
                            </div>			
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={() => props.closeTrigger(false)}>Cancel</button>
                            <Field type="submit" className="btn btn-success" value="Add"/>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
    )
}

export default CreateCampaign
