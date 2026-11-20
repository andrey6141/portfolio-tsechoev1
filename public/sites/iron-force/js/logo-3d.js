const logoAssetUrl = new URL('../images/iron-force-emblem.png', (document.currentScript && document.currentScript.src) || location.href).href;

document.addEventListener('DOMContentLoaded', () => {
  const host = document.querySelector('.brand-symbol');
  if (!host || !window.THREE) return;
  const T = window.THREE;
  const width = Math.max(1, host.clientWidth || 48);
  const height = Math.max(1, host.clientHeight || 48);
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(256, 256, false);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;cursor:grab';
  host.replaceChildren(renderer.domElement);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 5.2);
  scene.add(new T.AmbientLight(0xffffff, 1.35));
  const key = new T.DirectionalLight(0xffe2a0, 2.1); key.position.set(-3, 4, 5); scene.add(key);
  const rim = new T.DirectionalLight(0xffffff, 1.2); rim.position.set(3, -2, -4); scene.add(rim);

  const loader = new T.TextureLoader();
  loader.load(logoAssetUrl, texture => {
    texture.colorSpace = T.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const ratio = texture.image.width / texture.image.height;
    const planeW = ratio >= 1 ? 2.7 : 2.7 * ratio;
    const planeH = ratio >= 1 ? 2.7 / ratio : 2.7;
    const geometry = new T.PlaneGeometry(planeW, planeH);
    const emblem = new T.Group();
    scene.add(emblem);
    // Dark metallic duplicate layers create visible thickness around the silhouette.
    for (let i = 8; i >= 1; i--) {
      const sideMat = new T.MeshStandardMaterial({
        map: texture, color: new T.Color(0x76551b), metalness: 0.78,
        roughness: 0.32, transparent: true, alphaTest: 0.08, side: T.DoubleSide
      });
      const side = new T.Mesh(geometry, sideMat);
      side.position.z = -i * 0.025;
      emblem.add(side);
    }
    const face = new T.Mesh(geometry, new T.MeshStandardMaterial({
      map: texture, metalness: 0.28, roughness: 0.48,
      transparent: true, alphaTest: 0.04, side: T.DoubleSide
    }));
    face.position.z = 0.015;
    emblem.add(face);
    emblem.rotation.set(-0.10, -0.18, 0);

    let dragging = false, lastX = 0, lastY = 0;
    const canvas = renderer.domElement;
    canvas.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      emblem.rotation.y += dx * 0.012;
      emblem.rotation.x = Math.max(-1.35, Math.min(1.35, emblem.rotation.x + dy * 0.012));
      lastX = e.clientX; lastY = e.clientY;
    });
    const stop = () => { dragging = false; canvas.style.cursor = 'grab'; };
    canvas.addEventListener('pointerup', stop);
    canvas.addEventListener('pointercancel', stop);
    canvas.addEventListener('lostpointercapture', stop);
    canvas.addEventListener('dblclick', () => emblem.rotation.set(-0.10, -0.18, 0));
    const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
    render();
  }, undefined, () => { host.textContent = 'IF'; });
});