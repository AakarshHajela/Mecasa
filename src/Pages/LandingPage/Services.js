import React from 'react';
import Navbar from "./Navbar"
import "./About.css";
const Services = ({firebase, history}) => {
    return(
        <>
            <Navbar firebase={firebase} history={history}/>
            <div className="App">
                <div style={{width:'100%',height:'fit-content', display:'flex', justifyContent:'center', padding:'50px'}}>
                    <div style={{width:'80%', height:'100%', backgroundColor:'lightgray', textAlign:'center'}}>
                        <h2 style={{marginTop:'30px'}}>Services</h2>
                        <div class="row">
                            <div class="column">
                                <img style={{height:'300px', width:'300px', margin:'20px', marginLeft:'100px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                            </div>
                            <div class="column">
                                <p style={{padding:'100px', fontSize:'25px', textAlign:'center', paddingLeft: '50px'}}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sagittis risus. Vivamus blandit nisi nec hendrerit eleifend.
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="column">
                                    <p style={{padding:'100px', fontSize:'25px', textAlign:'center', paddingLeft: '50px'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sagittis risus. Vivamus blandit nisi nec hendrerit eleifend.
                                    </p>
                                </div>
                                <div class="column">
                                    <img style={{height:'300px', width:'300px', margin:'20px', marginLeft:'100px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="column">
                                <img style={{height:'300px', width:'300px', margin:'20px', marginLeft:'100px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                            </div>
                            <div class="column">
                                <p style={{padding:'100px', fontSize:'25px', textAlign:'center', paddingLeft: '50px'}}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sagittis risus. Vivamus blandit nisi nec hendrerit eleifend.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width:'100%',height:'100%', backgroundColor:'grey', padding:'50px'}}>
                <div style={{justifyContent:'center', display:'flex', height:'480px'}}>
                    <img style={{height:'400px', width:'250px', margin:'60px', marginTop:'30px', marginBottom:'10px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                    <img style={{height:'400px', width:'250px', margin:'60px', marginTop:'30px', marginBottom:'10px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                    <img style={{height:'400px', width:'250px', margin:'60px', marginTop:'30px', marginBottom:'10px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                </div>
                <div style={{justifyContent:'center', display:'flex'}}>
                    <button style={{height:'50px', width:'200px'}}>PORTFOLIO</button>
                </div>
            </div>
            </div>
        </>
    );
}

export default Services; 