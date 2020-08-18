declare module "react-html5-camera-photo" {
  import React from "react";

  interface CameraProps {
    /**
     * Callback called when the camera is started.
     */
    onCameraStart?(): void;

    /**
     * Callback called when the camera is stopped.
     */
    onCameraStop?(): void;

    /**
     * Callback called with the error object as parameter when error occur while
     * opening the camera. Often the permission.
     *
     * @param error
     */
    onCameraError?(error): void;

    /**
     * The function called when a photo is taken. the dataUri is passed as a
     * parameter.
     *
     * @param dataUri
     */
    onTakePhoto?(dataUri): void;

    /**
     * The function called when a photo is taken and the animation is done. the
     * dataUri is passed as a parameter.
     *
     * @param dataUri
     */
    onTakePhotoAnimationDone?(dataUri): void;

    /**
     * The ideal facing mode of the camera, environment or user.
     * Use FACING_MODES constant to get the right string.
     * Example :. FACING_MODES.ENVIRONMENT or FACING_MODES.USER
     */
    idealFacingMode?: FACING_MODES;

    /**
     * Object of the ideal resolution of the camera,
     * {width: Integer, height: Integer}.
     */
    idealResolution?: object;

    /**
     * If is true, the camera will start with his own maximum resolution.
     */
    isMaxResolution?: boolean;

    /**
     * If is true, the camera image will be mirror.
     */
    isImageMirror?: boolean;

    /**
     * If is true, the camera do not play click sound when the photo was taken.
     */
    isSilentMode?: boolean;

    /**
     * If is true, the camera image will be set fullscreen to force the maximum
     * width and height of the viewport.
     */
    isFullscreen?: boolean;

    /**
     *
     */
    isDisplayStartCameraError?: boolean;

    /**
     * Number of the factor resolution. Example, a sizeFactor of 1 get the same
     * resolution of the camera while sizeFactor of 0.5 get the half resolution
     * of the camera. The sizeFactor can be between range of ]0, 1].
     */
    sizeFactor?: number;

    /**
     * String used to get the desired image type between jpg or png. to specify
     * the imageType use the constant IMAGE_TYPES, for example to specify jpg
     * format use IMAGE_TYPES.JPG. Use IMAGE_TYPES constant to get the right
     * image type Example:. IMAGE_TYPES.JPG or IMAGE_TYPES.PNG
     */
    imageType?: IMAGE_TYPES;

    /**
     * Number used to get the desired compression when jpg is selected. choose a
     * compression between [0, 1], 1 is maximum, 0 is minimum.
     */
    imageCompression?: number;
  }

  const Camera: React.FC<CameraProps>;

  export default Camera;

  export enum FACING_MODES {
    ENVIRONMENT = "environment",
    USER = "user",
  }

  export enum IMAGE_TYPES {
    JPG = "jpg",
    PNG = "png",
  }
}
