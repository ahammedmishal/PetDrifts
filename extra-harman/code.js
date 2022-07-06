"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_base64_1 = require("react-native-base64");
var checkbox_1 = require("@react-native-community/checkbox");
var react_native_ble_plx_1 = require("react-native-ble-plx");
var styles_1 = require("./Styles/styles");
var react_native_2 = require("react-native");
react_native_2.LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
react_native_2.LogBox.ignoreAllLogs(); //Ignore all log notifications
var BLTManager = new react_native_ble_plx_1.BleManager();
var SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
var MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';
var BOX_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';
function StringToBool(input) {
    if (input == '1') {
        return true;
    }
    else {
        return false;
    }
}
function BoolToString(input) {
    if (input == true) {
        return '1';
    }
    else {
        return '0';
    }
}
function App() {
    //Is a device connected?
    var _a = (0, react_1.useState)(false), isConnected = _a[0], setIsConnected = _a[1];
    //What device is connected?
    var _b = (0, react_1.useState)(), connectedDevice = _b[0], setConnectedDevice = _b[1];
    var _c = (0, react_1.useState)('Nothing Yet'), message = _c[0], setMessage = _c[1];
    var _d = (0, react_1.useState)(false), boxvalue = _d[0], setBoxValue = _d[1];
    // Scans availbale BLT Devices and then call connectDevice
    function scanDevices() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                react_native_1.PermissionsAndroid.request(react_native_1.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Permission Localisation Bluetooth',
                    message: 'Requirement for Bluetooth',
                    buttonNeutral: 'Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }).then(function (answere) {
                    console.log('scanning');
                    // display the Activityindicator
                    BLTManager.startDeviceScan(null, null, function (error, scannedDevice) {
                        if (error) {
                            console.warn(error);
                        }
                        if (scannedDevice && scannedDevice.name == 'BLEExample') {
                            BLTManager.stopDeviceScan();
                            connectDevice(scannedDevice);
                        }
                    });
                    // stop scanning devices after 5 seconds
                    setTimeout(function () {
                        BLTManager.stopDeviceScan();
                    }, 5000);
                });
                return [2 /*return*/];
            });
        });
    }
    // handle the device disconnection (poorly)
    function disconnectDevice() {
        return __awaiter(this, void 0, void 0, function () {
            var isDeviceConnected, connectionStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Disconnecting start');
                        if (!(connectedDevice != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, connectedDevice.isConnected()];
                    case 1:
                        isDeviceConnected = _a.sent();
                        if (isDeviceConnected) {
                            BLTManager.cancelTransaction('messagetransaction');
                            BLTManager.cancelTransaction('nightmodetransaction');
                            BLTManager.cancelDeviceConnection(connectedDevice.id).then(function () {
                                return console.log('DC completed');
                            });
                        }
                        return [4 /*yield*/, connectedDevice.isConnected()];
                    case 2:
                        connectionStatus = _a.sent();
                        if (!connectionStatus) {
                            setIsConnected(false);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    //Function to send data to ESP32
    function sendBoxValue(value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                BLTManager.writeCharacteristicWithResponseForDevice(connectedDevice === null || connectedDevice === void 0 ? void 0 : connectedDevice.id, SERVICE_UUID, BOX_UUID, react_native_base64_1["default"].encode(value.toString())).then(function (characteristic) {
                    console.log('Boxvalue changed to :', react_native_base64_1["default"].decode(characteristic.value));
                });
                return [2 /*return*/];
            });
        });
    }
    //Connect the device and start monitoring characteristics
    function connectDevice(device) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('connecting to Device:', device.name);
                device
                    .connect()
                    .then(function (device) {
                    setConnectedDevice(device);
                    setIsConnected(true);
                    return device.discoverAllServicesAndCharacteristics();
                })
                    .then(function (device) {
                    //  Set what to do when DC is detected
                    BLTManager.onDeviceDisconnected(device.id, function (error, device) {
                        console.log('Device DC');
                        setIsConnected(false);
                    });
                    //Read inital values
                    //Message
                    device
                        .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
                        .then(function (valenc) {
                        setMessage(react_native_base64_1["default"].decode(valenc === null || valenc === void 0 ? void 0 : valenc.value));
                    });
                    //BoxValue
                    device
                        .readCharacteristicForService(SERVICE_UUID, BOX_UUID)
                        .then(function (valenc) {
                        setBoxValue(StringToBool(react_native_base64_1["default"].decode(valenc === null || valenc === void 0 ? void 0 : valenc.value)));
                    });
                    //monitor values and tell what to do when receiving an update
                    //Message
                    device.monitorCharacteristicForService(SERVICE_UUID, MESSAGE_UUID, function (error, characteristic) {
                        if ((characteristic === null || characteristic === void 0 ? void 0 : characteristic.value) != null) {
                            setMessage(react_native_base64_1["default"].decode(characteristic === null || characteristic === void 0 ? void 0 : characteristic.value));
                            console.log('Message update received: ', react_native_base64_1["default"].decode(characteristic === null || characteristic === void 0 ? void 0 : characteristic.value));
                        }
                    }, 'messagetransaction');
                    //BoxValue
                    device.monitorCharacteristicForService(SERVICE_UUID, BOX_UUID, function (error, characteristic) {
                        if ((characteristic === null || characteristic === void 0 ? void 0 : characteristic.value) != null) {
                            setBoxValue(StringToBool(react_native_base64_1["default"].decode(characteristic === null || characteristic === void 0 ? void 0 : characteristic.value)));
                            console.log('Box Value update received: ', react_native_base64_1["default"].decode(characteristic === null || characteristic === void 0 ? void 0 : characteristic.value));
                        }
                    }, 'boxtransaction');
                    console.log('Connection established');
                });
                return [2 /*return*/];
            });
        });
    }
    return (<react_native_1.View>
      <react_native_1.View style={{ paddingBottom: 200 }}></react_native_1.View>

      {/* Title */}
      <react_native_1.View style={styles_1.styles.rowView}>
        <react_native_1.Text style={styles_1.styles.titleText}>BLE Example</react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{ paddingBottom: 20 }}></react_native_1.View>

      {/* Connect Button */}
      <react_native_1.View style={styles_1.styles.rowView}>
        <react_native_1.TouchableOpacity style={{ width: 120 }}>
          {!isConnected ? (<react_native_1.Button title="Connect" onPress={function () {
                scanDevices();
            }} disabled={false}/>) : (<react_native_1.Button title="Disonnect" onPress={function () {
                disconnectDevice();
            }} disabled={false}/>)}
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      <react_native_1.View style={{ paddingBottom: 20 }}></react_native_1.View>

      {/* Monitored Value */}

      <react_native_1.View style={styles_1.styles.rowView}>
        <react_native_1.Text style={styles_1.styles.baseText}>{message}</react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={{ paddingBottom: 20 }}></react_native_1.View>

      {/* Checkbox */}
      <react_native_1.View style={styles_1.styles.rowView}>
        <checkbox_1["default"] disabled={false} value={boxvalue} onValueChange={function (newValue) {
            // setBoxValue(newValue);
            sendBoxValue(BoolToString(newValue));
        }}/>
      </react_native_1.View>
    </react_native_1.View>);
}
exports["default"] = App;
