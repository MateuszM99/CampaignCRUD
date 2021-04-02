import React from 'react'
import { Formik, Form, Field, ErrorMessage,FieldArray } from 'formik';
import * as Yup from 'yup'
import { Typeahead } from 'react-bootstrap-typeahead';
import {createCampaign} from '../../api/CampaignRequests'

function CreateCampaign(props) {
    const users = [
        { id: 1, fullname: 'User #1' },
        { id: 2, fullname: 'User #2' },
        { id: 3, fullname: 'User #3' },
      ];

    return (
    <div style={{display : props.isShown ? 'block' : 'none'}}>
        <div className="modal-dialog">
            <div className="modal-content">
                <Formik               
                initialValues = {{                   
                    name : '',
                    keywords : [],
                    bidAmount : '',
                    campaignFund : '',
                    status : '',
                    town: '',
                    radius: '',
                }}
                validationSchema = {Yup.object({
                    name : Yup.string()
                            .required('Name is mandatory'),
                    keywords : Yup.array()
                            .min(1,'Keyword is mandatory')
                            .required('Keyword is mandatory'),
                    bidAmount : Yup.number()
                                .required('Bid amount is mandatory'),
                    campaignFund : Yup.number()
                                    .required('Campaign fund is mandatory'),
                    status : Yup.string()
                                .required('Status is mandatory'),
                    town : Yup.string(),
                    radius : Yup.number()
                                .required('Radius is mandatory')      
                })}

                onSubmit={(values, { setSubmitting, setStatus, resetForm }) => {
                    createCampaign(values)
                    .then(r => 
                        setStatus({ message: r.data.message }),
                        )
                }}
                >
                    {({ errors, touched,isSubmitting,status,setFieldValue,setFieldTouched}) => (
                    <Form>
                        <div className="modal-header">						
                            <h4 className="modal-title">Add Campaign</h4>
                            <button type="button" className="close" aria-hidden="true" onClick={() => props.closeTrigger(false)}>&times;</button>
                        </div>
                        <div className="modal-body">					
                            <div className="form-group">
                                <label>Name</label>
                                <Field type="text" name="name" className="form-control" />
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.name}</span>
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
                                                        <div key={index} style={{position : 'relative',marginTop:'10px'}}>
                                                            <Typeahead
                                                            multiple={false}
                                                            onChange={(selected) => {                                                               
                                                                setFieldValue(`keywords[${index}]`, selected);
                                                            }}
                                                            onInputChange={(text) => setFieldValue(`keywords[${index}]`, text)}
                                                            onBlur={(e) => setFieldTouched(`keywords[${index}]`, true)}
                                                            labelKey="fullname"
                                                            options={users}                                                       
                                                            />                                                       
                                                            {
                                                                index > 0 &&
                                                            <button type="button" className="close btn-absolute" onClick={() => remove(index)}>&times;</button>
                                                            }                                                           
                                                        </div>
                                                    ))
                                                }
                                                {keywords.length < 10 &&
                                                    <button onClick={() => push('')} type="button" className="btn btn-primary btn-sm" style={{marginTop : '10px'}}>Add keyword</button>
                                                }
                                            </div>
                                        }
                                    }
                                </FieldArray>
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.keywords}</span>
                            </div>
                            <div className="form-group">
                                <label>Bid amount</label>
                                <Field type="number" name="bidAmount" className="form-control" />
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.bidAmount}</span>
                            </div>
                            <div className="form-group">
                                <label>Campaign fund</label>
                                <Field type="number" name="campaignFund" className="form-control" />
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.campaignFund}</span>
                            </div>	
                            <div className="form-group">
                                <label>Status</label>
                                <Field as="select" name="status" type="text" className="form-control">
                                    <option>On</option>
                                    <option>Off</option>
                                </Field>
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.status}</span>
                            </div>
                            <div className="form-group">
                                <label>Town</label>
                                <Field as="select" name="town" type="text" className="form-control">
                                    <option></option>
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
                                <Field type="number" name="radius" className="form-control" />
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.radius}</span>
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
