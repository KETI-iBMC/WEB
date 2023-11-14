/*
 * Copyright (C) 2021 Aspeed Tech. Authors
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 */
import AspeedJpeg from "./decoder_js.js";
import Module from './decoder_wasm.js';

var dec = null;
var wasm = {mod: null, srcPtr: 0, outPtr: 0, size: 0, outbuf: null};
var times = [];
var old_frame = 0;

Module().then(m => {
    m._init();
    wasm.mod = m;
});

if (wasm.mod == null)
    dec = new AspeedJpeg();

function _fps_cal() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    console.debug("FPS:", times.length);
}

function _getWasmBuffer(_wasm, size) {
    if (_wasm.size < size) {
        if (_wasm.srcPtr)
            _wasm.mod._free(_wasm.srcPtr);
        if (_wasm.outPtr)
            _wasm.mod._free(_wasm.outPtr);

        _wasm.srcPtr = _wasm.mod._malloc(size * 2);
        _wasm.outPtr = _wasm.mod._malloc(size * 4);
        _wasm.size = size;
        _wasm.outbuf = new Uint8Array(_wasm.mod.HEAPU8.buffer, _wasm.outPtr, size * 4);
        _wasm.outbuf.fill(0xff);
    }
}

export function decode(header, inbuf) {
    if (wasm.mod == null) {
        dec.decode(header, inbuf);
    } else {
        _getWasmBuffer(wasm, header.width * header.height);
        wasm.mod.HEAPU8.set(inbuf, wasm.srcPtr);
        wasm.mod._decode(wasm.srcPtr, inbuf.length, wasm.outPtr,
            header.width, header.height, header.mode420,
            header.selector, header.advance_selector);
    }
    console.debug("use %s, ", wasm.mod ? "wasm":"js", header);
    console.debug("FPS:", times.length);
    if (old_frame+1 != header.frame)
        console.warn("discontinue frame count: %d -> %d", old_frame, header.frame);
    old_frame = header.frame;
    _fps_cal();
    return (wasm.mod) ? wasm.outbuf : dec.outbuf;
}
