import React from 'react';
import "./LandingPage.css"
import Navbar from "./Navbar"
import ModelViewer from "./ModelViewer";

const LandingPage = ({firebase, history}) => {
    const handleDirectHome = () => {
        history.push("/home");
    }

    const handleDirectAbout = () => {
        history.push("/about");
    }

    const handleDirectServices = () => {
        history.push("/services");
    }

    const handleDirectPortfolio = () => {
        history.push("/portfolio");
    }

    const handleOpen = () => {
            document.getElementById("doorA").classList.toggle("doorOpen");
    }

    const handleOpenb = () => {
        document.getElementById("doorB").classList.toggle("doorOpen");
    }

    const handleOpenc = () => {
        document.getElementById("doorC").classList.toggle("doorOpen");
    }

    const handleOpend = () => {
        document.getElementById("doorD").classList.toggle("doorOpen");
    }

    return(
        <>
        <Navbar firebase={firebase} history={history} />
        <ModelViewer scale="40" modelPath={"/Catalogue1.glb"} />
        {/* <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
            <div class="backDoor" onClick={handleDirectHome} onMouseEnter={handleOpen} onMouseLeave={handleOpen}>
                <h2 class="text2">ENTER</h2>
                <div id="doorA" class="door"> 
                    <img alt="" class="img" src="/door.png"/>
                    <h2 style={{marginLeft:'25px'}} className="text">HOME</h2> 
                </div>
            </div>
            <div class="backDoor" onClick={handleDirectAbout} onMouseEnter={handleOpenb} onMouseLeave={handleOpenb}>
                <h2 class="text2">ENTER</h2>
                <div id="doorB" class="door" >
                    <img alt="" class="img" src="/door.png"/> 
                    <h2 className="text" style={{marginLeft:'10px'}}>ABOUT US</h2> 
                </div>
            </div>
            <div class="backDoor" onClick={handleDirectServices} onMouseEnter={handleOpenc} onMouseLeave={handleOpenc}>
                <h2 class="text2">ENTER</h2>
                <div id="doorC" class="door" >
                    <img alt="" class="img" src="/door.png"/> 
                    <h2 className="text" style={{marginLeft:'10px'}}>SERVICES</h2> 
                </div>
            </div>
            <div class="backDoor" onClick={handleDirectPortfolio} onMouseEnter={handleOpend} onMouseLeave={handleOpend}>
                <h2 class="text2">ENTER</h2>
                <div id="doorD" class="door" >
                    <img alt="" class="img" src="/door.png"/> 
                    <h2 className="text">PORTFOLIO</h2> 
                </div>
            </div>
        </div> */}
        </>
    )
}

export default LandingPage;
