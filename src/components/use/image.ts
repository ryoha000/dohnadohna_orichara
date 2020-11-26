const ImageSize = 1024

interface TRBL {
  top: number
  right: number
  bottom: number
  left: number
}

const useImage = () => {
  const fileURL = 'lbpcascade_animeface.xml'
  const utils = new Utils('errorText')
  utils.createFileFromUrl(fileURL, fileURL, () => {})
  const main = (src: string) => {
    return new Promise<string>((resolve) => {
      const img = new Image()
      img.onload = () => {
        const mat = cv.imread(img)
        const dst = new cv.Mat()
    
      // 顔認識
        const faces = new cv.RectVector();
        const classifier = new cv.CascadeClassifier()
        classifier.load(fileURL);
        classifier.detectMultiScale(mat, faces, 1.1, 3, 0)
  
        // demo
        for (let i = 0; i < faces.size(); i++) {
          const face = faces.get(i);
          const point1 = new cv.Point(face.x, face.y);
          const point2 = new cv.Point(face.x + face.width, face.y + face.height);
          cv.rectangle(mat, point1, point2, [255, 0, 0, 255]);
        }
        // cv.imshow('resultCanvas', mat);  // Set Element ID
  
        const face = getMaxSizeFace(faces)
        const canvas = getFixedCanvas(face)
        resolve(canvas.toDataURL('image/png'))
      }
      img.src = src
    
      const getMaxSizeFace = (faces: cv.RectVector) => {
        let index = 0
        let maxSize = 0
        for (let i = 0; i < faces.size(); i++) {
          const face = faces.get(i);
          if (maxSize < face.width) {
            maxSize = face.width
            index = i
          }
        }
        return faces.get(index)
      }
    
      const getFixedCanvas = (rect: Rect) => {
        const canvas = document.createElement('canvas')
        canvas.width = 1024
        canvas.height = 1024
        const ctx = canvas.getContext('2d')
        const scale = ImageSize / img.height
        const centerX = rect.x + rect.width / 2
        const dx = ImageSize / 2 - centerX * scale
        ctx.drawImage(img, 0, 0, img.width, img.height, dx, 0, img.width * scale, 1024)
        return canvas
      }
    
      // 背景部分じゃない元サイズ由来の長方形座標を取得
      const getCharaRect = () => {
        // 各ピクセルの情報を取得
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        console.log(imageData)
    
        const rect: TRBL = { top: 0, right: 0, bottom: 0, left: imageData.width }
        let isRect = false
        for (let h = 0; h < imageData.height; h++) {
          let isChara = false
          let start = imageData.width
          let end = 0
          for (let w = 0; w < imageData.width; w++) {
            if (!isChara && imageData.data[4 * (h * imageData.width + w + 1) - 1] !== 0) {
              console.log('not 0', h, w, 4 * (h * imageData.width + w + 1) - 1)
              start = w + 1
              isChara = true
            }
            if (isChara && imageData.data[4 * (h * imageData.width + w + 1)] === 0) {
              end = w + 1
              break
            }
          }
          if (start === imageData.width) {
            if (isRect) {
              rect.bottom = h + 1
              console.log('break')
              break
            } else {
              rect.top = h + 1
            }
          }
          if (start < rect.left) {
            isRect = true
            rect.left = start
          }
          if (end > rect.right) {
            rect.right = end
          }
        }
        console.log(rect)
      }
    })
  }
  return { main }
}

export default useImage
