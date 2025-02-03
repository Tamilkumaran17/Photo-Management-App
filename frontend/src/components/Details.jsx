import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/Details.css';
import Confrim from "./ConfrimPage";
import { FaCocktail, FaBaby, FaTimes } from 'react-icons/fa';
import axios from 'axios'
import { toast } from "react-toastify";
import { update } from "../redux/PhotoSlice";



const Details = () => {
    const { id } = useParams();
    const photos = useSelector((state) => state.photos.photos);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [isDelete,setDelete] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState();
    const [newDes, setNewDes] = useState();
    
    const parsedId = parseInt(id, 10);
    const [currentIdx, setCurrentIdx] = useState(isNaN(parsedId) || parsedId >= photos.length || parsedId < 0 ? 0 : parsedId);

    const prevIdx = currentIdx === 0 ? photos.length - 1 : currentIdx - 1;
    const nextIdx = currentIdx === photos.length - 1 ? 0 : currentIdx + 1;

    if (!photos || photos.length === 0 || !photos[currentIdx]) {
        return <div>No Photos Available</div>;
    }

    const handleGoToGallery = () => {
        navigate('/');
    };
   

    const handleSlideLeft = () => {
        setCurrentIdx(prevIdx); 
        setEdit(false);
        
    };

    const handleSlideRight = () => {
        setCurrentIdx(nextIdx); 
        setEdit(false);
        

    };



    const handleRemoveClick =()=>{
        setDelete(true);
    }

  
    // const handleConform = () => {
    //     setLoading(true);
    //     axios.delete(`http://localhost:3001/gallery/delete/${photos[id].id}`).then(res =>{
    //         setLoading(false);
    //         setDelete(false);

    //         if(res.status === 200){
    //         dispatch(removePhoto(id));
    //         toast.success('Photo Removed Successfully');
    //         // setTimeout(()=>{
    //         //     navigate('/');
    //         // },3000);
    //         navigate('/');

    //     }
    //     else{
            
    //         toast.error('Failed to Remove Photo');
    //         setLoading(false);
    //     }
    //     }).catch(error =>{
    //         toast.error("Failed to Remove Photo");
    //         setLoading(false);
    //     })

        
    // };

    // const handleCancle =()=>{
    //     setDelete(false);
    //     toast.info("Delete cancled");
    // };

    const handleSubmit =()=>{
        const Id=photos[id].id;
        axios.put(`https://photo-management-app-backend.onrender.com/gallery/put/${photos[id].id}`, {title:newTitle, description: newDes}).then( res=>{
            if(res.status === 200){
                dispatch(update({Id,newTitle,newDes}));
                toast.success('Photo Updated Successfully');
                setEdit(false);
            }else{
                toast.error('Failed to Update Photo');
                setEdit(false);
            }
        }).catch(err=>{
            toast.error('Failed to Update Photo');
            setEdit(false);
        })

        
        // dispatch(update({Id,newTitle,newDes}));
        // toast.success("Updated successfully");
        // setEdit(false);

    }

    useEffect( ()=>{
        setNewTitle(photos[currentIdx].title);
        setNewDes(photos[currentIdx].description);
    },[currentIdx]);

   

    

    return (
        <div className="details-container">
            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            ): ( <>
            <div className="image-container">
            <button className="go-to-gallery" onClick={handleGoToGallery}>Go to Gallery</button>
                <img src={photos[currentIdx].imageURL} alt={photos[currentIdx].title} />

                <div className="slider">
                <div className="slider-item" onClick={handleSlideLeft}>
                    <img src={photos[prevIdx].imageURL} alt="Previous" />
                </div>
                <div className="slider-item main">
                    <img src={photos[currentIdx].imageURL} alt="Current" />
                </div>
                <div className="slider-item" onClick={handleSlideRight}>
                    <img src={photos[nextIdx].imageURL} alt="Next" />
                </div>
            </div>
            </div>
            <div className="info-container">             
                {isEdit ? (
                    <>
                    <div className="edit">
                        <h2>Edit</h2>
                        <FaTimes className="x" onClick={()=>setEdit(false)}/>
                        <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
                        <input type="text" value={newDes} onChange={(e)=>setNewDes(e.target.value)} />
                        <button onClick={handleSubmit}> Submit</button>
                    </div>
                    
                    </>

                ) : (
                    <>
                <p className="title">{photos[currentIdx].title.toUpperCase()}</p>
                <button className="edit-btn" onClick={()=>setEdit(true)}>Edit</button>
                <p className="des"><span>Description</span>: {photos[currentIdx].description}</p>
                <p className="date"> <span>Date:</span> {photos[currentIdx].date.split('T')[0].split('-').reverse().join('-')}</p>
                <button className="remove-photo" onClick={handleRemoveClick}>Remove Photo</button>
                    
                    </>
                )}
                    
                
                

            </div>
            <Confrim 
                    show ={isDelete}
                    title={photos[currentIdx].title} 
                    confrim={photos[currentIdx]}
                    setDelete={setDelete}
                    isDetails={true}

            />
       

            
           
       
            </>
            )}
        </div>
    );
};

export default Details;
