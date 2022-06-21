import ImageObjectDetection from "../view/image/ObjectDetection";
import VideoObjectDetection from "../view/video/ObjectDetection";

const ROUTE = [
  {
    name: 'image-object-detection',
    path: '/image/object-detection',
    component: ImageObjectDetection
  },
  {
    name: 'video-object-detection',
    path: '/video/object-detection',
    component: VideoObjectDetection
  }
]

export default ROUTE;