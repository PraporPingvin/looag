import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [id, setId] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      const userId = id;
      formData.append('user-id', userId);
  
      const response = await axios.post('http://localhost:3000/loadImage', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(progress);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    console.log(id)
  },[id])
  const getUserImages = async () => {
    try {
      const userId = id;
      const response = await axios.get('http://localhost:3000/user/' + userId +'/images');
      console.log(response);
      setImages(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const getUserId = async () => {
    try {
      const userId = id;
      const response = await axios.get('http://localhost:3000/user/' + userId + "/images");
      console.log(response);
      setImages(response.data)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);
  
  return (
    <div className="App">
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Загрузить</button>

      <button onClick={getUserImages}>Получить картинки юзера 123</button>

      <input type="text" value={id} onChange={(event)=>setId(event.target.value)}/>
      <button onClick={getUserId}>Получить</button>

      {images.map((image, id) => {
        return <img key={id} src={'http://localhost:3000/' + image.path}/>
      })}
    </div>
  );
}

export default App;
