import React, {useRef, useEffect, useState} from 'react'
import './Canvas.css'

export default function Canvas(props) {
    const canvasRef = useRef(null);
    const [isDraw, setIsDraw] = useState(true); // 0 = drawing, 1 = erasing
    const [isErase, setIsErase] = useState(false);

    function switchMode() {
        setIsDraw(!isDraw);
        setIsErase(!isErase);
    }

    function RadioButton({id, title, group, clickHandler, startsClicked}) {
        if (startsClicked) {
            return (
                <div>
                    <input type="radio" id={id} name={group} onChange={clickHandler} checked />
                    <label for={id}>{title}</label>
                </div>
            )
        } else {
            return (
                <div>
                    <input type="radio" id={id} name={group} onChange={clickHandler}/>
                    <label for={id}>{title}</label>
                </div>
            )
        }
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let backgroundColor = 'black';
        context.fillStyle = '000000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        let isDragging = false;
        //let color = "white";
        //let lineWidth = 5;

        let eraser = document.getElementById("eraser");
        let drawButton = document.getElementById("drawing");

        let colorPick = document.getElementById("colorPicker");
        let color = colorPick.value;

        colorPick.addEventListener("change", function() {
            color = colorPick.value;
        })

        let sizeSlider = document.getElementById("brushSize");
        let lineWidth = sizeSlider.value;
        sizeSlider.addEventListener("change", function(){
            lineWidth = sizeSlider.value;
        })


        canvas.addEventListener("mousedown", function(event) {
            console.log(eraser.checked);
            isDragging = true;
            context.beginPath();
            context.moveTo(event.offsetX, event.offsetY);
        });
    
        canvas.addEventListener("mousemove", function(event) {
            if (isDragging && drawButton.checked) {
                console.log(lineWidth + " murder(s) complete");
                context.lineWidth = lineWidth;
                context.strokeStyle = color;
                context.lineTo(event.offsetX, event.offsetY);
                context.stroke();
            } else if (isDragging && eraser.checked) {
                context.lineWidth = lineWidth + 1;
                context.strokeStyle = backgroundColor;
                context.lineTo(event.offsetX, event.offsetY);
                context.stroke();
                context.fillRect(event.offsetX, event.offsetY, lineWidth * 2, lineWidth * 2);
            }
        });
    
        canvas.addEventListener("mouseup", function(event) {
            isDragging = false;
        });
    }, []);

    return (
        <>
            <div id="top-bar">
                <div>
                    <RadioButton id="eraser" title="Erase" group="mode" 
                        clickHandler={() => switchMode} startsClicked={false}/>
                    <RadioButton id="drawing" title="Draw" group="mode" 
                        clickHandler={() => {}} startsClicked={true}/>
                </div>
                <div class="option">
                    <p>Color Select</p>
                    <input type="color" id="colorPicker" />
                </div>
                <div class="option">
                    <p>Brush Size</p>
                    <input type="range" min="1" max="10" id="brushSize" />
                </div>
            </div>
            <canvas ref={canvasRef} width="800" height="800" id="canvas"/>
        </>
    )
}

