/*
 * Copyright (C) 2021 Aspeed Tech. Authors
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 */
export default class YUV2RGB {
    static convertYUVtoRGB(mbx, mby, mode420, width, height, YUVTile, YUV, ARGB) {
        let i, j, pos, m, n, y, cb, cr, pixel_x, pixel_y, temp;

        if (mode420 == 0) { // YUV 444
            let width_height_mul = width * height * 4;
            let py = YUVTile;
            let pcb = YUVTile.subarray(64, 128);
            let pcr = YUVTile.subarray(128);

            pixel_x = mbx * 8;
            pixel_y = mby * 8;
            pos = (pixel_y * width) + pixel_x;
            temp = width - pixel_x;
            if ((temp == 0) || (temp > 8))
                temp = 8;

            for (j = 0; j < 8; j++) {
                n = pos << 2;
                m = j << 3;
                for (i = 0; i < temp; i++, n+=4, m++) {
                    if (n < width_height_mul) { // point is inside this.FRAME
                        /* save YUV values for pass 2 */
                        YUV[(pos + i) * 3] = y = py[m];
                        YUV[(pos + i) * 3 + 1] = cb = pcb[m];
                        YUV[(pos + i) * 3 + 2] = cr = pcr[m];

                        ARGB[n] = Math.floor(y + 1.402 * (cr - 128)).clamp(0, 255);
                        ARGB[n + 1] = Math.floor(y - 0.3441363 * (cb - 128) - (0.71413636 * (cr - 128))).clamp(0, 255);
                        ARGB[n + 2] = Math.floor(y + 1.772 * (cb - 128)).clamp(0, 255);
                        //ARGB[n + 3] = 0xff;

                        //console.log(n, this.rangeLimitTable[r], this.rangeLimitTable[g], this.rangeLimitTable[b]);
                    }
                }

                pos += width;
            }
        } else { // YUV 420
            let py420 = [];
            py420[0] = YUVTile.subarray(0, 64); // It's a [ 4 x 64 ] array
            py420[1] = YUVTile.subarray(64, 128); // It's a [ 4 x 64 ] array
            py420[2] = YUVTile.subarray(128, 192); // It's a [ 4 x 64 ] array
            py420[3] = YUVTile.subarray(192, 256); // It's a [ 4 x 64 ] array
            let pcb = YUVTile.subarray(256, 320);
            let pcr = YUVTile.subarray(320);

            // Get tile starting pixel position
            pixel_x = mbx * 16;
            pixel_y = mby * 16;
            pos = (pixel_y * width) + pixel_x;

            let index = 0;
            //static array's
            let inds = YUV2RGB.inds;
            let s = YUV2RGB.s;
            let mArray = YUV2RGB.mArray;
            // for 800x600 support
            let jMax = 16;
            if ((height == 608) && (mby == 37))
                jMax = 8;

            jMax--;
            do {// vertical axis
                n = (pos ) * 4;
                i = 15; //16 -1
                do { // horizontal axis
                    m = mArray[index];

                    y = py420[s[index]][inds[index]];
                    cb = pcb[m];
                    cr = pcr[m];

                    ARGB[n] = Math.floor(y + 1.402 * (cr - 128)).clamp(0, 255);
                    ARGB[n + 1] = Math.floor(y - 0.3441363 * (cb - 128) - (0.71413636 * (cr - 128))).clamp(0, 255);
                    ARGB[n + 2] = Math.floor(y + 1.772 * (cb - 128)).clamp(0, 255);
                    //ARGB[n + 3] = 0xff;
                    index++;
                    n +=4;
                } while (i--);
                pos += width;
            } while (jMax--);
        }

    }

    static convertYUVToRGBPass2(mbx, mby, mode420, width, height, YUVTile, YUV, ARGB) {
        let i, j, pos, m, n, y, cb, cr, pixel_x, pixel_y, temp;

        if (mode420 == 0) {  // YUV 444
            let width_height_mul = width * height * 4;

            pixel_x = mbx * 8;
            pixel_y = mby * 8;
            pos = (pixel_y * width) + pixel_x;

            temp = width - pixel_x;
            if ((temp == 0) || (temp > 8))
                temp = 8;

            for (j = 0; j < 8; j++) {
                n = pos << 2;
                m = j << 3;
                for (i = 0; i < temp; i++, n+=4, m++) {
                    if (n < width_height_mul) { // point is inside this.FRAME
                        /* get the YUV value */
                        y = (YUV[(pos + i) * 3] + (YUVTile[m] - 128)).clamp(0, 255);
                        cb = (YUV[(pos + i) * 3 + 1] + (YUVTile[m + 64] - 128)).clamp(0, 255);
                        cr = (YUV[(pos + i) * 3 + 2] + (YUVTile[m + 128] - 128)).clamp(0, 255);

                        /* get RGB value from pre-calculated table */
                        ARGB[n] = Math.floor(y + 1.402 * (cr - 128)).clamp(0, 255);
                        ARGB[n + 1] = Math.floor(y - 0.3441363 * (cb - 128) - (0.71413636 * (cr - 128))).clamp(0, 255);
                        ARGB[n + 2] = Math.floor(y + 1.772 * (cb - 128)).clamp(0, 255);
                        //ARGB[n + 3] = 0xff;
                    }
                }

                pos += width;
            }
        } else {
            console.error("Receive Pass 2 data in YUV420 mode");
        }
    }

    static inds = new Array (0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,56,57,58,59,60,61,62,63,0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,56,57,58,59,60,61,62,63);
    static s = new Array(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3);
    static mArray = new Array(0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,56,57,57,58,58,59,59,60,60,61,61,62,62,63,63,56,56,57,57,58,58,59,59,60,60,61,61,62,62,63,63);
}
