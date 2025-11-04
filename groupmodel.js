import * as THREE from 'three';

// 创建一个空的BufferGeometry对象
const geometry = new THREE.BoxGeometry(20, 50, 10);

// 定义一个立方体网格模型
const material = new THREE.MeshLambertMaterial({ color: 0xaaffaa });

// 创建一个组对象
const group1 = new THREE.Group();
group1.name = "高楼";
for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.name = i+1+"号楼";
    cube.position.x = i * 30;
    group1.add(cube);
}
group1.position.y = 25.1; // 提升组的位置使其立在地面上

const group2 = new THREE.Group();
group2.name = "低楼";
for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(20, 25, 10), material);
    cube.name = i+6+"号楼";
    cube.position.x = i * 30;
    group2.add(cube);
}
group2.position.z = 50; // 将第二组沿z轴移动
group2.position.y = 12.6; // 提升组的位置使其立在地面上

// 建立地面对象
const groundGeometry = new THREE.PlaneGeometry(800, 800); // 创建一个大的平面作为地面
// 加载地面草地纹理
const textureLoader = new THREE.TextureLoader(); // 纹理加载器
const groundTexture = textureLoader.load('textures/glass.jpg'); // 加载地面纹理
groundTexture.wrapS = THREE.RepeatWrapping; // 设置纹理水平重复
groundTexture.wrapT = THREE.RepeatWrapping; // 设置纹理垂直重复
groundTexture.repeat.set(12, 12); // 设置重复次数
// 创建路径平面
const pathGeometry = new THREE.PlaneGeometry(150, 30);
// 加载瓷砖纹理创建路径
const tileTexture = textureLoader.load('textures/沥青.jpg');
tileTexture.wrapS = THREE.RepeatWrapping;
tileTexture.wrapT = THREE.RepeatWrapping;
tileTexture.repeat.set(4, 4);
const pathMaterial = new THREE.MeshLambertMaterial({ map: tileTexture, side: THREE.DoubleSide });
const path = new THREE.Mesh(pathGeometry, pathMaterial);
path.rotation.x = -Math.PI / 2; // 旋转路径使其水平
path.position.y = 0.1; // 提升路径位置以避免z-fighting
path.position.z = 25; // 设置路径位置

// 为地面几何体添加第二组UV坐标，用于光照贴图
groundGeometry.setAttribute('uv2', new THREE.BufferAttribute(groundGeometry.attributes.uv.array, 2)); // 设置第二组UV坐标用于光照贴图
// 创建地面材质并应用纹理
const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial); // 创建地面网格模型
ground.rotation.x = -Math.PI / 2; // 旋转地面使其水平
ground.position.y = 0; // 设置地面位置

// 建立地面组对象
const groundGroup = new THREE.Group();
groundGroup.name = "地面组";
groundGroup.add(ground);
groundGroup.add(path);

// 建立建筑组对象
const groupBuild = new THREE.Group();
groupBuild.name = "建筑群";
groupBuild.add(group1);
groupBuild.add(group2);
groupBuild.position.x = -60; // 将整个组向左移动以居中

// 建立最终的城市模型组对象
const group = new THREE.Group();
group.name = "城市模型";
group.add(groupBuild);
group.add(groundGroup);

export default group;
