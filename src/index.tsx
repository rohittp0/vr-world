import Button from "@mui/material/Button";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import React, {useRef, useState} from "react";
import {createRoot} from "react-dom/client";


function initGL(canvas: HTMLCanvasElement)
{
    function onResize()
    {
        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = canvas.clientHeight * window.devicePixelRatio;
    }

    window.addEventListener("resize", onResize);
    onResize();

    return canvas.getContext("webgl", {xrCompatible: true});
}

function getScene()
{
    const scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);

    return scene;
}

function getRenderer(canvas: HTMLCanvasElement, gl: WebGLRenderingContext)
{
    // Set up the WebGLRenderer, which handles rendering to the session's base layer.
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        canvas: canvas,
        context: gl,
        antialias: true,
    });
    renderer.autoClear = false;

    renderer.setSize( canvas.clientWidth, canvas.clientHeight );
    renderer.shadowMap.enabled = true;

    return renderer;
}

export default function Home()
{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [running, setRunning] = useState(false);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000 );
    const scene = getScene();
    const loader = new GLTFLoader();

    let referenceSpace: XRReferenceSpace | XRBoundedReferenceSpace;
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null;
    let renderer: THREE.WebGLRenderer;

    camera.position.set(112, 100, 600);

    loader.load("/aminity.glb", (gltf) =>
    {
        const model = gltf.scene;

        model.scale.set(0.3, 0.3, 0.3);
        model.position.set(0, 0, -10);

        scene.add(model);
    });

    const hLight =  new THREE.HemisphereLight( 0xffffff, 0x444444 );

    hLight.position.set( 0, 200, 0 );
    scene.add(hLight);

    const shadowSize = 200;

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 200, 100 );
    light.castShadow = true;
    light.shadow.camera.top = shadowSize;
    light.shadow.camera.bottom = -shadowSize;
    light.shadow.camera.left = -shadowSize;
    light.shadow.camera.right = shadowSize;
    scene.add( light );

    const mesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 10000, 10000 ),
        new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );

    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;

    scene.add( mesh );

    const grid = new THREE.GridHelper( 5000, 40, 0x000000, 0x000000 );

    if (grid.material instanceof THREE.Material)
    {
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
    }

    scene.add( grid );

    scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 5000 );


    async function initWebXr(canvas: HTMLCanvasElement)
    {
        const session = await navigator.xr.requestSession("immersive-vr");
        gl = initGL(canvas);

        if(!gl)
            return;

        renderer = getRenderer(canvas, gl);

        session.addEventListener("end", () => setRunning(false));
        await session.updateRenderState({baseLayer: new XRWebGLLayer(session, gl)});
        referenceSpace = await session.requestReferenceSpace("local");

        session.requestAnimationFrame(onXRFrame as FrameRequestCallback);
        setRunning(true);
    }

    camera.matrixAutoUpdate = false;

    function onXRFrame(t: DOMHighResTimeStamp, frame)
    {
        if(!gl)
            return;

        const session = frame.session;
        session.requestAnimationFrame(onXRFrame);

        // Bind the graphics framebuffer to the baseLayer's framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

        // Retrieve the pose of the device.
        // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
        const pose = frame.getViewerPose(referenceSpace);
        if (pose)
        {
            // In mobile AR, we only have one view.
            const view = pose.views[0];

            const viewport = session.renderState.baseLayer.getViewport(view);
            renderer.setSize(viewport.width, viewport.height);

            // Use the view's transform matrix and projection matrix to configure the THREE.camera.
            camera.matrix.fromArray(view.transform.matrix);
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);

            // Render the scene with THREE.WebGLRenderer.
            renderer.render(scene, camera);
        }
    }

    return (
        <>
            {!running && <Button onClick={() => initWebXr(canvasRef.current as HTMLCanvasElement)}>
                Start Mapping
            </Button>}
            <canvas ref={canvasRef} width={"100vw"} height={"100vh"}></canvas>
        </>
    );
}

const render = createRoot(document.getElementById("root") as HTMLDivElement);
render.render(<Home/>);
