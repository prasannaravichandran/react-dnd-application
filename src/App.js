import React,{ Component } from 'react';
import './App.css';
import Leftcontainer from './left-container/left-container.js';
import Rightcontainer from './right-container/right-container.js';
import axios from 'axios'

class App extends Component {
    constructor(props) {
      super(props);
      /*
       *   Page state
       */
      this.state = {
          imagesList: [],
          selectedFile: null,
          activeImage: null,
          canvasImages: "",
          canvasText: "",
          userText: "",
          showImagesContainer: true
      }
    }
    /*
     * On load fetching the data from the server
     */
    componentDidMount = () => {
        this.fetchImages();
    }
    /*
     * Setting the user file upload data to the state
     */
    handleselectedFile = (event) => {
        if(event.target.files.length === 0) {
            alert("Invalid file");
            return false;
        }
        this.setState({
              selectedFile: event.target.files[0]
        })
    }
    /*
     * Uploading the data to server using axios
     */
    handleUpload = () => {
        if(!this.state.selectedFile) {
            alert("Invalid file");
            return false;
        }
        const fileData = new FormData()
        fileData.append('upload', this.state.selectedFile, this.state.selectedFile.name)
        axios.post('http://localhost:8000/uploads/', fileData)
          .then(res => {
            if(res.data) {
                this.fetchImages();
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
    /*
     * Managing of the drag and drop events for both text and images
     */
    onDragStart = (event,v) => {
        event.preventDefault();
        event.dataTransfer.effectAllowed = "all";
        event.dataTransfer.dropEffect = "copy";
        let dragImage = document.createElement('img');
        dragImage.src = v;
        dragImage.width = 75;
        event.dataTransfer.setDragImage(dragImage, 0, 0);
        this.setState({activeImage:v})
    }
    allowDrop = (event) => {
        event.preventDefault();
    }
    drop = (event) => {
       console.log(event.target)
       event.preventDefault();
       let activeImagesStr  = this.state.activeImage;
       this.setState({canvasImages:activeImagesStr})
    }
    onTextDragStart = (event) => {
        this.setState({canvasText:event.target.innerHTML})
    }

    /*
     * Toggling the image container
     */
    showImagesCom = () => {
        let setImageState = this.state.showImagesContainer;
        this.setState({showImagesContainer:!setImageState})
    }

    /*
     * On change displaying the user custom text to drag and drop
     */
    textHandler = (event) => {
        this.setState({userText:event.target.value})
    }

    /*
     * Rendering the user state
     */
    render = () => {
        let imageListData = null;
        let canvasImageListData = null;

        /*
         * Toggling the image container based on the click
         */
        if(this.state.showImagesContainer) {
            imageListData = this.state.imagesList.map((data,i) => {
                return <img src={data} alt="random" key={i}  draggable="true" onDrag={(event) => this.onDragStart(event,data)}/>
            })
        }

        /*
         * Rendering the image and the text to the drop zone. Right container component is the drop zone
         */
        if(this.state.canvasImages !== "") {
            canvasImageListData =  <Rightcontainer canvasImage={this.state.canvasImages} canvasDraw={this.canvasHandler} ></Rightcontainer>
        }
        if(this.state.canvasText !== "") {
            canvasImageListData =  <Rightcontainer canvasImage={this.state.canvasImages} canvasDraw={this.canvasHandler} canvasEmbedText={this.state.canvasText}></Rightcontainer>
        }
        return (
            // Parent container
            <div className="mainContainer">
                <div className="leftContainer">
                    <Leftcontainer handleFile={(event) => this.handleselectedFile(event)} uploadData={() => this.handleUpload()} customText={(event) => this.textHandler(event)}></Leftcontainer>
                    <p draggable="true" onDrag={(event) => this.onTextDragStart(event)}>{this.state.userText}</p>
                    <div onClick={this.showImagesCom} className="imagesHeader"> Show / Hide Images: </div>
                    <div className="imageList">
                    {imageListData}
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="dropContainer" onDragOver={this.allowDrop}  onDrop={(event) => this.drop(event)} onDrag={(event) => this.onDragStart(event,this)}>
                        {canvasImageListData}
                    </div>
                </div>
            </div>
        );
    }
    /*
     * Fetching the data from the server
     */
    fetchImages = () => {
        fetch('http://localhost:8000/images/')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({imagesList: responseJson})
            })
            .catch((error) => {
              console.error(error);
            });
    }
}

export default App;
