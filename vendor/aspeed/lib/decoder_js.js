/*
 * Copyright (C) 2021 Aspeed Tech. Authors
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 */

import HuffmanTable from "./huffmantable.js";
import YUV2RGB from "./yuv2rgb.js";

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

export default class AspeedJpeg {
    "use strict";
    constructor() {
        this._VQ = {
            Color: [],
            Index: new Uint8Array(4),
            BitMapBits: 0,
        };
        this._YDC_nr = 0;
        this._CbDC_nr = 1;
        this._CrDC_nr = 1;
        this._YAC_nr = 0;
        this._CbAC_nr = 1;
        this._CrAC_nr = 1;

        this._HTDC = [];
        this._HTAC = [];
        this._HTDC[0] = HuffmanTable.loadHuffmanTable(HuffmanTable.std_dc_luminance_nrcodes,
                                                     HuffmanTable.std_dc_luminance_values,
                                                     HuffmanTable.DC_LUMINANCE_HUFFMANCODE,
                                                     HuffmanTable.DC_LUMINANCE_HUFFMANCODE_LOW_BYTE);
        this._HTAC[0] = HuffmanTable.loadHuffmanTable(HuffmanTable.std_ac_luminance_nrcodes,
                                                     HuffmanTable.std_ac_luminance_values,
                                                     HuffmanTable.AC_LUMINANCE_HUFFMANCODE,
                                                     HuffmanTable.AC_LUMINANCE_HUFFMANCODE_LOW_BYTE);
        this._HTDC[1] = HuffmanTable.loadHuffmanTable(HuffmanTable.std_dc_chrominance_nrcodes,
                                                     HuffmanTable.std_dc_chrominance_values,
                                                     HuffmanTable.DC_CHROMINANCE_HUFFMANCODE,
                                                     HuffmanTable.DC_CHROMINANCE_HUFFMANCODE_LOW_BYTE);
        this._HTAC[1] = HuffmanTable.loadHuffmanTable(HuffmanTable.std_ac_chrominance_nrcodes,
                                                     HuffmanTable.std_ac_chrominance_values,
                                                     HuffmanTable.AC_CHROMINANCE_HUFFMANCODE,
                                                     HuffmanTable.AC_CHROMINANCE_HUFFMANCODE_LOW_BYTE);

        this._QT = [];
        this._QT[0] = [];
        this._QT[1] = [];
        this._QT[2] = [];
        this._QT[3] = [];

        this._rangeLimitTable = new Uint8Array(5 * 256 + 128);
        this._prepare_range_limit_table(this._rangeLimitTable);

        this._YUVData = new Uint8Array(3 * 1920 * 1200);
        this._DctTable = this._rangeLimitTable.subarray(384);

        this._DCY = new Int16Array(1);
        this._DCCb = new Int16Array(1);
        this._DCCr = new Int16Array(1);

        this._block_buf = new Uint8Array(768);
        this._DCTCoeff = new Int16Array(384);

        this._workspace = new Uint32Array(64);

        this.SCALEFACTOR = 16;
        this.SCALEFACTORUV = 16;
        this.ADVANCESCALEFACTOR = 16;
        this.ADVANCESCALEFACTORUV = 16;

        this._VQ.Index[0] = 0;
        this._VQ.Index[1] = 1;
        this._VQ.Index[2] = 2;
        this._VQ.Index[3] = 3;
        this._VQ.Color[0] = 0x008080;
        this._VQ.Color[1] = 0xFF8080;
        this._VQ.Color[2] = 0x808080;
        this._VQ.Color[3] = 0xC08080;

        this._firstframe = 1;

        this._selector = 0;
        this._advance_selector = 0;
        this._Mapping = 0;
        this._mode420 = -1;

        this._mbx = 0;
        this._mby = 0;
        this._mbwidth = 0;
        this._mbheight = 0;
        this._bits = 0;
    }

    _prepare_range_limit_table(table) {
        let i = 0;

        /* First segment of "simple" table: limit[x] = 0 for x < 0 */
        table.fill(0, 0, 256);
        /* Main part of "simple" table: limit[x] = x */
        for (i = 0; i < 256; i++)
            table[i + 256] = i;
        /* End of simple table, rest of first half of post-IDCT table */

        table.fill(255, 256 + 256, 256 + 640);
        /* Second half of post-IDCT table */
        table.fill(0, 256 + 640, 256 + 1024);
        for (i = 0; i < 128; i++)
            table[i + 1280] = i;
    }

    decode(header, buffer) {
        if ((this._firstframe == 1) ||
            (this._selector != header.selector ) ||
            (this._advance_selector != header.advance_selector)) {
            this._selector = header.selector;
            this._advance_selector = header.advance_selector;
            //console.log("update QT. selector " + header.selector + " adv_selector " + header.advance_selector);

            this.loadLuminanceQuantizationTable(this._QT[0], this._selector);
            this.loadChrominanceQuantizationTable(this._QT[1], this._selector);
            this.loadPass2LuminanceQuantizationTable(this._QT[2], this._advance_selector);
            this.loadPass2ChrominanceQuantizationTable(this._QT[3], this._advance_selector);
            this._firstframe = 0;
        }
        this._mode420 = header.mode420;
        //console.log("decode mode420:", header.mode420, " width:", header.width, " height:", header.height);

        this._srcbuf = new DataView(buffer.buffer, buffer.byteOffset);
        this._index = 2;
        this._mbx = this._mby = 0;
        this._bits = 32;
        this._DCY[0] = this._DCCb[0] = this._DCCr[0] = 0;
        this._curData = this._srcbuf.getUint32(0, true);
        this._nextData = this._srcbuf.getUint32(4, true);

        this._width = header.width;
        this._height = header.height;
        let moduldDivisor = (this._mode420 == 1) ? 16 : 8;
        let mask = moduldDivisor - 1;

        this._mbwidth = ((this._width + mask) & ~mask) / moduldDivisor;
        this._mbheight = ((this._height + mask) & ~mask) / moduldDivisor;

        this._getScratchBuffer(header.width * header.height * 4);
        this.decodeBuffer(buffer.length);
    }

