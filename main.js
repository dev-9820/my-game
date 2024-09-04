// Basic Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Adding a Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Car body
const carBodyGeometry = new THREE.BoxGeometry(2, 1, 1);
const carBodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);

// Front wheel (sphere)
const frontWheelGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const frontWheel = new THREE.Mesh(frontWheelGeometry, wheelMaterial);
frontWheel.position.set(0, -0.5, 0.7);

// Back wheels (cylinders)
const backWheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
const backWheel1 = new THREE.Mesh(backWheelGeometry, wheelMaterial);
backWheel1.position.set(-0.9, -0.5, -0.6);
backWheel1.rotation.z = Math.PI / 2;

const backWheel2 = new THREE.Mesh(backWheelGeometry, wheelMaterial);
backWheel2.position.set(0.9, -0.5, -0.6);
backWheel2.rotation.z = Math.PI / 2;

// Group the car parts
const car = new THREE.Group();
car.add(carBody);
car.add(frontWheel);
car.add(backWheel1);
car.add(backWheel2);
car.position.y = 0.5;
scene.add(car);

// Car movement variables
let moveForward = false;
let moveBackward = false;
let turnLeft = false;
let turnRight = false;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': moveForward = true; break;
        case 's': moveBackward = true; break;
        case 'a': turnLeft = true; break;
        case 'd': turnRight = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w': moveForward = false; break;
        case 's': moveBackward = false; break;
        case 'a': turnLeft = false; break;
        case 'd': turnRight = false; break;
    }
});

function updateCar() {
    if (moveForward) car.position.z -= 0.1;
    if (moveBackward) car.position.z += 0.1;
    if (turnLeft) car.rotation.y += 0.05;
    if (turnRight) car.rotation.y -= 0.05;
}

function createRandomShape() {
    const geometries = [
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.ConeGeometry(0.3, 0.5, 32),
    ];

    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const shape = new THREE.Mesh(geometry, material);

    shape.position.set((Math.random() - 0.5) * 10, 5, (Math.random() - 0.5) * 10);
    scene.add(shape);

    return shape;
}

// Randomly drop shapes every second
setInterval(() => {
    createRandomShape();
}, 1000);

function animate() {
    requestAnimationFrame(animate);
    updateCar();
    renderer.render(scene, camera);
}
animate();
