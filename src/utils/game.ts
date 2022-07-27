import * as THREE from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {JoyStick} from "./toon3d";

export default class Game
{
    private readonly step = 5;

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
    private motion = {x: 0, y: 0};

    constructor()
    {
        this.container = document.getElementById("3root") as HTMLDivElement;
        this.container.style.height = "100%";

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0.4, 1.5, 3.0);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.model = new FBXLoader().loadAsync("/robo.fbx").then((object) =>
        {
            object.scale.set(0.01, 0.01, 0.01);
            this.mixer = new THREE.AnimationMixer(object);

            console.log(object);

            // const animationAction = this.mixer.clipAction((object as THREE.Object3D).animations[0]);
            // this.animationActions.push(animationAction);
            // this.activeAction = this.animationActions[0];
            // this.lastAction = this.animationActions[0];

            const box = new THREE.Box3().setFromObject( object );
            const center = new THREE.Vector3();
            box.getCenter( center );
            object.position.sub( center ); // center the model

            this.scene.add(object);

            return object;
        });

        const light = new THREE.PointLight();
        light.position.set(2.5, 7.5, 15);
        this.scene.add(light);

        this.clock = new THREE.Clock();

        window.addEventListener("resize", () =>
        {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.render();
        });

        new JoyStick({maxRadius: 20, onMove: this.moved, game: this, moveDamping: 2, rotationDamping: 2});

        this.animate().then();
    }

    private moved(y: number, x: number)
    {
        this.motion = {x, y};
        this.render();
    }

    private async move()
    {
        const model = await this.model;

        model.translateX(this.motion.x*this.clock.getDelta()*this.step);
        model.translateZ(this.motion.y*this.clock.getDelta()*this.step);
    }

    async animate()
    {
        requestAnimationFrame(() => this.animate());

        if (await this.model)
            this.mixer?.update(this.clock.getDelta());

        this.move();
        this.render();
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
}
