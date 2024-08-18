import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeGrid as Grid } from "react-window";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaPlus } from 'react-icons/fa';
import "../styles/Gallery.css";
import axios from "axios";
import { initPhoto } from "../redux/PhotoSlice";
import { toast } from "react-toastify";

const Gallery = () => {
    const photos = useSelector((state) => state.photos.photos);
    console.log(photos);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleCreat = () => {
        navigate('/create');
    }

    const handelGetPhoto = () => {
        axios.get("http://localhost:3001/gallery/getImage")
            .then((res) => {
                if (res.status === 200) {
                    dispatch(initPhoto(res.data));
                }
                else {
                    toast.error("Internal server error");
                }

            }).catch(error => {
                toast.error("Failed to load data");
            });
    }

    useEffect(() => {
        handelGetPhoto();
    }, [])

    const Cell = ({ columnIndex, rowIndex, style }) => {

        const index = rowIndex * 7 + columnIndex;
        const totalCells = photos.length + 1;

        if (index === totalCells - 1) {

            return (
                <div style={{ ...style, height: "300px", marginTop: "20px" }} className="photo-cell create-cell" onClick={handleCreat}>

                    <FaPlus size={50} className="plus" />
                    <p className="photo-title" >Create</p>

                </div>
            );

        };

        if (index >= photos.length) return null;

        const photo = photos[index];
        return (
            <div style={{ ...style, height: "300px", marginTop: "20px" }} className="photo-cell">
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
                <button onClick={handleCreat} className="crt-btn" >Create </button>

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
        </div>
    );
};

export default Gallery;
