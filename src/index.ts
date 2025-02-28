import {
    createSession,
    createViewport,
    addListener,
  EVENTTYPE,
    ORTHOGRAPHIC_CAMERA_DIRECTION,
    BUSY_MODE_DISPLAY,
    SPINNER_POSITIONING,
    ISessionApi
} from "@shapediver/viewer";

let globalSession: ISessionApi;

(async () => {
   
    // Initialize globalSession
    globalSession = await createSession({
        ticket: "6c935d43c5ea2c42d0c869366e253896343ad55925f92009a6ffa1a167fe33b6e8e7940c3a83cd2212796cc2d67edd031695b1dac6ce32b288d77e0fb10e72cf94672ad70d6d6d8a239b1325c19c13856e299a32c358369ddd70a620c33b9df787cd0278edc405-d4e489cf6de6acaceb409a26b9fa9be1",
        modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
    });

    const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvasElement) {
        console.error("Canvas element not found");
        return;
    }    
    const viewport = await createViewport({
        canvas: canvasElement,
        branding: {
            backgroundColor: "white",
            spinnerPositioning: SPINNER_POSITIONING.BOTTOM_LEFT,
            busyModeDisplay: BUSY_MODE_DISPLAY.SPINNER
        },
    });
  
    const perspectiveCamera = viewport.camera!;
    // Add Zoom to Extents functionality
    const topCamera = viewport.createOrthographicCamera();
    topCamera.direction = ORTHOGRAPHIC_CAMERA_DIRECTION.TOP;

    const bottomCamera = viewport.createOrthographicCamera();
    bottomCamera.direction = ORTHOGRAPHIC_CAMERA_DIRECTION.BOTTOM;

    const leftCamera = viewport.createOrthographicCamera();
    leftCamera.direction = ORTHOGRAPHIC_CAMERA_DIRECTION.LEFT;

    const rightCamera = viewport.createOrthographicCamera();
    rightCamera.direction = ORTHOGRAPHIC_CAMERA_DIRECTION.RIGHT;

    const frontCamera = viewport.createOrthographicCamera();
    frontCamera.direction = ORTHOGRAPHIC_CAMERA_DIRECTION.FRONT;

    const backCamera = viewport.createOrthographicCamera();
    backCamera.direction = ORTHOGRAPHIC_CAMERA_DIRECTION.BACK;

    await new Promise((resolve) =>
        addListener(EVENTTYPE.RENDERING.BEAUTY_RENDERING_FINISHED, resolve)
      );

})();