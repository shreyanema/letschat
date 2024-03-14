import { useState }  from 'react';
//import {useNavigate} from "react-router-dom";
import {Image,Segment,Form,Header,Icon,Message,Input,Button,Grid,GridColumn,GridRow } from 'semantic-ui-react';
import communicationimage from "./asset/communication_image.jpg";
import Login from "./Login.js";
import Register from "./Register";
import "./Authentication.css";
const Authentication = () => {
    const [action,setAction] = useState("Login");
    return (

        <div >   
            <Grid className="container" centered columns={2}> 
                <GridRow>
                    <GridColumn width={8} >
                    { action==="Login" ?
                    <Login/>
                     : 
                     <div className='ImageContainer'><Image src={communicationimage}  fluid/>
                     <div className="centered">
                            Already Registered ? <Button onClick={()=>{setAction("Login")}}>Login </Button>
                            
                       </div>
                    </div> 
                    }
            
                    </GridColumn>
                    <GridColumn width={8}>
                    { action==="Register" ?
                     <Register/>:
                     <div className='ImageContainer'><Image src={communicationimage}  fluid/>
                     <div class="centered">
                     
                        New to us? <Button onClick={()=>{setAction("Register")}}>Register </Button>
                       </div>
                    </div> 
                    }

                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
      


)};




export default Authentication
