import React from 'react';
//import logo from './logo.svg';
import PropTypes from 'prop-types';
import './App.css';
import {Route, BrowserRouter} from "react-router-dom";
import {Fade} from 'react-slideshow-image'
import TypeWriter from 'typewriter-effect'
import Zoom from 'react-reveal/Zoom';
//import Axios from 'axios'


// Home Image Folder
import firstImage from "../src/images/gameSite/game_image_one.jpg";
import secondImage from "../src/images/gameSite/game_alternative.jpeg"
import thirdImage from "../src/images/gameSite/game_image_alternative.jpg";
import fourthImage from "../src/images/gameSite/game_image_four.jpeg";

// FIFA 20 images
import fifaimage00 from "../src/images/gameSite/fifa20size.jpeg";
import fifaimage01 from "../src/images/gameSite/fifa20sizetwo.jpeg";
import fifaimage02 from "../src/images/gameSite/fifa20bigsize.jpeg";

// Game display profiles
// import winner from "../src/images/gameDisplay/winner.jpg";

const fadeImages=[
  fourthImage,
  firstImage,
  secondImage,
  thirdImage
]

class App extends React.Component{
  constructor(props){
    super(props);
    this.mediaQuery ={
      desktop:1200,
      tablet:768,
      phone:576
    }

    this.state = {
      menuOpen:false,
      hover:false,
      left:0,
      color:'blue',
      duration:300,
      value:'',
      windowWith:null
  }

  this.handleHoverClick= this.handleHoverClick.bind(this);
}

  componentDidMount(){
    window.addEventListener('resize',()=>{
      this.setState({windowWith:document.body.clientWidth})
    })
  }

  handleHoverClick(){
    this.setState({hover:!this.state.hover});
  }

  handleMenuClick(){
    this.setState({menuOpen:!this.state.menuOpen});
  }

  handleLinkClick() {
    this.setState({menuOpen: false});
  }
  

  render(){
    const styles = {
      container:{
        
        position:'absolute',
        top:0,
        left:0,
        zIndex: '99',
          opacity: 0.9,
          display:'flex',
          alignItems:'center',
          background: 'purple',
          width: '100%',
          color: 'teal',
          fontFamily:'Lobster',
      },
      logo: {
        margin: '0 auto',
        color:'white',
        fontSize:29,
      },
      body: {
        width:this.state.windowWith > this.mediaQuery.phone ? '50%' : '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        filter: this.state.menuOpen ? 'blur(2px)':null,
        transition: 'filter 0.5s ease',
        
      },
      main_content:{
        position:'absolute',
        background:'white',
        alignItems:'center',
        width:'100%',
      },
      decorating_a:{
        textDecoration:'none',color:'white', fontFamily:`'Open Sans', sans-serif`,
        fontSize: '1.2rem',
        
      }
    }

    const menu = ['About Us','Updated News','Winner','Game Tournament','Reach Us']
    const menuItems = menu.map((val,index)=>{
      return (
        <MenuItem
          key={index}
          delay={`${index * 0.1}s`}
          
          onClick={()=>{this.handleLinkClick();}}>
          <a style={styles.decorating_a} href={val}>{val}</a>.</MenuItem>
        
        )

    });

    

    return(
      <div>
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
          <div style={styles.logo}>KOJA GAMING ARENA</div>
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
        <div style={styles.body}>
          <div style={styles.main_content} class="main_content">
            <Routes  />          
          </div>
        </div>
      </div>
    )
  }
}


const Routes = () =>(
  <BrowserRouter>
      <Route path="/" component={Slideshow}/>
      <Route path="/About Us" component={AboutUs} />
      <Route path="/Updated News" component={gameInformation} />
      <Route path="/Game Tournament" component={gameSquad} />
      <Route path="/Winner" component={gameUpdate} />
      <Route path="/Reach Us" component={ReachUs} />

    </BrowserRouter>
);