    _getScratchBuffer(size) {
        if (!this.outbuf || (this.outbuf.length < size)) {
            this.outbuf = new Uint8Array(size);
            this.outbuf.fill(0xff);
        }
        return this.outbuf;
    }

    decodeBuffer(len) {
        const VQ_NO_UPDATE_LENGTH = 0x03,
              JPEG_NO_SKIP_CODE = 0x00,
              JPEG_NO_SKIP_PASS2_CODE =0x02,
              JPEG_SKIP_PASS2_CODE =0x0a,
              LOW_JPEG_NO_SKIP_CODE = 0x04,
              LOW_JPEG_SKIP_CODE = 0x0c,
              JPEG_SKIP_CODE = 0x08,
              FRAME_END_CODE = 0x09,
              VQ_NO_SKIP_1_COLOR_CODE = 0x05,
              VQ_NO_SKIP_2_COLOR_CODE = 0x06,
              VQ_NO_SKIP_4_COLOR_CODE = 0x07,
              VQ_SKIP_1_COLOR_CODE = 0x0d,
              VQ_SKIP_2_COLOR_CODE = 0x0e,
              VQ_SKIP_4_COLOR_CODE = 0x0f;
        const BLOCK_AST2100_START_LENGTH = 0x04,
              BLOCK_AST2100_SKIP_LENGTH = 20;

        do {
            switch (this.currentHeader()) {
                case JPEG_NO_SKIP_CODE:
                    this.skipBits(BLOCK_AST2100_START_LENGTH);
                    this.decompressJPEG(this._mbx, this._mby, 0);
                    this.moveBlockIndex();
                    break;

                case JPEG_SKIP_CODE:
                    this.updateXY();

                    this.skipBits(BLOCK_AST2100_SKIP_LENGTH);
                    this.decompressJPEG(this._mbx, this._mby, 0);
                    this.moveBlockIndex();
                    break;

                case JPEG_NO_SKIP_PASS2_CODE:
                    this.skipBits(BLOCK_AST2100_START_LENGTH);
                    this.decompressJPEGPass2(this._mbx, this._mby, 2);
                    this.moveBlockIndex();
                    break;

                case JPEG_SKIP_PASS2_CODE:
                    this.updateXY();

                    this.skipBits(BLOCK_AST2100_SKIP_LENGTH);
                    this.decompressJPEGPass2(this._mbx, this._mby, 2);
                    this.moveBlockIndex();
                    break;

                case VQ_NO_SKIP_1_COLOR_CODE:
                    this.skipBits(BLOCK_AST2100_START_LENGTH);

                    this._VQ.BitMapBits = 0;

                    this.updateVQColor(0);

                    this.decompressVQ(this._mbx, this._mby);
                    this.moveBlockIndex();
                    break;

                case VQ_SKIP_1_COLOR_CODE:
                    this.updateXY();

                    this.skipBits(BLOCK_AST2100_SKIP_LENGTH);
                    this._VQ.BitMapBits = 0;

                    this.updateVQColor(0);

                    this.decompressVQ(this._mbx, this._mby);
                    this.moveBlockIndex();
                    break;

                case VQ_NO_SKIP_2_COLOR_CODE:
                    this.skipBits(BLOCK_AST2100_START_LENGTH);
                    this._VQ.BitMapBits = 1;

                    this.updateVQColor(0);
                    this.updateVQColor(1);

                    this.decompressVQ(this._mbx, this._mby);
                    this.moveBlockIndex();
                    break;

                case VQ_SKIP_2_COLOR_CODE:
                    this.updateXY();

                    this.skipBits(BLOCK_AST2100_SKIP_LENGTH);
                    this._VQ.BitMapBits = 1;

                    this.updateVQColor(0);
                    this.updateVQColor(1);
                    this.decompressVQ(this._mbx, this._mby);
                    this.moveBlockIndex();
                    break;

                case VQ_NO_SKIP_4_COLOR_CODE:
                    this.skipBits(BLOCK_AST2100_START_LENGTH);
                    this._VQ.BitMapBits = 2;

                    this.updateVQColor(0);
                    this.updateVQColor(1);
                    this.updateVQColor(2);
                    this.updateVQColor(3);
                    this.decompressVQ(this._mbx, this._mby);
                    this.moveBlockIndex();
                    break;

                case VQ_SKIP_4_COLOR_CODE:
                    this.updateXY();

                    this.skipBits(BLOCK_AST2100_SKIP_LENGTH);
                    this._VQ.BitMapBits = 2;

                    this.updateVQColor(0);
                    this.updateVQColor(1);
                    this.updateVQColor(2);
                    this.updateVQColor(3);
                    this.decompressVQ(this._mbx, this._mby);
                    this.moveBlockIndex();
                    break;

                case LOW_JPEG_NO_SKIP_CODE:
                    this.skipBits(BLOCK_AST2100_START_LENGTH);
                    this.decompressJPEG(this._mbx, this._mby, 2);
                    this.moveBlockIndex();
                    break;

                case LOW_JPEG_SKIP_CODE:
                    this.updateXY();

                    this.skipBits(BLOCK_AST2100_SKIP_LENGTH);
                    this.decompressJPEG(this._mbx, this._mby, 2);
                    this.moveBlockIndex();
                    break;

                case FRAME_END_CODE:
                    return;

                default:
                    this.skipBits(VQ_NO_UPDATE_LENGTH);
                    this.moveBlockIndex();
                    break;
            }
        } while (this._index < len);
    }

