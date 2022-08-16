import * as THREE from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {JoyStick} from "./toon3d";


const animationNameMap: Record<string, string> = {
    "Walking" : "walkAnim",
    "Idle" : "idleAnim",
    "Running" : "runAnim",
    "Turn" : "jumpAnim",
    "Walking Backwards": "jumpAnim"
};

export default class Game
{
    private readonly container: HTMLDivElement;
    private readonly model;
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private mixer?: THREE.AnimationMixer;

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
    private actionTime = 0;
    private actionName = "";
    private animations: Record<string, THREE.AnimationClip> = {};

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

            const animationAction = (object as THREE.Object3D).animations;

            animationAction.forEach((clip) => this.animations[clip.name] = clip);

            console.log(Object.keys(this.animations));

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

        new JoyStick({maxRadius: 40, onMove: this.move, game: this});

        this.animate().then();
        this.scene.add(new THREE.AxesHelper());
        this.scene.fog = new THREE.Fog( 0xa0a0a0, 1000, 5000 );

        this.createCameras().then();
    }

    private async move(forward: number, turn: number)
    {
        turn = -turn;

        if (forward>0.3)
        {
            if (this.action!=="Walking" && this.action!=="Running") this.action = "Walking";
        }
        else if (forward<-0.3)
        {
            if (this.action !== "Walking Backwards") this.action = "Walking Backwards";
        }
        else
        {
            forward = 0;
            if (Math.abs(turn)>0.1)
            {
                if (this.action !== "Turn") this.action = "Turn";
            }
            else if (this.action!=="Idle")
                this.action = "Idle";

        }

        this.motion = { forward, turn };
    }

    async animate()
    {
        const dt = this.clock.getDelta();

        requestAnimationFrame( () => this.animate() );

        this.mixer?.update(dt);

        if (this.action === "Walking" && Date.now() - this.actionTime > 1000 && this.motion.forward > 0)
            this.action = "Running";

        if (this.motion !== undefined)
            await this.movePlayer(dt);

        if (this.cameras && this.cameras.active)
        {
            this.camera.position.lerp(this.cameras.active.getWorldPosition(new THREE.Vector3()), 0.05);
            const pos = (await this.model).position.clone();
            pos.y += 200;
            this.camera.lookAt(pos);
        }


        this.renderer.render( this.scene, this.camera );
    }

    async movePlayer(dt: number)
    {
        if(this.motion.forward + this.motion.turn === 0)
            return;

        const pos = (await this.model).position.clone();
        const dir = new THREE.Vector3();

        pos.y += 60;

        (await this.model).getWorldDirection(dir);

        if (this.motion.forward < 0) dir.negate();
        if (this.motion.forward > 0)
        {
            const speed = this.action === "Running" ? 400 : 150;
            (await this.model).translateZ(dt * speed);
        }
        else
            (await this.model).translateZ(-dt * 30);

        (await this.model).rotateY(this.motion.turn * dt);
    }

    private render()
    {
        this.renderer.render(this.scene, this.camera);
    }

    set action(name)
    {
        try
        {
            if (this.mixer)
            {
                const animationCode = animationNameMap[name];
                const action = this.mixer.clipAction(this.animations[animationCode]);

                action.time = 0;
                this.mixer.stopAllAction();
                this.actionTime = Date.now();

                action.fadeIn(0.5);
                action.play();
            }
        }
        catch (e)
        {
            console.error(e);
        }

        this.actionName = name;

    }

    get action()
    {
        return this.actionName;
    }

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
