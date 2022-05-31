import React from 'react';
import Navbar from './Navbar';
import FluidGrid from 'react-fluid-grid';
import { Card, Button } from 'react-bootstrap';
import "./Portfolio.css"

const Portfolio = ({firebase, history}) =>{
    return(
        <>
            <Navbar firebase={firebase} history={history}/>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <div style={{width:'90%', padding:'50px'}}>
                <div class="parent">
                    <div class="card">
                        <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        {/* <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p> */}
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                    <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <div class="card">
                        <img style={{width:'100%'}} src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                        <h4 style={{margin:'10px',}}>Lorem ipsum</h4>
                        <p style={{padding:'10px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio;