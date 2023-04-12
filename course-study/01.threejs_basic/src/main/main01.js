// 创建一个几何体，可以修改位置，状态等
// 通过render的time参数控制运动
// 或者通过Clock方法实现动画

import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
// 透视投影相机 参数如下
// fov（field of view）：视角，单位是度数，表示相机的可视范围，视角越大，场景中可见的物体就越多
// aspect：画布的纵横比，一般设置为画布的宽度除以高度
// near：近平面，表示相机能够看到的最近的距离
// far：远平面，表示相机能够看到的最远的距离
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 相机在Three.js三维坐标系中的位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 长 宽 高
// 创建一个材质对象
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // 设置材质颜色
// 根据几何体和材质创建物体 网格模型Mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
cube.position.set(5, 0, 0);
// cube.position.x = 3;
// 缩放
cube.scale.set(1, 1, 1);
// cube.scale.x = 5;

// 旋转
// 参数依次为绕 X 轴旋转的角度、绕 Y 轴旋转的角度和绕 Z 轴旋转的角度
// "XYZ" 表示欧拉角的旋转顺序
cube.rotation.set(Math.PI / 4, 0, 0, "XZY");
// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 添加坐标轴辅助器 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5); // 5 表示坐标轴辅助器的长度，单位是单位是三维空间中的距离单位，默认为 1
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();
function render() {
  // console.log(time)
  // 获取时钟运行的总时长
  let time = clock.getElapsedTime();
  // console.log("时钟运行总时长：", time);
  // let deltaTime = clock.getDelta();
  // console.log("两次获取时间的间隔时间：", deltaTime);
  // 请求动画帧  时间参数 控制物体动画
  // let t = (time / 1000) % 5;
  let t = time % 5;
  cube.position.x = t * 1;

  // cube.position.x += 0.01;
  // // cube.rotation.x += 0.1
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }
  renderer.render(scene, camera);
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
