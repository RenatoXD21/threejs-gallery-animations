'use client'

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { ICoordenate2d, IDimension } from '../interfaces'
import { colorList, getRandomFromList, alignListInCircularCoordinate, createScreens } from '../utils';

export default function RollXScene() {

    let mousePosition: ICoordenate2d = { x: 0, y: 0 }
    let renderer: THREE.Renderer
    let camera: THREE.Camera

    const sceneDesign = () => {
        const scene = new THREE.Scene();

        const roll = new THREE.Group()
        
        roll.position.z = -8
        roll.rotation.y = Math.PI

        const screens = createScreens(6)
        
        const coordinates = alignListInCircularCoordinate(6, 3)

        console.log(coordinates)

        screens.forEach((screen, index) => {
            screen.position.x = coordinates[index].y
            screen.position.z = coordinates[index].x

            roll.add(screen)
        }) 

        scene.add(screens[0])

        const effects = () => {
            window.addEventListener('mousemove', (event) => {
                mousePosition = {
                    x: event.clientX / window.innerWidth,
                    y: event.clientY / window.innerHeight
                }
            })

            window.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight') roll.rotation.y += Math.PI / 10

                if (event.key === 'ArrowLeft') roll.rotation.y -= Math.PI / 10
            })
        }

        const animate = () => {
            requestAnimationFrame(animate);

            // square.lookAt(camera.position)
            // square2.lookAt(camera.position)
            // square3.lookAt(camera.position)

            renderer.render(scene, camera);
        }

        // console.log(alignListInCircularCoordinate(5, 5))

        return { effects, animate }
    }

    const sceneEngine = () => {
        let displaySize: IDimension

        const displayView: HTMLDivElement | null = document.querySelector("#ViewDisplay");

        displayView ? displaySize = {
            width: displayView.offsetWidth - 15,
            height: displayView.offsetHeight - 15
        } : displaySize = {
            width: 0, height: 0
        }

        const canvas = document.querySelector('#Scene') as HTMLCanvasElement;

        canvas.style.borderRadius = '50px'
        canvas.style.width = `${displaySize.width}px`
        canvas.style.height = `${displaySize.height}px`

        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        renderer.setSize(displaySize.width, displaySize.height);

        camera = new THREE.PerspectiveCamera(75, displaySize.width / displaySize.height, 0.1, 1000);
    }

    useEffect(() => {
        const runScene = sceneDesign()

        sceneEngine()
        runScene.effects()
        runScene.animate()
    }, [])


    return (
        <canvas id='Scene'></canvas>
    )
}