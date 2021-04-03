import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage,FieldArray } from 'formik';
import * as Yup from 'yup'
import { Typeahead } from 'react-bootstrap-typeahead';
import {getCampaign} from '../../api/CampaignRequests'

function UpdateCampaign(props) {

    const users = [];
    const [campaign,setCampaign] = useState(null);

    useEffect(() => {
        if(campaign == null && props.isShown) {
            getCampaignCall();
        }
    })

    const getCampaignCall = async () => {
        try {
            let response = await getCampaign(props.id);
            console.log(response);
            setCampaign(response.data.data);
        } catch (err) {
            // TODO if error
        }
    }

    if(campaign == null){
        return (
            <div style={{display : props.isShown ? 'block' : 'none'}}>Error</div>
        )
    }
    return (
        <div style={{display : props.isShown ? 'block' : 'none'}}>
        <div className="modal-dialog">
            <div className="modal-content">
                <Formik
                validateOnChange={false}
                validateOnBlur={false}               
                initialValues = {{                   
                    name : campaign.name,
                    keywords : campaign.keywords,
                    bidAmount : campaign.bidAmount,
                    campaignFund : campaign.campaignFund,
                    status : campaign.status,
                    town: campaign.town,
                    radius: campaign.radius,
                }}
                validationSchema = {Yup.object({
                    name : Yup.string()
                            .required('Name is mandatory'),
                    keywords : Yup.array()
                            .min(1,'Keyword is mandatory')
                            .required('Keyword is mandatory')
                            .of(
                                Yup.string()
                                .trim()
                                .required('Keyword cannot be empty')),
                    bidAmount : Yup.number()
                                .positive('The amount must me positive')
                                .required('Bid amount is mandatory'),
                    campaignFund : Yup.number()
                                    .positive('The amount must me positive')
                                    .required('Campaign fund is mandatory'),
                    status : Yup.string()
                                .required('Status is mandatory'),
                    town : Yup.string(),
                    radius : Yup.number()
                                .positive('The amount must me positive')
                                .required('Radius is mandatory')      
                })}

                onSubmit={async (values, {setStatus, resetForm }) => {
                    if(values.campaignFund < (props.accountBalance + campaign.campaignFund)){
                        let response = await props.updateCampaign(values,props.id)
                        if(response){
                            props.accountBalanceSet(props.accountBalance - (values.campaignFund - campaign.campaignFund ))
                            resetForm(true);
                            props.closeTrigger(false)
                        } else {
                            setStatus({message : "Something went wrong"})                           
                        }
                    } else {
                    setStatus({message : "Not enough balance on the account"})
                    }
                }}
                >
                    {({ errors,status,setFieldValue,setFieldTouched}) => (
                    <Form>
                        <div className="modal-header">						
                            <h4 className="modal-title">Edit Campaign</h4>
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
                                                            id={index}
                                                            multiple={false}
                                                            onChange={(selected) => {                                                               
                                                                setFieldValue(`keywords[${index}]`, selected);
                                                            }}
                                                            onInputChange={(text,event) => setFieldValue(`keywords[${index}]`, text)}
                                                            onBlur={(e) => setFieldTouched(`keywords[${index}]`, true)}
                                                            labelKey="fullname"
                                                            options={users} 
                                                            placeholder={keywords[index]}                                                     
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
                                <label>Bid amount ($)</label>
                                <Field type="number" name="bidAmount" className="form-control" />
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.bidAmount}</span>
                            </div>
                            <div className="form-group">
                                <label>Campaign fund ($)</label>
                                <Field type="number" name="campaignFund" className="form-control" /><span></span> 
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.campaignFund}</span>
                            </div>	
                            <div className="form-group">
                                <label>Status</label>
                                <Field as="select" name="status" type="text" className="form-control">
                                    <option value="On">On</option>
                                    <option value="Off">Off</option>
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
                                <label>Radius (km)</label>
                                <Field type="number" name="radius" className="form-control" />
                                <span style={{color : 'red',fontSize: '11px'}}>{errors.radius}</span>
                            </div>			
                        </div>
                        <div className="modal-footer" style={{display : 'flex',flexDirection : 'column'}}>
                            <span>
                            <button type="button" className="btn btn-default" onClick={() => props.closeTrigger(false)}>Cancel</button>
                            <Field type="submit" className="btn btn-success" value="Edit"/>
                            </span>
                            {status ? (
                            <span style={{color : 'red',fontSize: '11px'}}>{status.message}</span>
                            ) : null}
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
    )
}

export default UpdateCampaign
