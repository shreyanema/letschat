import {useState, useEffect}  from 'react';
import {Image,Segment,FormField,Form,Header,Icon,Message,Input,Button,Grid,GridColumn,GridRow, FormGroup, ButtonGroup, Divider } from 'semantic-ui-react';

const Register = () => { 
    const [formvalues,setUser] = useState({ fname:"",lname:"",email:"",phone:"",password:"",cnf_password:""});
    const [formerrors,setUserErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [BackendResponse,SetBackendResponse] = useState();
    
    let inputName, inputValue;
    const handleInputs = (e) => {
    inputName = e.target.name;
    inputValue= e.target.value;
    setUser({...formvalues,[inputName]:inputValue});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
       // const {fname,lname,email,phone,password,cnf_password} = formvalues;
        setUserErrors(validate(formvalues));
        setIsSubmit(true);
        
          
    };


    useEffect(() => {
        console.log(formerrors);
        if(Object.keys(formerrors).length === 0 && isSubmit){
            const {fname,lname,email,phone,password,cnf_password} = formvalues;
                console.log(formvalues);
                fetch('/api/register',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : "application/json",
                    },
                    body: JSON.stringify({fname,lname,email,phone,password,cnf_password})
                })
                .then(response => response.json())
                .then(data => {
                   SetBackendResponse(data.message);
                   
                })
                .catch(error => {
                    console.error("Error:" ,error);
                
                });

        }
    },[formerrors]);
    return (
        <div className='formcontrol'>
        <Header as='h2' color='Grey' textAlign='center'>
            Register to Let'sChat 
            </Header>
        
        <Segment > 
            <Divider horizontal></Divider>
        <Form>  
              
                <Form.Group widths='equal'>
                <Form.Field
                    icon='user'
                    label='Enter First Name'
                    iconPosition = 'left'
                    control={Input}
                    placeholder='First Name'
                    name ="fname"
                    value={formvalues.fname} 
                    onChange={handleInputs} 
                    error ={formerrors.fname ? { content: formerrors.fname, pointing: 'above' } : null}
                />
        
                <Form.Input
                    icon='user'
                    label='Enter Last Name'
                    iconPosition = 'left'
                    control={Input}
                    placeholder='Last Name'
                    name ="lname"
                    value={formvalues.lname} 
                    onChange={handleInputs} 
                    error ={formerrors.lname ? { content: formerrors.lname, pointing: 'above' } : null}

                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    icon='mail'
                    label='Enter Email'
                    iconPosition = 'left'
                    control={Input}
                    type= 'email'
                    placeholder='Email'
                    name ="email"
                    value={formvalues.email} 
                    onChange={handleInputs} 
                    error ={formerrors.email ? { content: formerrors.email, pointing: 'above' } : null}

                />
                 <Form.Input
                    icon='phone'
                    label='Enter Phone Number'
                    iconPosition = 'left'
                    control={Input}
                    type='number'
                    placeholder='Phone Number'
                    name ="phone"
                    value={formvalues.phone} 
                    onChange={handleInputs} 
                    error ={formerrors.phone ? { content: formerrors.phone, pointing: 'above' } : null}

                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Input
                    icon='lock'
                    label='Enter Password'
                    iconPosition = 'left'
                    control={Input}
                    type= 'password'
                    placeholder='Password'
                    name ="password"
                    value={formvalues.password} 
                    onChange={handleInputs} 
                    error ={formerrors.password ? { content: formerrors.password, pointing: 'above' } : null}

                />
                 <Form.Input
                    icon='lock'
                    label='Re-Enter Password'
                    iconPosition = 'left'
                    control={Input}
                    type= 'password'
                    placeholder='Confirm Password'
                    name ="cnf_password"
                    value={formvalues.cnf_password} 
                    onChange={handleInputs} 
                    error ={formerrors.cnf_password ? { content: formerrors.cnf_password, pointing: 'above' } : null}

                />
               </Form.Group>
              
                </Form>
                <Divider horizontal></Divider>
              </Segment>     
              <ButtonGroup floated='right'>
                <Button content='Register' style={{color:'white', background:'teal'}} onClick={handleSubmit} />
                </ButtonGroup> 
    </div>
    )}

    const validate=(values) =>{
        const errors = {}
    
        //Name Validations
        const Nameregex = /^[A-Za-z]+$/;
        const Emailregex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    
        if (!values.fname){
            errors.fname = "First Name is required!";
        }
        else if(!Nameregex.test(values.fname)){
            errors.fname = "Enter valid Name!";
        }
        else if(values.fname.length > 15){
            errors.fname = "maxlength is 15";
        }
        else{
            console.log("name validated");
        }
    
        //Email Validations
        if(!values.email){
            errors.email = "Email is required!";
    
        }
        else if(!Emailregex.test(values.email)){
            errors.email = "Enter valid Email!";
        }
        else{
            console.log("email validated");
        }
    
        //number validation
    
        if (!values.phone){
            errors.phone = "Phone number is required!";
        }  
        else if(values.phone.length !== 10 ){
            errors.phone = "Enter a valid number";
        }
       
        //password validation
        if (!values.password){
            errors.password = "Password is required!";
        }  
        else if(values.password.length < 10){
            errors.password = "Password shoud be at least 10 characters";
        }
        
        //confirm password
    
        if(!values.cnf_password){
            errors.cnf_password = "please re-type password";
        }
        else if( values.cnf_password !== values.password){
            errors.cnf_password = "Password didn't match";
        }
       
    
        return errors
    };
    
export default Register;