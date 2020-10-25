import React, { useEffect, useState } from 'react';
import { Layout, Card, ResourceList, Avatar, ResourceItem, TextStyle } from "@shopify/polaris"
import { db } from './firebase';

import Popup from 'reactjs-popup';
import EditUser from "./EditUser"

function List(props) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / 3); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastNews = currentPage * 3;
    const indexOfFirstNews = indexOfLastNews - 3;
    const currentTodos = data.slice(indexOfFirstNews, indexOfLastNews);

    useEffect(() => {
        db.ref(`user`).on("value", data1 => {
            let array = [];
            if (data1.val()) {
                data1.forEach(element => {
                    array.push({
                        id: element.key,
                        name: element.val().name,
                        email: element.val().email,
                        tel: element.val().tel,
                        address: element.val().address,
                        lat: element.val().lat,
                        lng: element.val().lng,
                    }); setData([...array]);
                })
            }
        });
    }, [])

    const chosePage = (event) => setCurrentPage(Number(event.target.id))

    const getURL = (lat, lng) => {
        let url = "https://maps.google.com/maps?q=" + lat.toString() + "," + lng.toString() + "&hl=es;z=14&amp&output=embed";
        return url;
    }

    const delUser = (id) => {
        db.ref(`user`).child(`${id}`).remove();
    }


    return (
        <Layout.Section>
            <Card>
                <ResourceList
                    resourceName={{ singular: 'customer', plural: 'customers' }}
                    items={[...currentTodos]}
                    renderItem={(item) => {
                        const { id, name, address, tel, email, lat, lng } = item;
                        const media = <Avatar customer size="medium" name={name} />;
                        return (
                            <ResourceItem
                                id={id}
                                // url={id}
                                media={media}
                                tel={tel}
                                email={email}
                                lat={lat}
                                lng={lng}
                                address={address}
                                accessibilityLabel={`View details for ${name}`}>
                                <h3> <TextStyle variation="strong">{name}</TextStyle></h3>
                                <div className="row">
                                    <div className="col">
                                        <p>{tel}</p>
                                        <p>{email}</p>
                                        <Popup trigger={<a href="#">{address}</a>}>
                                            <div>
                                                <iframe src={getURL(lat, lng)} width="600" height="450" title="abc" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                                            </div>
                                        </Popup>

                                    </div>
                                    <button className=" btn-danger" style={{ height: "fit-content" }} onClick={() => delUser(id)}>Del</button>
                                    <Popup trigger={<button className=" btn-warning" style={{ height: "fit-content" }} >Edit</button>}>
                                        <div style={{position:"relative", bottom:"20px", left:"225px"}}>
                                            <EditUser id={id} name={name} tel={tel} email={email} address={address} lat={lat} lng={lng}></EditUser>
                                        </div>
                                    </Popup>

                                </div>


                            </ResourceItem>
                        )
                    }}
                />
                <div className="pagination-custom">
                    <ul id="page-numbers">
                        {
                            pageNumbers.map(number => {
                                if (currentPage === number) {
                                    return (
                                        <li key={number} id={number} className="active">
                                            {number}
                                        </li>
                                    )
                                }
                                else {
                                    return (
                                        <li key={number} id={number} onClick={chosePage} >
                                            {number}
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </Card>
        </Layout.Section>
    );
}

export default List;