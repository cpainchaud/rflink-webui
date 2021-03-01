# Copyright (c) 2016, Jeffrey Pfau
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice,
#    this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
"""Create a C source and header file out of one or more binaries"""

import argparse
import os.path
import re
import struct
import sys

header = """#include <stddef.h>
"""

use_progmem = False

def output_bin(in_name, h, c):
    basename = os.path.basename(in_name)
    symbol_name = re.sub(r"\W", "_", basename)
    i = open(in_name, "rb")

    if use_progmem:
        h.write("extern const unsigned char {}_start[] PROGMEM;\n".format(symbol_name))
    else:
        h.write("extern const unsigned char {}_start[];\n".format(symbol_name))
		
    h.write("extern const size_t {}_size;\n".format(symbol_name))

    if use_progmem:
        c.write("#include <pgmspace.h>\n")
        c.write("const unsigned char {}_start[] PROGMEM = {{\n".format(symbol_name))
    else:
        c.write("const unsigned char {}_start[] = {{\n".format(symbol_name))

    while True:
        block = i.read(16)
        if len(block) < 16:
            if len(block):
                c.write("\t")
                for b in block:
                    # Python 2/3 compat
                    if type(b) is str:
                        b = ord(b)
                    c.write("0x{:02X}, ".format(b))
                c.write("\n")
            break
        c.write("\t0x{:02X}, 0x{:02X}, 0x{:02X}, 0x{:02X}, "
                "0x{:02X}, 0x{:02X}, 0x{:02X}, 0x{:02X}, "
                "0x{:02X}, 0x{:02X}, 0x{:02X}, 0x{:02X}, "
                "0x{:02X}, 0x{:02X}, 0x{:02X}, 0x{:02X},\n"
                .format(*struct.unpack("BBBBBBBBBBBBBBBB", block)))
    i.close()
    c.write("};\n")
    c.write("const size_t {0}_size = sizeof({0}_start);\n".format(symbol_name))


def output_set(out_name, in_names):
    h = open(out_name + ".h", "w")
    hname = re.sub(r"\W", "_", out_name).upper()
    h.write("#ifndef _{0}_H\n#define _{0}_H\n".format(hname))
    if use_progmem:
        h.write("#include <pgmspace.h>\n")
    h.write(header)

    c = open(out_name + ".c", "w")
    c.write(header)

    for in_name in in_names:
        output_bin(in_name, h, c)

    h.write("\n#endif\n")
    h.close()
    c.close()


def _main():
    global use_progmem
    
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('-o', metavar="OUTPUT", type=str,
                        help="output file basename")
    parser.add_argument('input', type=str, nargs='+', help="input files")
    parser.add_argument('--progmem', action="store_true", default=False, help="Add viariable to PROGMEM (Arduino and alike...)")
    args = parser.parse_args()
    if not args:
        sys.exit(1)
    use_progmem = args.progmem
    if not args.o:
        for in_name in args.input:
            output_set(in_name, [in_name])
    else:
        output_set(args.o, args.input)

if __name__ == "__main__":
    _main()