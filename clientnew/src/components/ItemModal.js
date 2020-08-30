import React from "react";

import{
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    
} from "reactstrap";
import {connect } from 'react-redux';
import {additem } from "../action/ItemActions";


import {v1 as uuid} from "uuid";

class ItemModal extends React.Component{
    state = {
        Modal: false,
        name: " "
    }

    toggle =()=>{
        this.setState({
            modal: !this.state.modal
        });
    }
    handelchange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e=>{
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        this.props.additem(newItem);
        this.toggle();

    }
    render(){
        return(
            <div>
                <Button 
                    color ="dark" 
                    style={{marginBottom:"2rem"}}
                    onClick={this.toggle}
                    >Add Item </Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>Add TO Shopping List</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="Item">Item</Label>
                                    <Input 
                                        type="text"
                                        name="name"
                                        id="item"
                                        placeholder="add shopping input"
                                        onChange={this.handelchange}
                                        />
                                    <Button 
                                        color="dark"
                                        style={{marginTop:"2rem"}}
                                        block >Add Item</Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
            </div>
        )
    }


}

const mapstatetoprops = state =>({
    // items:state.item
})
export default connect(mapstatetoprops,{additem})(ItemModal);