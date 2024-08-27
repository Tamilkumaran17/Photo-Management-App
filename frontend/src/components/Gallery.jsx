import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeGrid as Grid } from "react-window";
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
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

    const handleCreat = () => {
        navigate('/create');
    }

    const handelGetPhoto = () => {
        axios.get("http://localhost:3001/gallery/getImage")
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

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * 7 + columnIndex;
        const totalCells = photos.length + 1;

        if (index === totalCells - 1) {
            return (
                <div style={{ ...style, height: "300px", marginTop: "20px" }} className="photo-cell create-cell" >
                    <FaPlus size={50} className="plus" onClick={handleCreat}/>
                    <p className="photo-title" onClick={handleCreat}>Create</p>
                </div>
            );
        };

        if (index >= photos.length) return null;
        const photo = photos[index];

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

    return (
        <div className="gallery-container no-scrollbar">
            <header>
                <h2>Gallery</h2>
                <button onClick={handleCreat} className="crt-btn">Create</button>
            </header>

            <Grid
                className="grid"
                columnCount={7}
                columnWidth={200}
                height={590}
                rowCount={Math.ceil((photos.length + 1) / 7)}
                rowHeight={300}
                width={1520}
            >
                {Cell}
            </Grid>

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