    // skip lower k-bits to get data
    showBits(bits) {
        return (this._curData) >>> (32 - bits);
    }

    static neg_pow2 = new Int32Array([0,-1,-3,-7,-15,-31,-63,-127,-255,-511,-1023,-2047,-4095,-8191,-16383,-32767]);

    // look & skip
    getBits(bits) {
        let signed_wordvalue = this.showBits(bits);
        if ((1 << (bits - 1) & signed_wordvalue) == 0) {
            signed_wordvalue += AspeedJpeg.neg_pow2[bits];
        }
        this.skipBits(bits);
        return signed_wordvalue;
    }

    skipBits(bits) {
		let newbits = this._bits;
		if ((newbits - bits) <= 0) {
			let data = (this._srcbuf.getUint32(this._index << 2, true) & 0xffffffff);
		   	this._index++;
			this._curData = (this._curData << bits) | ((this._nextData | data >>> newbits) >>> (32 - bits));
			this._nextData = data << (bits - newbits);
			this._bits = 32 + newbits - bits;
		} else {
			this._curData = (this._curData << bits) | (this._nextData >>> (32 - bits));
			this._nextData = this._nextData << bits;
			this._bits -= bits;
		}
	}

    decompressJPEG(mbx, mby, QT_TableSelection) {
		this.decodeHuffmanDataUnit(this._YDC_nr, this._YAC_nr, this._DCY, 0);
		this.inverseDCT(0, QT_TableSelection);

		if (this._mode420 == 1) {
			this.decodeHuffmanDataUnit(this._YDC_nr, this._YAC_nr, this._DCY, 64);
			this.inverseDCT(64, QT_TableSelection);

			this.decodeHuffmanDataUnit(this._YDC_nr, this._YAC_nr, this._DCY, 128);
			this.inverseDCT(128, QT_TableSelection);

			this.decodeHuffmanDataUnit(this._YDC_nr, this._YAC_nr, this._DCY, 192);
			this.inverseDCT(192, QT_TableSelection);

			this.decodeHuffmanDataUnit(this._CbDC_nr, this._CbAC_nr, this._DCCb, 256);
			this.inverseDCT(256, QT_TableSelection + 1);

			this.decodeHuffmanDataUnit(this._CrDC_nr, this._CrAC_nr, this._DCCr, 320);
			this.inverseDCT(320, QT_TableSelection + 1);
		} else {
			this.decodeHuffmanDataUnit(this._CbDC_nr, this._CbAC_nr, this._DCCb, 64);
			this.inverseDCT(64, QT_TableSelection + 1);

			this.decodeHuffmanDataUnit(this._CrDC_nr, this._CrAC_nr, this._DCCr, 128);
			this.inverseDCT(128, QT_TableSelection + 1);
		}

        YUV2RGB.convertYUVtoRGB(mbx, mby, this._mode420, this._width, this._height, this._block_buf, this._YUVData, this.outbuf);
	}

    decompressJPEGPass2(mbx, mby, QT_TableSelection) {
        this.decodeHuffmanDataUnit(this._YDC_nr, this._YAC_nr, this._DCY, 0);
        this.inverseDCT(0, QT_TableSelection);

        this.decodeHuffmanDataUnit(this._CbDC_nr, this._CbAC_nr, this._DCCb, 64);
        this.inverseDCT(64, (QT_TableSelection + 1));

        this.decodeHuffmanDataUnit(this._CrDC_nr, this._CrAC_nr, this._DCCr, 128);
        this.inverseDCT(128, (QT_TableSelection + 1));

        YUV2RGB.convertYUVToRGBPass2(mbx, mby, this._mode420, this._width, this._height, this._block_buf, this._YUVData, this.outbuf);
    }

    decompressVQ(mbx, mby) {
		let Data = 0;
		let count = 0;
		let i = 63;
		let ptr = this._block_buf;

		let Color = this._VQ.Color;
		let Index = this._VQ.Index;
		let BitMapBits = this._VQ.BitMapBits;

		if (BitMapBits == 0) {
			let rightShift16_0 = (Color[Index[0]] & 0xFF0000) >>> 16;
			let rightShift8_64 = (Color[Index[0]]  & 0xFF00) >>> 8;
			let noShift128 =  (Color[Index[0]] & 0xFF);

			do {
				ptr[count + 0] = rightShift16_0;
				ptr[count + 64] = rightShift8_64;
				ptr[count + 128] = noShift128;
				count++;
			} while (i--);
		} else {
			do {
				Data = (this.showBits(BitMapBits));
				let colorData = Color[Index[Data]];
				ptr[count + 0] = (colorData & 0xFF0000) >>> 16;
				ptr[count + 64] = (colorData & 0xFF00) >>> 8;
				ptr[count + 128] = (colorData & 0xFF);
				count++;
				this.skipBits(BitMapBits);
			} while (i--);
		}

        YUV2RGB.convertYUVtoRGB(mbx, mby, this._mode420, this._width, this._height, this._block_buf, this._YUVData, this.outbuf);
	}

    moveBlockIndex() {
        //console.debug("moveBlockIndex start _mbx " + this._mbx + " this._mby " + this._mby);
        this._mbx++;

        if (this._mbx >= this._mbwidth) {
            this._mby++;
            if (this._mby >= this._mbheight)
                this._mby = 0;
            this._mbx = 0;
        }
    }

    currentHeader() {
    	const BLOCK_HEADER_MASK = 0x0f;
        return (this._curData >>> 28) & (BLOCK_HEADER_MASK);
    }

    updateXY() {
        this._mbx = (this._curData & 0x0FF00000) >>> 20;
        this._mby = (this._curData & 0x0FF000) >>> 12;
    }

