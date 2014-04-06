/*
	Copyright 2013-2014, JUMA Technology

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/


var app = {
    state : "waiting_to_find",
    isOpenPreventLost : true,
    interval_rssi : "",
    interval_connect : "",
    isLoss : false,
    connect_state : false ,
    device : {},
    initialize: function() {
	    app.bindCordovaEvents();
    },
    
    bindCordovaEvents: function() {
        document.addEventListener('bcready', app.onBCReady, false);
		document.addEventListener('deviceconnected', app.onDeviceConnected, false);
		document.addEventListener('devicedisconnected', app.onBluetoothDisconnect, false);
		document.addEventListener('newdevice', app.addNewDevice, false);
		document.addEventListener('bluetoothstatechange', app.onBluetoothStateChange, false);
    },
    
    onBCReady: function() {
		if(!BC.bluetooth.isopen){
			if(API !== "ios"){
				BC.Bluetooth.OpenBluetooth(function(){
				});
			}else{					
				//alert("Please open your bluetooth first.");
			}
		}
    },
    
   	onBluetoothStateChange : function(){
		if(BC.bluetooth.isopen){
			//alert("your bluetooth has been opened successfully.");
			var scanOnOff = $("#scanOnOff");
			scanOnOff[0].selectedIndex = 0;
			scanOnOff.slider("refresh");
		}else{
			//alert("bluetooth is closed!");
			BC.Bluetooth.OpenBluetooth();
		}
	},
	
	onBluetoothDisconnect: function(arg){
		
        window.clearInterval(app.interval_rssi);
		$.mobile.changePage("searched.html","slideup");
	},
    
    onDeviceConnected : function(arg){
		var deviceAddress = arg.deviceAddress;
		
	},
    
    
     startScan : function(){
        
    	$('img#spinner').attr("src","img/searching.png").addClass('img-responsive spinner').next().show();
    	$('img#spinner').attr("onclick","app.stopScan()");
    	BC.Bluetooth.StartScan();
    },
    
    addStartDevice : function(){
        var deviceList = BC.bluetooth.devices;
        if(deviceList){
            for(var deviceKey in deviceList){
                app.addNewDevice({"deviceAddress":deviceKey});
            }
        }
        app.startScan();
    },
    
    addNewDevice: function(arg){
		var deviceAddress = arg.deviceAddress;
		var viewObj	= $("#user_view");
		var liTplObj=$("#li_tpl").clone();
		var newDevice = BC.bluetooth.devices[deviceAddress];
		$(liTplObj).attr("onclick","app.device_page('"+newDevice.deviceAddress+"')");
		liTplObj.show();
		
		for(var key in newDevice){
			if(key == "isConnected"){
				if(newDevice.isConnected){
					$("[dbField='"+key+"']",liTplObj).html("YES");
				}
				$("[dbField='"+key+"']",liTplObj).html("NO");
			}else{
				$("[dbField='"+key+"']",liTplObj).html(newDevice[key]);
			}
		}
		viewObj.append(liTplObj);
	},
    
    stopScan : function(){
    	$('img#spinner').attr("src","img/arrow.png").removeClass('spinner').next().hide();
    	$('img#spinner').attr("onclick","app.startScan()");
    	BC.Bluetooth.StopScan();
    },
    
    device_page: function(deviceAddress){
    	if(deviceAddress){
    		app.device = BC.bluetooth.devices[deviceAddress];
    		
			BC.Bluetooth.StopScan();
    	}
    	app.device.connect(app.connectSuccess);
    	
    	
    },
    
  connectSuccess : function()
  {
	app.device.discoverServices(function(){
		var service = app.device.getServiceByUUID("ffe0")[0];
		service.discoverCharacteristics(function(){
			service.characteristics[0].subscribe(app.onNotify);
		});
	},function(){});
	$.mobile.changePage("picture.html","slideup");
  },

    onNotify:function(data){

		var value = data.value.getHexString();
		if( value == "20"){
            
		    navigator.camera.getPicture(app.onPhotoDataSuccess, null, {quality: 50,destinationType:Camera.DestinationType.DATA_URL });
		}else{
			
		}
    },

//    function capturePhoto() {
//        navigator.camera.getPicture(app.onPhotoDataSuccess, null, {
//                                    quality : 80,
//                                    destinationType : destinationType.FILE_URI,//这里要用FILE_URI，才会返回文件的URI地址
//                                    sourceType : Camera.PictureSourceType.CAMERA,
//                                    allowEdit : true,
//                                    encodingType : Camera.EncodingType.JPEG,
//                                    popoverOptions : CameraPopoverOptions,  
//                                    targetWidth : 1366,  
//                                    targetHeight : 768,  
//                                    saveToPhotoAlbum : true });
//    },
	
};
