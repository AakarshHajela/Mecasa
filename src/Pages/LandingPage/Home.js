import React from "react";
import Navbar from './Navbar';
import "./Home.css";

const Home = ({firebase,history}) => {
    return(
        <>
        <Navbar firebase={firebase} history={history} />
            
        <div className="App">
            <div style={{width:'100%',height:'85%',}}>
                <img alt="" style={{position:'absolute',height:'85%', width:'100%', zIndex:'-100'}} src="https://cdn.freshhomez.com/products/Admin/web/images/texture/43%20metallics%20dapple.jpg?strip=all&lossy=1&w=1920&ssl=1"/>
                <div style={{padding:'150px', zIndex:'500'}}>
                    <h2 style={{height:'80px'}}>LOREM IPSUM</h2>
                    <p style={{height:'80px'}}>Lorum ipsum dolor sit amet</p>
                    <button className="button">Explore</button>
                </div>
            </div>
            <div style={{width:'100%',height:'100%'}}>
                <div class="row">
                    <div style={{padding:'80px'}} class="column">
                        <img class="img" style={{height:'500px', width:'400px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                    </div>
                    <div style={{padding:'100px', paddingTop:'150px'}} class="column">
                        <h2 style={{height:'80px', width:'100%'}}>LOREM IPSUM DOLOR</h2>
                        <p style={{height:'80px', width:'100%'}}>Lorum ipsum dolor sit amet</p>
                    </div>
                </div>
                <div style={{marginLeft:'180px', height:'3px', width:'70%', backgroundColor:'grey', borderRadius:'20px'}}></div>
            </div>
            <div style={{width:'100%',height:'100%'}}>
            <div class="row">
                <div class="column1">
                    <img style={{height:'400px', width:'250px', margin:'20px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                    <img style={{height:'400px', width:'250px', margin:'20px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                    <img style={{height:'400px', width:'250px', margin:'20px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                </div>
                <div class="column2">
                    <h2 style={{height:'40px'}}>Services</h2>
                    <div style={{height:'3px', width:'90%', backgroundColor:'grey', borderRadius:'20px'}}></div>
                    <p style={{fontSize:'25px', padding:'40px'}}>Lorum Ipsum Dolor sit amet, consectetur adipiscing elit.</p>
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

export default Home;