    chkVQHdr(hdr) {
    	const VQ_HEADER_MASK = 0x01;
        return ((this._curData >>> 31) & VQ_HEADER_MASK) == hdr;
    }

    updateVQColor(i) {
        const VQ_NO_UPDATE_HEADER = 0x00,
              VQ_NO_UPDATE_LENGTH = 0x03,
              VQ_UPDATE_LENGTH = 0x1B,
              VQ_INDEX_MASK = 0x03,
              VQ_COLOR_MASK = 0xFFFFFF;
        this._VQ.Index[i] = (this._curData >>> 29) & (VQ_INDEX_MASK);//this.VQindex();

        if (this.chkVQHdr(VQ_NO_UPDATE_HEADER)) {
            this.skipBits(VQ_NO_UPDATE_LENGTH);
        } else {
            this._VQ.Color[this._VQ.Index[i]] = (this._curData >>> 5) & VQ_COLOR_MASK;
            this.skipBits(VQ_UPDATE_LENGTH);
        }
    }

    WORD_hi_lo(hi, lo) {
        return ((hi << 8) | (lo & 0xff)) & 0xffff;
    }

    decodeHuffmanDataUnit(DC_nr, AC_nr, pre_DC, pos) {
		let nr = 1, k = 0, size_val = 0, count, tmp = 0;
		let DCT_coeff = this._DCTCoeff;
		let HTDC_DC_nr = this._HTDC[DC_nr];
		let HTAC_AC_nr= this._HTAC[AC_nr];

        DCT_coeff.fill(0, pos, pos + 64)

		k = HTDC_DC_nr.len[(this._curData >>> 16) & 0xffff];
		tmp = this.showBits(k);
		this.skipBits(k);
        size_val = HTDC_DC_nr.V[this.WORD_hi_lo(k, (tmp - HTDC_DC_nr.minor_code[k]))];
		if (size_val == 0) {
			DCT_coeff[pos] = pre_DC[0];
		} else {
			pre_DC[0] = DCT_coeff[pos] = pre_DC[0] + this.getBits(size_val);
		}

		do {
			k = HTAC_AC_nr.len[(this._curData >>> 16) & 0xffff];
			tmp = this.showBits(k);
			this.skipBits(k);
            tmp = HTAC_AC_nr.V[this.WORD_hi_lo(k, (tmp - HTAC_AC_nr.minor_code[k]))];
			size_val = tmp & 0x0f;
			count = (tmp >> 4) & 0x0f;
			if (size_val == 0) {
				if (count != 0x0f) {
					break;
				}
				nr += 16;
			} else {
				nr += count;
				DCT_coeff[pos + AspeedJpeg.dezigzag[nr]] = this.getBits(size_val);
				nr++;
			}
		} while (nr < 64);
	}

