cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.bcsphere.bluetooth/www/bluetooth.js",
        "id": "org.bcsphere.bluetooth.bluetooth",
        "merges": [
            "navigator.bluetooth"
        ]
      },
      {
      "file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
      "id": "org.apache.cordova.camera.Camera",
      "clobbers": [
                   "Camera"
                   ]
      },
      {
      "file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
      "id": "org.apache.cordova.camera.CameraPopoverOptions",
      "clobbers": [
                   "CameraPopoverOptions"
                   ]
      },
      {
      "file": "plugins/org.apache.cordova.camera/www/Camera.js",
      "id": "org.apache.cordova.camera.camera",
      "clobbers": [
                   "navigator.camera"
                   ]
      },
      {
      "file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
      "id": "org.apache.cordova.camera.CameraPopoverHandle",
      "clobbers": [
                   "CameraPopoverHandle"
                   ]
      }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.bcsphere.bluetooth": "0.2.1"
}
// BOTTOM OF METADATA
});