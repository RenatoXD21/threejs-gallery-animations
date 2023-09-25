'use client'

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import {IDimension} from '../interfaces'

export default function RollXScene() {

    let renderer: THREE.Renderer
    let camera: THREE.Camera
    const scene = new THREE.Scene();

    const square = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 1, 1),
        new THREE.MeshBasicMaterial({color: 'red'})
    )
    square.position.z = -2

    scene.add(square)

    const animate = () => {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

    useEffect(() => {

        setTimeout(() => {

            let displaySize: IDimension

            const displayView: HTMLDivElement | null = document.querySelector("#ViewDisplay");

            displayView ? displaySize = {
                width: displayView.offsetWidth - 50,
                height: displayView.offsetHeight - 50
            }: displaySize ={
                width: 0, height: 0
            }

            const canvas = document.querySelector('#Scene') as HTMLCanvasElement;

            canvas.style.width = `${displaySize.width}px`
            canvas.style.height = `${displaySize.height}px`

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

            renderer.setSize(displaySize.width, displaySize.height);

            camera = new THREE.PerspectiveCamera(75, displaySize.width / displaySize.height, 0.1, 1000);

            animate();
        }, 150)
    })


    return (
        <canvas id='Scene'></canvas>
    )
}