    inverseDCT(index, nBlock) {
        let inc,
            incinptr = index,
            tmp0, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp10, tmp11, tmp12, tmp13, z5, z10, z11, z12, z13;

        let workspace = this._workspace;
        let QT = this._QT[nBlock];
        let DCT_coeff = this._DCTCoeff;
        let YUVTile = this._block_buf;

        //inverseDCR function
        const FIX_1_082392200 = 277;
        const FIX_1_414213562 = 362;
        const FIX_1_847759065 = 473;
        const FIX_2_613125930 = 669;

        // columns
        for (inc = 0; inc < 8; inc++, incinptr++) {
            if (DCT_coeff[incinptr + 8] == 0 && DCT_coeff[incinptr + 16] == 0 &&
                DCT_coeff[incinptr + 24] == 0 && DCT_coeff[incinptr + 32] == 0 &&
                DCT_coeff[incinptr + 40] == 0 && DCT_coeff[incinptr + 48] == 0 &&
                DCT_coeff[incinptr + 56] == 0) {
                // AC terms all zero
                workspace[inc + 0] = workspace[inc + 8] = workspace[inc + 16] = workspace[inc + 24] = workspace[inc + 32] = workspace[inc + 40] = workspace[inc + 48] = workspace[inc + 56]= ((QT[inc] * DCT_coeff[incinptr]) >> 16);
                continue;
            }


            tmp0 = ((QT[inc] * DCT_coeff[incinptr]) >> 16);
            tmp4 = ((QT[inc + 8] * DCT_coeff[incinptr + 8]) >> 16);
            tmp1 = ((QT[inc + 16] * DCT_coeff[incinptr + 16]) >> 16);
            tmp5 = ((QT[inc + 24] * DCT_coeff[incinptr + 24]) >> 16);
            tmp2 = ((QT[inc + 32] * DCT_coeff[incinptr + 32]) >> 16);
            tmp6 = ((QT[inc + 40] * DCT_coeff[incinptr + 40]) >> 16);
            tmp3 = ((QT[inc + 48] * DCT_coeff[incinptr + 48]) >> 16);
            tmp7 = ((QT[inc + 56] * DCT_coeff[incinptr + 56]) >> 16);

            tmp10 = tmp0 + tmp2; // phase 3
            tmp11 = tmp0 - tmp2;

            tmp13 = tmp1 + tmp3; // phases 5-3
            tmp12 = (((tmp1 - tmp3) * (FIX_1_414213562)) >> 8) - tmp13; // 2*c4

            tmp0 = tmp10 + tmp13; // phase 2
            tmp3 = tmp10 - tmp13;
            tmp1 = tmp11 + tmp12;
            tmp2 = tmp11 - tmp12;

            z13 = tmp6 + tmp5; // phase 6
            z10 = tmp6 - tmp5;
            z11 = tmp4 + tmp7;
            z12 = tmp4 - tmp7;

            tmp7 = z11 + z13; // phase 5
            tmp11 = ((z11 - z13)* (FIX_1_414213562)) >> 8; // 2*c4

            z5 = ((z10 + z12) * (FIX_1_847759065)) >> 8; // 2*c2
            tmp10 = ((z12 * FIX_1_082392200) >> 8) - z5; // 2*(c2-c6)
            tmp12 = ((z10 * -FIX_2_613125930) >> 8) + z5; // -2*(c2+c6)

            tmp6 = tmp12 - tmp7; // phase 2
            tmp5 = tmp11 - tmp6;
            tmp4 = tmp10 + tmp5;

            workspace[inc] = (tmp0 + tmp7);
            workspace[inc + 8*1] = (tmp1 + tmp6);
            workspace[inc + 8*2] = (tmp2 + tmp5);
            workspace[inc + 8*3] = (tmp3 - tmp4);
            workspace[inc + 8*4] = (tmp3 + tmp4);
            workspace[inc + 8*5] = (tmp2 - tmp5);
            workspace[inc + 8*6] = (tmp1 - tmp6);
            workspace[inc + 8*7] = (tmp0 - tmp7);
        }


        // rows
		let index1 = 0;
		for (inc = 0; inc < 64; inc += 8) {

			// Even part
			tmp10 = workspace[inc] + workspace[inc + 4];
			tmp11 = workspace[inc] - workspace[inc + 4];

			tmp13 = workspace[inc + 2] + workspace[inc + 6];
			tmp12 = (((workspace[inc + 2] - workspace[inc + 6]) * FIX_1_414213562) >> 8) - tmp13;

			tmp0 = tmp10 + tmp13;
			tmp3 = tmp10 - tmp13;
			tmp1 = tmp11 + tmp12;
			tmp2 = tmp11 - tmp12;

			// Odd part
			z13 = workspace[inc + 5] + workspace[inc + 3];
			z10 = workspace[inc + 5] - workspace[inc + 3];
			z11 = workspace[inc + 1] + workspace[inc + 7];
			z12 = workspace[inc + 1] - workspace[inc + 7];

			tmp7 = z11 + z13; // phase 5
			tmp11 = ((z11 - z13) * FIX_1_414213562) >> 8; // 2*c4

			z5 = ((z10 + z12) * FIX_1_847759065) >> 8; // 2*c2
			tmp10 = ((z12 * FIX_1_082392200) >> 8) - z5; // 2*(c2-c6)
			tmp12 = ((z10 * -FIX_2_613125930) >> 8 ) + z5; // -2*(c2+c6)

			tmp6 = tmp12 - tmp7; // phase 2
			tmp5 = tmp11 - tmp6;
			tmp4 = tmp10 + tmp5;

			// Final output stage: scale down by a factor of 8 and range-limit
			index1 = index + inc;
			YUVTile[index1] = this._DctTable[((tmp0 + tmp7) >> 3) & 1023];
			YUVTile[index1 + 1] = this._DctTable[((tmp1 + tmp6) >> 3) & 1023];
			YUVTile[index1 + 2] = this._DctTable[((tmp2 + tmp5) >> 3) & 1023];
			YUVTile[index1 + 3] = this._DctTable[((tmp3 - tmp4) >> 3) & 1023];
			YUVTile[index1 + 4] = this._DctTable[((tmp3 + tmp4) >> 3) & 1023];
			YUVTile[index1 + 5] = this._DctTable[((tmp2 - tmp5) >> 3) & 1023];
			YUVTile[index1 + 6] = this._DctTable[((tmp1 - tmp6) >> 3) & 1023];
			YUVTile[index1 + 7] = this._DctTable[((tmp0 - tmp7) >> 3) & 1023];
		}
	}

    setQuantizationTable(basic_table, scale_factor, newtable) {
        let i, temp;

        i = 63;
        do{
            temp = (basic_table[i] * 16 / scale_factor).clamp(1, 255);
            newtable[AspeedJpeg.zigzag[i]] = temp;
        } while (i--);
    }

    loadLuminanceQuantizationTable(quant_table, sel) {
        const scalefactor = [
            1.0,
            1.387039845,
            1.306562965,
            1.175875602,
            1.0,
            0.785694958,
            0.541196100,
            0.275899379
        ];
        let j, row, col, tempQT = new Uint8Array(64), temp;
        let std_luminance_qt = [];

        switch (sel) {
            case 0:
                std_luminance_qt = AspeedJpeg.Tbl_000Y;
                break;
            case 1:
                std_luminance_qt = AspeedJpeg.Tbl_014Y;
                break;
            case 2:
                std_luminance_qt = AspeedJpeg.Tbl_029Y;
                break;
            case 3:
                std_luminance_qt = AspeedJpeg.Tbl_043Y;
                break;
            case 4:
                std_luminance_qt = AspeedJpeg.Tbl_057Y;
                break;
            case 5:
                std_luminance_qt = AspeedJpeg.Tbl_071Y;
                break;
            case 6:
                std_luminance_qt = AspeedJpeg.Tbl_086Y;
                break;
            case 7:
                std_luminance_qt = AspeedJpeg.Tbl_100Y;
                break;
        }

        this.setQuantizationTable(std_luminance_qt, this.SCALEFACTOR, tempQT);

        for (j = 0; j < 64; j++) {
            quant_table[j] = (tempQT[AspeedJpeg.zigzag[j]] & 0x00FF);
        }

        for (j = 0, row = 0; row < 8; row++) {
            for (col = 0; col < 8; col++) {
                temp = Math.floor(quant_table[j] * scalefactor[row] * scalefactor[col]);
                quant_table[j] = temp * 65536;
                j++;
            }
        }
    }

