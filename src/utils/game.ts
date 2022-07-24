import * as THREE from "three";
import {AnimationObjectGroup, DirectionalLight, HemisphereLight, Material, Object3D, WebGLRenderer} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {JoyStick} from "./toon3d";


export default class Game
{
    private camera: THREE.PerspectiveCamera | undefined;
    private container: HTMLDivElement;
    private readonly assetsPath: string;
    private scene: THREE.Scene | undefined;
    private anims: string[];
    private clock: THREE.Clock;
    private sun: DirectionalLight | undefined;
    private readonly player: {
        object?: Object3D;
        root?: Object3D | AnimationObjectGroup;
        mixer?:  THREE.AnimationMixer;
    };
    private readonly animations: Record<string, unknown>;
    private renderer?: WebGLRenderer;


    constructor()
    {
        // if (!this.Detector.webgl) Detector.addGetWebGLMessage();

        this.player = {};
        this.animations = {};

        this.container = document.getElementById("3root") as HTMLDivElement;
        this.container.style.height = "100%";

        this.anims = [
            "Walking",
            "Walking Backwards",
            "Turn",
            "Running",
            "Pointing Gesture"
        ];

        this.assetsPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/";

        this.clock = new THREE.Clock();

        this.init();

        window.onerror = function (error)
        {
            console.error(JSON.stringify(error));
        };
    }

