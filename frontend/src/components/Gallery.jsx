import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeGrid as Grid } from "react-window";
import { FaPlus, FaSearch, FaTrashAlt } from 'react-icons/fa';
import "../styles/Gallery.css";
import axios from "axios";
import { initPhoto, removePhoto } from "../redux/PhotoSlice";
import { toast } from "react-toastify";
import Confrim from "./ConfrimPage";

const Gallery = () => {
    const photos = useSelector((state) => state.photos.photos);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isDelete, setDelete] = useState(false); 
    const [confrimPhoto, setConfrimPhoto] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");  
    const handleCreat = () => {
        navigate('/create');
    }

    const handelGetPhoto = () => {
        axios.get("https://photo-management-app-backend.onrender.com/gallery/getImage")
            .then((res) => {
                if (res.status === 200) {
                    dispatch(initPhoto(res.data));
                } else {
                    toast.error("Internal server error");
                }
            }).catch(() => {
                toast.error("Failed to load data");
            });
    };

    const handleDelete = (photo) => {
        setConfrimPhoto(photo);
        setDelete(true);
    };

    useEffect(() => {
        handelGetPhoto();
    }, []);


    // serch implementation

    const filteredPhotos = photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // cell creation
    const Cell = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * 7 + columnIndex;
        const totalCells = filteredPhotos.length + 1;


                // default cell that need to be displayed even no images are present
        if (index === totalCells - 1) {
            return (
                <div style={{ ...style, height: "300px", marginTop: "20px" }} className="photo-cell create-cell" >
                    <FaPlus size={50} className="plus" onClick={handleCreat}/>
                    <p className="photo-title" onClick={handleCreat}>Create</p>
                </div>
            );
        };


        if (index >= filteredPhotos.length) return null;
        const photo = filteredPhotos[index];

            // photos
        return (
            <div style={{ ...style, height: "300px", marginTop: "20px" }} className="photo-cell">
                <button onClick={() => handleDelete(photo)}> <FaTrashAlt /> </button>
                <Link to={`/photo/${index}`}>
                    <img src={photo.imageURL} alt={photo.title} className="photo-img" />
                </Link>
                <p className="photo-title">{photo.title.toUpperCase()}</p>
            </div>
        );
    };


            // main return

    return (
        <div className="gallery-container no-scrollbar">
            <header>
                <h2>Gallery</h2>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-box"/>
                <FaSearch className="search-icon"/>
                <button onClick={handleCreat} className="crt-btn">Create</button>
            </header>

            <Grid
                className="grid"
                columnCount={7}
                columnWidth={200}
                height={590}
                rowCount={Math.ceil((filteredPhotos.length + 1) / 7)}
                rowHeight={300}
                width={1520}
            >
                {Cell}
            </Grid>

            
            {/* confrim page load */}

            <Confrim 
                show={isDelete}
                title={confrimPhoto?.title} 
                confrim={confrimPhoto}
                setDelete={setDelete}
                handelGetPhoto={handelGetPhoto}
                isGallery={true}
            />
        </div>
    );
};

export default Gallery;
