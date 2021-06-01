import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';

function Form() {

  const [profile, setProfile] = useState({
    nickname:"",
    password:"",
    email:"",
    photoes:[],
    description:"",
    tags:""
});

const[showMe, setShowMe]=useState(false);
const maxNumber = 1;

  const handlerSubmit = e => {
    
    e.preventDefault();
    setShowMe(true);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setProfile({ ...profile, photoes: imageList });
  };
  
  const handlerChange = e => {

    setShowMe(false);

      switch(e.target.name) {
        case 'nickname':{
          
          setProfile({ ...profile, nickname: e.target.value });
          break;
        }
        case 'pass':{

          setProfile({ ...profile, pass: e.target.value });
          break;
        } 
        case 'email':{

          setProfile({ ...profile, email: e.target.value });
          break;
        }
        case 'description':{

          setProfile({ ...profile, description: e.target.value });
          break;
        }
        case 'tags':{

          setProfile({ ...profile, tags: e.target.value });
          break;
        }
      }
  };

  return (
    <>
    <form onSubmit={handlerSubmit}>
    <div className = "formElement">
      <label>Nickname</label>
      <input type="text" name="nickname" placeholder ="Input nickname" value={profile.nickname} onChange={handlerChange} required/>
    </div>
    <div className = "formElement">
      <label>Password</label>
      <input type="text" name="pass" placeholder ="Input password" value={profile.pass} onChange={handlerChange} required/>
    </div>
    <div className = "formElement">
      <label>Email</label>
      <input type="text" name="email" placeholder ="Input email" value={profile.email} onChange={handlerChange} required/>
    </div>
    <div className = "formElement">
      <label>Photo</label>
      <ImageUploading
        multiple
        value={profile.photoes}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
    <div className = "formElement">
      <label>Description</label>
      <input type="text" name="description" placeholder ="Input description" value={profile.description} onChange={handlerChange} required/>
    </div>
    <div className = "formElement">
      <label>Tags</label>
      <input type="text" name="tags" placeholder ="Input tags comma separated" value={profile.tags} onChange={handlerChange} required/>
    </div>
    <div className="formElement">
        <input type="submit" value="Submit" />
    </div>
  </form>
  <Result userProfile={profile} showInfo={showMe}/>
  </>
  );
}
 
function Result(props){

  return(

    props.showInfo?
    <div>
      <p>Nickname: {props.userProfile.nickname}</p>
      <p>Password: {props.userProfile.pass}</p>
      <p>Email: {props.userProfile.email}</p>
      <p>Description: {props.userProfile.description}</p>
      <p>Tags: {props.userProfile.tags}</p>
    </div>:null

  )
}

function Cities(){

  var cities=["Kiev", "Lviv", "Krivoy Rog","Odessa"];

  return(

    <div>
      <h2>Cities</h2>
      <ul>
        {cities.map(el=>{
          return(
            <li>{el}</li>
          )
        })}
      </ul>
    </div>
  )
}

function App() {
  
  return (
    <div className="App">
      <Cities/>
      <Form/>
    </div>
  );
}

export default App;
