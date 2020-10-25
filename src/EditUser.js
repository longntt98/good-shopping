import React, { useState, useCallback } from 'react';
import { db } from "./firebase";
import { Button, FormLayout, TextField, Layout, Card, Form } from '@shopify/polaris';


import Map from "./Map"

function EditUser(props) {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [tel, setTel] = useState(props.tel);
    const [address, setAddress] = useState(props.address);
    const [lat, setLat] = useState(props.lat);
    const [lng, setLng] = useState(props.lng);

    const handleNameChange = useCallback(value => setName(value), []);
    const handleEmailChange = useCallback(value => setEmail(value), []);
    const handleTelChange = useCallback(value => setTel(value), []);

    const handleSubmit = (event) => {
        if(name != "") db.ref(`user/${props.id}/name`).set(name);
        if(tel != "") db.ref(`user/${props.id}/tel`).set(tel);
        if(email != "") db.ref(`user/${props.id}/email`).set(email);
        if(address != props.address){
            db.ref(`user/${props.id}/address`).set(address);
            db.ref(`user/${props.id}/lat`).set(lat);
            db.ref(`user/${props.id}/lng`).set(lng);
        }
        alert("Lưu thành công"); 
    }

    const sendData = (address, lat, lng) => {
        setAddress(address); setLat(lat); setLng(lng);
    }

    return (
        <Layout.Section secondary>
            <Form onSubmit={handleSubmit}>
                <Card sectioned >
                    <p className="text-center" style={{ fontSize: "25px", fontWeight: "bold" }}>Thay đổi thông tin</p><br></br>
                    <FormLayout>
                        <TextField value={name}
                            type="text"
                            onChange={handleNameChange}
                            label="Name"
                            maxLength={25}>
                        </TextField>
                        <TextField value={email}
                            type='email'
                            onChange={handleEmailChange}
                            maxLength={50}
                            label="Email"
                            helpText="Vui lòng điền theo định dạng: abc@abc">
                        </TextField>
                        <TextField value={tel}
                            type="tel"
                            onChange={handleTelChange}
                            maxLength={12}
                            minLength={8}
                            pattern="[0-9]{8,12}"
                            helpText="Vui lòng điền theo định dạng: 123456789"
                            label="Tel">
                        </TextField>
                        {/* <TextField value={address}
                            type='text'
                            onChange={handleAddressChange}
                            maxLength={50}
                            label="Address">
                        </TextField> */}

                        <Map
                            center={{ lat: lat, lng: lng }}
                            height='300px'
                            zoom={15}
                            sendData={(address, lat, lng) => sendData(address, lat, lng)}
                        />
                        <hr></hr>
                        <hr></hr>
                        <hr></hr>
                        <Button submit>Save</Button>
                    </FormLayout>
                </Card>
            </Form>
        </Layout.Section>


    );
}

export default EditUser;