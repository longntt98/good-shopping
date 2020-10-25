import React from 'react';
import { Page, Layout } from "@shopify/polaris"

import './App.css';
import { db } from "./firebase";

import AddUser from './AddUser';
import List from "./List"
import Map from "./Map";

function App(props) {
	return (
	  <div>
	    <Page fullWidth>
	      <Layout>
	        <List></List>
	        <AddUser></AddUser>
	      </Layout>
	    </Page>
  
		<div className="dropdown button-add-playlist dropup">
                <button className="dropup-toggle fa fa-plus" type="button" id="dropdownMenuButton" style={{ color: "#ffc107", backgroundColor: "transparent", border: "none" }} data-toggle="dropdown" ></button>
                <div className="dropdown-menu" style={{ width: "350px", left: "-295px" }}>
                    <form className="text-center create-playlist-table">
                        <h3>Thêm mới Video</h3>
                        <div className="form-group ">
                            <label>Link video </label>
                            
                            <div className="dropdown-divider"></div>
                            <input type="reset"  className="btn btn-primary btn-lg btn-block " value="Thêm Video" />
                        </div>
                    </form>
                </div>
            </div>
	  </div>
	);
  }

export default App;
