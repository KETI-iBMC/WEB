# aspeed_codec
A javascript decoder which supports aspeed jpeg.
The pure javascript(lib/decoder_js.js) and webassembly(lib/decoder_wasm.*) implemenattions are both included. webassembly one will be used if possbile.

# Updates
1.0.0 - 2021-12-03
* Initial release

# Steps
## Compile your webassembly module

Although the webassembly module is ready, you can also modify and update by yourself.

Make sure your [emsdk](https://emscripten.org/docs/getting_started/downloads.html) environment is ready first.

      $ emcc src/decoder.c -o lib/decoder_wasm.js -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXPORTED_FUNCTIONS="['_malloc', '_free']" -O3

### Required Emscripten flags
The table below explains Emscripten-specific build flags required to build this sample:

| Flag | Description |
|------|-------------|
| `-s ALLOW_MEMORY_GROWTH=1` | Allows the total amount of memory used to change depending on the demands of the application. |
| `-s EXPORT_ES6=1` | Flag will include the necessary export object expected by the import statement.|
| `-s MODULARIZE=1` | Flag will wrap the generated JavaScript code’s `Module` object in a function. EXPORT_ES6 requires MODULARIZE to be set.|
| `-s EXPORTED_FUNCTIONS="['_malloc', '_free']"` | Export function, _malloc/_free, to get memory for wasm module usage.|

## Example Usage

```js
import {decode} from "./lib/decoder.js";

let outbuf = decode(
      header: {
            frame: sequence_number,
            mode420: mode,
            selector: sel,
            advance_selector: adv_sel,
            width: width,
            height: height,
      },
      buffer: data
);
```
* frame: sequence number of the aspeed jpeg frame, which should continuous increase.
* mode420: 1 for 420, and 0 for 444
* selector: [0~11], the quality of the compressed data which should be the same with the one that video engine used.
* advance_selector: [0~11], the quality of pass-2 compressed data which should be the same with the one that video engine used.
* width: width of the aspeed jpeg
* height: height of the aspeed jpeg
* buffer: the data of the aspeed video engine, which includes aspeed jpeg header and aspeed jpeg data.

# Data format

Please refer to `Video stream data format – ASPEED mode
compression` of `SDK User Guide` of [aspeed sdk](https://github.com/AspeedTech-BMC/openbmc/releases/).
