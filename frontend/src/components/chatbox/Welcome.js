import {Image,Segment,MenuItem,Menu,Header,MenuMenu,Input,Button,Grid,GridColumn,GridRow } from 'semantic-ui-react';
import Navbar from "./Navbar.js";

const Welcome = () => {

//session check 
return(
    <div>
    <Navbar/>
    <Grid stretched>
      
    <GridColumn width={5}>
    <Segment>My Friends</Segment>
    </GridColumn>
    <GridColumn width={11}>
    <Segment>Chats</Segment>
    </GridColumn>
    
  </Grid>
  </div>
)
    
    

}

export default Welcome;