// Menu Item
class MenuItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hover:false,
    }
  }
  handleHover(){
    this.setState({hover:!this.state.hover});
  }
  render(){
    const styles={
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay:this.props.delay,
      },
      menuItem:{
        fontFamily:`'Open Sans', sans-serif`,
        fontSize: '1.2rem',
        padding: '1rem 0',
        margin: '0 5%',
        cursor: 'pointer',
        color: this.state.hover? 'red':'#fafafa',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay:this.props.delay,

      },
      line: {
        width: '90%',
        height: '1px',
        background: 'gray',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay:this.props.delay,
      },
    }
    return(
      <div style={styles.container}>
        <div
          style={styles.menuItem}
          onMouseEnter={()=>{this.handleHover();}}
          onMouseLeave={()=>{this.handleHover();}}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
      <div style={styles.line}/>
    </div>
    )
  }
}

/* Menu.jsx */
class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }

  render(){
    const styles={
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.state.open? '100%': 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: 'black',
        opacity: 0.95,
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
      },
      menuList: {
        paddingTop: '3rem',
      }
    }
    return(
      <div style={styles.container}>
        {
          this.state.open?
            <div style={styles.menuList}>
              {this.props.children}
            </div>:null
        }
      </div>
    )
  }
}

// Menu Button
class MenuButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
      color: this.props.color? this.props.color:'black',
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }

  handleClick(){
  this.setState({open:!this.state.open});
  }

  render(){
    const styles = {
      container: {
        height: '32px',
        width: '32px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
      },
      line: {
        height: '2px',
        width: '20px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
      },
      lineMiddle: {
        opacity: this.state.open ? 0: 1,
        transform: this.state.open ? 'translateX(-16px)':'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '5px',
      },
    }
    return(
      <div style={styles.container}
        onClick={this.props.onClick ? this.props.onClick:
          ()=> {this.handleClick();}}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
  }
}

// Footer Area
function Footer(props) {
  const styles = {
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginTop: '1rem',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      color: props.color,
      backgroundColor:'yellow'
    },
    line: {
      height:'1px',
      width:'90%',
      background: props.color,
    },
    text: {
      padding: '0.5rem',
    }
  }

  return (
    <div style={styles.footer}>
      <div style={styles.line}>
      </div>
      <div style={styles.text}>{props.title} created by DrVicked &copy; 2020
      </div>
    </div>
  )
}

Footer.defaultProps = {
  color: 'teal',
  title: 'TGW!'
}

Footer.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
}

const AboutUs = ()=>{
     
    return (
      <div style={{ backgroundColor:'black', width:'100%', margin:'auto'}}>
        <Zoom>
          <div style={{textAlign:"center"}}> <h2 style={{color:'purple', fontSize:'40px', fontFamily:'Garamond'}}>ABOUT US</h2></div> 
                    
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'30px', fontFamily:'Garamond'}} >RUN console competition commitee!</p>
              <div style={{color:'white', fontSize:'30px', fontFamily:'Garamond'}}>
                <TypeWriter 
                options = {{
                  strings:['We host game tournament live on Redeemers soil in Manna Palace.','We are very active and creative in games.','We offer trust to all competitors.'],
                  autoStart:true,
                  loop:true
                }}
                >
                </TypeWriter>
              </div>
                
              <div style={{textAlign:'center', background:'purple'}}>
                <div style={{width:"100%", fontFamily:"Garamond", fontSize:"16px"}}>Copyright &copy; 2020  All rights reserved | Developed and made with love from Koja Gaming Community </div>
              </div>
            </div>     
          </Zoom>
         
          </div>
    )
  }
  

