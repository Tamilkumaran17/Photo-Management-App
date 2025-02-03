import React, { useState } from "react";
import { useDispatch} from 'react-redux';
import { addPhoto } from "../redux/PhotoSlice";
import {useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Create.css';
import axios from "axios";


const Create = () =>{
    const [photo,setPhoto] = useState({
        title: '',
        description: '',
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleChange = (e) =>{
        setPhoto({...photo, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) =>{

        e.preventDefault();
        if(photo.title === '' || photo.description === ''){
            toast.error('Please fill all the fields');
            return;
        }

        const formData = new FormData();

        formData.append('image', image);
        formData.append('title',photo.title);
        formData.append("description",photo.description);

        setLoading(true);

        axios.post("https://photo-management-app-backend.onrender.com/gallery/upload", formData).
        then(res => {
            setLoading(false); 
            // console.log("result"+ res);

            if (res.status === 200) {
                dispatch(addPhoto(res.data));
                toast.success('Photo added Successfully');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

            else if(res.status===400){
              
                toast.error('Failed to upload photo');
                setLoading(false);
            }
            else{
               
                toast.error('Internal server error');
                setLoading(false);
            }
        }).catch(error =>{
            setLoading(false);
            console.log(error);
            toast.error("Falied to upload photos");
        });

      
    };



    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            // validate(file);
            setImage(file);
            console.log(file);
            
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files);
        
        if (file) {
            // validate(file);
            setImage(file);
            console.log(file);
        }
    };

    const validate = (file) => {

        if(!file.type.startsWith('image/')){
            toast.error('Only image files are allowed');
            return;
        }


        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    // console.log(image);
    

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return(
        <>
        {loading ? (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        ) : (
            <>
            <h2 onClick={()=> {navigate('/')}} className="back">Back <FaArrowRight className="right"/> </h2>
        <form onSubmit={handleSubmit} className="form">
            <h2>Create New Photo</h2>
            <input type="text" name="title" placeholder="Title" value={photo.title} onChange={handleChange} ></input>
            <input type="text" name="description" placeholder="Description" value={photo.description} onChange={handleChange}></input>

            <div className="drop-zone"
            onDrop={handleDrop}
            onDragOver={preventDefaults}
            onDragEnter={preventDefaults}
            onDragLeave={preventDefaults}
            onClick={() => document.getElementById('fileInput').click()}>
            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />

            {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />
            ) : (
                <p>Drag & Drop an image here, or click to select one</p>
            )}
            </div>

            <button type="submit" className="add">Add to gallery</button>
            
       
        </form>
        </>
        )}
        </>
    )

}

export default Create;
