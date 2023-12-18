/*
 * Copyright (C) 2021 Aspeed Tech. Authors
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 */

export default class HuffmanTable {
    constructor() {
        this.length = new Int8Array(17);
        this.minor_code = new Int16Array(17);
        this.major_code = new Int16Array(17);
        this.V = new Int16Array(65536);
        this.len = new Int8Array(65536);
    }

    static loadHuffmanTable(nrcode, value, huff_code, huff_code_low_byte) {
        let k, j, i, code = 0, code_index;
        let len;
        let ht = new HuffmanTable();

        for (i = 0, k = 1; k <= 16; k++) {
        	ht.length[k] = nrcode[k];
            for (j = 0, len =(ht.length[k] & 0x00FF); j < len; j++, i++) {
                ht.V[((((k & 0x00FF) << 8) | (j & 0x00FF))& 0x0000FFFF)] = value[i];
            }
            ht.minor_code[k] = code;

            ht.major_code[k] = ((code += len) - 1);
            code *= 2;
            if (len == 0) {
                ht.minor_code[k] = 0xffff;
                ht.major_code[k] = 0;
            }
        }

        ht.len[0] = 2;
        i = 2;
        for (code_index = 1; code_index < 65536; code_index++) {
            if (code_index >= huff_code[i]) {
            	i += 2;
            }
            ht.len[code_index] = huff_code_low_byte[i + 1];
        }

        return ht;
    }

    // Standard Huffman tables (cf. JPEG standard section K.3) */
    static std_dc_luminance_nrcodes = new Uint8Array([
        0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0
    ]);

