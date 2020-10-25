import React from 'react';
import { Page, Layout } from "@shopify/polaris"
import './App.css';
import AddUser from './AddUser';
import List from "./List"

function App(props) {
	return (
	  <div>


	    <Page fullWidth>
	      <Layout>
	        <List></List>
	        <AddUser></AddUser>
	      </Layout>
	    </Page>

      
  </div>
  
  )
  }

export default App;
