import React from 'react';
import Navbar from "./Navbar";
import "./About.css";

const About = ({firebase, history}) => {
    return(
        <>
            <Navbar firebase={firebase} history={history}/>
            <div style={{height:'800px'}}>
                <div style={{height:'50px'}}></div>
                <div style={{height:'80px'}}>
                    <div style={{float:'right', width:'270px', backgroundColor:'black'}}></div>
                </div>
                <div style={{position:'absolute', width:'100%',height:'100%', justifyContent:'center', display:'flex'}}>
                    <div style={{backgroundColor:'black', width:'70px', marginTop:'375px', height:'250px'}}></div>
                    <div style={{width:'90%', display:'flex', flexDirection:'column'}}>
                        <div style={{width:'100%', backgroundColor:'lightgray', height:'700px', textAlign:'center', padding:'50px'}}>
                            <h2 style={{height:'30px', marginBottom:'30px'}}>About Us</h2>
                            <p style={{fontSize:'25px', margin:'50px'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sagittis risus. 
                            Vivamus blandit nisi nec hendrerit eleifend. Vestibulum pretium nibh sed tempor elementum. 
                            Etiam at odio molestie, posuere urna et, pharetra justo. Nam in aliquam diam. 
                            Pellentesque posuere dignissim nunc. Ut efficitur fringilla ex, sit amet mollis ipsum pulvinar sit amet. 
                            Duis vitae leo tellus. Nam ultrices facilisis leo, vitae lacinia turpis vulputate non. 
                            Donec urna lacus, interdum ac ipsum id, ullamcorper mattis justo. Phasellus vulputate dictum lorem, quis porttitor mauris ultricies nec. 
                            Nulla et mauris elementum ipsum commodo dictum in ut arcu. Praesent ac velit non sem rutrum consequat. 
                            Suspendisse posuere malesuada placerat. In tortor purus, pulvinar id lectus in, pellentesque posuere odio. Ut quis ullamcorper lacus.
                            </p>
                        </div>
                        <div style={{height:'100px', backgroundColor:'black', width:'200px'}}></div>
                    </div>
                    <div style={{backgroundColor:'black', width:'70px', height:'200px'}}></div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <img style={{height:'400px', width:'300px', margin:'20px', marginLeft:'100px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
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
                    <img style={{height:'400px', width:'300px', margin:'20px', marginLeft:'100px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <img style={{height:'400px', width:'300px', margin:'20px', marginLeft:'100px'}} alt="" src="https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"/>
                </div>
                <div class="column">
                    <p style={{padding:'100px', fontSize:'25px', textAlign:'center', paddingLeft: '50px'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sagittis risus. Vivamus blandit nisi nec hendrerit eleifend.
                    </p>
                </div>
            </div>
        </>
    )
}

export default About;