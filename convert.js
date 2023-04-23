let oldjson = require('./realtime-mobile.json')
let osvid = require('./osvid.json')
let bvid = require('./bvid.json')

let newjson = {
    "os": [],
    "browser_versions": bvid.browser_versions,
    "os_version_id": osvid.os_version_id
}

oldjson.os.forEach(obj => {
    let newobj = {
        "os_id":obj.os_id,
        "name":obj.name,
        "image":obj.image,
        "manufacturers": []
    }
    obj.manufacturers.forEach(mf => {
        let newmf = {
            "manufacturer_id" : mf.manufacturer_id,
            "name" : mf.name,
            "os_versions": {}
        }
        mf.devices.forEach(device => {
            device.os_versions.forEach(os_version => {
                if(!newmf.os_versions[os_version.os_version_id])
                newmf.os_versions[os_version.os_version_id] = []
                newmf.os_versions[os_version.os_version_id].push({
                    "device_id": device.device_id,
                    "device_type": device.device_type,
                    "resolution_id": device.resolution_id,
                    "name": device.name,
                    "browser_versions":os_version.browser_versions,
                })
            })
        })
        newobj.manufacturers.push(newmf)
    })
    newjson.os.push(newobj)
})

const fs = require('fs');

const jsonString = JSON.stringify(newjson);

fs.writeFile('new.json', jsonString, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });