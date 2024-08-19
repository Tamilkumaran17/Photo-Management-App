# Gallery Project

## Overview

    Welcome to the Photo management app! This application is designed to display a collection of photos in a grid layout with a responsive and user-friendly interface. Users can view photos, navigate to detailed views, and add new photos. The project is built using React.js and utilizes various features to enhance the user experience.

## Features

- **Photo Gallery**    : Display a grid of photos, each with a title and image.
- **Responsive Design**: The gallery adjusts to fit different screen sizes, making it accessible on both desktop and mobile devices.
- **Add New Photos**   : Navigate to the "Create" page to add new photos to the gallery.
- **Photo Details**    : Click on a photo to view it in detail on a separate page.

## Technologies Used

- **React.js**    : For building the user interface and managing state.
- **React-Window**: For efficiently rendering large lists of items.
- **Axios**       : For making HTTP requests to fetch and delete photos.
- **CSS**         : For styling the application and ensuring a responsive layout.
- **Cloudinary**  : For managing and serving images.

## Frontend

- Created a upload page where users can upload photos.Including, title, and description. User can drag and drop or select the image from their file manager
- Created a gallery page where users can view all the uploaded photos.
- Created a detail page where users can view the details of a specific photo. In detail page, user can navigate to the previous or next photos along with details.

## Backend

- The Uploaded image from the user can be saved through the external stroage bucket called "Cloudinary".  
- The uploaded image can be fetched from the cloudinary and displayed in the gallery page.
- The user can delete the image from the detail page.