    loadChrominanceQuantizationTable(quant_table, sel) {
        const scalefactor = [
            1.0,
            1.387039845,
            1.306562965,
            1.175875602,
            1.0,
            0.785694958,
            0.541196100,
            0.275899379
        ];
        let j, row, col, tempQT = new Uint8Array(64), temp;
        let std_chrominance_qt = [];

        if (this._Mapping == 1) {
            switch (sel) {
                case 0:
                    std_chrominance_qt = AspeedJpeg.Tbl_000Y;
                    break;
                case 1:
                    std_chrominance_qt = AspeedJpeg.Tbl_014Y;
                    break;
                case 2:
                    std_chrominance_qt = AspeedJpeg.Tbl_029Y;
                    break;
                case 3:
                    std_chrominance_qt = AspeedJpeg.Tbl_043Y;
                    break;
                case 4:
                    std_chrominance_qt = AspeedJpeg.Tbl_057Y;
                    break;
                case 5:
                    std_chrominance_qt = AspeedJpeg.Tbl_071Y;
                    break;
                case 6:
                    std_chrominance_qt = AspeedJpeg.Tbl_086Y;
                    break;
                case 7:
                    std_chrominance_qt = AspeedJpeg.Tbl_100Y;
                    break;
            }
        } else {
            switch (sel) {
                case 0:
                    std_chrominance_qt = AspeedJpeg.Tbl_000UV;
                    break;
                case 1:
                    std_chrominance_qt = AspeedJpeg.Tbl_014UV;
                    break;
                case 2:
                    std_chrominance_qt = AspeedJpeg.Tbl_029UV;
                    break;
                case 3:
                    std_chrominance_qt = AspeedJpeg.Tbl_043UV;
                    break;
                case 4:
                    std_chrominance_qt = AspeedJpeg.Tbl_057UV;
                    break;
                case 5:
                    std_chrominance_qt = AspeedJpeg.Tbl_071UV;
                    break;
                case 6:
                    std_chrominance_qt = AspeedJpeg.Tbl_086UV;
                    break;
                case 7:
                    std_chrominance_qt = AspeedJpeg.Tbl_100UV;
                    break;
            }
        }

        this.setQuantizationTable(std_chrominance_qt, this.SCALEFACTORUV, tempQT);

        for (j = 0; j < 64; j++) {
            quant_table[j] = (tempQT[AspeedJpeg.zigzag[j]] & 0x00FF);
        }

        for (j = 0, row = 0; row < 8; row++) {
            for (col = 0; col < 8; col++) {
                temp = Math.floor(quant_table[j] * scalefactor[row] * scalefactor[col]);
                quant_table[j] = temp * 65536;
                j++;
            }
        }
    }

    loadPass2LuminanceQuantizationTable(quant_table, adv_sel) {
        const scalefactor = [
            1.0,
            1.387039845,
            1.306562965,
            1.175875602,
            1.0,
            0.785694958,
            0.541196100,
            0.275899379
        ];

        let j, row, col, tempQT = new Uint8Array(64),
            temp;
        let std_luminance_qt = [];

        // Load quantization coefficients from JPG file, scale them for DCT and reorder
        // from zig-zag order
        switch (adv_sel) {
            case 0:
                std_luminance_qt = AspeedJpeg.Tbl_000Y;
                break;
            case 1:
                std_luminance_qt = AspeedJpeg.Tbl_014Y;
                break;
            case 2:
                std_luminance_qt = AspeedJpeg.Tbl_029Y;
                break;
            case 3:
                std_luminance_qt = AspeedJpeg.Tbl_043Y;
                break;
            case 4:
                std_luminance_qt = AspeedJpeg.Tbl_057Y;
                break;
            case 5:
                std_luminance_qt = AspeedJpeg.Tbl_071Y;
                break;
            case 6:
                std_luminance_qt = AspeedJpeg.Tbl_086Y;
                break;
            case 7:
                std_luminance_qt = AspeedJpeg.Tbl_100Y;
                break;
        }

        // Note: pass ADVANCE SCALE FACTOR to sub-function in Dual-JPEG
        this.setQuantizationTable(std_luminance_qt, this.ADVANCESCALEFACTOR, tempQT);

        for (j = 0; j < 64; j++) {
            quant_table[j] = (tempQT[AspeedJpeg.zigzag[j]] & 0x00FF);
        }

        for (j = 0, row = 0; row < 8; row++) {
            for (col = 0; col < 8; col++) {
                temp = Math.floor(quant_table[j] * scalefactor[row] * scalefactor[col]);
                quant_table[j] = temp * 65536;
                j++;
            }
        }
    }

    loadPass2ChrominanceQuantizationTable(quant_table, adv_sel) {
        const scalefactor = [
            1.0,
            1.387039845,
            1.306562965,
            1.175875602,
            1.0,
            0.785694958,
            0.541196100,
            0.275899379
        ];

        let j, row, col, tempQT = new Uint8Array(64),
            temp;
        let std_chrominance_qt = [];

        // Load quantization coefficients from JPG file, scale them for DCT and reorder
        // from zig-zag order
        if (this._Mapping == 1) {
            switch (adv_sel) {
                case 0:
                    std_chrominance_qt = AspeedJpeg.Tbl_000Y;
                    break;
                case 1:
                    std_chrominance_qt = AspeedJpeg.Tbl_014Y;
                    break;
                case 2:
                    std_chrominance_qt = AspeedJpeg.Tbl_029Y;
                    break;
                case 3:
                    std_chrominance_qt = AspeedJpeg.Tbl_043Y;
                    break;
                case 4:
                    std_chrominance_qt = AspeedJpeg.Tbl_057Y;
                    break;
                case 5:
                    std_chrominance_qt = AspeedJpeg.Tbl_071Y;
                    break;
                case 6:
                    std_chrominance_qt = AspeedJpeg.Tbl_086Y;
                    break;
                case 7:
                    std_chrominance_qt = AspeedJpeg.Tbl_100Y;
                    break;
            }
        } else {
            switch (adv_sel) {
                case 0:
                    std_chrominance_qt = AspeedJpeg.Tbl_000UV;
                    break;
                case 1:
                    std_chrominance_qt = AspeedJpeg.Tbl_014UV;
                    break;
                case 2:
                    std_chrominance_qt = AspeedJpeg.Tbl_029UV;
                    break;
                case 3:
                    std_chrominance_qt = AspeedJpeg.Tbl_043UV;
                    break;
                case 4:
                    std_chrominance_qt = AspeedJpeg.Tbl_057UV;
                    break;
                case 5:
                    std_chrominance_qt = AspeedJpeg.Tbl_071UV;
                    break;
                case 6:
                    std_chrominance_qt = AspeedJpeg.Tbl_086UV;
                    break;
                case 7:
                    std_chrominance_qt = AspeedJpeg.Tbl_100UV;
                    break;
            }
        }

        // Note: pass ADVANCE SCALE FACTOR to sub-function in Dual-JPEG
        this.setQuantizationTable(std_chrominance_qt, this.ADVANCESCALEFACTORUV, tempQT);

        for (j = 0; j < 64; j++) {
            quant_table[j] = (tempQT[AspeedJpeg.zigzag[j]] & 0x00FF);
        }

        for (j = 0, row = 0; row < 8; row++) {
            for (col = 0; col < 8; col++) {
                temp = Math.floor(quant_table[j] * scalefactor[row] * scalefactor[col]);
                quant_table[j] = temp * 65536;
                j++;
            }
        }
    }