    static std_dc_luminance_values = new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ]);

    static std_dc_chrominance_nrcodes = new Uint8Array([
        0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0
    ]);

    static std_dc_chrominance_values = new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ]);

    static std_ac_luminance_nrcodes = new Uint8Array([
        0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d
    ]);

    static std_ac_luminance_values = new Uint8Array([
        0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12,
        0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07,
        0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08,
        0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0,
        0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a, 0x16,
        0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28,
        0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39,
        0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49,
        0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59,
        0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69,
        0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79,
        0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89,
        0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98,
        0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7,
        0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6,
        0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5,
        0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4,
        0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2,
        0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea,
        0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8,
        0xf9, 0xfa
    ]);

    static std_ac_chrominance_nrcodes = new Uint8Array([
        0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 0x77
    ]);

    static std_ac_chrominance_values = new Uint8Array([
        0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21,
        0x31, 0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71,
        0x13, 0x22, 0x32, 0x81, 0x08, 0x14, 0x42, 0x91,
        0xa1, 0xb1, 0xc1, 0x09, 0x23, 0x33, 0x52, 0xf0,
        0x15, 0x62, 0x72, 0xd1, 0x0a, 0x16, 0x24, 0x34,
        0xe1, 0x25, 0xf1, 0x17, 0x18, 0x19, 0x1a, 0x26,
        0x27, 0x28, 0x29, 0x2a, 0x35, 0x36, 0x37, 0x38,
        0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48,
        0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58,
        0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
        0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78,
        0x79, 0x7a, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87,
        0x88, 0x89, 0x8a, 0x92, 0x93, 0x94, 0x95, 0x96,
        0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5,
        0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4,
        0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3,
        0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2,
        0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda,
        0xe2, 0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9,
        0xea, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8,
        0xf9, 0xfa
    ]);

    static DC_LUMINANCE_HUFFMANCODE = new Uint16Array([
        0x0000, 0, /* 0 */
        0x4000, 2, /* 1 */
        0x6000, 3, /* 2 */
        0x8000, 3, /* 3 */
        0xA000, 3, /* 4 */
        0xC000, 3, /* 5 */
        0xE000, 3, /* 6 */
        0xF000, 4, /* 7 */
        0xF800, 5, /* 8 */
        0xFC00, 6, /* 9 */
        0xFE00, 7, /* 10*/
        0xFF00, 8, /* 11 */
        0xFFFF, 9, /* 12 */
    ]);

    static DC_LUMINANCE_HUFFMANCODE_LOW_BYTE = new Uint16Array([
        0x00, 0, /* 0 */
        0x00, 2, /* 1 */
        0x00, 3, /* 2 */
        0x00, 3, /* 3 */
        0x00, 3, /* 4 */
        0x00, 3, /* 5 */
        0x00, 3, /* 6 */
        0x00, 4, /* 7 */
        0x00, 5, /* 8 */
        0x00, 6, /* 9 */
        0x00, 7, /* 10*/
        0x00, 8, /* 11 */
        0xFF, 9, /* 12 */
    ]);

    static DC_CHROMINANCE_HUFFMANCODE = new Uint16Array([
        /* 0 */
        0x0000, 0,
        /* 1 */
        0x4000, 2,
        /* 2 */
        0x8000, 2,
        /* 3 */
        0xC000, 2,
        /* 4 */
        0xE000, 3,
        /* 5 */
        0xF000, 4,
        /* 6 */
        0xF800, 5,
        /* 7 */
        0xFC00, 6,
        /* 8 */
        0xFE00, 7,
        /* 9 */
        0xFF00, 8,
        /* 10 */
        0xFF80, 9,
        /* 11 */
        0xFFC0, 10,
        0xFFFF, 11, /* 12 */
    ]);

    static DC_CHROMINANCE_HUFFMANCODE_LOW_BYTE = new Uint16Array([
        /* 0 */
        0x00, 0,
        /* 1 */
        0x00, 2,
        /* 2 */
        0x00, 2,
        /* 3 */
        0x00, 2,
        /* 4 */
        0x00, 3,
        /* 5 */
        0x00, 4,
        /* 6 */
        0x00, 5,
        /* 7 */
        0x00, 6,
        /* 8 */
        0x00, 7,
        /* 9 */
        0x00, 8,
        /* 10 */
        0x80, 9,
        /* 11 */
        0xC0, 10,
        0xFF, 11, /* 12 */
    ]);

    static AC_LUMINANCE_HUFFMANCODE = new Uint16Array([
        /* 0 */
        0x0000, 0,
        /* 1 */
        0x4000, 2,
        /* 2 */
        0x8000, 2,
        /* 3 */
        0xA000, 3,
        /* 4 */
        0xB000, 4,
        /* 5 */
        0xC000, 4,
        /* 6 */
        0xD000, 4,
        /* 7 */
        0xD800, 5,
        /* 8 */
        0xE000, 5,
        /* 9 */
        0xE800, 5,
        /* 10 */
        0xEC00, 6,
        /* 11 */
        0xF000, 6,
        /* 12 */
        0xF200, 7,
        /* 13 */
        0xF400, 7,
        /* 14 */
        0xF600, 7,
        /* 15 */
        0xF800, 7,
        /* 16 */
        0xF900, 8,
        /* 17 */
        0xFA00, 8,
        /* 18 */
        0xFB00, 8,
        /* 19 */
        0xFB80, 9,
        /* 20 */
        0xFC00, 9,
        /* 21 */
        0xFC80, 9,
        /* 22 */
        0xFD00, 9,
        /* 23 */
        0xFD80, 9,
        /* 24 */
        0xFDC0, 10,
        /* 25 */
        0xFE00, 10,
        /* 26 */
        0xFE40, 10,
        /* 27 */
        0xFE80, 10,
        /* 28 */
        0xFEC0, 10,
        /* 29 */
        0xFEE0, 11,
        /* 30 */
        0xFF00, 11,
        /* 31 */
        0xFF20, 11,
        /* 32 */
        0xFF40, 11,
        /* 33 */
        0xFF50, 12,
        /* 34 */
        0xFF60, 12,
        /* 35 */
        0xFF70, 12,
        /* 36 */
        0xFF80, 12,
        /* 37 */
        0xFF82, 15,
        /* 38 */
        0xFFFF, 16,
    ]);

    static AC_LUMINANCE_HUFFMANCODE_LOW_BYTE = new Uint16Array([
        /* 0 */
        0x00, 0,
        /* 1 */
        0x00, 2,
        /* 2 */
        0x00, 2,
        /* 3 */
        0x00, 3,
        /* 4 */
        0x00, 4,
        /* 5 */
        0x00, 4,
        /* 6 */
        0x00, 4,
        /* 7 */
        0x00, 5,
        /* 8 */
        0x00, 5,
        /* 9 */
        0x00, 5,
        /* 10 */
        0x00, 6,
        /* 11 */
        0x00, 6,
        /* 12 */
        0x00, 7,
        /* 13 */
        0x00, 7,
        /* 14 */
        0x00, 7,
        /* 15 */
        0x00, 7,
        /* 16 */
        0x00, 8,
        /* 17 */
        0x00, 8,
        /* 18 */
        0x00, 8,
        /* 19 */
        0x80, 9,
        /* 20 */
        0x00, 9,
        /* 21 */
        0x80, 9,
        /* 22 */
        0x00, 9,
        /* 23 */
        0x80, 9,
        /* 24 */
        0xC0, 10,
        /* 25 */
        0x00, 10,
        /* 26 */
        0x40, 10,
        /* 27 */
        0x80, 10,
        /* 28 */
        0xC0, 10,
        /* 29 */
        0xE0, 11,
        /* 30 */
        0x00, 11,
        /* 31 */
        0x20, 11,
        /* 32 */
        0x40, 11,
        /* 33 */
        0x50, 12,
        /* 34 */
        0x60, 12,
        /* 35 */
        0x70, 12,
        /* 36 */
        0x80, 12,
        /* 37 */
        0x82, 15,
        /* 38 */
        0xFF, 16,
    ]);

    static AC_CHROMINANCE_HUFFMANCODE = new Uint16Array([
        /* 0 */
        0x0000, 0,
        /* 1 */
        0x4000, 2,
        /* 2 */
        0x8000, 2,
        /* 3 */
        0xA000, 3,
        /* 4 */
        0xB000, 4,
        /* 5 */
        0xC000, 4,
        /* 6 */
        0xC800, 5,
        /* 7 */
        0xD000, 5,
        /* 8 */
        0xD800, 5,
        /* 9 */
        0xE000, 5,
        /* 10 */
        0xE400, 6,
        /* 11 */
        0xE800, 6,
        /* 12 */
        0xEC00, 6,
        /* 13 */
        0xF000, 6,
        /* 14 */
        0xF200, 7,
        /* 15 */
        0xF400, 7,
        /* 16 */
        0xF600, 7,
        /* 17 */
        0xF700, 8,
        /* 18 */
        0xF800, 8,
        /* 19 */
        0xF900, 8,
        /* 20 */
        0xFA00, 8,
        /* 21 */
        0xFA80, 9,
        /* 22 */
        0xFB00, 9,
        /* 23 */
        0xFB80, 9,
        /* 24 */
        0xFC00, 9,
        /* 25 */
        0xFC80, 9,
        /* 26 */
        0xFD00, 9,
        /* 27 */
        0xFD80, 9,
        /* 28 */
        0xFDC0, 10,
        /* 29 */
        0xFE00, 10,
        /* 30 */
        0xFE40, 10,
        /* 31 */
        0xFE80, 10,
        /* 32 */
        0xFEC0, 10,
        /* 33 */
        0xFEE0, 11,
        /* 34 */
        0xFF00, 11,
        /* 35 */
        0xFF20, 11,
        /* 36 */
        0xFF40, 11,
        /* 37 */
        0xFF50, 12,
        /* 38 */
        0xFF60, 12,
        /* 39 */
        0xFF70, 12,
        /* 40 */
        0xFF80, 12,
        /* 41 */
        0xFF84, 14,
        /* 42 */
        0xFF86, 15,
        /* 43 */
        0xFF88, 15,
        /* 44 */
        0xFFFF, 16,
    ]);

    static AC_CHROMINANCE_HUFFMANCODE_LOW_BYTE = new Uint16Array([
        /* 0 */
        0x00, 0,
        /* 1 */
        0x00, 2,
        /* 2 */
        0x00, 2,
        /* 3 */
        0x00, 3,
        /* 4 */
        0x00, 4,
        /* 5 */
        0x00, 4,
        /* 6 */
        0x00, 5,
        /* 7 */
        0x00, 5,
        /* 8 */
        0x00, 5,
        /* 9 */
        0x00, 5,
        /* 10 */
        0x00, 6,
        /* 11 */
        0x00, 6,
        /* 12 */
        0x00, 6,
        /* 13 */
        0x00, 6,
        /* 14 */
        0x00, 7,
        /* 15 */
        0x00, 7,
        /* 16 */
        0x00, 7,
        /* 17 */
        0x00, 8,
        /* 18 */
        0x00, 8,
        /* 19 */
        0x00, 8,
        /* 20 */
        0x00, 8,
        /* 21 */
        0x80, 9,
        /* 22 */
        0x00, 9,
        /* 23 */
        0x80, 9,
        /* 24 */
        0x00, 9,
        /* 25 */
        0x80, 9,
        /* 26 */
        0x00, 9,
        /* 27 */
        0x80, 9,
        /* 28 */
        0xC0, 10,
        /* 29 */
        0x00, 10,
        /* 30 */
        0x40, 10,
        /* 31 */
        0x80, 10,
        /* 32 */
        0xC0, 10,
        /* 33 */
        0xE0, 11,
        /* 34 */
        0x00, 11,
        /* 35 */
        0x20, 11,
        /* 36 */
        0x40, 11,
        /* 37 */
        0x50, 12,
        /* 38 */
        0x60, 12,
        /* 39 */
        0x70, 12,
        /* 40 */
        0x80, 12,
        /* 41 */
        0x84, 14,
        /* 42 */
        0x86, 15,
        /* 43 */
        0x88, 15,
        /* 44 */
        0xFF, 16,
    ]);
}