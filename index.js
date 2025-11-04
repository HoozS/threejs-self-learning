import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import model from './model.js';
import room from './testscene.js';
import groupmodel from './groupmodel.js';

// 创建场景Scene
const scene = new THREE.Scene();
// 创建透视摄像机Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 创建WebGL渲染器Renderer
const renderer = new THREE.WebGLRenderer();
// 设置渲染器设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器的输出（canvas元素）添加到body中的container元素
document.body.appendChild(renderer.domElement);

// 创建一个立方体并添加到场景中
const geometry = new THREE.BoxGeometry(50, 50, 50);
// 创建材质指定颜色
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
// 创建网格模型
const cube = new THREE.Mesh(geometry, material);
// 设置立方体透明度
material.transparent = true;
material.opacity = 0.5;
// 将立方体添加到场景中
// scene.add(cube);
// // 设置立方体位置
// cube.position.set(0, 0, 0);

const cube2 = cube.clone();
cube2.position.x = 150;
// scene.add(cube2);

const cube3 = new THREE.Mesh(geometry, material);
cube3.position.z = 150;
// scene.add(cube3);

// scene.add(model);

// scene.add(room);

scene.add(groupmodel);

// 设置摄像机位置并指向立方体
camera.position.set(0, 80, 150);
// 设置摄像机目标位置为场景中心
camera.lookAt(0, 0, 0);
// // 渲染场景
renderer.render(scene, camera);
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// 平行光
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(200, 200, 50); // 平行光位置
light.target.position.set(1,0,0); // 平行光目标位置
light.intensity = 1.0; // 平行光强度
scene.add(light); // 平行光添加到场景中
// 平行光可视辅助器
const lightHelper = new THREE.DirectionalLightHelper(light, 10);
scene.add(lightHelper);

// 点光源
const point = new THREE.PointLight(0xffffff);
// point.position.set(400, 200, 300); // 点光源位置
// 设置点光源在y轴正方向上方100位置
point.position.set(50, 100, 300);
point.intensity = 1.0; // 点光源强度
point.decay = 0; // 衰减
// point.distance = 8000; // 有效距离
scene.add(point); // 点光源添加到场景中
// 点光源可视辅助器
const pointHelper = new THREE.PointLightHelper(point, 10);
scene.add(pointHelper);

// 环境光
const ambient = new THREE.AmbientLight(0x444444);
ambient.intensity = 0.4; // 环境光强度
scene.add(ambient)

// 抗锯齿
renderer.antialias = true;

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 渲染循环
function render() {
    renderer.render(scene, camera);
    lightHelper.update();
    pointHelper.update();
    requestAnimationFrame(render);
}
render();

const obj = {
    color: "#ffff00"
};

// 性能监视器
const stats = new Stats();
document.getElementById("container").appendChild(stats.dom);
function animate() {
    requestAnimationFrame(animate);
    stats.update();
}
animate();

// // GUI界面
const gui = new GUI();
// const cubeFolder = gui.addFolder('立方体Cube');
// console.log(cube.position);
// gui.add(cube.position, 'x', -200, 200);
// gui.add(cube.position, 'y', 0, 200);
// gui.add(cube.position, 'z', -200, 200);
const lightFolder = gui.addFolder('平行光');
lightFolder.add(light, "intensity", 0, 2).name("平行光强度");
lightFolder.add(light.position, "x", -400, 400).name("平行光X位置");
lightFolder.add(light.position, "y", -400, 400).name("平行光Y位置");
lightFolder.add(light.position, "z", -400, 400).name("平行光Z位置");
lightFolder.add(light.target.position, "x", -100, 100).name("平行光目标X位置");
lightFolder.add(light.target.position, "y", -100, 100).name("平行光目标Y位置");
lightFolder.add(light.target.position, "z", -100, 100).name("平行光目标Z位置");
const ambientFolder = gui.addFolder('环境光');
ambientFolder.add(ambient, "intensity", 0, 2).name("环境光强度");
const pointFolder = gui.addFolder('点光源');
pointFolder.add(point.position, "x", -400, 400).name("点光源X位置");
pointFolder.add(point.position, "y", -400, 400).name("点光源Y位置");
pointFolder.add(point.position, "z", -400, 400).name("点光源Z位置");
pointFolder.add(point, "intensity", 0, 2).name("点光源强度");
pointFolder.add(point, "decay", 0, 2).name("点光源衰减");
// gui.addColor(obj, 'color').name('立方体颜色').onChange(function (value) {
//     cube.material.color.set(value);
// });
// //
gui.open();
lightFolder.close();
ambientFolder.close();
pointFolder.close();