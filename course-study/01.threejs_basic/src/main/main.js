
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
import { color } from "dat.gui";

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
// cube.position.set(5, 0, 0);
// cube.position.x = 3;
// 缩放
cube.scale.set(1, 1, 1);
// cube.scale.x = 5;

// 旋转
// 参数依次为绕 X 轴旋转的角度、绕 Y 轴旋转的角度和绕 Z 轴旋转的角度
// "XYZ" 表示欧拉角的旋转顺序
cube.rotation.set(Math.PI / 4, 0, 0, "XZY");
// 将几何体添加到场景中
console.log(cubeGeometry)
scene.add(cube);

const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((value) => {
    console.log("值被修改：", value);
  })
  .onFinishChange((value) => {
    console.log("完全停下来:", value);
  });
//   修改物体的颜色
const params = {
  color: "#ffff00",
  fn: () => {
    //   让立方体运动起来
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};
gui.addColor(params, "color").onChange((value) => {
  console.log("值被修改：", value);
  cube.material.color.set(value);
});
// 设置选项框
gui.add(cube, "visible").name("是否显示");

var folder = gui.addFolder("设置立方体");
folder.add(cube.material, "wireframe");
// 设置按钮点击触发某个事件
folder.add(params, "fn").name("立方体运动");
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
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5); // 5 表示坐标轴辅助器的长度，单位是单位是三维空间中的距离单位，默认为 1
scene.add(axesHelper);

// 设置动画
// 第一个参数表示要创建动画的目标元素
// 第二个表示动画的属性和值
  // const animate1 =gsap.to(cube.position, {
  //   x: 5,
  //   duration: 5,
  //   ease: "power1.inOut",
  //   //   设置重复的次数，无限次循环-1
  //   repeat: -1,
  //   //   往返运动
  //   yoyo: true,
  //   //   delay，延迟2秒运动
  //   delay: 2,
  //   onComplete: () => {
  //     console.log("动画完成");
  //   },
  //   onStart: () => {
  //     console.log("动画开始");
  //   },
  // });
  // gsap.to(cube.rotation, {
  //   x: 2 * Math.PI,
  //   duration: 5, //   设置重复的次数，无限次循环-1
  //   repeat: -1,
  //   //   往返运动
  //   // yoyo: true,
  //   ease: "power1.inOut",
  // });
// gsap.to(cube.scale, 2, { x: 2, y: 2, z: 2 });

window.addEventListener('dblclick',()=> {
    // if (animate1.isActive()) {
    //   //   暂停
    //   animate1.pause();
    // } else {
    //   //   恢复
    //   animate1.resume();
    // }
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
      // 双击控制屏幕进入全屏，退出全屏
      // 让画布对象全屏
      renderer.domElement.requestFullscreen();
    } else {
      //   退出全屏，使用document对象
      document.exitFullscreen();
    }
})
function render() {
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});