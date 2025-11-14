# three

基于three.js-r180: [https://github.com/mrdoob/three.js/releases/tag/r180](https://github.com/mrdoob/three.js/releases/tag/r180)

解压到项目根目录即可运行项目。当前项目中应该没有什么高级版本专有的特性，低版本应该也可以运行，如果github打不开或下载很慢，可以去[three.js中文网](http://www.webgl3d.cn)提供[网盘资源](https://pan.baidu.com/s/1_Ix8TiOScypNcQe3BIl5vA?pwd=rrks)下载。提取码:rrks

## 材质

因为当前的材质都是网上随便找的图，不确定当前材质是否版权安全，就不上传了，理论上长得差不多的材质都能用。只需要把对应的导入纹理的位置改掉就行。

```javascript
const textureLoader = new THREE.TextureLoader(); // 纹理加载器
const groundTexture = textureLoader.load('textures/glass.jpg'); // 加载纹理
```
