'use client';

import type { DictionaryType } from "@/app/dictionaries/en";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type Status = 'dormant' | 'awake' | 'unstable';

const statusColor: Record<Status, string> = {
    dormant: 'text-neutral-700 dark:text-neutral-300',
    awake: 'text-lime-600 dark:text-lime-400',
    unstable: 'text-red-600 dark:text-red-400',
};

export default function Cube({ dict }: { dict: DictionaryType['home']['cube']; }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wakeRef = useRef<() => void>(() => { });
    const [status, setStatus] = useState<Status>('dormant');

    useEffect(() => {
        const wrap = wrapRef.current, canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        } catch {
            return; // no WebGL: the status row still renders, the canvas stays empty
        }

        const cube = mountCube(wrap, canvas, renderer, setStatus);
        wakeRef.current = cube.wake;
        return () => {
            wakeRef.current = () => { };
            cube.dispose();
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-3 mt-6 lg:mt-0">
            <div ref={wrapRef} className="relative w-full max-w-[480px] aspect-square">
                <canvas ref={canvasRef} role="img" aria-label={dict.alt} className="absolute inset-0 w-full h-full outline-none" />
            </div>
            <div className="flex items-center gap-4 font-mono text-xs tracking-widest uppercase text-neutral-500">
                <span>
                    {dict.status}{' '}
                    <span aria-live="polite" className={`transition-colors ${statusColor[status]}`}>{dict[status]}</span>
                </span>
                <button
                    type="button"
                    onClick={() => wakeRef.current()}
                    className="rounded-full border border-neutral-400/60 dark:border-neutral-700 px-3 py-1.5 uppercase tracking-widest hover:border-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 cursor-pointer"
                >
                    {dict.wake}
                </button>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// The scene. Built imperatively once per mount; returns wake() and dispose().
// The canvas is transparent, so the page background shows through in both themes.
// ---------------------------------------------------------------------------

const S = 2, H = S / 2, T = 0.17;
const FLOOR_Y = -1.95;
const LIME = { light: '#a8ea1e', dark: '#b8f62a' };

function mountCube(wrap: HTMLDivElement, canvas: HTMLCanvasElement, renderer: THREE.WebGLRenderer, onStatus: (s: Status) => void) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const target = new THREE.Vector3(0, -0.15, 0);
    camera.position.set(2.4, 2.6, 11);
    camera.lookAt(target);

    // Orbit only with a mouse: on touch screens it would hijack page scrolling.
    let controls: OrbitControls | null = null;
    if (window.matchMedia('(pointer: fine)').matches) {
        controls = new OrbitControls(camera, canvas);
        controls.target.copy(target);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.rotateSpeed = 0.6;
        controls.minPolarAngle = 0.95;
        controls.maxPolarAngle = 1.56;
    }

    // ---------- Lights ----------
    const hemi = new THREE.HemisphereLight(0xffffff, 0x3a3d39, 0.6);
    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(2.5, 9, 3.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 2, far: 20 });
    key.shadow.radius = 14;
    key.shadow.blurSamples = 20;
    key.shadow.bias = -0.0005;
    const rim = new THREE.DirectionalLight(0xffffff, 1.2);
    rim.position.set(-5, 3, -6);
    scene.add(hemi, key, rim);

    // ---------- Materials (lime ones are colored in applyTheme) ----------
    const lime = new THREE.Color();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x151715, roughness: 0.38, metalness: 0.6 });
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x1c1e1c, roughness: 0.55, metalness: 0.35 });
    const knurlMat = new THREE.MeshStandardMaterial({ color: 0x191b19, roughness: 0.45, metalness: 0.6, flatShading: true });
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x8a8f88, roughness: 0.3, metalness: 0.9 });
    const chipMat = new THREE.MeshStandardMaterial({ color: 0xdfe3da, roughness: 0.5, metalness: 0.1 });
    const limeTrimMat = new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.05 });
    const glassMat = new THREE.MeshPhysicalMaterial({
        roughness: 0.06, metalness: 0, transparent: true, opacity: 0.3, side: THREE.DoubleSide,
        depthWrite: false, clearcoat: 1, clearcoatRoughness: 0.08,
    });
    const innerGlassMat = glassMat.clone();
    innerGlassMat.opacity = 0.12;
    const windowMat = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });
    const ringGlowMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const ledMat = new THREE.MeshStandardMaterial({ color: 0x330000, emissive: 0xff2a2a, emissiveIntensity: 0 });
    const lineMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.85 });

    // ---------- The cube ----------
    const shadowy = <M extends THREE.Mesh>(m: M) => { m.castShadow = true; m.receiveShadow = true; return m; };

    const drift = new THREE.Group();   // floats up and down
    const tilt = new THREE.Group();    // fixed lean, like the render
    const spin = new THREE.Group();    // slow turn
    tilt.rotation.set(0.3, 0, -0.16);
    drift.add(tilt);
    tilt.add(spin);
    scene.add(drift);

    // Frame: 12 edge bars, one of them lime trim
    const barGeo = {
        x: new RoundedBoxGeometry(S + T, T, T, 2, 0.03),
        y: new RoundedBoxGeometry(T, S + T, T, 2, 0.03),
        z: new RoundedBoxGeometry(T, T, S + T, 2, 0.03),
    };
    for (const axis of ['x', 'y', 'z'] as const) {
        for (const u of [-H, H]) {
            for (const v of [-H, H]) {
                const trim = axis === 'z' && u === -H && v === H;
                const bar = shadowy(new THREE.Mesh(barGeo[axis], trim ? limeTrimMat : frameMat));
                if (axis === 'x') bar.position.set(0, u, v);
                else if (axis === 'y') bar.position.set(u, 0, v);
                else bar.position.set(u, v, 0);
                spin.add(bar);
            }
        }
    }
    const capGeo = new RoundedBoxGeometry(T * 1.5, T * 1.5, T * 1.5, 2, 0.04);
    for (const x of [-H, H]) for (const y of [-H, H]) for (const z of [-H, H]) {
        const cap = shadowy(new THREE.Mesh(capGeo, frameMat));
        cap.position.set(x, y, z);
        spin.add(cap);
    }

    // Glass walls
    const paneGeo = new THREE.PlaneGeometry(S - T * 0.6, S - T * 0.6);
    for (const [x, z] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const pane = new THREE.Mesh(paneGeo, glassMat);
        pane.position.set(x * (H - 0.02), 0, z * (H - 0.02));
        if (x) pane.rotation.y = Math.PI / 2;
        spin.add(pane);
    }

    // Top plate with a square window cut into the front-left corner
    const WIN = { half: 0.3, x: -0.3, y: -0.3 }; // shape coords; y maps to -z once the plate is laid flat
    const plateShape = squareShape(H - 0.02);
    plateShape.holes.push(squareHole(WIN.half, WIN.x, WIN.y));
    const plateGeo = new THREE.ExtrudeGeometry(plateShape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 });
    plateGeo.rotateX(-Math.PI / 2);
    const topPlate = shadowy(new THREE.Mesh(plateGeo, plateMat));
    topPlate.position.y = H - 0.06;
    spin.add(topPlate);

    const bezelShape = squareShape(WIN.half + 0.07, WIN.x, WIN.y);
    bezelShape.holes.push(squareHole(WIN.half, WIN.x, WIN.y));
    const bezelGeo = new THREE.ExtrudeGeometry(bezelShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 });
    bezelGeo.rotateX(-Math.PI / 2);
    const bezel = shadowy(new THREE.Mesh(bezelGeo, frameMat));
    bezel.position.y = H;
    spin.add(bezel);

    const windowPane = new THREE.Mesh(new THREE.PlaneGeometry(WIN.half * 2, WIN.half * 2), windowMat);
    windowPane.rotation.x = -Math.PI / 2;
    windowPane.position.set(WIN.x, H - 0.04, -WIN.y);
    spin.add(windowPane);

    const bottom = shadowy(new THREE.Mesh(new RoundedBoxGeometry(S, 0.08, S, 2, 0.02), plateMat));
    bottom.position.y = -H + 0.02;
    spin.add(bottom);

    // Dial on the back-right of the lid
    const dial = new THREE.Group();
    dial.position.set(0.42, H, -0.4);
    const dialBase = shadowy(new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.35, 0.08, 48), plateMat));
    dialBase.position.y = 0.04;
    const knurl = shadowy(new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.16, 28), knurlMat));
    knurl.position.y = 0.16;
    const dialCap = shadowy(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 40), frameMat));
    dialCap.position.y = 0.265;
    const dialRing = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.012, 8, 64), ringGlowMat);
    dialRing.rotation.x = Math.PI / 2;
    dialRing.position.y = 0.245;
    const notch = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 0.13), chipMat);
    notch.position.set(0, 0.295, 0.08);
    dial.add(dialBase, knurl, dialCap, dialRing, notch);
    spin.add(dial);

    // Status LEDs, each with a small glow sprite
    const glowTex = radialTexture();
    const ledHousing = shadowy(new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.07, 0.14, 2, 0.02), plateMat));
    ledHousing.position.set(0.5, H + 0.035, 0.42);
    spin.add(ledHousing);
    const ledGeo = new THREE.SphereGeometry(0.035, 16, 12);
    const ledGlowMat = new THREE.SpriteMaterial({ map: glowTex, color: 0xff3030, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, opacity: 0 });
    for (const dx of [-0.07, 0.07]) {
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(0.5 + dx, H + 0.075, 0.42);
        const ledGlow = new THREE.Sprite(ledGlowMat);
        ledGlow.position.copy(led.position);
        ledGlow.scale.setScalar(0.32);
        spin.add(led, ledGlow);
    }

    // Carry loop on the back-left corner
    const loop = shadowy(new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.028, 12, 32, Math.PI), frameMat));
    loop.position.set(-0.62, H + 0.03, -0.72);
    loop.rotation.y = Math.PI / 4;
    spin.add(loop);

    // Screws on the front-right post
    const screwGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 20);
    for (const y of [0.22, -0.28]) {
        const screw = new THREE.Mesh(screwGeo, screwMat);
        screw.rotation.z = Math.PI / 2;
        screw.position.set(H + T / 2 + 0.012, y, H);
        spin.add(screw);
    }

    // Inside: crossed glass baffles, a white chip, and the core
    const baffleGeo = new THREE.PlaneGeometry(S * 1.3, S - 0.35);
    for (const r of [Math.PI / 4, -Math.PI / 4]) {
        const baffle = new THREE.Mesh(baffleGeo, innerGlassMat);
        baffle.rotation.y = r;
        spin.add(baffle);
    }
    const chip = shadowy(new THREE.Mesh(new RoundedBoxGeometry(0.8, 0.07, 0.55, 2, 0.02), chipMat));
    chip.position.y = -H + 0.1;
    spin.add(chip);

    const core = new THREE.Group();
    core.add(new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.46), coreMat));
    core.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.74, 0.74, 0.74)), lineMat));
    spin.add(core);

    const coreLight = new THREE.PointLight(0xffffff, 2.5, 7, 1.6);
    spin.add(coreLight);

    // Glow: no post-processing (it would paint the canvas background), so additive sprites stand in for bloom
    const haloMat = new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(2.4);
    halo.renderOrder = 10;
    spin.add(halo);
    const auraMat = new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, toneMapped: false });
    const aura = new THREE.Sprite(auraMat);
    aura.scale.setScalar(4);
    aura.renderOrder = 11;
    drift.add(aura);

    // ---------- Floor: shadow only, plus a lime pool of light and shockwaves ----------
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = FLOOR_Y;
    floor.receiveShadow = true;
    scene.add(floor);

    const poolMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, toneMapped: false });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 3.8), poolMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = FLOOR_Y + 0.005;
    scene.add(pool);

    const ringGeo = new THREE.RingGeometry(0.96, 1, 128);
    const rings: { ring: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>; age: number; }[] = [];
    const spawnRing = () => {
        const mat = new THREE.MeshBasicMaterial({
            color: lime, transparent: true, depthWrite: false, side: THREE.DoubleSide,
            toneMapped: false, blending: poolMat.blending,
        });
        const ring = new THREE.Mesh(ringGeo, mat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = FLOOR_Y + 0.01;
        scene.add(ring);
        rings.push({ ring, age: 0 });
    };

    // ---------- Theme: follow whatever the page background actually is ----------
    let isDark = false;
    const applyTheme = () => {
        const bg = new THREE.Color(getComputedStyle(document.body).backgroundColor);
        isDark = bg.getHSL({ h: 0, s: 0, l: 0 }).l < 0.2;
        lime.set(isDark ? LIME.dark : LIME.light);

        for (const m of [glassMat, innerGlassMat, windowMat, limeTrimMat]) { m.color.copy(lime); m.emissive.copy(lime); }
        coreMat.emissive.copy(lime);
        ringGlowMat.emissive.copy(lime);
        lineMat.color.copy(lime);
        coreLight.color.copy(lime);
        haloMat.color.copy(lime);
        auraMat.color.copy(lime);
        poolMat.color.copy(lime);
        poolMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
        poolMat.needsUpdate = true;
        floorMat.opacity = isDark ? 0.55 : 0.22;

        hemi.intensity = isDark ? 0.35 : 0.9;
        key.intensity = isDark ? 1.6 : 2.4;
        rim.intensity = isDark ? 1.4 : 0.8;
        scene.environmentIntensity = isDark ? 0.45 : 0.9;
    };
    applyTheme();
    const onSchemeChange = () => requestAnimationFrame(applyTheme);
    darkScheme.addEventListener('change', onSchemeChange);
    const themeObserver = new MutationObserver(onSchemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    // ---------- Sizing: keep the cube and its shadow in frame ----------
    const resize = () => {
        const w = wrap.clientWidth, h = wrap.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const span = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const dist = Math.max(4.6 / span, 4 / (span * camera.aspect));
        const dir = camera.position.clone().sub(target).normalize();
        camera.position.copy(target).addScaledVector(dir, dist);
        if (controls) controls.minDistance = controls.maxDistance = dist;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();

    // ---------- Waking it ----------
    let surge = 0;
    let unstableUntil = 0;
    let statusTimer = 0;
    const wakeTimes: number[] = [];

    const wake = () => {
        const now = performance.now();
        wakeTimes.push(now);
        while (now - wakeTimes[0] > 6000) wakeTimes.shift();
        surge = Math.min(1.6, surge + 1);
        spawnRing();

        if (wakeTimes.length >= 4) unstableUntil = now + 4200;
        onStatus(now < unstableUntil ? 'unstable' : 'awake');

        window.clearTimeout(statusTimer);
        statusTimer = window.setTimeout(() => {
            onStatus('dormant');
            wakeTimes.length = 0;
        }, Math.max(2600, unstableUntil - now));
    };

    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.02;
    const ndc = new THREE.Vector2();
    const hitsCube = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        return raycaster.intersectObject(spin, true).some(hit => !(hit.object instanceof THREE.Sprite));
    };
    let downAt: { x: number; y: number; } | null = null;
    const onPointerDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY }; };
    const onPointerUp = (e: PointerEvent) => {
        if (!downAt) return;
        const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
        downAt = null;
        if (moved < 6 && hitsCube(e)) wake();
    };
    const onPointerMove = (e: PointerEvent) => {
        if (e.buttons || e.pointerType !== 'mouse') return;
        canvas.style.cursor = hitsCube(e) ? 'pointer' : controls ? 'grab' : '';
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointermove', onPointerMove);

    // ---------- Loop (paused while scrolled out of view) ----------
    let last = performance.now();
    let t = 0, spinAngle = 0, coreAngle = 0, dialAngle = 0;

    const frame = () => {
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        const calm = reduceMotion.matches;
        const unstable = now < unstableUntil;

        surge *= Math.exp(-dt * 1.4);
        const s = Math.min(surge, 1.2);

        const bob = calm ? 0 : Math.sin(t * 0.9) * 0.14 + Math.sin(t * 0.37) * 0.05;
        drift.position.y = 0.3 + bob + s * 0.12;
        tilt.rotation.x = 0.3 + (calm ? 0 : Math.sin(t * 0.5) * 0.03);

        spinAngle += dt * (calm ? 0.04 : 0.16 + s * 0.9);
        spin.rotation.y = spinAngle;
        coreAngle += dt * (calm ? 0.1 : 0.5 + s * 7);
        core.rotation.set(coreAngle * 0.7, coreAngle, 0);
        dialAngle += dt * (0.05 + s * 3);
        dial.rotation.y = dialAngle;

        if (unstable && !calm) {
            spin.position.set((Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03);
        } else {
            spin.position.set(0, 0, 0);
        }

        const flicker = unstable && Math.random() < 0.25 ? 0.2 : 1;
        coreMat.emissiveIntensity = (2.6 + s * 6) * flicker;
        glassMat.emissiveIntensity = (isDark ? 0.16 : 0.22) + s * 1.0;
        innerGlassMat.emissiveIntensity = 0.12 + s * 0.6;
        windowMat.emissiveIntensity = 1.0 + s * 4;
        limeTrimMat.emissiveIntensity = (isDark ? 0.5 : 0.45) + s * 2;
        ringGlowMat.emissiveIntensity = 2.2 + s * 4;
        coreLight.intensity = (2.5 + s * 30) * flicker;
        haloMat.opacity = Math.min(1, ((isDark ? 0.55 : 0.35) + s * 0.5) * flicker);
        auraMat.opacity = (isDark ? 0.14 : 0.08) + s * 0.2;

        const blink = (t % 2.4) < 0.14;
        ledMat.emissiveIntensity = unstable ? (Math.random() < 0.5 ? 6 : 3) : blink ? 5 : 0.15;
        ledGlowMat.opacity = unstable || blink ? 0.9 : 0;

        const height = drift.position.y - FLOOR_Y;
        pool.scale.setScalar(1 + (height - 2.25) * 0.4 + s * 0.4);
        poolMat.opacity = Math.min(1, (isDark ? 0.22 : 0.24) + s * 0.5);

        for (let i = rings.length - 1; i >= 0; i--) {
            const r = rings[i];
            r.age += dt;
            const k = r.age / 1.6;
            if (k >= 1) {
                scene.remove(r.ring);
                r.ring.material.dispose();
                rings.splice(i, 1);
                continue;
            }
            r.ring.scale.setScalar(1 + k * 1.6);
            r.ring.material.opacity = (1 - k) * (1 - k) * (isDark ? 0.9 : 0.7);
        }

        controls?.update();
        renderer.render(scene, camera);
    };

    const visibility = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            last = performance.now();
            renderer.setAnimationLoop(frame);
        } else {
            renderer.setAnimationLoop(null);
        }
    });
    visibility.observe(wrap);

    const dispose = () => {
        renderer.setAnimationLoop(null);
        visibility.disconnect();
        resizeObserver.disconnect();
        themeObserver.disconnect();
        darkScheme.removeEventListener('change', onSchemeChange);
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointerup', onPointerUp);
        canvas.removeEventListener('pointermove', onPointerMove);
        window.clearTimeout(statusTimer);
        controls?.dispose();
        scene.traverse(obj => {
            if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
                obj.geometry.dispose();
                const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
                mats.forEach(m => m.dispose());
            } else if (obj instanceof THREE.Sprite) {
                obj.material.dispose();
            }
        });
        ringGeo.dispose();
        glowTex.dispose();
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
    };

    return { wake, dispose };
}

function squareShape(half: number, cx = 0, cy = 0) {
    const s = new THREE.Shape();
    s.moveTo(cx - half, cy - half); s.lineTo(cx + half, cy - half);
    s.lineTo(cx + half, cy + half); s.lineTo(cx - half, cy + half); s.closePath();
    return s;
}

function squareHole(half: number, cx: number, cy: number) {
    const p = new THREE.Path();
    p.moveTo(cx - half, cy - half); p.lineTo(cx - half, cy + half);
    p.lineTo(cx + half, cy + half); p.lineTo(cx + half, cy - half); p.closePath();
    return p;
}

function radialTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d')!;
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.35, 'rgba(255,255,255,.45)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}
