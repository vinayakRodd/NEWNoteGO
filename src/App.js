import logo from './logo.svg';
import './App.css';
import FrontPage from './Components/FrontPage';
import { useState } from 'react';
import Notes from './Components/Notes';
import CSCluster from './Components/CSCluster';
import MechCluster from './Components/MechCluster';
import ElectricalCluster from './Components/ElectricalCluster';

function App() {

  
  const [CSECluster,setCSECluster] = useState(false)
  const [ECECluster,setECECluster] = useState(false)
  const [MECluster,setMECluster] = useState(false)
  const [NotesLink,setNotesLink] = useState(false)
  const [BackToHome,setBackToHome] = useState(true)

  return (

    <div className="App"  >

      {!NotesLink && BackToHome?<FrontPage setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster} setBackToHome={setBackToHome}  setNotesLink={setNotesLink} />:
       CSECluster ? <CSCluster setBackToHome={setBackToHome}  setNotesLink={setNotesLink}  CSECluster={CSECluster} ECECluster={ECECluster} MECluster={MECluster} setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster} />:
        ECECluster? <ElectricalCluster setBackToHome={setBackToHome}  setNotesLink={setNotesLink} CSECluster={CSECluster} ECECluster={ECECluster} MECluster={MECluster} setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster}  />:
         MECluster? <MechCluster setBackToHome={setBackToHome}  setNotesLink={setNotesLink} CSECluster={CSECluster} ECECluster={ECECluster} MECluster={MECluster} setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster} />:
         <Notes setCSECluster={setCSECluster} setBackToHome={setBackToHome} NotesLink = {NotesLink}  setNotesLink={setNotesLink}  setECECluster={setECECluster}  setMECluster={setMECluster}  />
      }
    </div>
  );
}

export default App;
