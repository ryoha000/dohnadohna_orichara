<script lang="ts">
	import { onMount } from "svelte";
	let canvas: HTMLCanvasElement;
	onMount(() => {
		const img = new Image()
		img.onload = () => {
			// gray scale
			canvas.getContext('2d').drawImage(img, 0, 0, 1024, 1024)
			const mat = cv.imread(img)
			const dst = new cv.Mat()
			cv.cvtColor(mat, dst, window.cv.COLOR_RGBA2GRAY);
			window.cv.imshow('resultCanvas', dst);  // Set Element ID

			try {

				// 顔認識
				const fileURL = 'lbpcascade_animeface.xml'
				const utils = new Utils('errorText')
				utils.createFileFromUrl(fileURL, fileURL, () => {
					console.log('Face Cascade File Loaded');
					const faces = new cv.RectVector();
					const classifier = new cv.CascadeClassifier()
					classifier.load(fileURL);
					classifier.detectMultiScale(mat, faces, 1.1, 3, 0)
					console.log(faces.size())
					for (let i = 0; i < faces.size(); i++) {
						const face = faces.get(i);
						console.log(face)
						const point1 = new cv.Point(face.x, face.y);
						const point2 = new cv.Point(face.x + face.width, face.y + face.height);
						cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
						window.cv.imshow('resultCanvas', dst);  // Set Element ID
					}
				})
			} catch (e) {
				console.error(e)
			}
		}
		img.src = '/sample.jpg'
	})
</script>

<div>
	<canvas bind:this="{canvas}" width="1024" height="1024"></canvas>
	<canvas id="resultCanvas" width="1024" height="1024"></canvas>
	<textarea id="errorText" />
</div>
