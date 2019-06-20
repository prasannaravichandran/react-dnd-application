import React from 'react';

/*
 *  Example for without extending the component. This component handles the forms
 */
function leftContainer(props) {

  return (
    <div className="formContainer">
        <div className="imageUploader">
            <input type="file" name="uploadFile" onChange={props.handleFile} />
            <button onClick={props.uploadData}>Upload</button>
        </div>
        <div className="typeText">
            <input type="text" name="customText" onChange={props.customText} />
        </div>
    </div>
  );
}

export default leftContainer;
