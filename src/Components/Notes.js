import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import Logo from '../logo.svg';

function Notes({setCSECluster,setECECluster,setMECluster,setNotesLink,setBackToHome,NotesLink}) {

    const BackHome = () =>{
        setBackToHome(true)
        setNotesLink(false)
    }

    const GotoCSCluster=()=>{
        setCSECluster(true)
        setMECluster(false)
        setECECluster(false)
    }

    const GotoECECluster=()=>{
        setCSECluster(false)
        setMECluster(false)
        setECECluster(true)
    }

    const GotoMECluster=()=>{
        setCSECluster(false)
        setMECluster(true)
        setECECluster(false)
    }


    var SearchedSubject = useRef(null)

    const [SearchedRelatedPdf,setSearchedRelatedPdf] = useState([])
  
    const getSearchedSubject = (e) =>{

      setTimeout(()=>{

      },500)

      const sanitizedInput = e.target.value.replace(/[^A-Za-z0-9]/g, '');
  
      if(sanitizedInput.length){
  
            var searchTerm
  
            setSearchedRelatedPdf([])
  
    
            searchTerm = { SubjectName: sanitizedInput };
            
  
  
            axios.post("http://localhost:9000/api/GetPhysicsCycleSubjects", searchTerm)
            .then(response1 => {
              const physicsCycleData = response1.data;
      
              // Second API call for Chemistry Cycle
              setTimeout(() => {
                axios.post("http://localhost:9000/api/GetChemistryCycleSubjects", searchTerm)
                  .then(response2 => {
                    const chemistryCycleData = response2.data;
      
                    // Combine both API results
                    const combinedData = [...physicsCycleData, ...chemistryCycleData];
      
                    // Remove duplicates based on SubjectNumber
                    const uniqueData = _.uniqBy(combinedData, (item) => `${item.SubjectName}-${item.code}`);
                    
      
                  
                    setSearchedRelatedPdf(uniqueData);
                  })
                  .catch(err => {
                    console.error(err);
                  });
              }, 500); // Delay for Chemistry Cycle reques
  
                      
                  // 2-second delay
                  })
  
            .catch(err => {
              console.log(err);
            });
          }
          else
              setSearchedRelatedPdf([])
      
  }


  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])


  const ShowPdfDetails=(Pdf)=>{

      var Faculty = SelectedSubjectNumber.filter(SubjNumber=>SubjNumber === Pdf.SubjectNumber)
      
      if(Faculty.length === 0){
        setSelectedSubjectNumber([...SelectedSubjectNumber,Pdf.SubjectNumber])
      }

      
  }

  const DontShowPdfDetails = (Pdf)=>{

    var UpdateSelectedFaculty = SelectedSubjectNumber.filter(SubjNumber=>SubjNumber !== Pdf.SubjectNumber)
    setSelectedSubjectNumber(UpdateSelectedFaculty)
    
  }
  

const [rotatedPdfs, setRotatedPdfs] = useState({}); // Track rotated state for each PDF

const handleRotatePdf = (subjectNumber) => {
  setRotatedPdfs((prevRotatedPdfs) => ({
    ...prevRotatedPdfs,
    [subjectNumber]: true,  // Set the specific PDF to rotated
  }));

  // Reset the rotation after 300ms
  setTimeout(() => {
    setRotatedPdfs((prevRotatedPdfs) => ({
      ...prevRotatedPdfs,
      [subjectNumber]: false,  // Reset the specific PDF to non-rotated
    }));
  }, 300);
};