const gameInformation = ()=>(
  <div style={{ backgroundColor:'black', width:'100%', margin:'auto'}}>
    <Zoom>
      <div style={{textAlign:'center'}}>
      <h2 style={{color:'purple', fontSize:'40px', fontFamily:'Garamond' }}>LIVE NEWS</h2>
      </div>
      <div style={{textAlign:'center'}}>
      <p style={{fontSize:'30px', fontFamily:'Garamond'}}>This is what is going on!</p>
      <div style={{color:'white', fontSize:'30px', fontFamily:'Garamond'}}>
                <TypeWriter 
                options = {{
                  strings:['Get intrested in knowing the latest!','Check out what is going on.','We refer you to other links also.'],
                  autoStart:true,
                  loop:true
                }}
                >
                </TypeWriter>
              </div>
      </div>
      <div style={{textAlign:'center',margin:'auto', width:'100%', color:'purple'}}>
        <ul style={{color:'gold'}}>
          
          <li style={{listStyle:'none'}}><a style={{textDecoration:'none',color:'gold',font:'Garamond',fontSize:'18px'}} href="https://www.gamespot.com/videos/doom-eternal-is-metal-as-fk/2300-6452010/">The inside of DOOM eternal CREDIT GAMESPOT</a></li>
          <li style={{listStyle:'none'}}><a style={{textDecoration:'none',color:'gold',font:'Garamond',fontSize:'18px'}} href="https://nordic.ign.com/daemonhatfield/32983/news/game-scoop-562-our-most-anticipated-2020-release-dates">List of anticipated games this year CREDIT IGN</a> </li>
          <li style={{listStyle:'none'}}><a style={{textDecoration:'none',color:'gold',font:'Garamond',fontSize:'18px'}} href="https://za.ign.com/dying-light-2/141053/news/dying-light-2-delayed-with-no-new-release-date">Dying light 2 delayed CREDIT IGN</a></li>
          <li style={{listStyle:'none'}}><a style={{textDecoration:'none',color:'gold',font:'Garamond',fontSize:'18px'}} href="https://www.gamespot.com/articles/top-new-games-releasing-on-switch-ps4-xbox-one-and/1100-6472860/">TOP GAMES RELEASE ON DIFFERENT CONSOLE CREDIT GAMESPOT</a> </li>
          <li style={{listStyle:'none'}}><a style={{textDecoration:'none',color:'gold',font:'Garamond',fontSize:'18px'}} href="https://www.gamespot.com/articles/ps5-game-godfall-extended-gameplay-video-leaks/1100-6472889/">PS 5 Godfall extended gameplay video leaks CREDIT GAMESPOT</a> </li>
          <li style={{listStyle:'none'}}><a style={{textDecoration:'none',color:'gold',font:'Garamond',fontSize:'18px'}} href="https://za.ign.com/the-legend-of-zelda-hd-158649/141048/news/dads-home-made-xbox-controller-lets-daughter-play-zelda-breath-of-the-wild">XBOX Controller on zelda breath of the wild CREDIT IGN</a></li>
        </ul>
      </div>
      <div style={{textAlign:'center', background:'purple'}}>
         <div style={{width:"100%", fontFamily:"Garamond", fontSize:"16px"}}>Copyright &copy; 2020  All rights reserved | Developed and made with love from Koja Gaming Community</div>
      </div>
    </Zoom>
  </div>
)


class gameSquad extends React.Component{
  constructor(props){
    super(props);
    this.state = {lastname:'',firstname:'',username:"",address:'',number:'',origin:'',message:'Successfully registered'
  };
    
   this.handleAddress = this.handleAddress.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
   this.handleFirstname = this.handleFirstname.bind(this)
   this.handleLastname = this.handleLastname.bind(this)
   this.handleUsername = this.handleUsername.bind(this)
   this.handleNumber = this.handleNumber.bind(this)
   this.handleOrigin = this.handleOrigin.bind(this)
  }

  // Origin value
  handleOrigin=(event)=>{
    this.setState({origin:event.target.value})
  }

  // Lastname value
  handleLastname(event){
    this.setState({lastname:event.target.value})
  }

  // Firstname value
  handleFirstname(event){
    this.setState({firstname:event.target.value})
  }

  // Username value
  handleUsername(event){
    this.setState({ username:event.target.value})
  }

