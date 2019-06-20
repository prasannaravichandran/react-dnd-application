import React,{ Component } from 'react';


class Rightcontainer extends Component {
    /*
     * Loading the data
     */
    componentDidMount = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d")
        const img = this.refs.image
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            ctx.font = "40px Courier" 

        }
        if(this.props.canvasEmbedText && this.props.canvasEmbedText !== "") {
            ctx.fillText(this.props.canvasEmbedText, 100, 75)
        }
    }

    /*
     * Donwloading of the image.
     */
    downLoadImage = () => {
        let canvasImage = document.getElementById('canvasContainer').toDataURL('image/jpeg');
        // this can be used to download any image from webpage to local disk
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            let a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = 'canvas.jpg';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove()
          };
          xhr.open('GET', canvasImage);
          xhr.send();
    }
    /*
     * Clear the canvas container
     */
    clearImage = () => {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /*
     * Rendering the canvas image
     */
    render = () => {
        if(this.refs && this.refs.canvas) {
            const canvas = this.refs.canvas;
            const ctx = canvas.getContext("2d")
            if(this.props.canvasEmbedText && this.props.canvasEmbedText !== "") {
                ctx.fillText(this.props.canvasEmbedText, 100, 75)
            }
        }
        return (
            <div>
                <header className="canvasHeader">
                    <button onClick={this.downLoadImage}> Save</button>
                    <button onClick={this.clearImage}> Clear</button>
                </header>
                <canvas ref="canvas" width="600px" height="600px" id="canvasContainer"/>
                <img ref="image" alt="canvasimage" src={this.props.canvasImage} className="hidden" crossOrigin="Anonymous"/>
            </div>
        );
    }
}

export default Rightcontainer;