const GotoHome = () =>{

  setNotesLink(false)
  setCSECluster(false)
  setECECluster(false)
  setMECluster(false)
  setBackToHome(true)

}

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};


  return (

    <div className='flex flex-col min-h-screen bg-white gap-[25px]'>

       {/* Navbar */}
       <div className='bg-black w-full flex justify-between items-center px-4 md:px-20 py-6 '>
        <div className='flex items-center'>
          <img src={Logo} alt="Logo" className='h-[30px] md:h-[40px]' />
        </div>

        {/* Hamburger Icon for mobile and iPads */}
        <div className='lg:hidden flex'>
          <button onClick={toggleMenu} className='text-white text-3xl focus:outline-none'>
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i> {/* Toggling icon from "hamburger" to "close" */}
          </button>
        </div>

        {/* Links for larger screens & dropdown for smaller screens and iPads */}
        <div className={`flex-col lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute bg-zinc-950 w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0`}>
          <div
            onClick={GotoHome}
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Home
          </div>
         
         
        </div>
      </div>


      <div className="flex flex-row items-center justify-center mt-10 ">
      <input
        autoFocus
        ref={SearchedSubject}
        onKeyUp={getSearchedSubject}
       
        className="h-[40px] w-80 max-w-[500px] placeholder:text-[#20C030] border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#20C030] focus:border-transparent"
        placeholder="Search Your Subject"
      />
      
    </div>

    {SearchedRelatedPdf.length === 0?
      <div className="text-[#20C030] text-4xl font-instrument w-full text-center mt-10">
        Select the Cluster
      </div>
      :null
    }

      {SearchedRelatedPdf.length === 0 ? (
  <div className="flex flex-wrap justify-center gap-10 mt-10">
    {/* CS Cluster Card */}
    <div
      onClick={GotoCSCluster}
      className="flex flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[300px] w-80 sm:w-[250px] md:w-[300px] shadow-lg p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center text-white mt-2">CS Cluster</h1>
      <div className="text-center text-lg text-white">CSE</div>
      <div className="text-center text-lg text-white">CSE (IOT)</div>
      <div className="text-center text-lg text-white">CSE (DS)</div>
      <div className="text-center text-lg text-white">CSE (BS)</div>
      <div className="text-center text-lg text-white">AI/ML</div>
      <div className="text-center text-lg text-white">AI/DS</div>
    </div>

    {/* ECE Cluster Card */}
    <div
      onClick={GotoECECluster}
      className="flex flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[300px] w-80 sm:w-[250px] md:w-[300px] shadow-lg p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center text-white mt-2">EE Cluster</h1>
      <div className="text-center text-lg text-white">ECE</div>
      <div className="text-center text-lg text-white">EEE</div>
    </div>

    {/* ME Cluster Card */}
    <div
      onClick={GotoMECluster}
      className="flex flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[300px] w-80 sm:w-[250px] md:w-[300px] shadow-lg p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center text-white mt-2">Mech. Cluster</h1>
      <div className="text-center text-lg text-white">ME</div>
      <div className="text-center text-lg text-white">ASE</div>
      <div className="text-center text-lg text-white">CHEM</div>
      <div className="text-center text-lg text-white">IME</div>
    </div>
  </div>
) : (
  <div className="mt-5">

<div className="flex flex-col gap-4 border-2 bg-amber-100 rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto">
  <div className="flex flex-row justify-between text-black font-semibold">
    <div className="flex-1 text-center">Contents</div>

  </div>
</div>

{SearchedRelatedPdf.map((pdf) => (
  <div key={pdf.SubjectNumber} className="transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in-slide-up mt-2">
    <div className="flex flex-col gap-2 bg-slate-900 border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    {pdf.SubjectName}
  </div>
  
  {/* Container for Expand and Reduce Icons */}
  <div className="flex flex-col items-center flex-none">
    {/* Down Arrow (Expand) */}
    <i
      onClick={() => ShowPdfDetails(pdf)}
      className="bi bi-arrow-down-circle-fill text-3xl text-white cursor-pointer"
    ></i>
    <span className="text-white text-sm mt-1">Expand</span> {/* Added Expand label */}
  </div>

  <div className="flex flex-col items-center flex-none">
    {/* Up Arrow (Reduce) */}
    <i
      onClick={() => DontShowPdfDetails(pdf)}
      className="bi bi-arrow-up-circle-fill text-3xl text-white cursor-pointer"
    ></i>
    <span className="text-white text-sm mt-1">Reduce</span> {/* Added Reduce label */}
  </div>
</div>

{SelectedSubjectNumber.includes(pdf.SubjectNumber) && (
  <div className="flex flex-col gap-5 mt-2">
    {/* Header Row */}
    <div className="grid grid-cols-4 gap-2 bg-red-900 border-2 rounded-xl shadow-lg p-2 justify-between w-full">
      <div className="text-white text-center md:text-left">Module No.</div>
      <div className="text-white text-center md:text-left">Module Name</div>
      <div className="text-white text-center md:text-left">PDF Link</div>
      <div className="text-white text-center md:text-left">YouTube Link</div>
    </div>

    {/* Module Rows */}
    <div className="flex flex-col gap-2">
      {pdf.Modules.map((module) => (
        <div key={module.ModuleNum} className="grid grid-cols-4 gap-2 bg-amber-400 border-2 rounded-2xl shadow-lg p-2 w-full mx-auto">
          <div className="text-black text-center ml-4 md:text-left">{module.ModuleNum}</div>
          <div className="text-black text-center md:text-left">{module.ModuleName}</div>
          <div className="text-center md:text-left">
            {module.PdfLink.map((pdfLink, index) => (
              <a key={index} href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '25px' }}></i>
              </a>
            ))}
          </div>
          <div className="text-center md:text-left">
            <a href={module.YoutubeLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
              <i className="bi bi-youtube text-red-800" style={{ fontSize: '25px' }}></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
  </div>
))}


  </div>
)}

   
        <div className='mb-[100px]' ></div>
    </div>
  

  )
}

export default Notes