  // Address value
  handleAddress(event){
    this.setState({ address:event.target.value})
  }

  // Number value
  handleNumber(event){
    this.setState({ number:event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
//    alert(' Your username was submitted '+ this.state.username + "NUMBER"+ this.state.number);
    fetch('https://sunshinegame.herokuapp.com/competitor/user',{
      method:"POST",
      body: JSON.stringify({"lastname":this.state.lastname,
                            "firstname":this.state.firstname,
                            "username":this.state.username,
                            "whatsApp":this.state.number,
                            "address":this.state.address,
                            "origin":this.state.origin
      }),
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
      }
    })
    .then(res => {
      console.log(res.status)
    if (res.status === 400){
      alert('Nickname taken, Fill the form appropriately')
    }
    else{
      alert('Competitor registered!!')
    }
    }).catch(err=> {console.log(err)})
  }

  render(){
    return(
      <div style={{ backgroundColor:'black', width:'100%', margin:'auto'}}>
      
      <Zoom>
        <div style={{textAlign:'center'}}>
          <h2 style={{color:'purple', fontSize:'40px', fontFamily:'Garamond'}}>Game Time</h2>
          </div>
          <div style={{textAlign:'center',margin:'auto', width:'100%'}}>
            <div style={{height:'100%',width:'100%',background:'purple', margin:'auto'}}>
              <p style={{fontSize:'30px', color:'black',fontFamily:'Garamond'}}> TGW Presents everyone for FIFA 20 battle</p>
              <div style={{color:'white', fontSize:'30px', fontFamily:'Garamond'}}>
                <TypeWriter 
                    options = {{
                      strings:['To become a god in fifa you will need to register for this tournament. The procedures will be sent to the phone number you applied with.','The tournament is will hold on February and deadline will be passed across soon. The three winners stand a chance to get a prize.','Registration fee for FIFA 20 tournament is N2500.'],
                      autoStart:true,
                      loop:true,
                  
                    }}
                    >
                    </TypeWriter>
    
              </div>
                    <form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                      <div style={{width:'100%'}}>
                        <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'40%' ,textAlign:'center'}} type="text" name="lastname" onChange={this.handleLastname} placeholder="Last Name" required></input>
                        <input style={{marginRight:'22px', borderRadius:'5px', fontSize:'20px',width:'40%' ,textAlign:'center'}} placeholder="First Name" type="text" name="firstname" onChange={this.handleFirstname} required></input>
                      </div>
                    
                    <div style={{width:'100%'}}>
                      <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'40%', textAlign:'center' }} type="text" name="username" onChange={this.handleUsername} placeholder="Nickname" required></input>
                      <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'40%' , textAlign:'center'}} type="text" name="number" onChange={this.handleNumber} placeholder="WhatsApp Number" required></input>
                    </div>

                    <div style={{width:'100%'}}>
                      <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'40%' , textAlign:'center'}} type="text" name="address" onChange={this.handleAddress} placeholder="Block Room"  required></input>
                      <input style={{marginRight:'22px',borderRadius:'5px', fontSize:'20px',width:'40%' , textAlign:'center'}} type="text" name="origin" onChange={this.handleOrigin} placeholder="Department" required></input>
                    </div>
                    
                    <div style={{width:'100%',padding:'10px'}}>
                      <button style={{borderRadius:"30px",fontSize:'20px',width:'40%',background:'black' ,textAlign:'center', color:'white'}} onClick={this.handleSubmit}>GET READY</button>
                    </div>
                    </form>
            </div>
          </div>
    
        <div style={{textAlign:'center'}}>
            <img style={{width:'50%'}} src={fifaimage00} alt="fifa 20 status 0" />
            <img style={{width:'50%' }} src={fifaimage01} alt="fifa 20 status 1"></img>
            <img style={{width:'100%'}} src={fifaimage02} alt="fifa 20 status 2"></img>
         </div>
      </Zoom>
    
    
    </div>
    )
  }

}

