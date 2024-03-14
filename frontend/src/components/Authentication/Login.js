import './Authentication.css';
import {useState, useEffect}  from 'react';
import {useNavigate} from "react-router-dom";
import {Image,Segment,Form,Header,Icon,Message,Input,Button,Grid,GridColumn,GridRow } from 'semantic-ui-react';
const Login = () => { 

    const [formvalues,setUser] = useState({ L_email:"", L_password:""});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formerrors,setUserErrors] = useState({});
    const [BackendResponse,SetBackendResponse] = useState();
    const navigate = useNavigate();
    let inputName, inputValue;
    const handleInputs = (e) => {
    inputName = e.target.name;
    inputValue= e.target.value;
    setUser({...formvalues,[inputName]:inputValue});
    };
    const L_handleSubmit = async(e) => {
        e.preventDefault();
       // const {fname,lname,email,phone,password,cnf_password} = formvalues;
        setUserErrors(L_validate(formvalues));
        setIsSubmit(true);
        
          
    };

    //send a form data to backend
useEffect(() => {
    console.log(formerrors);
    if(Object.keys(formerrors).length === 0 && isSubmit){
            const {L_email,L_password} = formvalues;
                console.log(L_email);
                console.log(L_password);
                fetch("api/login",{
                    method: 'POST',
                    headers: {
                        'Content-Type' : "application/json",
                    },
                    body: JSON.stringify({L_email,L_password})
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    SetBackendResponse(data.message);
                   
                    if(data.accesstoken){
                       const jwtToken =   data.accesstoken
                       navigate('/Welcome',{replace:true,state:{data}});
                       localStorage.setItem("jwtToken", jwtToken);
                    }
                })
                .catch(error => {
                    console.error("Error:" ,error);
                
                });
            

        }},[formerrors]);
    return (
        <div className='formcontrol'>
            <Header as='h2' color='Grey' textAlign='center'>
                Log-in to Let'sChat 
            </Header>
            <Segment textAlign='center'>
            <Form size='medium'>           
            
                    <Form.Input 
                        fluid 
                        icon='user' 
                        iconPosition='left' 
                        placeholder='E-mail address'
                        name ="L_email"
                        value={formvalues.L_email} 
                        onChange={handleInputs} 
                        error ={formerrors.L_email ? { content: formerrors.L_email, pointing: 'above' } : null}

                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        type='password'
                        control={Input}
                        placeholder='Enter Password'
                        name ="L_password"
                        value={formvalues.L_password} 
                        onChange={handleInputs} 
                        error ={formerrors.L_password ? { content: formerrors.L_password, pointing: 'above' } : null}

                    />

                    <Button 
                        content = "Login"
                        style={{color:'white', background:'teal'}}  
                        onClick={L_handleSubmit}
                    />
                         
            </Form>
            </Segment> 
            { BackendResponse ?
                <Message>
                    <Message.Header>
                    {BackendResponse}
                    </Message.Header>
                </Message> :
                <div></div>}    
        </div>
        
    )}
    const L_validate = (values) =>{
        const errors = {}
        if (!values.L_email){
            errors.L_email = "Please enter email";
        }
        if(!values.L_password){
            errors.L_password = "Please enter password";
        }
        return errors
    };
    

export default Login;