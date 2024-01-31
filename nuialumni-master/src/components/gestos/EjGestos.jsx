import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import * as handTrack from 'handtrackjs';
import Texto from './Texto';

export default function EjGestos() {
  const [label, setLabel] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('pink');

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  useEffect(() => {
    const runHandtrack = async () => {
      const model = await handTrack.load(defaultParams);
      console.log("Model loaded");
      setInterval(() => {
        runDetection(model);
      }, 3000);
    };

    const runDetection = async (model) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const predictions = await model.detect(video);
        predictions.map((prediction) => setLabel(prediction.label));

        if (label === "point") {
          setBackgroundColor((prevColor) => (prevColor === 'pink' ? 'red' : 'pink'));
        }
      }
    };

    runHandtrack();
  }, [label]);

  return (
    <>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          backgroundColor: backgroundColor,
          flexDirection: 'column',
        }}
      >
        <div>
          <h3> Ejemplo Detección Gestos Mano: abierta y cerrada </h3>
          <p> Tienes que conceder acceso a la webcam </p>
        </div>
        <div>
          <Webcam
            ref={webcamRef}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
      </div>

      <Texto />
    </>
  );
}