const gameUpdate =()=>(
  <div style={{ backgroundColor:'black', width:'100%', margin:'auto'}}>
  <Zoom>
    <div style={{textAlign:'center'}}>
      <h2 style={{color:'purple', fontSize:'40px', fontFamily:'Garamond'}}>Winner of FIFA 20</h2>
    </div>
      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'30px', fontFamily:'Garamond'}}>The winner will be displayed here!</p>
        <div style={{color:'white', fontSize:'30px', fontFamily:'Garamond'}}>
                <TypeWriter 
                options = {{
                  strings:['We dont have a winner yet!'],
                  autoStart:true,
                  loop:true
                }}
                >
                </TypeWriter>
              </div>
        </div>
        <div style={{width:'60%', margin:'auto',background:"white",color:"purple",display:'flex'}}>
          {/* <img style={{width:'50%',alignItems:'center',display:'block',marginLeft:'auto',marginRight:"auto"}} src={winner} alt="fifa 20 winner" /> */}
         </div>
          <div style={{textAlign:'center', background:'purple'}}>
                <div style={{width:"100%", fontFamily:"Garamond", fontSize:"16px"}}>Copyright &copy; 2020  All rights reserved | Developed and made with love from Koja Gaming Community </div>
          </div>
  </Zoom>
</div>
)


const ReachUs =()=>(
  <div style={{ backgroundColor:'black', width:'100%', margin:'auto'}} >
    <Zoom>
      <div style={{textAlign:'center'}}>
        <h2 style={{color:'purple', fontSize:'40px', fontFamily:'Garamond'}}>Contact Us</h2>
        </div>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'30px', fontFamily:'Garamond'}}>Chat with Us On WhatsApp!</p>
          <div style={{color:'white', fontSize:'30px', fontFamily:'Garamond'}}>
                <TypeWriter 
                options = {{
                  strings:['This is one of our numbers, 08155225913, Kelvin by name.','Please state your name then proceed with the details.','Feel free to communicate on WhatsApp we will be glad to respond to everyone online.','Koja Gaming Community appreciates everyone for their interest.'],
                  autoStart:true,
                  loop:true
                }}
                >
                </TypeWriter>
              </div>
        </div>
        <div style={{textAlign:'center', background:'purple'}}>
                <div style={{width:"100%", fontFamily:"Garamond", fontSize:"16px"}}>Copyright &copy; 2020  All rights reserved | Developed and made with love from Koja Gaming Community </div>
        </div>
    </Zoom>
  </div>
)


const fadeProperties = {
  duration:5000,
  transitionDuration: 1000,
  infinite: false,
  indicators: true,
  onchange: (oldIndex, newIndex) =>{
    console.log(`fade transition from ${oldIndex} to ${newIndex}`)
  }
}
const Slideshow = () => {
  return (
    <div style={{width:'100%',}}>
      <Fade {...fadeProperties}>
        <div style={{display:'flex'}}>
          <div style={{width:'100%', overflow:'hidden'}}>
            <img style={{height:"724px",width:'100%'}} src={fadeImages[0]} alt="Game Video" />
          </div>

        </div>
        <div style={{display:'flex'}}>
          <div style={{width:'100%', overflow:'hidden'}}>
            <img style={{height:"725px",width:'100%'}} src={fadeImages[1]} alt="Game Competition" />
          </div>

        </div>
        <div style={{display:'flex'}}>
          <div style={{width:'100%', overflow:'hidden'}}>
            <img style={{height:"725px",width:'100%'}} src={fadeImages[2]} alt="Game Technology" />
          </div>

        </div>
        <div className="each-fade">
          <div style={{width:'100%', overflow:'hidden'}}>
            <img style={{height:"725px",width:'100%'}} src={fadeImages[3]} alt="Game Boy"/>
          </div>

        </div>
      </Fade>
    </div>
  )
}

export default App;
// export default MenuItem;
// export default Menu;
// export default MenuButton;
// export default footer;