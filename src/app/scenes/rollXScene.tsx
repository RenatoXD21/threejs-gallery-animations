'use client'

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { ICoordenate2d, IDimension } from '../interfaces'
import { colorList, getRandomFromList, alignListInCircularCoordinate, createScreens, createScreen, getCircleMoveAngle } from '../utils';
import gsap from 'gsap';

export default function RollXScene() {

    let mousePosition: ICoordenate2d = { x: 0, y: 0 }
    let renderer: THREE.Renderer
    let camera: THREE.Camera

    const sceneDesign = () => {
        const scene = new THREE.Scene();

        const roll = new THREE.Group()

        roll.position.z = 6
        roll.rotation.y = Math.PI

        let rollCurrentRotation: number = roll.rotation.y
        let rollTargetRotation: number = rollCurrentRotation

        const rollScreenCount = 30

        const screens = createScreens(rollScreenCount)

        const coordinates = alignListInCircularCoordinate(rollScreenCount, 5)

        screens.forEach((screen, index) => {
            screen.position.x = coordinates[index].y
            screen.position.z = coordinates[index].x

            roll.add(screen)
        })

        scene.add(roll)

        const effects = () => {
            window.addEventListener('mousemove', (event) => {
                mousePosition = {
                    x: event.clientX / window.innerWidth,
                    y: event.clientY / window.innerHeight
                }
            })

            window.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight') rollTargetRotation  = rollCurrentRotation - getCircleMoveAngle(rollScreenCount)
                if (event.key === 'ArrowLeft') rollTargetRotation  = rollCurrentRotation + getCircleMoveAngle(rollScreenCount)

                gsap.to(roll.rotation, {duration: 1, y: rollTargetRotation})
                rollCurrentRotation = rollTargetRotation
            })
        }

        const animate = () => {
            requestAnimationFrame(animate);

            screens.forEach(screen => screen.lookAt(camera.position))
            camera.lookAt(screens[0].position)

            renderer.render(scene, camera);
        }

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
        camera.position.z = 0
        camera.position.y = 0
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