    init()
    {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            5000
        );
        this.camera.position.set(112, 100, 600);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 1000, 5000);

        const hLight: HemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hLight.position.set(0, 200, 0);
        this.scene.add(hLight);

        const shadowSize = 200;
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = shadowSize;
        light.shadow.camera.bottom = -shadowSize;
        light.shadow.camera.left = -shadowSize;
        light.shadow.camera.right = shadowSize;
        this.scene.add(light);
        this.sun = light;

        // ground
        const mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(10000, 10000),
            new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false})
        );
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        const grid = new THREE.GridHelper(5000, 40, 0x000000, 0x000000);
        (grid.material as Material).opacity = 0.2;
        (grid.material as Material).transparent = true;
        this.scene.add(grid);

        // model
        const loader = new FBXLoader();

        loader.load(`${this.assetsPath}FireFighter.fbx`, (object) =>
        {
            const mixer = new THREE.AnimationMixer(object);
            this.player.mixer = mixer;
            this.player.root = mixer.getRoot();

            object.name = "FireFighter";

            object.traverse((child) =>
            {
                if ((child as THREE.Mesh).isMesh)
                {
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            });

            const tLoader = new THREE.TextureLoader();
            tLoader.load(
                `${this.assetsPath}SimplePeople_FireFighter_Brown.png`,
                function (texture)
                {
                    object.traverse(function (child)
                    {
                        if ((child as THREE.Mesh).isMesh)
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            { // @ts-ignore
                                ((child as THREE.Mesh).material as Material).map = texture;
                            }

                    });
                }
            );

            this.player.object = new THREE.Object3D();
            this.scene?.add(this.player.object);
            this.player.object.add(object);
            this.animations.Idle = object.animations[0];

            this.loadNextAnim(loader);
        });

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener(
            "resize",
            () => this.onWindowResize(),
            false
        );
    }

    loadNextAnim(loader)
    {
        const anim = this.anims.pop();
        const game = this;
        loader.load(`${this.assetsPath}${anim}.fbx`, function (object)
        {
            game.animations[anim] = object.animations[0];
            if (game.anims.length > 0)

                game.loadNextAnim(loader);

            else {
                game.createCameras();
                game.createColliders();
                game.joystick = new JoyStick({
                    onMove: game.playerControl,
                    game: game
                });
                delete game.anims;
                game.action = "Idle";
                game.animate();
            }
        });
    }

    createColliders() {
        const geometry = new THREE.BoxGeometry(500, 400, 500);
        const material = new THREE.MeshBasicMaterial({
            color: 0x222222,
            wireframe: true
        });

        this.colliders = [];

        for (let x = -5000; x < 5000; x += 1000)

            for (let z = -5000; z < 5000; z += 1000) {
                if (x == 0 && z == 0) continue;
                const box = new THREE.Mesh(geometry, material);
                box.position.set(x, 250, z);
                this.scene.add(box);
                this.colliders.push(box);
            }


        const geometry2 = new THREE.BoxGeometry(1000, 40, 1000);
        const stage = new THREE.Mesh(geometry2, material);
        stage.position.set(0, 20, 0);
        this.colliders.push(stage);
        this.scene.add(stage);
    }

    movePlayer(dt) {
        const pos = this.player.object.position.clone();
        pos.y += 60;
        const dir = new THREE.Vector3();
        this.player.object.getWorldDirection(dir);
        if (this.player.move.forward < 0) dir.negate();
        let raycaster = new THREE.Raycaster(pos, dir);
        let blocked = false;
        const colliders = this.colliders;

        if (colliders !== undefined) {
            const intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0)

                if (intersect[0].distance < 50) blocked = true;

        }

        if (!blocked)

            if (this.player.move.forward > 0) {
                const speed = this.player.action == "Running" ? 400 : 150;
                this.player.object.translateZ(dt * speed);
            } else

                this.player.object.translateZ(-dt * 30);


        if (colliders !== undefined) {
            //cast left
            dir.set(-1, 0, 0);
            dir.applyMatrix4(this.player.object.matrix);
            dir.normalize();
            raycaster = new THREE.Raycaster(pos, dir);

            let intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0)

                if (intersect[0].distance < 50)
                    this.player.object.translateX(100 - intersect[0].distance);


            //cast right
            dir.set(1, 0, 0);
            dir.applyMatrix4(this.player.object.matrix);
            dir.normalize();
            raycaster = new THREE.Raycaster(pos, dir);

            intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0)

                if (intersect[0].distance < 50)
                    this.player.object.translateX(intersect[0].distance - 100);


            //cast down
            dir.set(0, -1, 0);
            pos.y += 200;
            raycaster = new THREE.Raycaster(pos, dir);
            const gravity = 30;

            intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0) {
                const targetY = pos.y - intersect[0].distance;
                if (targetY > this.player.object.position.y) {
                    //Going up
                    this.player.object.position.y =
                        0.8 * this.player.object.position.y + 0.2 * targetY;
                    this.player.velocityY = 0;
                } else if (targetY < this.player.object.position.y) {
                    //Falling
                    if (this.player.velocityY == undefined) this.player.velocityY = 0;
                    this.player.velocityY += dt * gravity;
                    this.player.object.position.y -= this.player.velocityY;
                    if (this.player.object.position.y < targetY) {
                        this.player.velocityY = 0;
                        this.player.object.position.y = targetY;
                    }
                }
            } else if (this.player.object.position.y > 0) {
                if (this.player.velocityY == undefined) this.player.velocityY = 0;
                this.player.velocityY += dt * gravity;
                this.player.object.position.y -= this.player.velocityY;
                if (this.player.object.position.y < 0) {
                    this.player.velocityY = 0;
                    this.player.object.position.y = 0;
                }
            }
        }

        this.player.object.rotateY(this.player.move.turn * dt);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    set action(name) {
        const action = this.player.mixer.clipAction(this.animations[name]);
        action.time = 0;
        this.player.mixer.stopAllAction();
        this.player.action = name;
        this.player.actionTime = Date.now();
        this.player.actionName = name;

        action.fadeIn(0.5);
        action.play();
    }

    get action() {
        if (this.player === undefined || this.player.actionName === undefined)
            return "";
        return this.player.actionName;
    }

    playerControl(forward, turn) {
        turn = -turn;

        if (forward > 0.3) {
            if (this.player.action != "Walking" && this.player.action != "Running")
                this.action = "Walking";
        } else if (forward < -0.3) {
            if (this.player.action != "Walking Backwards")
                this.action = "Walking Backwards";
        } else {
            forward = 0;
            if (Math.abs(turn) > 0.1) {
                if (this.player.action != "Turn") this.action = "Turn";
            } else if (this.player.action != "Idle")

                this.action = "Idle";

        }

        if (forward == 0 && turn == 0)

            delete this.player.move;

        else

            this.player.move = {forward, turn};

    }

    set activeCamera(object) {
        this.player.cameras.active = object;
    }

    createCameras() {
        const offset = new THREE.Vector3(0, 80, 0);
        const front = new THREE.Object3D();
        front.position.set(112, 100, 600);
        front.parent = this.player.object;
        const back = new THREE.Object3D();
        back.position.set(0, 300, -600);
        back.parent = this.player.object;
        const wide = new THREE.Object3D();
        wide.position.set(178, 139, 1665);
        wide.parent = this.player.object;
        const overhead = new THREE.Object3D();
        overhead.position.set(0, 400, 0);
        overhead.parent = this.player.object;
        const collect = new THREE.Object3D();
        collect.position.set(40, 82, 94);
        collect.parent = this.player.object;
        this.player.cameras = {front, back, wide, overhead, collect};
        this.activeCamera = this.player.cameras.back;
    }

    animate() {
        const game = this;
        const dt = this.clock.getDelta();

        requestAnimationFrame(function () {
            game.animate();
        });

        if (this.player.mixer !== undefined) this.player.mixer.update(dt);

        if (this.player.action == "Walking") {
            const elapsedTime = Date.now() - this.player.actionTime;
            if (elapsedTime > 1000 && this.player.move.forward > 0)

                this.action = "Running";

        }

        if (this.player.move !== undefined) this.movePlayer(dt);

        if (
            this.player.cameras != undefined &&
            this.player.cameras.active != undefined
        ) {
            this.camera.position.lerp(
                this.player.cameras.active.getWorldPosition(new THREE.Vector3()),
                0.05
            );
            const pos = this.player.object.position.clone();
            pos.y += 200;
            this.camera.lookAt(pos);
        }

        if (this.sun != undefined) {
            this.sun.position.x = this.player.object.position.x;
            this.sun.position.y = this.player.object.position.y + 200;
            this.sun.position.z = this.player.object.position.z + 100;
            this.sun.target = this.player.object;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

