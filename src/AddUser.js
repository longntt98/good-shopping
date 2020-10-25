import React, { useState, useCallback } from 'react';
import { db } from "./firebase";
import { Button, FormLayout, TextField, Layout, Card, Form, Page } from '@shopify/polaris';

import Autocomplete from 'react-google-autocomplete';
import { GoogleMap } from 'react-google-maps';

import Map from "./Map"

function AddUser(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [address, setAddress] = useState("1 Nhà Chung, Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam");
    const [lat, setLat] = useState(21.0280735);
    const [lng, setLng] = useState(105.8502163);

    const handleNameChange = useCallback(value => setName(value), []);
    const handleEmailChange = useCallback(value => setEmail(value), []);
    const handleTelChange = useCallback(value => setTel(value), []);
    const handleAddressChange = useCallback(value => setAddress(value), []);

    const handleSubmit = (_event) => {
        if (name && email && tel && address) {
            db.ref(`user`).push({
                name: name,
                email: email,
                tel: tel,
                address: address,
                lat: lat,
                lng: lng,
            })
            alert("Lưu thành công");
            setName("");setEmail(""); setTel("")
        }
        else alert("Vui lòng điền đầy đủ thông tin")
    }

    const sendData  = (address, lat, lng) => {
        setAddress(address); setLat(lat); setLng(lng);
    }

    return (
        <Layout.Section secondary>
            <Form onSubmit={handleSubmit}>
                <Card sectioned >
                    <p className="text-center" style={{ fontSize: "25px", fontWeight: "bold" }}>Thêm mới thành viên</p><br></br>
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
                        
                    </FormLayout>
                    <Map
                            center={{ lat: 21.0280735, lng: 105.8502163 }}
                            height='300px'
                            zoom={15}
                            sendData={(address, lat, lng) => sendData(address, lat, lng)}
                        />
                        <hr></hr>
                        <hr></hr>
                        <hr></hr>
                        <Button  submit>Save</Button>
                </Card>
            </Form>
        </Layout.Section>


    );
}

export default AddUser;