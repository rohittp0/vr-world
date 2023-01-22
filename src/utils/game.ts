import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export default class Game
{
    readonly canvas: HTMLCanvasElement;
    private readonly container: HTMLDivElement;
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    private clock: THREE.Clock;
    private cameras?: {
        wide: THREE.Object3D;
        overhead: THREE.Object3D;
        back: THREE.Object3D;
        front: THREE.Object3D;
        collect: THREE.Object3D;
        active: THREE.Object3D;
    };
    private activeCamera?: THREE.Object3D;
    // private readonly texture;

    constructor()
    {
        this.container = document.getElementById("3root") as HTMLDivElement;
        this.container.style.height = "100%";

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.set(112, 100, 600);

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        this.canvas = this.renderer.domElement;

        const loader = new GLTFLoader();


        loader.loadAsync("/aminity.glb").then((object) =>
        {

            this.scene.add(object.scene);

            object.scene.scale.set(15, 15, 15);
        } );



        const hLight =  new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hLight.position.set( 0, 200, 0 );
        this.scene.add(hLight);

        const shadowSize = 200;
        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 200, 100 );
        light.castShadow = true;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        this.scene.add( light );

        const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ),
            new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

        const grid = new THREE.GridHelper( 5000, 40, 0x000000, 0x000000 );
        if (grid.material instanceof THREE.Material)
        {
            grid.material.opacity = 0.2;
            grid.material.transparent = true;
        }
        this.scene.add( grid );

        this.clock = new THREE.Clock();

        window.addEventListener("resize", () =>
        {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.render();
        });

        this.scene.add(new THREE.AxesHelper());
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 5000 );

        this.createCameras().then(() => this.render());
    }



    private render()
    {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }

    async createCameras()
    {
        const front = new THREE.Object3D();
        front.position.set(112, 100, 600);

        const back = new THREE.Object3D();
        back.position.set(0, 300, -600);
        // back.parent = await this.model;

        const wide = new THREE.Object3D();
        wide.position.set(178, 139, 1665);

        const overhead = new THREE.Object3D();
        overhead.position.set(0, 400, 0);

        const collect = new THREE.Object3D();
        collect.position.set(40, 82, 94);

        this.cameras = { front, back, wide, overhead, collect, active: back };
        this.activeCamera = this.cameras.back;
    }
}
