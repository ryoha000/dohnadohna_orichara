declare namespace cv {
  function imread(img: Image): Mat;
  function imshow(canvasElementID: string, src: Mat): void
  function cvtColor(src: Mat, dst: Mat, maxValue: number): void
  function rectangle(dst: Mat, start: Point, end: Point, rgba: RGBA): void

  var COLOR_RGBA2GRAY: number

  class Mat {
  }
  class RectVector {
    size(): number
    get(index: number): Rect
  }
  class CascadeClassifier {
    load(file: string): void
    detectMultiScale(src: Mat, vector: RectVector, num: number, num: number, num: number): void
  }
  class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
      this.x = x
      this.y = y
    }
  }
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

type RGBA = [number, number, number, number]

declare class Utils {
  constructor(errorElementID: string) {}

  createFileFromUrl(fileURL: string, fileURL: string, callback: () => void): void
}