    static zigzag = new Uint8Array([
        0, 1, 5, 6,14,15,27,28,
        2, 4, 7,13,16,26,29,42,
        3, 8,12,17,25,30,41,43,
        9,11,18,24,31,40,44,53,
       10,19,23,32,39,45,52,54,
       20,22,33,38,46,51,55,60,
       21,34,37,47,50,56,59,61,
       35,36,48,49,57,58,62,63
    ]);

    static dezigzag = new Uint8Array([
         0,
         1,  8,
        16,  9,  2,
         3, 10, 17, 24,
        32, 25, 18, 11, 4,
         5, 12, 19, 26, 33, 40,
        48, 41, 34, 27, 20, 13,  6,
         7, 14, 21, 28, 35, 42, 49, 56,
        57, 50, 43, 36, 29, 22, 15,
        23, 30, 37, 44, 51, 58,
        59, 52, 45, 38, 31,
        39, 46, 53, 60,
        61, 54, 47,
        55, 62,
        63,
        // let corrupt input sample past end
        63, 63, 63, 63, 63, 63, 63, 63,
        63, 63, 63, 63, 63, 63, 63
    ]);

    static Tbl_100Y = new Uint8Array([
        2, 1, 1, 2, 3, 5, 6, 7,
        1, 1, 1, 2, 3, 7, 7, 6,
        1, 1, 2, 3, 5, 7, 8, 7,
        1, 2, 2, 3, 6, 10, 10, 7,
        2, 2, 4, 7, 8, 13, 12, 9,
        3, 4, 6, 8, 10, 13, 14, 11,
        6, 8, 9, 10, 12, 15, 15, 12,
        9, 11, 11, 12, 14, 12, 12, 12
    ]);

    static Tbl_100UV = new Uint8Array([
        3, 3, 4, 8, 18, 18, 18, 18,
        3, 3, 4, 12, 18, 18, 18, 18,
        4, 4, 10, 18, 18, 18, 18, 18,
        8, 12, 18, 18, 18, 18, 18, 18,
        18, 18, 18, 18, 18, 18, 18, 18,
        18, 18, 18, 18, 18, 18, 18, 18,
        18, 18, 18, 18, 18, 18, 18, 18,
        18, 18, 18, 18, 18, 18, 18, 18
    ]);

    static Tbl_086Y = new Uint8Array([
        3, 2, 1, 3, 4, 7, 9, 11,
        2, 2, 2, 3, 4, 10, 11, 10,
        2, 2, 3, 4, 7, 10, 12, 10,
        2, 3, 4, 5, 9, 16, 15, 11,
        3, 4, 6, 10, 12, 20, 19, 14,
        4, 6, 10, 12, 15, 19, 21, 17,
        9, 12, 14, 16, 19, 22, 22, 18,
        13, 17, 17, 18, 21, 18, 19, 18
    ]);

    static Tbl_086UV = new Uint8Array([
        4, 5, 6, 13, 27, 27, 27, 27,
        5, 5, 7, 18, 27, 27, 27, 27,
        6, 7, 15, 27, 27, 27, 27, 27,
        13, 18, 27, 27, 27, 27, 27, 27,
        27, 27, 27, 27, 27, 27, 27, 27,
        27, 27, 27, 27, 27, 27, 27, 27,
        27, 27, 27, 27, 27, 27, 27, 27,
        27, 27, 27, 27, 27, 27, 27, 27
    ]);

    static Tbl_071Y = new Uint8Array([
        6, 4, 3, 6, 9, 15, 19, 22,
        4, 4, 5, 7, 9, 21, 22, 20,
        5, 4, 6, 9, 15, 21, 25, 21,
        5, 6, 8, 10, 19, 32, 30, 23,
        6, 8, 13, 21, 25, 40, 38, 28,
        9, 13, 20, 24, 30, 39, 42, 34,
        18, 24, 29, 32, 38, 45, 45, 37,
        27, 34, 35, 36, 42, 37, 38, 37
    ]);

    static Tbl_071UV = new Uint8Array([
        9, 10, 13, 26, 55, 55, 55, 55,
        10, 11, 14, 37, 55, 55, 55, 55,
        13, 14, 31, 55, 55, 55, 55, 55,
        26, 37, 55, 55, 55, 55, 55, 55,
        55, 55, 55, 55, 55, 55, 55, 55,
        55, 55, 55, 55, 55, 55, 55, 55,
        55, 55, 55, 55, 55, 55, 55, 55,
        55, 55, 55, 55, 55, 55, 55, 55
    ]);

