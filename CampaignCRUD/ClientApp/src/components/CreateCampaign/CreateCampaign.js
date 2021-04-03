import React from 'react'
import { Formik, Form, Field, ErrorMessage,FieldArray } from 'formik';
import * as Yup from 'yup'
import { Typeahead } from 'react-bootstrap-typeahead';
import {createCampaign} from '../../api/CampaignRequests'

function CreateCampaign(props) {

    const keywordsArray = [
        'market',
        'cooking',
        'music',
        'politics',
        'buisness',
        'life',
        'animals',
      ];

    return (
    <div style={{display : props.isShown ? 'block' : 'none',visibility : props.isShown ? 'visible' : 'hidden'}} className="pop-up-container">
        <div className="modal-dialog">
            <div className="modal-content">
                <Formik
                validateOnChange={false}
                validateOnBlur={false}               
                initialValues = {{                   
                    name : '',
                    keywords : [],
                    bidAmount : 200,
                    campaignFund : '',
                    status : 'On',
                    town: '',
                    radius: '',
                }}
                validationSchema = {Yup.object({
                    name : Yup.string()
                            .required('Name is mandatory'),
                    keywords : Yup.array()
                            .min(1,'Keyword is mandatory')
                            .required('Keyword is mandatory')
                            .of(
                                Yup.string()
                                .required('Keyword cannot be empty')),
                    bidAmount : Yup.number()
                                .moreThan(200,'The bid amount must me bigger than 200$')
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
                    if(values.campaignFund < props.accountBalance){
                        let response = await props.createCampaign(values)
                        if(response){
                            props.accountBalanceSet(props.accountBalance - values.campaignFund)
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
                    {({ errors,status,setFieldValue}) => (
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
                                                            id={index}
                                                            multiple={false}
                                                            onChange={(selected) => {                                                               
                                                                setFieldValue(`keywords[${index}]`,selected.toString());
                                                            }}
                                                            onInputChange={(text,event) => setFieldValue(`keywords[${index}]`, text)}
                                                            options={keywordsArray}                                                       
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
                                <label>Bid amount min.200$ ($)</label>
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
                            <span style={{display : 'flex',width: '100%',justifyContent : 'space-around'}}>
                            <button type="button" className="btn btn-default" onClick={() => props.closeTrigger(false)}>Cancel</button>
                            <Field type="submit" className="btn btn-primary" value="Add"/>
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

export default CreateCampaign
