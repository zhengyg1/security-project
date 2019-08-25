var openMemoryName = '_ZN3art7DexFile10OpenMemoryEPKhjRKNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEEjPNS_6MemMapEPKNS_10OatDexFileEPS9_';

Interceptor.attach(Module.findExportByName('libart.so', openMemoryName), {
    onEnter: function (args) {
        var begin = args[1];
        var address = parseInt(begin,16) + 0x20;
        var dex_size = Memory.readInt(ptr(address));
        console.log("start dump dex ----> begin:"+begin+"  dex_size :" + dex_size);
        //dump dex 到/data/data/pkg/目录下
        var file = new File("/data/data/com.min.ndk.sample/" + dex_size + ".dex", "wb");
        file.write(Memory.readByteArray(begin, dex_size));
        file.flush();
        file.close();
        console.log("end dump dex");
    },
    onLeave: function (retval) {
        if (retval.toInt32() > 0) {
            /* do something */
        }
    }
});
