import {Image,Segment,MenuItem,Menu,Header,MenuMenu,Input,Button,Grid,GridColumn,GridRow } from 'semantic-ui-react';

const Navbar = () => {

return(
//session check 
    <div>
          <Menu secondary>
          <MenuItem header>Lets Chat</MenuItem>
          <MenuItem >Welcome Shreya!</MenuItem>
          <MenuMenu position='right'>
            <MenuItem
                name='Profile'
            
            />
            <MenuItem 
                name='find friends' 
            />
            <MenuItem>
              <Input icon='logout' floated  type='button'/>
            </MenuItem>
          </MenuMenu>
        </Menu>
   
    </div>
)
};


export default Navbar;