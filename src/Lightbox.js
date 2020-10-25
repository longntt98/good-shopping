import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./lightbox.css";


class Lightbox extends Component {
    constructor(props) {
        super(props);
        const ratioWHArray = props.ratio.split(":");
        this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

        this.updateDimensions - this..showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal(index) {
        this.modalELm.style.visibility = "visible";

    }

    hideModal() {
        this.modalElm.style.visibility = "hidden";

    }

    updateDimensions() {
        const height = this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
        this.containerElm.style.height = `${height}px`
    }

    componentDidMount() {
        this.rootElm = ReactDOM.findDOMNode(this);
        this.containerElm = this.rootElm.querySelector(".container");
        this.modalELm = this.rootElm.querySelector(".modal");
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {
        return (
            <div className="lp-lightbox">
                <div className="container">
                    {
                        this.props.input.map((image, index) => {
                            return (
                                <div
                                    key={index}
                                    className="image-wrapper"
                                    style={{
                                        width: `${1 / this.props.input.length * 100}%`,
                                        height: `100%`
                                    }}
                                >
                                    <img
                                        className="image"
                                        src={image.src}
                                        alt={image.caption}
                                        onClick={() => this.showModal(index)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                <div className="modal">
                    <span className="close" onClick={this.hideModal}>×</span>
                    <div className="modal-content">
                        <SlideshowGallery
                            ref={this.slideshowGallery}
                            input={this.props.input}
                            ratio={this.props.ratio}
                            mode={`manual`}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Lightbox;