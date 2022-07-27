import * as THREE from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {JoyStick} from "./toon3d";

export default class Game
{
    private step = 300;
    private readonly MAX_STEP = 400;

    private readonly container: HTMLDivElement;
    private readonly model;
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private mixer?: THREE.AnimationMixer;
    private readonly animationActions?: THREE.AnimationAction[];
    private activeAction?: THREE.AnimationAction;
    private lastAction?: THREE.AnimationAction;
    private clock: THREE.Clock;
    private motion = {forward: 0, turn: 0};
    private cameras?: {
        wide: THREE.Object3D;
        overhead: THREE.Object3D;
        back: THREE.Object3D;
        front: THREE.Object3D;
        collect: THREE.Object3D;
        active: THREE.Object3D;
    };
    private activeCamera?: THREE.Object3D;

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

        this.model = new FBXLoader().loadAsync("/robo.fbx").then((object) =>
        {
            this.mixer = new THREE.AnimationMixer(object);

            object.traverse( ( child ) =>
            {
                if ( (child as THREE.Mesh).isMesh )
                {
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            } );

            // const animationAction = this.mixer.clipAction((object as THREE.Object3D).animations[0]);
            // this.animationActions.push(animationAction);
            // this.activeAction = this.animationActions[0];
            // this.lastAction = this.animationActions[0];

            this.scene.add(object);

            return object;
        });

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

        new JoyStick({maxRadius: 40, onMove: this.moved, game: this});

        this.animate().then();
        this.scene.add(new THREE.AxesHelper());
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 5000 );

        this.createCameras().then();
    }

    private moved(forward: number, turn: number)
    {
        turn = -turn;

        this.motion = { forward, turn };

        console.log(this.motion)
    }

    private async move(dt: number)
    {
        const model = await this.model;

        const pos = model.position.clone();
        pos.y += 60;

        const dir = new THREE.Vector3();
        model.getWorldDirection(dir);

        if (this.motion.forward<0) dir.negate();

        if (this.motion.forward>0)
            model.translateZ(dt*this.step);
        else if(this.motion.forward<0)
            model.translateZ(-dt*30);

        if(this.step > this.MAX_STEP)
            this.step = this.MAX_STEP;

        model.rotateY(this.motion.turn*dt);
    }

    async animate()
    {
        const dt = this.clock.getDelta();

        requestAnimationFrame( () => this.animate() );

        this.mixer?.update(dt);

        if (this.motion !== undefined) await this.move(dt);

        if (this.cameras !== undefined && this.cameras.active !== undefined)
        {
            this.camera.position.lerp(this.cameras.active.getWorldPosition(new THREE.Vector3()), 0.05);
            const pos = (await this.model).position.clone();
            pos.y += 200;
            this.camera.lookAt(pos);
        }

        this.renderer.render( this.scene, this.camera );
    }

    private render()
    {
        this.renderer.render(this.scene, this.camera);
    }

    setAction = (toAction: THREE.AnimationAction) =>
    {
        if (toAction !== this.activeAction)
        {
            this.lastAction = this.activeAction;
            this.activeAction = toAction;
            this.lastAction?.stop();
            this.lastAction?.fadeOut(1);
            this.activeAction.reset();
            this.activeAction.fadeIn(1);
            this.activeAction.play();
        }
    };

    async createCameras()
    {
        const front = new THREE.Object3D();
        front.position.set(112, 100, 600);
        front.parent = await this.model;

        const back = new THREE.Object3D();
        back.position.set(0, 300, -600);
        back.parent = await this.model;

        const wide = new THREE.Object3D();
        wide.position.set(178, 139, 1665);
        wide.parent = await this.model;

        const overhead = new THREE.Object3D();
        overhead.position.set(0, 400, 0);
        overhead.parent = await this.model;

        const collect = new THREE.Object3D();
        collect.position.set(40, 82, 94);
        collect.parent = await this.model;

        this.cameras = { front, back, wide, overhead, collect, active: back };
        this.activeCamera = this.cameras.back;
    }
}