    static Tbl_057Y = new Uint8Array([
        9, 6, 5, 9, 13, 22, 28, 34,
        6, 6, 7, 10, 14, 32, 33, 30,
        7, 7, 9, 13, 22, 32, 38, 31,
        7, 9, 12, 16, 28, 48, 45, 34,
        10, 12, 20, 31, 38, 61, 57, 43,
        13, 19, 30, 36, 45, 58, 63, 51,
        27, 36, 43, 48, 57, 68, 67, 56,
        40, 51, 53, 55, 63, 56, 57, 55
    ]);

    static Tbl_057UV = new Uint8Array([
        13, 14, 19, 38, 80, 80, 80, 80,
        14, 17, 21, 53, 80, 80, 80, 80,
        19, 21, 45, 80, 80, 80, 80, 80,
        38, 53, 80, 80, 80, 80, 80, 80,
        80, 80, 80, 80, 80, 80, 80, 80,
        80, 80, 80, 80, 80, 80, 80, 80,
        80, 80, 80, 80, 80, 80, 80, 80,
        80, 80, 80, 80, 80, 80, 80, 80
    ]);

    static Tbl_043Y = new Uint8Array([
        11, 7, 7, 11, 17, 28, 36, 43,
        8, 8, 10, 13, 18, 41, 43, 39,
        10, 9, 11, 17, 28, 40, 49, 40,
        10, 12, 15, 20, 36, 62, 57, 44,
        12, 15, 26, 40, 48, 78, 74, 55,
        17, 25, 39, 46, 58, 74, 81, 66,
        35, 46, 56, 62, 74, 86, 86, 72,
        51, 66, 68, 70, 80, 71, 74, 71
    ]);

    static Tbl_043UV = new Uint8Array([
        18, 19, 26, 51, 108, 108, 108, 108,
        19, 22, 28, 72, 108, 108, 108, 108,
        26, 28, 61, 108, 108, 108, 108, 108,
        51, 72, 108, 108, 108, 108, 108, 108,
        108, 108, 108, 108, 108, 108, 108, 108,
        108, 108, 108, 108, 108, 108, 108, 108,
        108, 108, 108, 108, 108, 108, 108, 108,
        108, 108, 108, 108, 108, 108, 108, 108
    ]);

    static Tbl_029Y = new Uint8Array([
        14, 9, 9, 14, 21, 36, 46, 55,
        10, 10, 12, 17, 23, 52, 54, 49,
        12, 11, 14, 21, 36, 51, 62, 50,
        12, 15, 19, 26, 46, 78, 72, 56,
        16, 19, 33, 50, 61, 98, 93, 69,
        21, 31, 49, 58, 73, 94, 102, 83,
        44, 58, 70, 78, 93, 109, 108, 91,
        65, 83, 86, 88, 101, 90, 93, 89
    ]);

    static Tbl_029UV = new Uint8Array([
        22, 24, 32, 63, 133, 133, 133, 133,
        24, 28, 34, 88, 133, 133, 133, 133,
        32, 34, 75, 133, 133, 133, 133, 133,
        63, 88, 133, 133, 133, 133, 133, 133,
        133, 133, 133, 133, 133, 133, 133, 133,
        133, 133, 133, 133, 133, 133, 133, 133,
        133, 133, 133, 133, 133, 133, 133, 133,
        133, 133, 133, 133, 133, 133, 133, 133
    ]);

    static Tbl_014Y = new Uint8Array([
        17, 12, 10, 17, 26, 43, 55, 66,
        13, 13, 15, 20, 28, 63, 65, 60,
        15, 14, 17, 26, 43, 62, 75, 61,
        15, 18, 24, 31, 55, 95, 87, 67,
        19, 24, 40, 61, 74, 119, 112, 84,
        26, 38, 60, 70, 88, 113, 123, 100,
        53, 70, 85, 95, 112, 132, 131, 110,
        78, 100, 103, 107, 122, 109, 112, 108
    ]);

    static Tbl_014UV = new Uint8Array([
        27, 29, 39, 76, 160, 160, 160, 160,
        29, 34, 42, 107, 160, 160, 160, 160,
        39, 42, 91, 160, 160, 160, 160, 160,
        76, 107, 160, 160, 160, 160, 160, 160,
        160, 160, 160, 160, 160, 160, 160, 160,
        160, 160, 160, 160, 160, 160, 160, 160,
        160, 160, 160, 160, 160, 160, 160, 160,
        160, 160, 160, 160, 160, 160, 160, 160
    ]);

    static Tbl_000Y = new Uint8Array([
        20, 13, 12, 20, 30, 50, 63, 76,
        15, 15, 17, 23, 32, 72, 75, 68,
        17, 16, 20, 30, 50, 71, 86, 70,
        17, 21, 27, 36, 63, 108, 100, 77,
        22, 27, 46, 70, 85, 136, 128, 96,
        30, 43, 68, 80, 101, 130, 141, 115,
        61, 80, 97, 108, 128, 151, 150, 126,
        90, 115, 118, 122, 140, 125, 128, 123
    ]);

    static Tbl_000UV = new Uint8Array([
        31, 33, 45, 88, 185, 185, 185, 185,
        33, 39, 48, 123, 185, 185, 185, 185,
        45, 48, 105, 185, 185, 185, 185, 185,
        88, 123, 185, 185, 185, 185, 185, 185,
        185, 185, 185, 185, 185, 185, 185, 185,
        185, 185, 185, 185, 185, 185, 185, 185,
        185, 185, 185, 185, 185, 185, 185, 185,
        185, 185, 185, 185, 185, 185, 185, 185
    ]);
}