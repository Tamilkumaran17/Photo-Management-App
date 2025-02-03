import React from "react";
import '../styles/ConfrimPage.css';
import { toast, ToastContainer } from "react-toastify";
import { removePhoto } from "../redux/PhotoSlice";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";





const Confrim = (props)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
  

    if(!props.show) return null;
    const handleConform =()=>{ 
        const id=props.confrim.id;
        console.log(id);
        
        axios.delete(`https://photo-management-app-backend.onrender.com/gallery/delete/${id}`)
            .then(res => {
                if (res.status === 200) {
                    dispatch(removePhoto(id));
                    toast.success('Photo Removed Successfully');
                    
                    if(props.isDetails)
                        navigate('/');

                    if(props.isGallery)
                    props.handelGetPhoto();
                    
                } else {
                    toast.error('Failed to Remove Photo');
                }
            })
            .catch(error => {
                toast.error("Failed to Remove Photo");
            })
            .finally(() => {
                props.setDelete(false);
               
            })
    };
    const handleCancle =()=>{
        props.setDelete(false);
        toast.info("Delete cancled");
    };
    return (
        

        <div className="modal-overlay">
            <div className="modal">
                <h2>Are you sure to delete <span>{props.confrim.title}</span> </h2>
                <button onClick={handleConform}>Yes, Delete</button>
                <button onClick={handleCancle}>No</button>
            </div>
               
        </div>
        
        

    )
};

export default Confrim;