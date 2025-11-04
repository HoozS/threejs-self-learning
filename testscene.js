import * as THREE from 'three';

// 场景尺度定义
const METER = 1; // 1单位 = 1米

// 创建房间
function createRoom(width = 5, height = 3, depth = 4) {
    const roomGroup = new THREE.Group();
    
    // 地板
    const floorGeometry = new THREE.PlaneGeometry(width * METER, depth * METER);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    roomGroup.add(floor);
    
    // 墙壁
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5DC });
    
    // 后墙
    const backWallGeometry = new THREE.PlaneGeometry(width * METER, height * METER);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -depth * METER / 2;
    backWall.position.y = height * METER / 2;
    roomGroup.add(backWall);
    
    // 前墙（有门洞）
    const frontWallGeometry = new THREE.PlaneGeometry(width * METER, height * METER);
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.z = depth * METER / 2;
    frontWall.position.y = height * METER / 2;
    roomGroup.add(frontWall);
    
    // 左墙
    const leftWallGeometry = new THREE.PlaneGeometry(depth * METER, height * METER);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -width * METER / 2;
    leftWall.position.y = height * METER / 2;
    roomGroup.add(leftWall);
    
    // 右墙
    const rightWallGeometry = new THREE.PlaneGeometry(depth * METER, height * METER);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.rotation.y = Math.PI / 2;
    rightWall.position.x = width * METER / 2;
    rightWall.position.y = height * METER / 2;
    roomGroup.add(rightWall);
    
    return roomGroup;
}

// 创建人物
function createPerson() {
    const personGroup = new THREE.Group();
    
    // 身体
    const bodyGeometry = new THREE.BoxGeometry(0.5 * METER, 1 * METER, 0.3 * METER);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0000FF });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1 * METER / 2;
    personGroup.add(body);
    
    // 头部
    const headGeometry = new THREE.SphereGeometry(0.2 * METER, 16, 16);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xFFB6C1 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1 * METER + 0.2 * METER;
    personGroup.add(head);
    
    return personGroup;
}

const scene = new THREE.Scene();


// 创建场景
const room = createRoom(6, 3, 5); // 6x3x5米的房间
scene.add(room);

const person = createPerson();
person.position.set(1, 0, 1); // 放置在房间内
scene.add(person);

// 创建适合室内尺度的点光源
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 2.5, 0); // 天花板中央
pointLight.distance = 10; // 10米范围
pointLight.decay = 0.7;   // 适中的衰减
scene.add(pointLight);

// 环境光补充
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

export default scene;