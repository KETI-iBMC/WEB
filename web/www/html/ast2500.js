//export default function Ast2500(_PreBuffer, _PreOutBuffer) {
    // Util.Debug(">>> Ast2500.constructor");
var Ast2500;
(function (){
    Ast2500 = function(_PreBuffer, _PreOutBuffer) {
    this.HT_ref = null;
    this.std = {
        std_dc_luminance_nrcodes: [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        std_dc_luminance_values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        std_dc_chrominance_nrcodes: [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        std_dc_chrominance_values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        std_ac_luminance_nrcodes: [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
        std_ac_luminance_values: [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161,
            8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248,
            249, 250
        ],
        std_ac_chrominance_nrcodes: [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
        std_ac_chrominance_values: [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179,
            180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250
        ],
        DC_LUMINANCE_HUFFMANCODE: [0, 0, 16384, 2, 24576, 3, 32768, 3, 40960, 3, 49152, 3, 57344, 3, 61440, 4, 63488, 5, 64512, 6, 65024, 7, 65280, 8, 65535, 9],
        DC_CHROMINANCE_HUFFMANCODE: [0, 0, 16384, 2, 32768, 2, 49152, 2, 57344, 3, 61440, 4, 63488, 5, 64512, 6, 65024, 7, 65280, 8, 65408, 9, 65472, 10, 65535, 11],
        AC_LUMINANCE_HUFFMANCODE: [0, 0, 16384, 2, 32768, 2, 40960, 3, 45056, 4, 49152, 4,
            53248, 4, 55296, 5, 57344, 5, 59392, 5, 60416, 6, 61440, 6, 61952, 7, 62464, 7, 62976, 7, 63488, 7, 63744, 8, 64E3, 8, 64256, 8, 64384, 9, 64512, 9, 64640, 9, 64768, 9, 64896, 9, 64960, 10, 65024, 10, 65088, 10, 65152, 10, 65216, 10, 65248, 11, 65280, 11, 65312, 11, 65344, 11, 65360, 12, 65376, 12, 65392, 12, 65408, 12, 65410, 15, 65535, 16
        ],
        AC_CHROMINANCE_HUFFMANCODE: [0, 0, 16384, 2, 32768, 2, 40960, 3, 45056, 4, 49152, 4, 51200, 5, 53248, 5, 55296, 5, 57344, 5, 58368, 6, 59392, 6, 60416, 6, 61440, 6, 61952, 7, 62464, 7, 62976, 7, 63232, 8, 63488, 8, 63744, 8, 64E3, 8, 64128, 9, 64256, 9, 64384, 9, 64512, 9,
            64640, 9, 64768, 9, 64896, 9, 64960, 10, 65024, 10, 65088, 10, 65152, 10, 65216, 10, 65248, 11, 65280, 11, 65312, 11, 65344, 11, 65360, 12, 65376, 12, 65392, 12, 65408, 12, 65412, 14, 65414, 15, 65416, 15, 65535, 16
        ],
        Tbl_100Y: [2, 1, 1, 2, 3, 5, 6, 7, 1, 1, 1, 2, 3, 7, 7, 6, 1, 1, 2, 3, 5, 7, 8, 7, 1, 2, 2, 3, 6, 10, 10, 7, 2, 2, 4, 7, 8, 13, 12, 9, 3, 4, 6, 8, 10, 13, 14, 11, 6, 8, 9, 10, 12, 15, 15, 12, 9, 11, 11, 12, 14, 12, 12, 12],
        Tbl_100UV: [3, 3, 4, 8, 18, 18, 18, 18, 3, 3, 4, 12, 18, 18, 18, 18, 4, 4, 10, 18, 18, 18, 18, 18, 8, 12, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
            18, 18, 18, 18, 18, 18, 18, 18, 18
        ],
        Tbl_086Y: [3, 2, 1, 3, 4, 7, 9, 11, 2, 2, 2, 3, 4, 10, 11, 10, 2, 2, 3, 4, 7, 10, 12, 10, 2, 3, 4, 5, 9, 16, 15, 11, 3, 4, 6, 10, 12, 20, 19, 14, 4, 6, 10, 12, 15, 19, 21, 17, 9, 12, 14, 16, 19, 22, 22, 18, 13, 17, 17, 18, 21, 18, 19, 18],
        Tbl_086UV: [4, 5, 6, 13, 27, 27, 27, 27, 5, 5, 7, 18, 27, 27, 27, 27, 6, 7, 15, 27, 27, 27, 27, 27, 13, 18, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
        Tbl_071Y: [6, 4, 3, 6, 9, 15, 19, 22, 4, 4, 5, 7, 9, 21, 22, 20, 5, 4, 6, 9, 15, 21, 25, 21, 5, 6, 8, 10, 19, 32, 30, 23, 6, 8, 13, 21, 25,
            40, 38, 28, 9, 13, 20, 24, 30, 39, 42, 34, 18, 24, 29, 32, 38, 45, 45, 37, 27, 34, 35, 36, 42, 37, 38, 37
        ],
        Tbl_071UV: [9, 10, 13, 26, 55, 55, 55, 55, 10, 11, 14, 37, 55, 55, 55, 55, 13, 14, 31, 55, 55, 55, 55, 55, 26, 37, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
        Tbl_057Y: [9, 6, 5, 9, 13, 22, 28, 34, 6, 6, 7, 10, 14, 32, 33, 30, 7, 7, 9, 13, 22, 32, 38, 31, 7, 9, 12, 16, 28, 48, 45, 34, 10, 12, 20, 31, 38, 61, 57, 43, 13, 19, 30, 36, 45, 58, 63, 51, 27, 36, 43, 48, 57, 68, 67, 56, 40, 51, 53, 55, 63, 56, 57, 55],
        Tbl_057UV: [13, 14, 19, 38, 80,
            80, 80, 80, 14, 17, 21, 53, 80, 80, 80, 80, 19, 21, 45, 80, 80, 80, 80, 80, 38, 53, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80
        ],
        Tbl_043Y: [11, 7, 7, 11, 17, 28, 36, 43, 8, 8, 10, 13, 18, 41, 43, 39, 10, 9, 11, 17, 28, 40, 49, 40, 10, 12, 15, 20, 36, 62, 57, 44, 12, 15, 26, 40, 48, 78, 74, 55, 17, 25, 39, 46, 58, 74, 81, 66, 35, 46, 56, 62, 74, 86, 86, 72, 51, 66, 68, 70, 80, 71, 74, 71],
        Tbl_043UV: [18, 19, 26, 51, 108, 108, 108, 108, 19, 22, 28, 72, 108, 108, 108, 108, 26, 28, 61, 108, 108, 108, 108, 108, 51, 72, 108, 108, 108, 108, 108, 108,
            108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108, 108
        ],
        Tbl_029Y: [14, 9, 9, 14, 21, 36, 46, 55, 10, 10, 12, 17, 23, 52, 54, 49, 12, 11, 14, 21, 36, 51, 62, 50, 12, 15, 19, 26, 46, 78, 72, 56, 16, 19, 33, 50, 61, 98, 93, 69, 21, 31, 49, 58, 73, 94, 102, 83, 44, 58, 70, 78, 93, 109, 108, 91, 65, 83, 86, 88, 101, 90, 93, 89],
        Tbl_029UV: [22, 24, 32, 63, 133, 133, 133, 133, 24, 28, 34, 88, 133, 133, 133, 133, 32, 34, 75, 133, 133, 133, 133, 133, 63, 88, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133,
            133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133, 133
        ],
        Tbl_014Y: [17, 12, 10, 17, 26, 43, 55, 66, 13, 13, 15, 20, 28, 63, 65, 60, 15, 14, 17, 26, 43, 62, 75, 61, 15, 18, 24, 31, 55, 95, 87, 67, 19, 24, 40, 61, 74, 119, 112, 84, 26, 38, 60, 70, 88, 113, 123, 100, 53, 70, 85, 95, 112, 132, 131, 110, 78, 100, 103, 107, 122, 109, 112, 108],
        Tbl_014UV: [27, 29, 39, 76, 160, 160, 160, 160, 29, 34, 42, 107, 160, 160, 160, 160, 39, 42, 91, 160, 160, 160, 160, 160, 76, 107, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160,
            160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160, 160
        ],
        Tbl_000Y: [20, 13, 12, 20, 30, 50, 63, 76, 15, 15, 17, 23, 32, 72, 75, 68, 17, 16, 20, 30, 50, 71, 86, 70, 17, 21, 27, 36, 63, 108, 100, 77, 22, 27, 46, 70, 85, 136, 128, 96, 30, 43, 68, 80, 101, 130, 141, 115, 61, 80, 97, 108, 128, 151, 150, 126, 90, 115, 118, 122, 140, 125, 128, 123],
        Tbl_000UV: [31, 33, 45, 88, 185, 185, 185, 185, 33, 39, 48, 123, 185, 185, 185, 185, 45, 48, 105, 185, 185, 185, 185, 185, 88, 123, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185,
            185, 185, 185, 185, 185, 185, 185, 185, 185
        ],
        Tbl_Q11Y: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 3, 3, 2, 1, 1, 1, 2, 2, 3, 3, 2, 1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3],
        Tbl_Q11UV: [1, 1, 1, 2, 6, 6, 6, 6, 1, 1, 1, 4, 6, 6, 6, 6, 1, 1, 3, 6, 6, 6, 6, 6, 2, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        Tbl_Q10Y: [1, 1, 1, 1, 1, 2, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 2, 3, 4, 3, 1, 1, 1, 1, 3, 5, 5, 3, 1, 1, 2, 3, 4, 6, 6, 4, 1, 2, 3, 4, 5, 6, 7, 5, 3, 4, 4, 5, 6, 7, 7, 6, 4, 5, 5, 6, 7, 6, 6, 6],
        Tbl_Q10UV: [1, 1, 2, 4, 9, 9, 9, 9, 1, 1, 2, 6, 9, 9, 9, 9, 2, 2,
            5, 9, 9, 9, 9, 9, 4, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
        ],
        Tbl_Q09Y: [1, 1, 1, 1, 2, 3, 4, 5, 1, 1, 1, 1, 2, 5, 5, 5, 1, 1, 1, 2, 3, 5, 6, 5, 1, 1, 2, 2, 4, 8, 7, 5, 1, 2, 3, 5, 6, 10, 9, 7, 2, 3, 5, 6, 7, 9, 10, 8, 4, 6, 7, 8, 9, 11, 11, 9, 6, 8, 8, 9, 10, 9, 9, 9],
        Tbl_Q09UV: [2, 2, 3, 5, 12, 12, 12, 12, 2, 2, 3, 8, 12, 12, 12, 12, 3, 3, 7, 12, 12, 12, 12, 12, 5, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        Tbl_Q08Y: [2, 1, 1, 2, 3, 5, 6, 7, 1, 1, 1, 2, 3, 7, 7, 6, 1, 1, 2, 3, 5, 7, 8, 7, 1, 2, 2, 3, 6, 10, 10,
            7, 2, 2, 4, 7, 8, 13, 12, 9, 3, 4, 6, 8, 10, 13, 14, 11, 6, 8, 9, 10, 12, 15, 15, 12, 9, 11, 11, 12, 14, 12, 12, 12
        ],
        Tbl_Q08UV: [2, 2, 3, 7, 15, 15, 15, 15, 2, 3, 4, 10, 15, 15, 15, 15, 3, 4, 8, 15, 15, 15, 15, 15, 7, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        zigzag: [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
        dezigzag: [0, 1, 8, 16, 9, 2, 3, 10, 17, 24,
            32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63
        ],
        scalefactor: [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379],
        std_luminance_qt: null,
        std_chrominance_qt: null,
        YDC: 0,
        CbDC: 1,
        CrDC: 1,
        YAC: 0,
        CbAC: 1,
        CrAC: 1,
        VQ_BLOCK_START_CODE: 0,
        JPEG_BLOCK_START_CODE: 1,
        VQ_BLOCK_SKIP_CODE: 2,
        JPEG_BLOCK_SKIP_CODE: 3,
        BLOCK_START_LENGTH: 2,
        BLOCK_START_MASK: 3,
        BLOCK_HEADER_S_MASK: 1,
        BLOCK_HEADER_MASK: 15,
        VQ_HEADER_MASK: 1,
        VQ_NO_UPDATE_HEADER: 0,
        VQ_UPDATE_HEADER: 1,
        VQ_NO_UPDATE_LENGTH: 3,
        VQ_UPDATE_LENGTH: 27,
        VQ_INDEX_MASK: 3,
        VQ_COLOR_MASK: 16777215,
        JPEG_NO_SKIP_CODE: 0,
        LOW_JPEG_NO_SKIP_CODE: 4,
        LOW_JPEG_SKIP_CODE: 12,
        JPEG_SKIP_CODE: 8,
        FRAME_END_CODE: 9,
        VQ_NO_SKIP_1_COLOR_CODE: 5,
        VQ_NO_SKIP_2_COLOR_CODE: 6,
        VQ_NO_SKIP_4_COLOR_CODE: 7,
        VQ_SKIP_1_COLOR_CODE: 13,
        VQ_SKIP_2_COLOR_CODE: 14,
        VQ_SKIP_4_COLOR_CODE: 15,
        MODE_CHANGE_SIZE_CODE: 11,
        JPEG_PASS2_CODE: 2,
        JPEG_SKIP_PASS2_CODE: 10,
        BLOCK_AST2500_START_LENGTH: 4,
        BLOCK_AST2500_SKIP_LENGTH: 20,
        RGB_POWER: 4,
        RGB_R_INDEX: 0,
        RGB_G_INDEX: 1,
        RGB_B_INDEX: 2,
        RGB_N_INDEX: 3,
        ENCRYPTION_KEY_LENGTH: 16
    };
    this.Keymap = [[65, 4], [97, 4], [66, 5], [98, 5], [67, 6], [99, 6], [68, 7], [100, 7], [69, 8], [101, 8], [70, 9], [102, 9], [71, 10], [103, 10], [72, 11], [104, 11], [73, 12], [105, 12], [74, 13], [106, 13], [75, 14], [107, 14], [76, 15], [108, 15], [77, 16], [109, 16], [78, 17], [110, 17], [79, 18], [111, 18], [80, 19], [112, 19], [81, 20], [113, 20], [82, 21], [114, 21], [83, 22], [115, 22], [84, 23], [116, 23], [85, 24], [117, 24], [86, 25], [118, 25], [87, 26], [119, 26], [88, 27], [120, 27], [89, 28], [121, 28], [90, 29], [122, 29], [33, 30], [49, 30], [64, 31], [50, 31], [35, 32], [51, 32], [36, 33], [52, 33], [37, 34], [53, 34], [94, 35], [54, 35], [38, 36], [55, 36], [42, 37], [56, 37], [40, 38], [57, 38], [41, 39], [48, 39], [65293, 40], [65307, 41], [65288, 42], [65289, 43], [32, 44], [95, 45], [45, 45], [43, 46], [61, 46], [91, 47], [123, 47], [93, 48], [125, 48], [124, 49], [92, 49], [59, 51], [58, 51], [39, 52], [34, 52], [126, 53], [96, 53], [44, 54], [60, 54], [46, 55], [62, 55], [47, 56], [63, 56], [65509, 57], [65510, 57], [65470, 58], [65471, 59], [65472, 60], [65473, 61], [65474, 62], [65475, 63], [65476, 64], [65477, 65], [65478, 66], [65479, 67], [65480, 68], [65481, 69], [65377, 70], [65300, 71], [65301, 71], [65299, 72], [65379, 73], [65360, 74], [65365, 75], [65535, 76], [65367, 77], [65366, 78], [65363, 79], [65361, 80], [65364, 81], [65362, 82], [65407, 83], [65408, 83], [65455, 84], [65450, 85], [65453, 86], [65451, 87], [65421, 88], [65457, 89], [65458, 90], [65433, 90], [65459, 91], [65435, 91], [65460, 92], [65430, 92], [65461, 93], [65437, 93], [65462, 94], [65432, 94], [65463, 95], [65429, 95], [65464, 96], [65431, 96], [65465, 97], [65434, 97], [65456, 98], [65438, 98], [65454, 99], [65439, 99], [65383, 101], [65507, 224], [65505, 225], [65513, 226], [65515, 227], [65508, 228], [65506, 229], [65514, 230], [65516, 231], [65517, 45], [65518, 45], [33153, 129], [33410, 130], [33667, 131], [34695, 135], [34952, 136], [35209, 137], [35466, 138], [35723, 139], [35980, 140], [37008, 144], [37265, 145], [37522, 146], [37779, 147], [38036, 148], [181, 181], [182, 182], [183, 183], [205, 205], [226, 226], [233, 233], [234, 234], [387, 387], [394, 394], [402, 402], [404, 404], [545, 545], [547, 547], [548, 548], [549, 549], [550, 550], [551, 551], [554, 554]
    ];
    this.JpegHeader16x16 = [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 255, 219, 0, 132, 0, 20, 13, 15, 17, 15, 12, 20, 17, 16, 17, 22, 21, 20, 23, 30, 50, 32, 30, 27, 27, 30, 61, 43, 46, 36, 50, 72, 63, 76, 75, 71, 63, 70, 68, 80, 90, 115, 97, 80, 85, 108, 86, 68, 70, 100, 136, 101, 108, 118, 122, 128, 130, 128, 77, 96, 141, 151, 140, 125, 150, 115, 126, 128, 123, 1, 31, 33, 33, 45, 39, 45, 88, 48, 48, 88, 185, 123, 105, 123, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185,
        185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 255, 192, 0, 17, 8, 0, 16, 0, 16, 3, 1, 34, 0, 2, 17, 1, 3, 34, 1, 255, 196, 1, 162, 0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125, 1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133,
        134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119, 0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37,
        241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250, 255, 218, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0
    ];
    this.JpegHeaderLittle = [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0, 96, 0, 0, 255, 225, 0, 34, 69, 120, 105, 102, 0, 0, 77, 77, 0, 42, 0, 0, 0, 8, 0, 1, 1, 18, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 255, 219, 0, 67, 0, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 5, 3, 3, 3, 3, 3, 6, 4, 4, 3, 5, 7, 6, 7, 7, 7, 6, 7, 7, 8, 9, 11, 9, 8, 8, 10, 8, 7, 7, 10, 13, 10, 10, 11, 12, 12, 12, 12, 7, 9, 14, 15, 13, 12, 14, 11, 12, 12, 12, 255, 219, 0, 67, 1, 2, 2, 2, 3, 3, 3, 6, 3, 3, 6, 12, 8, 7, 8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        255, 192, 0, 17, 8, 0, 16, 0, 16, 3, 1, 34, 0, 2, 17, 1, 3, 17, 1, 255, 196, 0, 31, 0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 255, 196, 0, 181, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125, 1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149,
        150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 255, 196, 0, 31, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 255, 196, 0, 181, 17, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119, 0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23,
        24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250, 255, 218, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0
    ];
    this.JpegHeader8x8 = [255,
        216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 255, 219, 0, 132, 0, 8, 6, 6, 7, 6, 5, 8, 7, 7, 7, 9, 9, 8, 10, 12, 20, 13, 12, 11, 11, 12, 25, 18, 19, 15, 20, 29, 26, 31, 30, 29, 26, 28, 28, 32, 36, 46, 39, 32, 34, 44, 35, 28, 28, 40, 55, 41, 44, 48, 49, 52, 52, 52, 31, 39, 57, 61, 56, 50, 60, 46, 51, 52, 50, 1, 9, 9, 9, 12, 11, 12, 24, 13, 13, 24, 50, 33, 28, 33, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 255, 192, 0, 17, 8, 0, 8, 0, 8, 3, 1, 17, 0, 2, 17, 1, 3, 17, 1, 255, 196, 1, 162, 0, 0, 1,
        5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125, 1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183,
        184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119, 0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103,
        104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250, 255, 218, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0
    ];
    this.JpegHeader16x16Base64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABAAEAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/";
    this.JpegHeaderRemain = 0;
    this.JpegTest = [95, 8, 248, 110, 61, 74, 222, 91, 237, 86, 43, 251, 120, 110, 237, 76, 66, 205, 203, 68, 93, 11, 163, 164, 187, 149, 254, 83, 148, 97, 140, 103, 29, 120, 35, 63, 21, 153, 99, 103, 78, 113, 141, 11, 62, 89, 95, 155, 117, 116, 154, 148, 109, 109, 116, 146, 190, 189, 116, 215, 111, 166, 206, 115, 75, 206, 46, 28, 209, 106, 253, 108, 239, 232, 155, 181, 175, 107, 239, 186, 123, 88, 151, 93, 240, 114, 88, 105, 114, 29, 46, 98, 238, 215, 94, 114, 181, 195, 140, 195, 110, 177, 239, 120, 178, 78, 95, 238, 54, 14, 11, 124, 195, 39, 0, 181, 122, 24, 60, 100, 103, 128, 85, 235, 199, 222, 231,
        228, 186, 235, 125, 157, 182, 91, 235, 211, 182, 234, 38, 89, 102, 115, 139, 171, 139, 84, 92, 219, 141, 163, 209, 105, 239, 69, 59, 187, 95, 107, 171, 247, 127, 51, 66, 199, 84, 75, 111, 16, 234, 14, 247, 48, 221, 65, 125, 42, 200, 146, 173, 236, 35, 202, 67, 156, 23, 87, 117, 113, 128, 64, 192, 83, 247, 72, 236, 43, 201, 84, 21, 90, 52, 169, 78, 240, 229, 209, 251, 178, 122, 233, 118, 185, 98, 211, 189, 175, 190, 183, 90, 149, 156, 97, 106, 86, 167, 74, 20, 41, 55, 56, 38, 164, 173, 247, 107, 179, 77, 169, 52, 253, 122, 150, 124, 81, 171, 88, 75, 225, 251, 139, 91, 93, 67, 79, 154, 121, 54, 22, 132, 93, 47, 152, 19, 120, 249, 149,
        70, 75, 114, 0, 237, 193, 39, 60, 96, 250, 245, 97, 71, 14, 233, 96, 168, 198, 77, 69, 185, 57, 219, 221, 114, 229, 106, 215, 219, 103, 210, 246, 178, 90, 182, 218, 226, 225, 220, 30, 34, 158, 97, 26, 149, 162, 226, 236, 244, 106, 206, 218, 235, 233, 125, 15
    ];
    this.JpegTestStr = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIABAAEAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AF8I+G49St5b7VYr+3hu7UxCzctEXQujpLuV/lOUYYxnHXgjPxWZY2dOcY0LPllfm3V0mpRtbXSSvr1012+mznNLzi4c0Wr9bO/om7Wva++6e1iXXfByWGlyHS5i7tdecrXDjMNuse94sk5f7jYOC3zDJwC1ehg8ZGeAVevH3ufkuut9nbZb69O26iZZZnOLq4tUXNuNo9Fp70U7u19rq/d/M0LHVEtvEOoO9zDdQX0qyJKt7CPKQ5wXV3VxgEDAU/dI7CvJVBVaNKlO8OXR+7J66Xa5YtO9r763WpWcYWpWp0oUKTc4JqSt92uzTak0/XqWfFGrWEvh+4tbXUNPmnk2FoRdL5gTePmVRktyAO3BJzxg+vVhRw7pYKjGTUW5OdvdcuVq19tn0vayWrba4uHcHiKeYRqVouLs9GrO2uvpfQ//2Q==";
    this.JpegEof = [255, 217];
    this.mRC4Enable = 0;
    this.mRC4Reset = 0;
    this.mRC4Key = new Array(this.std.ENCRYPTION_KEY_LENGTH);
    this.mGreyMode = 0;
    this.mMode420 = 1;
    this.mWidth = 0;
    this.mHeight = 0;
    this.mTmpWidth = this.mWidth;
    this.mTmpHeight = this.mHeight;
    this.mBuffer = _PreBuffer;
    //this.mOutBuffer_buf = new ArrayBuffer(4 * 1920 * 1280);
    this.mOutBuffer_buf = new ArrayBuffer(8 * 1920 * 1280);
    this.mOutBuffer = new Uint8Array(this.mOutBuffer_buf);
    //	this.mYuvBuffer = Array.from(Array(8*1920*1280), () => new Uint8Array(3));
    this.mYuvBuffer_buf = new ArrayBuffer(8 * 1920 * 1280);
    this.mYuvBufferR = new Uint8Array(this.mYuvBuffer_buf);
    this.mYuvBufferG = new Uint8Array(this.mYuvBuffer_buf);
    this.mYuvBufferB = new Uint8Array(this.mYuvBuffer_buf);
    this.mTileYuv_buf = new ArrayBuffer(768);
    this.mTileYuv = new Uint8Array(this.mTileYuv_buf);
    this.mWorkspace_buf = new ArrayBuffer(64 * 4);
    this.mWorkspace =
        new Uint32Array(this.mWorkspace_buf);
    this.mWorkerIndex = 0;
    this.mWorkerMaxNum = 1;
    this.mWorkerDecoder = new Array(this.mWorkerMaxNum);
    this.mWorkerLevel = null;
    this._display = null;
    this._drawCtx = null;
    this._img = null;
    this._imgdata = null;
    this._workBase64 = null;
    this._workJpeg = null;
    this._statusCanvas = document.createElement("canvas");
    this._statusCanvas.width = 100;
    this._statusCanvas.height = 100;
    this._statusImgCtx = this._statusCanvas.getContext("2d");
    this._statusImgB = this._statusImgCtx.createImageData(100, 100);
    this._statusImg =
        null;
    this._statusImgData = null;
    this.mCodebuf = 0;
    this.mNewbuf = 0;
    this.mIndex = 0;
    this.mTxb = 0;
    this.mTwb = 0;
    this.mTyb = 0;
    this.mThb = 0;
    this.mNewbits = 0;
    this.mDCY = 0;
    this.mDCCb = 0;
    this.mDCCr = 0;
    this.mDCTCoeff = new Array(384);
    this.mWordVal = 0;
    this.mRlimitTable_buf = new ArrayBuffer(5 * 256 + 128);
    this.mRlimitTable = new Uint16Array(this.mRlimitTable_buf);
    this.mRlimitTable_index = 256;
    this.mCrToR_buf = new ArrayBuffer(256 * 4);
    this.mCrToR = new Int32Array(this.mCrToR_buf);
    this.mCbToB_buf = new ArrayBuffer(256 * 4);
    this.mCbToB = new Int32Array(this.mCbToB_buf);
    this.mCrToG_buf = new ArrayBuffer(256 * 4);
    this.mCrToG = new Int32Array(this.mCrToG_buf);
    this.mCbToG_buf = new ArrayBuffer(256 * 4);
    this.mCbToG = new Int32Array(this.mCbToG_buf);
    this.m_Y = new Array(256);
    this.mQT = new Array(4);
    for (var i = 0; i < 4; i++) this.mQT[i] = new Array(64);
    this.mPy420Index = new Array(4);
    this.mPy420 = new Array(4);
    this.mPy = new Uint8Array(this.mTileYuv_buf, 0, 64);
    this.mPcb = new Uint8Array(this.mTileYuv_buf, 64, 64);
    this.mPcr = new Uint8Array(this.mTileYuv_buf, 128, 64);
    this.mPy420[0] = new Uint8Array(this.mTileYuv_buf,
        0, 64);
    this.mPy420[1] = new Uint8Array(this.mTileYuv_buf, 64, 64);
    this.mPy420[2] = new Uint8Array(this.mTileYuv_buf, 128, 64);
    this.mPy420[3] = new Uint8Array(this.mTileYuv_buf, 192, 64);
    this.mPcb420 = new Uint8Array(this.mTileYuv_buf, 256, 64);
    this.mPcr420 = new Uint8Array(this.mTileYuv_buf, 320, 64);
    this.mFBQueue = new Array;
    this.mFBTimer = null;
    this.previous_DC = 0;
    this.mStart = 0;
    this.mNow = 0;
    this.mLast = 0;
    this.mFrames = 0;
    this.mFps = 0;
    this.mHuffPerf = 0;
    this.mIDCTPerf = 0;
    this.mYUVPerf = 0;
    this.mUpbufPerf = 0;
    this.mMovePerf = 0;
    this.mDecompPerf =
        0;
    this.mCursorPattern = null;
    this.mCursorX = 0;
    this.mCursorY = 0;
    this.mCursorW = 0;
    this.mCursorH = 0;
    this.mColorBuf = new ArrayBuffer(4 * 4);
    this.mDecode_Color = {
        Color: new Uint32Array(this.mColorBuf),
        Index: new Array(4),
        BitMapBits: 0
    };
    this.mNegPow2 = [0, -1, -3, -7, -15, -31, -63, -127, -255, -511, -1023, -2047, -4095, -8191, -16383, -32767];
    this.WORD_hi_lo = function (byte_high, byte_low) {
        return byte_high + (byte_low << 8)
    };
    this.load_Huffman_table = function (HT, nrcode, value, Huff_code) {
        var k, j, i;
        var code_index;
        var code;
        for (j = 1; j <= 16; j++) HT.table_length[j] =
            nrcode[j];
        for (i = 0, k = 1; k <= 16; k++)
            for (j = 0; j < HT.table_length[k]; j++) {
                HT.V[this.WORD_hi_lo(k, j)] = value[i];
                i++
            }
        code = 0;
        for (k = 1; k <= 16; k++) {
            HT.minor_code[k] = 65535 & code;
            for (j = 1; j <= HT.table_length[k]; j++) code++;
            HT.major_code[k] = 65535 & code - 1;
            code *= 2;
            if (HT.table_length[k] == 0) {
                HT.minor_code[k] = 65535;
                HT.major_code[k] = 0
            }
        }
        HT.table_len[0] = 2;
        i = 2;
        for (code_index = 1; code_index < 65535; code_index++)
            if (code_index < Huff_code[i]) HT.table_len[code_index] = 255 & Huff_code[i + 1];
            else {
                i = i + 2;
                HT.table_len[code_index] = 255 & Huff_code[i + 1]
            }
        return 0
    };
    this.prepare_range_limit_table = function () {
        var j;
        for (j = 0; j < this.mRlimitTable_index; j++) this.mRlimitTable[j] = 0;
        for (j = 0; j < 256; j++) this.mRlimitTable[this.mRlimitTable_index + j] = j;
        for (j = 256; j < 640; j++) this.mRlimitTable[this.mRlimitTable_index + j] = 255;
        for (j = 0; j < 384; j++) this.mRlimitTable[this.mRlimitTable_index + j + 640] = 0;
        for (j = 0; j < 128; j++) this.mRlimitTable[this.mRlimitTable_index + j + 1024] = j
    };
    this.init_JPG_decoding = function () {
        this.mCurBytePos = 0;
        this.load_quant_table(this.mQT[0]);
        this.load_quant_tableCb(this.mQT[1]);
        this.load_advance_quant_table(this.mQT[2]);
        this.load_advance_quant_tableCb(this.mQT[3]);
        return 1
    };
    this.Init_Color_Table = function () {
        var i, x;
        var nScale = 1 << 16;
        var nHalf = nScale >> 1;
        var FIX = function (x) {
            return x * nScale + .5
        };
        for (i = 0, x = -128; i < 256; i++, x++) {
            this.mCrToR[i] = (FIX(1.597656).toFixed() * x + nHalf).toFixed() >> 16;
            this.mCbToB[i] = (FIX(2.015625).toFixed() * x + nHalf).toFixed() >> 16;
            this.mCrToG[i] = (-FIX(.8125).toFixed() * x + nHalf).toFixed() >> 16;
            this.mCbToG[i] = (-FIX(.390625).toFixed() * x + nHalf).toFixed() >> 16
        }
        for (i =
            0, x = -16; i < 256; i++, x++) this.m_Y[i] = FIX(1.164).toFixed() * x + nHalf >> 16
    };
    this.print_HT = function (HT) {
        for (var i = 1; i < 17; i++) {
            console.log("table_length[" + i + "]:" + HT.table_length[i]);
            console.log("table_len[" + i + "]:" + HT.table_len[i])
        }
        return 0
    };
    this.InitParameter = function () {
            if (this.mYUVMode == 420) {
                this.mYSelector = 4;
                this.mUVSelector = 7;
                this.mMapping = 0;
                this.mOldMode420 = 1;
                this.mMode420 = 1;
                this.mOldYSelector = 255
            } else if (this.mYUVMode == 444) {
                this.mYSelector = 7;
                this.mUVSelector = 7;
                this.mMapping = 0;
                this.mOldMode420 = 0;
                this.mMode420 =
                    0;
                this.mOldYSelector = 255
            }
            this.mTmpWidth = this.mWidth;
            this.mTmpHeight = this.mHeight;
            this.mRC4Enable = 0;
            this.mRC4Reset = 1;
            for (var i = 0; i < this.std.ENCRYPTION_KEY_LENGTH; i++) this.mRC4Key[i] = 0;
            this.mScaleFactor = 16;
            this.mScaleFactorUV = 16;
            this.mAdvanceScaleFactor = 16;
            this.mAdvanceScaleFactorUV = 16;
            this.mAdvanceSelector = 7;
            this.mMapping = 0;
            this.mSharpModeSelection = 0;
            // Util.Debug("InitParameter(), this" + ", Y_Sel=" + this.mYSelector + ", UV_Sel=" + this.mUVSelector + ", w*h=" + this.mWidth + "*" + this.mHeight)
        }, this.init_jpg_table =
        function () {
            this.init_QT(); // 아무것도 안함
            var HT_ref = this.HT_ref;
            var std = this.std;
            if (!HT_ref.HT_init) {
                this.Init_Color_Table();
                this.prepare_range_limit_table();
                this.load_Huffman_table(HT_ref.HTDC[0], std.std_dc_luminance_nrcodes, std.std_dc_luminance_values, std.DC_LUMINANCE_HUFFMANCODE);
                this.load_Huffman_table(HT_ref.HTAC[0], std.std_ac_luminance_nrcodes, std.std_ac_luminance_values, std.AC_LUMINANCE_HUFFMANCODE);
                this.load_Huffman_table(HT_ref.HTDC[1], std.std_dc_chrominance_nrcodes, std.std_dc_chrominance_values, std.DC_CHROMINANCE_HUFFMANCODE);
                this.load_Huffman_table(HT_ref.HTAC[1], std.std_ac_chrominance_nrcodes, std.std_ac_chrominance_values, std.AC_CHROMINANCE_HUFFMANCODE);
                HT_ref.HT_init = 1
            }
            return 0
        };
    var Ast2500_Huffman_Table = function () {
        var HT_init = 0;
        var Huffman_Table = function () {
            this.table_length_buf = new ArrayBuffer(17);
            this.table_length = new Uint8Array(this.table_length_buf);
            this.table_len_buf = new ArrayBuffer(65536);
            this.table_len = new Uint8Array(this.table_len_buf);
            this.V_buf = new ArrayBuffer(65536);
            this.V = new Uint8Array(this.V_buf);
            this.minor_code_buf =
                new ArrayBuffer(17 * 2);
            this.minor_code = new Uint16Array(this.minor_code_buf);
            this.major_code_buf = new ArrayBuffer(17 * 2);
            this.major_code = new Uint16Array(this.major_code_buf);
            return this
        };
        this.HTDC = new Array(4);
        this.HTAC = new Array(4);
        for (var i = 0; i < 4; i++) {
            this.HTDC[i] = new Huffman_Table;
            this.HTAC[i] = new Huffman_Table
        }
        return this
    };
    this.HT_ref = new Ast2500_Huffman_Table;
    
    this._eventHandlers = {
	'modchng' : function() {}
    };


    //Util.Debug(">>> Ast2500.constructor")
};
Ast2500.prototype = {
    print_HTs: function () {
        var HT_ref = this.HT_ref;
        var print_HT = this.print_HT;
        console.log("HT_ref.HTDC[0]");
        print_HT(HT_ref.HTDC[0]);
        console.log("HT_ref.HTAC[0]");
        print_HT(HT_ref.HTAC[0]);
        return 0
    },
    set_width_height: function (Width, Height) {
        if (Width < 0 && Height < 0) return -1;
        this.mWidth = Width;
        this.mHeight = Height;
        return 0
    },
    get_ctrl_code: function (Data) {
        var CtrlCode = (Data[0] & 15) >>> 4;
        return CtrlCode
    },
    get_plus_coordinate: function (tx, ty) {
        tx = tx + 1;
        if (tx < this.mWidth) return 0;
        else {
            ty = ty + 1;
            tx = 0
        }
        if (ty < this.mHeight) return 0;
        else {
            console.err("get_plus_coordinate out of rang");
            return 1
        }
    },
    get_code_xy_datalen: function (CtrlCode,
        X, Y, DataLen, Data) {},
    SetBuffer: function (w, h, Y_Sel, UV_Sel, datalen) {
        this.mWidth = w;
        this.mHeight = h;
        this.mTmpWidth = this.mWidth;
        this.mTmpHeight = this.mHeight;
        this.mUVSelector = UV_Sel;
        this.mYSelector = Y_Sel;
        // Util.Debug("SetBuffer(), this" + ", Y_Sel=" + this.mYSelector + ", UV_Sel=" + this.mUVSelector + ", w*h=" + w + "*" + h)
    },
    SetOptions: function (DecodeInfo) {
        DecodeInfo.ID = 57;
        //            DecodeInfo.Y_Sel = this.mBuffer[0];
        //          DecodeInfo.UV_Sel = this.mBuffer[1];
        //    DecodeInfo.Mode = this.mBuffer[2] * 256 + this.mBuffer[3];
        DecodeInfo.Y_Sel = 4;
        DecodeInfo.UV_Sel = DecodeInfo.Y_Sel;
        DecodeInfo.Mode = 420;
        // Util.Debug("SetOption(), DecodeInfo" +
        //    ", Y_Sel=" + DecodeInfo.Y_Sel + ", UV_Sel=" + DecodeInfo.UV_Sel + ", mode=" + DecodeInfo.Mode);
        this.mYUVMode = DecodeInfo.Mode;
        this.mNegPow2 = [0, -1, -3, -7, -15, -31, -63, -127, -255, -511, -1023, -2047, -4095, -8191, -16383, -32767];
        this.mYQnr = 0;
        this.mCbQnr = 1;
        this.mCrQnr = 1;
        this.mYDCnr = 0;
        this.mCbDCnr = 1;
        this.mCrDCnr = 1;
        this.mYACnr = 0;
        this.mCbACnr = 1;
        this.mCrACnr = 1;
        this.init_jpg_table();
        this.InitParameter();
//        this.SetBuffer(DecodeInfo.w, DecodeInfo.h, DecodeInfo.Y_Sel, DecodeInfo.UV_Sel, DecodeInfo.DataLen);
// console.log('In AST SetOptions mWidth', this.mWidth);
// console.log('In AST SetOptions mHeight', this.mHeight);
this.SetBuffer(this.mWidth, this.mHeight, DecodeInfo.Y_Sel, DecodeInfo.UV_Sel, DecodeInfo.DataLen);
        return 0
    },
    set_tmp_width_height: function (mMode420,
        mWidth, mHeight, mTmpWidth, mTmpHeight) {
        if (mMode420 == 1) {
            if (this.mWidth % 16) this.mWidth = this.mWidth + 16 - this.mWidth % 16;
            if (this.mHeight % 16) this.mHeight = this.mHeight + 16 - this.mHeight % 16;
            this.mTwb = 16;
            this.mThb = 16
        } else {
            if (this.mWidth % 8) this.mWidth = this.mWidth + 8 - this.mWidth % 8;
            if (this.mHeight % 8) this.mHeight = this.mHeight + 8 - this.mHeight % 8;
            this.mTwb = 8;
            this.mThw = 8
        }
        if (mMode420 == 1) {
            if (this.mTmpWidth % 16) this.mTmpWidth = this.mTmpWidth + 16 - this.mTmpWidth % 16;
            if (this.mTmpHeight % 16) this.mTmpHeight = this.mTmpHeight + 16 - this.mTmpHeight %
                16
        } else {
            if (this.mTmpWidth % 8) this.mTmpWidth = this.mTmpWidth + 8 - this.mTmpWidth % 8;
            if (this.mTmpHeight % 8) this.mTmpHeight = this.mTmpHeight + 8 - this.mTmpHeight % 8
        }
    },
    get_qbytes_from_mBuffer: function (len) {
        var Codebuf = 0;
        // console.log('[step 1]');
        // console.log(this.mIndex + " / " + this.mBuffer.length);
        for (var i = 0; i < len; i++)
        {
            if (this.mIndex < this.mBuffer.length)
            {
                // console.log('[step 2 - ' + i + ']');
                // console.log(this.mBuffer[this.mIndex]);
                
                Codebuf |= this.mBuffer[this.mIndex++] << 8 * i;
                // console.log(Codebuf);
            }
            else
                Codebuf |= 0;
        }
        return Codebuf
    },
    MULTIPLY: function (vari, cons) {
        return vari * cons >> 8
    },
    IDCT_transform: function (coef, data, index, nBlock) {
        var FIX_1_082392200 = 277;
        var FIX_1_414213562 = 362;
        var FIX_1_847759065 =
            473;
        var FIX_2_613125930 = 669;
        var tmp0, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7;
        var tmp10, tmp11, tmp12, tmp13;
        var z5, z10, z11, z12, z13;
        var inptr = coef;
        var quantptr = null;
        var wsptr = this.mWorkspace;
        var outptr;
        var ctr, dcval;
        quantptr = this.mQT[nBlock];
        var ptr_index = 0;
        for (ctr = 0; ctr < 8; ctr++) {
            if ((inptr[index + ctr + 8] | inptr[index + ctr + 16] | inptr[index + ctr + 24] | inptr[index + ctr + 32] | inptr[index + ctr + 40] | inptr[index + ctr + 48] | inptr[index + ctr + 56]) == 0) {
                dcval = 4294967295 & inptr[index + ctr] * quantptr[ctr] >> 16;
                wsptr[ctr] = dcval;
                wsptr[ctr + 8] =
                    dcval;
                wsptr[ctr + 16] = dcval;
                wsptr[ctr + 24] = dcval;
                wsptr[ctr + 32] = dcval;
                wsptr[ctr + 40] = dcval;
                wsptr[ctr + 48] = dcval;
                wsptr[ctr + 56] = dcval;
                continue
            }
            tmp0 = inptr[index + ctr] * quantptr[ctr] >> 16;
            tmp1 = inptr[index + ctr + 16] * quantptr[ctr + 16] >> 16;
            tmp2 = inptr[index + ctr + 32] * quantptr[ctr + 32] >> 16;
            tmp3 = inptr[index + ctr + 48] * quantptr[ctr + 48] >> 16;
            tmp10 = tmp0 + tmp2;
            tmp11 = tmp0 - tmp2;
            tmp13 = tmp1 + tmp3;
            tmp12 = this.MULTIPLY(tmp1 - tmp3, FIX_1_414213562) - tmp13;
            tmp0 = tmp10 + tmp13;
            tmp3 = tmp10 - tmp13;
            tmp1 = tmp11 + tmp12;
            tmp2 = tmp11 - tmp12;
            tmp4 = inptr[index + ctr +
                8] * quantptr[ctr + 8] >> 16;
            tmp5 = inptr[index + ctr + 24] * quantptr[ctr + 24] >> 16;
            tmp6 = inptr[index + ctr + 40] * quantptr[ctr + 40] >> 16;
            tmp7 = inptr[index + ctr + 56] * quantptr[ctr + 56] >> 16;
            z13 = tmp6 + tmp5;
            z10 = tmp6 - tmp5;
            z11 = tmp4 + tmp7;
            z12 = tmp4 - tmp7;
            tmp7 = z11 + z13;
            tmp11 = this.MULTIPLY(z11 - z13, FIX_1_414213562);
            z5 = this.MULTIPLY(z10 + z12, FIX_1_847759065);
            tmp10 = this.MULTIPLY(z12, FIX_1_082392200) - z5;
            tmp12 = this.MULTIPLY(z10, -FIX_2_613125930) + z5;
            tmp6 = tmp12 - tmp7;
            tmp5 = tmp11 - tmp6;
            tmp4 = tmp10 + tmp5;
            wsptr[ctr] = tmp0 + tmp7;
            wsptr[ctr + 56] = tmp0 - tmp7;
            wsptr[ctr +
                8] = tmp1 + tmp6;
            wsptr[ctr + 48] = tmp1 - tmp6;
            wsptr[ctr + 16] = tmp2 + tmp5;
            wsptr[ctr + 40] = tmp2 - tmp5;
            wsptr[ctr + 32] = tmp3 + tmp4;
            wsptr[ctr + 24] = tmp3 - tmp4
        }
        var IDESCALE = function (x, n) {
            return x >> n
        };
        outptr = data;
        var outptr_index;
        for (ctr = 0; ctr < 8; ctr++) {
            outptr_index = ctr * 8;
            tmp10 = wsptr[outptr_index + 0] + wsptr[outptr_index + 4];
            tmp11 = wsptr[outptr_index + 0] - wsptr[outptr_index + 4];
            tmp13 = wsptr[outptr_index + 2] + wsptr[outptr_index + 6];
            tmp12 = this.MULTIPLY(wsptr[outptr_index + 2] - wsptr[outptr_index + 6], FIX_1_414213562) - tmp13;
            tmp0 = tmp10 + tmp13;
            tmp3 =
                tmp10 - tmp13;
            tmp1 = tmp11 + tmp12;
            tmp2 = tmp11 - tmp12;
            z13 = wsptr[outptr_index + 5] + wsptr[outptr_index + 3];
            z10 = wsptr[outptr_index + 5] - wsptr[outptr_index + 3];
            z11 = wsptr[outptr_index + 1] + wsptr[outptr_index + 7];
            z12 = wsptr[outptr_index + 1] - wsptr[outptr_index + 7];
            tmp7 = z11 + z13;
            tmp11 = this.MULTIPLY(z11 - z13, FIX_1_414213562);
            z5 = this.MULTIPLY(z10 + z12, FIX_1_847759065);
            tmp10 = this.MULTIPLY(z12, FIX_1_082392200) - z5;
            tmp12 = this.MULTIPLY(z10, -FIX_2_613125930) + z5;
            tmp6 = tmp12 - tmp7;
            tmp5 = tmp11 - tmp6;
            tmp4 = tmp10 + tmp5;
            outptr[index + outptr_index +
                0] = this.mRlimitTable[384 + IDESCALE(tmp0 + tmp7, 3) & 1023];
            outptr[index + outptr_index + 7] = this.mRlimitTable[384 + IDESCALE(tmp0 - tmp7, 3) & 1023];
            outptr[index + outptr_index + 1] = this.mRlimitTable[384 + IDESCALE(tmp1 + tmp6, 3) & 1023];
            outptr[index + outptr_index + 6] = this.mRlimitTable[384 + IDESCALE(tmp1 - tmp6, 3) & 1023];
            outptr[index + outptr_index + 2] = this.mRlimitTable[384 + IDESCALE(tmp2 + tmp5, 3) & 1023];
            outptr[index + outptr_index + 5] = this.mRlimitTable[384 + IDESCALE(tmp2 - tmp5, 3) & 1023];
            outptr[index + outptr_index + 4] = this.mRlimitTable[384 + IDESCALE(tmp3 +
                tmp4, 3) & 1023];
            outptr[index + outptr_index + 3] = this.mRlimitTable[384 + IDESCALE(tmp3 - tmp4, 3) & 1023]
        }
    },
    updatereadbuf: function (walks) {
        var readbuf;
        //  if (walks == undefined) Util.Error("walks is undefined");
        var newbits = this.mNewbits - walks;
        if (newbits <= 0) {
            readbuf = this.get_qbytes_from_mBuffer(4);
            this.mCodebuf = this.mCodebuf << walks | (this.mNewbuf | readbuf >>> this.mNewbits) >>> 32 - walks;
            this.mNewbuf = readbuf << walks - this.mNewbits;
            this.mNewbits = 32 + newbits
        } else {
            this.mCodebuf = this.mCodebuf << walks | this.mNewbuf >>> 32 - walks;
            this.mNewbuf =
                this.mNewbuf << walks;
            this.mNewbits = newbits
        }
    },
    skipKbits: function (k) {
        var readbuf;
        this.updatereadbuf(k)
    },
    getKbits: function (k) {
        var signed_wordvalue;
        signed_wordvalue = 65535 & this.mCodebuf >>> 32 - k;
        if ((1 << k - 1 & signed_wordvalue) == 0) signed_wordvalue = signed_wordvalue + this.mNegPow2[k];
        this.skipKbits(k);
        return signed_wordvalue
    },
    getKbitsAbs: function (k) {
        var signed_wordvalue;
        signed_wordvalue = 65535 & this.mCodebuf >>> 32 - k;
        this.skipKbits(k);
        return signed_wordvalue
    },
    init_QT: function () {},
    set_quant_table: function (basic_table,
        scale_factor, newtable) {
        var i;
        var temp;
        //   console.log(basic_table + "	" + scale_factor + "	" + newtable);
        for (i = 0; i < 64; i++) {
            temp = basic_table[i] * 16 / scale_factor;
            if (temp <= 0) temp = 1;
            if (temp > 255) temp = 255;
            newtable[this.std.zigzag[i]] = 255 & temp
        }
    },
    load_quant_table: function (quant_table) {
        var scalefactor = this.std.scalefactor;
        var j, row, col;
        var tempQT_buf = new ArrayBuffer(64);
        var tempQT = new Uint8Array(tempQT_buf);
        //console.log("myselect : " + this.mYSelector);
        switch (this.mYSelector) {
            case 0:
                this.std.std_luminance_qt = this.std.Tbl_000Y;
                break;
            case 1:
                this.std.std_luminance_qt = this.std.Tbl_014Y;
                break;
            case 2:
                this.std.std_luminance_qt =
                    this.std.Tbl_029Y;
                break;
            case 3:
                this.std.std_luminance_qt = this.std.Tbl_043Y;
                break;
            case 4:
                this.std.std_luminance_qt = this.std.Tbl_057Y;
                break;
            case 5:
                this.std.std_luminance_qt = this.std.Tbl_071Y;
                break;
            case 6:
                this.std.std_luminance_qt = this.std.Tbl_086Y;
                break;
            case 7:
                this.std.std_luminance_qt = this.std.Tbl_100Y;
                break;
            case 8:
                this.std.std_luminance_qt = this.std.Tbl_Q08Y;
                break;
            case 9:
                this.std.std_luminance_qt = this.std.Tbl_Q09Y;
                break;
            case 10:
                this.std.std_luminance_qt = this.std.Tbl_Q10Y;
                break;
            case 11:
                this.std.std_luminance_qt =
                    this.std.Tbl_Q11Y;
                break
        }
        //console.log("load_quant_table : " + this.std.std_luminance_qt);
        this.set_quant_table(this.std.std_luminance_qt, this.mScaleFactor, tempQT);
        for (j = 0; j <= 63; j++) quant_table[j] = tempQT[this.std.zigzag[j]];
        j = 0;
        for (row = 0; row <= 7; row++)
            for (col = 0; col <= 7; col++) {
                quant_table[j] = quant_table[j] * scalefactor[row] * scalefactor[col] * 65536;
                j++
            }
        this.mCurBytePos += 64
    },
    load_quant_tableCb: function (quant_table) {
        var scalefactor = this.std.scalefactor;
        var j, row, col;
        var tempQT_buf = new ArrayBuffer(64);
        var tempQT = new Uint8Array(tempQT_buf);
        if (this.mMapping == 1) switch (this.mUVSelector) {
            case 0:
                this.std.std_chrominance_qt =
                    this.std.Tbl_000Y;
                break;
            case 1:
                this.std.std_chrominance_qt = this.std.Tbl_014Y;
                break;
            case 2:
                this.std.std_chrominance_qt = this.std.Tbl_029Y;
                break;
            case 3:
                this.std.std_chrominance_qt = this.std.Tbl_043Y;
                break;
            case 4:
                this.std.std_chrominance_qt = this.std.Tbl_057Y;
                break;
            case 5:
                this.std.std_chrominance_qt = this.std.Tbl_071Y;
                break;
            case 6:
                this.std.std_chrominance_qt = this.std.Tbl_086Y;
                break;
            case 7:
                this.std.std_chrominance_qt = this.std.Tbl_100Y;
                break
        } else switch (this.mUVSelector) {
            case 0:
                this.std.std_chrominance_qt =
                    this.std.Tbl_000UV;
                break;
            case 1:
                this.std.std_chrominance_qt = this.std.Tbl_014UV;
                break;
            case 2:
                this.std.std_chrominance_qt = this.std.Tbl_029UV;
                break;
            case 3:
                this.std.std_chrominance_qt = this.std.Tbl_043UV;
                break;
            case 4:
                this.std.std_chrominance_qt = this.std.Tbl_057UV;
                break;
            case 5:
                this.std.std_chrominance_qt = this.std.Tbl_071UV;
                break;
            case 6:
                this.std.std_chrominance_qt = this.std.Tbl_086UV;
                break;
            case 7:
                this.std.std_chrominance_qt = this.std.Tbl_100UV;
                break;
            case 8:
                this.std.std_chrominance_qt = this.std.Tbl_Q08UV;
                break;
            case 9:
                this.std.std_chrominance_qt = this.std.Tbl_Q09UV;
                break;
            case 10:
                this.std.std_chrominance_qt = this.std.Tbl_Q10UV;
                break;
            case 11:
                this.std.std_chrominance_qt = this.std.Tbl_Q11UV;
                break
        }
        //console.log("load_quant_tableCb : " + this.std.std_chrominance_qt);  
        this.set_quant_table(this.std.std_chrominance_qt, this.mScaleFactorUV, tempQT);
        for (j = 0; j <= 63; j++) quant_table[j] = tempQT[this.std.zigzag[j]];
        j = 0;
        for (row = 0; row <= 7; row++)
            for (col = 0; col <= 7; col++) {
                quant_table[j] = quant_table[j] * scalefactor[row] * scalefactor[col] * 65536;
                j++
            }
        this.mCurBytePos += 64
    },
    load_advance_quant_table: function (quant_table) {
        var scalefactor =
            this.std.scalefactor;
        var j, row, col;
        var tempQT_buf = new ArrayBuffer(64);
        var tempQT = new Uint8Array(tempQT_buf);
        switch (this.mAdvanceSelector) {
            case 0:
                this.std.std_luminance_qt = this.std.Tbl_000Y;
                break;
            case 1:
                this.std.std_luminance_qt = this.std.Tbl_014Y;
                break;
            case 2:
                this.std.std_luminance_qt = this.std.Tbl_029Y;
                break;
            case 3:
                this.std.std_luminance_qt = this.std.Tbl_043Y;
                break;
            case 4:
                this.std.std_luminance_qt = this.std.Tbl_057Y;
                break;
            case 5:
                this.std.std_luminance_qt = this.std.Tbl_071Y;
                break;
            case 6:
                this.std.std_luminance_qt =
                    this.std.Tbl_086Y;
                break;
            case 7:
                this.std.std_luminance_qt = this.std.Tbl_100Y;
                break
        }
        //console.log("load_adavnce_quant_table : " + this.std.std_luminance_qt);  
        this.set_quant_table(this.std.std_luminance_qt, this.mAdvanceScaleFactor, tempQT);
        for (j = 0; j <= 63; j++) quant_table[j] = tempQT[this.std.zigzag[j]];
        j = 0;
        for (row = 0; row <= 7; row++)
            for (col = 0; col <= 7; col++) {
                quant_table[j] = quant_table[j] * scalefactor[row] * scalefactor[col] * 65536;
                j++
            }
        this.mCurBytePos += 64
    },
    load_advance_quant_tableCb: function (quant_table) {
        var scalefactor = this.std.scalefactor;
        var j, row, col;
        var tempQT_buf = new ArrayBuffer(64);
        var tempQT = new Uint8Array(tempQT_buf);
        if (this.mMapping == 1) switch (this.mAdvanceSelector) {
            case 0:
                this.std.std_chrominance_qt = this.std.Tbl_000Y;
                break;
            case 1:
                this.std.std_chrominance_qt = this.std.Tbl_014Y;
                break;
            case 2:
                this.std.std_chrominance_qt = this.std.Tbl_029Y;
                break;
            case 3:
                this.std.std_chrominance_qt = this.std.Tbl_043Y;
                break;
            case 4:
                this.std.std_chrominance_qt = this.std.Tbl_057Y;
                break;
            case 5:
                this.std.std_chrominance_qt = this.std.Tbl_071Y;
                break;
            case 6:
                this.std.std_chrominance_qt = this.std.Tbl_086Y;
                break;
            case 7:
                this.std.std_chrominance_qt = this.std.Tbl_100Y;
                break
        } else switch (this.mAdvanceSelector) {
            case 0:
                this.std.std_chrominance_qt = this.std.Tbl_000UV;
                break;
            case 1:
                this.std.std_chrominance_qt = this.std.Tbl_014UV;
                break;
            case 2:
                this.std.std_chrominance_qt = this.std.Tbl_029UV;
                break;
            case 3:
                this.std.std_chrominance_qt = this.std.Tbl_043UV;
                break;
            case 4:
                this.std.std_chrominance_qt = this.std.Tbl_057UV;
                break;
            case 5:
                this.std.std_chrominance_qt = this.std.Tbl_071UV;
                break;
            case 6:
                this.std.std_chrominance_qt = this.std.Tbl_086UV;
                break;
            case 7:
                this.std.std_chrominance_qt = this.std.Tbl_100UV;
                break
        }
        //console.log("load_advance_quant_tableCb : " + this.std.std_chrominance_qt);  
        this.set_quant_table(this.std.std_chrominance_qt, this.mAdvanceScaleFactorUV, tempQT);
        for (j = 0; j <= 63; j++) quant_table[j] = tempQT[this.std.zigzag[j]];
        j = 0;
        for (row = 0; row <= 7; row++)
            for (col = 0; col <= 7; col++) {
                quant_table[j] = quant_table[j] * scalefactor[row] * scalefactor[col] * 65536;
                j++
            }
        this.mCurBytePos += 64
    },
    process_Huffman_data_unit: function (DC_nr, AC_nr, previous_DC, position) {
        var nr, k;
        var size_val, count_0;
        var min_code;
        var huff_values;
        var byte_temp;
        var tmp_Hcode;
        var HT_ref = this.HT_ref;
        var HTDC = HT_ref.HTDC;
        var HTAC = HT_ref.HTAC;
        min_code = HTDC[DC_nr].minor_code;
        huff_values = HTDC[DC_nr].V;
        nr = 0;
        k = HTDC[DC_nr].table_len[this.mCodebuf >>> 16];
        tmp_Hcode = 65535 & this.mCodebuf >>> 32 - k;
        this.skipKbits(k);
        size_val = huff_values[this.WORD_hi_lo(k, tmp_Hcode - min_code[k])];
        if (size_val == 0) {
            this.mDCTCoeff[position + 0] = previous_DC;
            this.previous_DC = previous_DC
        } else {
            this.mDCTCoeff[position + 0] = previous_DC + this.getKbits(size_val);
            this.previous_DC = this.mDCTCoeff[position + 0]
        }
        min_code = HTAC[AC_nr].minor_code;
        huff_values = HTAC[AC_nr].V;
        nr = 1;
        do {
            k = HTAC[AC_nr].table_len[65535 & this.mCodebuf >>> 16];
            tmp_Hcode = 65535 & this.mCodebuf >>> 32 - k;
            this.skipKbits(k);
            byte_temp = huff_values[this.WORD_hi_lo(k, 255 & tmp_Hcode - min_code[k])];
            size_val = byte_temp & 15;
            count_0 = byte_temp >>> 4;
            if (size_val == 0) {
                if (count_0 != 15) break;
                nr += 16
            } else {
                nr += count_0;
                this.mDCTCoeff[position + this.std.dezigzag[nr++]] = this.getKbits(size_val)
            }
        } while (nr < 64)
    },
    YUVToRGB: function (txb, tyb, pBgr) {
        var i, j, pos, m, n;
        var cb, cr, py, pcb, pcr;
        var py420 = this.mPy420;
        var y;
        var pByte =
            null;
        var pixel_x, pixel_y;
        var ptr_index;
        pByte = pBgr;
        if (this.mMode420 == 0) {
            py = this.mPy;
            pcb = this.mPcb;
            pcr = this.mPcr;
            pixel_x = txb << 3;
            pixel_y = tyb << 3;
            pos = pixel_y * this.mWidth + pixel_x;
            for (j = 0; j < 8; j++) {
                for (i = 0; i < 8; i++) {
                    m = ((j << 3) + i);
                    y = py[m];
                    cb = pcb[m];
                    cr = pcr[m];
                    n = pos + i;

                    this.mYuvBufferB[n] = cb; //B
                    this.mYuvBufferG[n] = y; //G
                    this.mYuvBufferR[n] = cr; //R

                    pByte[(n << 2) + 2] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToB[cb]];
                    pByte[(n << 2) + 1] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToG[cb] + this.mCrToG[cr]];
                    pByte[(n << 2) + 0] = this.mRlimitTable[256 +
                        this.m_Y[y] + this.mCrToR[cr]];
                    pByte[(n << 2) + 3] = 255
                }
                pos += this.mWidth
            }
        } else {
            var ptr_index = this.mPy420Index;
            for (i = 0; i < 4; i++) {
                ptr_index[i] = 0;
                py420[i] = this.mPy420[i]
            }
            pcb = this.mPcb420;
            pcr = this.mPcr420;
            pixel_x = txb << 4;
            pixel_y = tyb << 4;
            pos = pixel_y * this.mWidth + pixel_x;
            for (j = 0; j < 16; j++) {
                for (i = 0; i < 16; i++) {
                    var index = (j >> 3) * 2 + (i >> 3);
                    y = py420[index][ptr_index[index]++];
                    if (this.mGreyMode == 0) {
                        m = (j >> 1 << 3) + (i >> 1);
                        cb = pcb[m];
                        cr = pcr[m]
                    } else {
                        cb = 128;
                        cr = 128
                    }
                    n = pos + i;
                    pByte[(n << 2) + 2] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToB[cb]];
                    pByte[(n << 2) + 1] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToG[cb] + this.mCrToG[cr]];
                    pByte[(n << 2) + 0] = this.mRlimitTable[256 + this.m_Y[y] + this.mCrToR[cr]];
                    pByte[(n << 2) + 3] = 255
                }
                pos += this.mWidth
            }
        }
    },
    YUVToBuffer: function (txb, tyb, pBgr) {
        var i, j, pos, m, n;
        var cb, cr, py, pcb, pcr;
        var py420 = this.mPy420;
        var y;
        var pByte =
            null;
        var pixel_x, pixel_y;
        var ptr_index;
        pByte = pBgr;
        if (this.mMode420 == 0) {
            py = this.mPy;
            pcb = this.mPcb;
            pcr = this.mPcr;
            pixel_x = txb << 3;
            pixel_y = tyb << 3;
            pos = pixel_y * this.mWidth + pixel_x;
            for (j = 0; j < 8; j++) {
                for (i = 0; i < 8; i++) {
                    m = (j << 3) + i;

                    y = this.mYuvBufferB[n] + (py[m] - 128);
                    cb = this.mYuvBufferG[n] + (pcb[m] - 128);
                    cr = this.mYuvBufferR[n] + (pcr[m] - 128);

                    n = pos + i;

                    this.mYuvBufferB[n] = cb;
                    this.mYuvBufferG[n] = y;
                    this.mYuvBufferR[n] = cr;

                    pByte[(n << 2) + 2] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToB[cb]];
                    pByte[(n << 2) + 1] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToG[cb] + this.mCrToG[cr]];
                    pByte[(n << 2) + 0] = this.mRlimitTable[256 + this.m_Y[y] + this.mCrToR[cr]];
                    pByte[(n << 2) + 3] = 255
                }
                pos += this.mWidth
            }
        } else {
            var ptr_index = this.mPy420Index;
            for (i = 0; i < 4; i++) {
                ptr_index[i] = 0;
                py420[i] = this.mPy420[i]
            }
            pcb = this.mPcb420;
            pcr = this.mPcr420;
            pixel_x = txb << 4;
            pixel_y = tyb << 4;
            pos = pixel_y * this.mWidth + pixel_x;
            for (j = 0; j < 16; j++) {
                for (i = 0; i < 16; i++) {
                    var index = (j >> 3) * 2 + (i >> 3);
                    y = py420[index][ptr_index[index]++];
                    if (this.mGreyMode == 0) {
                        m = (j >> 1 << 3) + (i >> 1);
                        cb = pcb[m];
                        cr = pcr[m]
                    } else {
                        cb = 128;
                        cr = 128
                    }
                    n = pos + i;
                    pByte[(n << 2) + 2] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToB[cb]];
                    pByte[(n << 2) + 1] = this.mRlimitTable[256 + this.m_Y[y] + this.mCbToG[cb] + this.mCrToG[cr]];
                    pByte[(n << 2) + 0] = this.mRlimitTable[256 + this.m_Y[y] + this.mCrToR[cr]];
                    pByte[(n << 2) + 3] = 255
                }
                pos += this.mWidth
            }
        }
    },
    Decompress: function (txb, tyb, outBuf, QT_TableSelection) {
        var ptr = 0;
        var byTileYuv = this.mTileYuv;
        var ptr_index = 0;
        var mGreyMode = this.mGreyMode;
        var mMode420 = this.mMode420;
        var mYDCnr = this.mYDCnr;
        var mYACnr = this.mYACnr;
        var mCbDCnr = this.mCbDCnr;
        var mCbACnr = this.mCbACnr;
        var mCrDCnr = this.mCrDCnr;
        var mCrACnr = this.mCrACnr;
        for (var i =
                0; i < this.mDCTCoeff.length; i++) {
            byTileYuv[i] = 0;
            byTileYuv[i + 384] = 0;
            this.mDCTCoeff[i] = 0
        }
        var time0 = performance.now();
        if (mGreyMode == 0) {
            ptr = byTileYuv;
            ptr_index = 0;
            this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
            this.mDCY = this.previous_DC;
            ptr_index += 64;
            if (this.mMode420 == 1) {
                this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
                this.mDCY = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
                this.mDCY = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
                this.mDCY = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mCbDCnr, this.mCbACnr, this.mDCCb, ptr_index);
                this.mDCCb = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mCrDCnr, this.mCrACnr, this.mDCCr, ptr_index);
                this.mDCCr = this.previous_DC
            } else {
                this.process_Huffman_data_unit(this.mCbDCnr, this.mCbACnr, this.mDCCb, ptr_index);
                this.mDCCb = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mCrDCnr,
                    this.mCrACnr, this.mDCCr, ptr_index);
                this.mDCCr = this.previous_DC
            }
        } else {
            ptr = byTileYuv;
            ptr_index = 0;
            this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
            this.mDCY = this.previous_DC;
            ptr_index += 64;
            if (this.mMode420 == 1) {
                this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
                this.mDCY = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
                this.mDCY = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mYDCnr,
                    this.mYACnr, this.mDCY, ptr_index);
                this.mDCY = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mCbDCnr, this.mCbACnr, this.mDCCb, ptr_index);
                this.mDCCb = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mCrDCnr, this.mCrACnr, this.mDCCr, ptr_index);
                this.mDCCr = this.previous_DC
            } else {
                this.process_Huffman_data_unit(this.mCbDCnr, this.mCbACnr, this.mDCCb, ptr_index);
                this.mDCCb = this.previous_DC;
                ptr_index += 64;
                this.process_Huffman_data_unit(this.mCrDCnr, this.mCrACnr, this.mDCCr, ptr_index);
                this.mDCCr = this.previous_DC
            }
        }
        var time1 = performance.now();
        if (mGreyMode == 0) {
            ptr = byTileYuv;
            ptr_index = 0;
            this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
            ptr_index += 64;
            if (this.mMode420 == 1) {
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection +
                    1);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1)
            } else {
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1)
            }
        } else {
            ptr = byTileYuv;
            ptr_index = 0;
            this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
            ptr_index += 64;
            if (this.mMode420 == 1) {
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr,
                    ptr_index, QT_TableSelection);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1)
            } else {
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1);
                ptr_index += 64;
                this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1)
            }
        }
        var time2 = performance.now();
        this.YUVToRGB(txb, tyb, outBuf);
        var time3 =
            performance.now();
        this.mHuffPerf += time1 - time0;
        this.mIDCTPerf += time2 - time1;
        this.mYUVPerf += time3 - time2;
        return true
    },
    Decompress_2PASS: function (txb, tyb, outBuf, QT_TableSelection) {
        var ptr = 0;
        var byTileYuv = this.mTileYuv;
        var ptr_index = 0;

        //memset (DCT_coeff, 0, 384 * 2);
        for (var i = 0; i < this.mDCTCoeff.length; i++) {
            byTileYuv[i] = 0;
            byTileYuv[i + 384] = 0;
            this.mDCTCoeff[i] = 0
        }

        var mYDCnr = this.mYDCnr;
        var mYACnr = this.mYACnr;
        var mCbDCnr = this.mCbDCnr;
        var mCbACnr = this.mCbACnr;
        var mCrDCnr = this.mCrDCnr;
        var mCrACnr = this.mCrACnr;

        ptr = byTileYuv;
        ptr_index = 0;
        this.process_Huffman_data_unit(this.mYDCnr, this.mYACnr, this.mDCY, ptr_index);
        this.mDCY = this.previous_DC;
        ptr_index += 64;

        this.process_Huffman_data_unit(this.mCbDCnr, this.mCbDCnr, this.mDCY, ptr_index);
        this.mDCY = this.previous_DC;
        ptr_index += 64;

        this.process_Huffman_data_unit(this.mCrDCnr, this.mCrACnr, this.mDCY, ptr_index);
        this.mDCY = this.previous_DC;


        ptr = byTileYuv;
        ptr_index = 0;
        this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection);
        ptr_index += 64;

        this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1);
        ptr_index += 64;

        this.IDCT_transform(this.mDCTCoeff, ptr, ptr_index, QT_TableSelection + 1)

        //YUVToBuffer (txb, tyb, byTileYuv, (struct RGB *)YUVBuffer, (unsigned char *)outBuf);
        this.YUVToBuffer(txb, tyb, outBuf)
        return TRUE;
    },
    MoveBlockIndex: function () {
        if (this.mMode420 == 0) {
            this.mTxb++;
            if (this.mTxb >= this.mTmpWidth / 8) {
                this.mTyb++;
                if (this.mTyb >= this.mTmpHeight / 8) this.mTyb = 0;
                this.mTxb = 0
            }
        } else {
            this.mTxb++;
            if (this.mTxb >= this.mTmpWidth / 16) {
                this.mTyb++;
                if (this.mTyb >= this.mTmpHeight / 16) this.mTyb = 0;
                this.mTxb = 0
            }
        }
    },
    drawCtx: function () {
        this._drawCtx.putImageData(this._img, 0, 0);
    },
    display_change: function (width, height) {
         this.mWidth = width;
         this.mHeight = height;
      //   this._drawCtx = Display.get_context();
       //  this._img = this._drawCtx.createImageData(this.mWidth, this.mHeight);
       //  this._imgdata = this._img.data;
     },
    set_cursor: function (pat, x, y, w, h) {
        this.mCursorPattern = pat;
        this.mCursorX = x;
        this.mCursorY = y;
        this.mCursorW = w;
        this.mCursorH = h
    },
    display_cursor: function () {
        var x = this.mCursorX;
        var y = this.mCursorY;
        var w = this.mCursorW;
        var h = this.mCursorH;
        var pat = this.mCursorPattern;
        if (this.mCursorPattern == null || w == 0 || h == 0) return;
        var cur_img = this._drawCtx.getImageData(x, y, w, h);
        for (var i = 0; i < w; i++)
            for (var j = 0; j < h; j++) {
                var img_index = i + j * w << 2;
                var pat_index = i + j * w << 1;
                if (pat[pat_index] != 0 || (pat[pat_index + 1] & 15) != 0) {
                    cur_img.data[img_index + 2] = (pat[pat_index] & 15) << 4;
                    cur_img.data[img_index + 1] = (pat[pat_index] >> 4 & 15) << 4;
                    cur_img.data[img_index + 0] = (pat[pat_index + 1] & 15) << 4;
                    cur_img.data[img_index + 3] = 255
                } else;
            }
        this._drawCtx.putImageData(cur_img, x, y, 0, 0, w, h)
    },
    VQ_Initialize: function (VQ) {
        var index =
            0;
        for (index = 0; index < 4; index++) VQ.Index[index] = index;
        VQ.Color[0] = 32896;
        VQ.Color[1] = 16744576;
        VQ.Color[2] = 8421504;
        VQ.Color[3] = 12615808
    },
    VQ_Decompress: function (txb, tyb, outBuf, QT_TableSelection, VQ) {
        var ptr_index, i;
        var byTileYuv = this.mTileYuv;
        var Data;
        ptr_index = 0;
        if (VQ.BitMapBits == 0)
            for (i = 0; i < 64; i++) {
                byTileYuv[ptr_index + 0] = (VQ.Color[VQ.Index[0]] & 16711680) >> 16;
                byTileYuv[ptr_index + 64] = (VQ.Color[VQ.Index[0]] & 65280) >> 8;
                byTileYuv[ptr_index + 128] = VQ.Color[VQ.Index[0]] & 255;
                ptr_index += 1
            } else
                for (i = 0; i < 64; i++) {
                    Data =
                        65535 & this.mCodebuf >>> 32 - VQ.BitMapBits;
                    byTileYuv[ptr_index + 0] = (VQ.Color[VQ.Index[Data]] & 16711680) >> 16;
                    byTileYuv[ptr_index + 64] = (VQ.Color[VQ.Index[Data]] & 65280) >> 8;
                    byTileYuv[ptr_index + 128] = VQ.Color[VQ.Index[Data]] & 255;
                    ptr_index += 1;
                    this.skipKbits(VQ.BitMapBits)
                }
        this.YUVToRGB(txb, tyb, this.mYuvBuffer, outBuf);
        return true
    },
    VQ_ColorUpdate: function (Decode_Color, skip_bits) {
        var i = 0;
        for (i = 0; i < skip_bits; i++) {
            Decode_Color.Index[i] = this.mCodebuf >> 29 & this.std.VQ_INDEX_MASK;
            if ((this.mCodebuf >> 31 & this.std.VQ_HEADER_MASK) == this.std.VQ_NO_UPDATE_HEADER) this.updatereadbuf(this.std.VQ_NO_UPDATE_LENGTH);
            else {
                Decode_Color.Color[Decode_Color.Index[i]] = this.mCodebuf >> 5 & this.std.VQ_COLOR_MASK;
                this.updatereadbuf(this.std.VQ_UPDATE_LENGTH)
            }
        }
        return true
    },
    on : function(evt, handler){
	this._eventHandlers[evt] = handler;
    },
    decode: function (DecodeInfo, Util, DrawCtx) {
        var MB, NumberOfMB, i;
	var tmp_width = new Uint8Array(5);
	var tmp_height = new Uint8Array(5);
	var ten, x;
    // console.log('In AST Decode mWidth', this.mWidth);
    // console.log('In AST Decode mHeight', this.mHeight);
        //this.mWidth = DecodeInfo.w;
        //this.mHeight = DecodeInfo.h;
        this.mBuffer = DecodeInfo.Data;
//	console.log("mBuffer length : " + this.mBuffer.length);

        MB = this.mWidth * this.mHeight / 64;
        if (MB < 4096) MB = 4096;
        this.SetOptions(DecodeInfo);
        this.VQ_Initialize(this.mDecode_Color);
        this.set_tmp_width_height(this.mMode420, this.mWidth, this.mHeight, this.mTmpWidth, this.mTmpHeight);
        if (this._drawCtx == null) {
            this._drawCtx = DrawCtx;
//            this._img = this._drawCtx.createImageData(this.mWidth, this.mHeight);
	 this._img = this._drawCtx.createImageData(100, 100); 
            this._imgdata = this._img.data;
        }


        this.mOutBuffer = this._img.data;
        this.mAdvanceScaleFactor = 16;
        this.mAdvanceScaleFactorUV = 16;
        this.mAdvanceSelector = 0;
        this.mMapping = 0;
        this.mSharpModeSelection = 0;
        if (this.mOldYSelector != this.mYSelector) {
            this.init_JPG_decoding();
            this.mOldYSelector = this.mYSelector
        }
        this.mIndex = 0;
        this.mCodebuf = this.get_qbytes_from_mBuffer(4);
        // console.log('[mBuffer]', this.mBuffer);
        // console.log('[mCodeBuf]', this.mCodebuf);
        this.mNewbuf = this.get_qbytes_from_mBuffer(4);
        this.mTxb = 0;
        this.mTyb = 0;
        this.mNewbits = 32;
        this.mDCY = 0;
        this.mDCCb = 0;
        this.mDCCr = 0;
        this.mHuffPerf = 0;
        this.mIDCTPerf = 0;
        this.mYUVPerf = 0;
        this.mUpbufPerf = 0;
        this.mMovePerf = 0;
        this.mDecompPerf = 0;
        var block_index = 0;
        var std = this.std;
        do {
            if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.JPEG_NO_SKIP_CODE) {
                var time0 = performance.now();
                this.updatereadbuf(std.BLOCK_AST2500_START_LENGTH);
                var time1 = performance.now();
                this.Decompress(this.mTxb,
                    this.mTyb, this.mOutBuffer, 0);
                var time2 = performance.now();
                this.MoveBlockIndex();
                var time3 = performance.now();
                this.mUpbufPerf += time1 - time0;
                this.mDecompPerf += time2 - time1;
                this.mMovePerf += time3 - time2
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.FRAME_END_CODE) {
                return 1
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.JPEG_SKIP_CODE) {
                var time0 = performance.now();
                this.mTxb = (this.mCodebuf & 267386880) >>> 20;
                this.mTyb = (this.mCodebuf & 1044480) >>> 12;
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                var time1 = performance.now();
                this.Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 0);
                var time2 = performance.now();
                this.MoveBlockIndex();
                var time3 = performance.now();
                this.mUpbufPerf += time1 - time0;
                this.mDecompPerf += time2 - time1;
                this.mMovePerf +=
                    time3 - time2
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.VQ_NO_SKIP_1_COLOR_CODE) {
                this.updatereadbuf(std.BLOCK_AST2500_START_LENGTH);
                var Decode_Color = this.mDecode_Color;
                Decode_Color.BitMapBits = 0;
                this.VQ_ColorUpdate(Decode_Color, 1);
                this.VQ_Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 0, Decode_Color);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.VQ_SKIP_1_COLOR_CODE) {
                this.mTxb = (this.mCodebuf & 267386880) >>> 20;
                this.mTyb = (this.mCodebuf & 1044480) >>> 12;
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                var Decode_Color = this.mDecode_Color;
                Decode_Color.BitMapBits = 0;
                this.VQ_ColorUpdate(Decode_Color, 1);
                this.VQ_Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 0, Decode_Color);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.VQ_NO_SKIP_2_COLOR_CODE) {
                this.updatereadbuf(std.BLOCK_AST2500_START_LENGTH);
                var Decode_Color = this.mDecode_Color;
                Decode_Color.BitMapBits = 1;
                this.VQ_ColorUpdate(Decode_Color, 2);
                this.VQ_Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 0, Decode_Color);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>>
                    28 & std.BLOCK_HEADER_MASK) == std.VQ_SKIP_2_COLOR_CODE) {
                this.mTxb = (this.mCodebuf & 267386880) >>> 20;
                this.mTyb = (this.mCodebuf & 1044480) >>> 12;
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                var Decode_Color = this.mDecode_Color;
                Decode_Color.BitMapBits = 1;
                this.VQ_ColorUpdate(Decode_Color, 2);
                this.VQ_Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 0, Decode_Color);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.VQ_NO_SKIP_4_COLOR_CODE) {
                this.updatereadbuf(std.BLOCK_AST2500_START_LENGTH);
                var Decode_Color = this.mDecode_Color;
                Decode_Color.BitMapBits = 2;
                this.VQ_ColorUpdate(Decode_Color, 4);
                this.VQ_Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 0, Decode_Color);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.VQ_SKIP_4_COLOR_CODE) {
                this.mTxb = (this.mCodebuf & 267386880) >>> 20;
                this.mTyb = (this.mCodebuf & 1044480) >>> 12;
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                var Decode_Color = this.mDecode_Color;
                Decode_Color.BitMapBits = 2;
                this.VQ_ColorUpdate(Decode_Color, 4);
                this.VQ_Decompress(this.mTxb,
                    this.mTyb, this.mOutBuffer, 0, Decode_Color);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.LOW_JPEG_NO_SKIP_CODE) {
                this.updatereadbuf(std.BLOCK_AST2500_START_LENGTH);
                this.Decompress(this.mTxb, this.mTyb, this.mOutBuffer, 2);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.LOW_JPEG_SKIP_CODE) {
                this.mTxb = (this.mCodebuf & 267386880) >>> 20;
                this.mTyb = (this.mCodebuf & 1044480) >>> 12;
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                this.Decompress(this.mTxb,
                    this.mTyb, this.mOutBuffer, 2);
                this.MoveBlockIndex()
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.JPEG_PASS2_CODE) {
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                this.Decompress_2PASS(this.mTxb, this.mTyb, this.mOutBuffer, 2); //*****
                this.MoveBlockIndex();
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.JPEG_SKIP_PASS2_CODE) {
                this.mTxb = (this.mCodebuf & 267386880) >>> 20;
                this.mTyb = (this.mCodebuf & 1044480) >>> 12;
                this.updatereadbuf(std.BLOCK_AST2500_SKIP_LENGTH);
                this.Decompress_2PASS(this.mTxb, this.mTyb, this.mOutBuffer, 2); //*****
                this.MoveBlockIndex();
            } else if ((this.mCodebuf >>> 28 & std.BLOCK_HEADER_MASK) == std.MODE_CHANGE_SIZE_CODE) {
	        tmp_width = this.mBuffer.subarray(4, 9);
                tmp_height = this.mBuffer.subarray(9, 14);
                var host_widths=0;
                var host_heights=0;
                ten=1;
                x=0;
                for (var i = 4; i >= 0; i--) {
			if(tmp_width[i] != 0){
	                        x = (parseInt(tmp_width[i]) - 48) * ten;
	                        ten *= 10;
                        	host_widths = host_widths + x;
			}
                }
                ten=1;
                x=0;
                for (var i = 4; i >= 0; i--) {
			if(tmp_height[i]!=0){
                	        x = (parseInt(tmp_height[i]) - 48) * ten;
	                        ten *= 10;
	                	host_heights = host_heights + x;
			}
                }
		console.log("resolution changed : "+host_widths+"x"+host_heights);
		this.mWidth = host_widths;
		this.mHeight = host_heights;
	        this._drawCtx = DrawCtx;                                                                                                                                                                        
	        this._img = this._drawCtx.createImageData(host_widths, host_heights);
		this._imgdata = this._img.data;
		this._drawCtx.canvas.width = host_widths;
		this._drawCtx.canvas.height = host_heights;
		this._eventHandlers.modchng(host_widths, host_heights);
		break;
		//_PreBuffer = [];
            } else {
		console.log("else : "+this.mCodebuf+"	"+(this.mCodebuf>>>28));
                //  Util.Error("Codebuf: " + this.mCodebuf.toString(16) + "mIndex: " + this.mIndex.toString(16));
	        var buffer_str;
                for (var i = 0; i < 256; i++) {
                    if (i % 16 == 0) console.log("mBuffer[" + (i + this.mIndex - 16).toString(16) + "]:" + this.mBuffer.slice(this.mIndex + i - 16, this.mIndex + i - 1).toString(16));
                    buffer_str += " " + this.mBuffer[i + this.mIndex - 16].toString(16);
                    if (i % 16 == 15) {
                        buffer_str = "";
                        console.log("\n")


                    } 
                }
                break
            }
            block_index++
        } while (block_index <= MB);
        return 0
    }
}
})();
