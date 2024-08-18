import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/Details.css';
import { toast, ToastContainer } from "react-toastify";
import { removePhoto } from "../redux/PhotoSlice";
import axios from "axios";


const Details = () => {
    const { id } = useParams();
    const photos = useSelector((state) => state.photos.photos);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

  
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
    const handleRemovePhoto = () => {
        setLoading(true);
        

        axios.delete(`http://localhost:3001/gallery/delete/${photos[id].id}`).then(res =>{
            setLoading(false);

            if(res.status === 200){
            dispatch(removePhoto(id));
            toast.success('Photo Removed Successfully');
            setTimeout(()=>{
                navigate('/');
            },3000);

        }
        else{
            
            toast.error('Failed to Remove Photo');
            setLoading(false);
        }
        }).catch(error =>{
            toast.error("Failed to Remove Photo");
            setLoading(false);
        })

        
    };

    const handleSlideLeft = () => {
        setCurrentIdx(prevIdx); 
    };

    const handleSlideRight = () => {
        setCurrentIdx(nextIdx); 
    };

    return (
        <div className="details-container">
            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            ): ( <>
            <div className="image-container">
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
                <button className="go-to-gallery" onClick={handleGoToGallery}>Go to Gallery</button>
                <p className="title">{photos[currentIdx].title.toUpperCase()}</p>
                <p className="des"><span>Description</span>: {photos[currentIdx].description}</p>
                <p className="date"> <span>Date:</span> {photos[currentIdx].date.split('T')[0].split('-').reverse().join('-')}</p>
                <button className="remove-photo" onClick={handleRemovePhoto}>Remove Photo</button>

            </div>
       

            
           <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
            transition: Bounce
            />
       
            </>
            )}
        </div>
    );
};

export default Details;
