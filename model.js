import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

// const vertices = new Float32Array([
//     0, 0, 0,
//     50, 0, 0,
//     50, 50, 0,
//     0, 50, 0,
//     0, 0, 50,
//     50, 0, 50,
//     50, 50, 50,
//     0, 50, 50,
//     0, 0, 0,
// ]);

// 定义两个三角形面使拼合成一个正方形面
const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    100, 100, 0,
    // 0, 0, 0,
    // 100, 100, 0,
    0, 100, 0,
]);

// 类型化数组创建索引数据
const indices = new Uint16Array([
    0, 1, 2, // 第一个三角形
    0, 2, 3, // 第二个三角形
]);

// 为每个顶点定义颜色 (6个顶点，每个顶点有3个颜色分量: R, G, B)
const colors = new Float32Array([
    // 第一个三角形 - 红色
    1, 0, 0, // 顶点0: 红色
    1, 0, 0, // 顶点1: 红色
    1, 0, 0, // 顶点2: 红色

    // 第二个三角形 - 蓝色
    0, 0, 1, // 顶点3: 蓝色
    0, 0, 1, // 顶点4: 蓝色
    0, 0, 1, // 顶点5: 蓝色
]);
// 定义法向量
const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
]);

const attributes = new THREE.BufferAttribute(vertices, 3);
// const colorAttr = new THREE.BufferAttribute(colors, 3);
// attributes.setAttribute('color', colorAttr);
// const geometry = new THREE.BufferGeometry();
// attributes.normals = new THREE.BufferAttribute(normals, 3);
geometry.setAttribute('position', attributes);
// geometry.setAttribute('color', colorAttr);
geometry.index = new THREE.BufferAttribute(indices, 1);
geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));


const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    // vertexColors: true,
    side: THREE.DoubleSide,
    wireframe: false
});
const mesh = new THREE.Mesh(geometry, material);
export default mesh;