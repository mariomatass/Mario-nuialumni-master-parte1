//Ejemplo de un cubo en RA
import { Canvas} from "@react-three/fiber";
import XrCone from './XrCone';
import { ARButton, XR } from "@react-three/xr";


function EjAR(){


    return(
        <>
            <ARButton/>
            <Canvas>
                <XR>
                    <XrCone />
                </XR>
            </Canvas>
        </>
)

}

export default EjAR;