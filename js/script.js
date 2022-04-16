//Регистрация service-worker
if ('serviceWorker' in navigator){
 	navigator.serviceWorker.register('/service.js', {
    scope: '/'
  });
}

document.addEventListener("DOMContentLoaded", function(event){ 
	//Анимации
	new WOW().init();	

	//Прелоадер
	setTimeout(function(){ 
    preloader.seen = false; 
  }, 1000);

	//Шапка сайта
	window.addEventListener('scroll', function(e){
		var scrl = window.pageYOffset;
		var header_bg = document.getElementById("header_bg");
		header_bg.style.width = (100 + scrl/5)  + "%";
		header_bg.style.top = -(scrl/10)  + "%";
		header_bg.style.filter = "blur(" + (scrl/200) + "px)";
	});

  //3D
  var paste = document.getElementById("about_model");
  let scene, camera, renderer;
  function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    camera = new THREE.PerspectiveCamera(45, 421 / 698, 0.1, 1000);
    camera.position.z = 150;
    hlight = new THREE.AmbientLight(0x404040, 10);
    scene.add(hlight);
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(421, 698);
    if(window.screen.width > 480){
      paste.appendChild(renderer.domElement);
    }
    let loader = new THREE.GLTFLoader();
    loader.load('./model/scene.gltf', function(gltf){
      obj = gltf.scene.children[0];
      obj.scale.set(1.3, 1.3, 1.3);
      scene.add(gltf.scene);
      isReduced = window.matchMedia(`(prefers-reduced-motion: reduce`) === true || window.matchMedia(`prefers-reduced-motion`).matches === true;
      if(!!isReduced ){
        obj.rotation.z += 47;
        renderer.render(scene,camera);
      }
      else{
        animate();
      }
    });
  }
  function animate(){
    requestAnimationFrame(animate);
   	if(obj)
    	obj.rotation.z += 0.003;
    renderer.render(scene,camera);
  }
  init();

  //Анимация появления 3D
  cnvs = document.querySelector("canvas");
  cnvs.classList.add("wow");
  cnvs.classList.add("fadeInRight");
  if(cnvs.offsetHeight == 0){
    document.getElementById("about_text").style.height = "auto";
    document.getElementById("about_text").style.marginBottom = "50px";
  }
}); 