
dir="."
infile="$1"
outfile="$2"
radius="$3"
bias="$4"

PROGNAME=`type $0 | awk '{print $3}'`  # search for executable on path
PROGDIR=`dirname $PROGNAME`            # extract directory of program
PROGNAME=`basename $PROGNAME`  
tmpA1="$dir/autothresh1_A_$$.mpc"
tmpA2="$dir/autothresh1_A_$$.cache"
tmpM1="$dir/autothresh1_M_$$.mpc"
tmpM2="$dir/autothresh1_M_$$.cache"
tmpT1="$dir/autothresh1_T_$$.mpc"
tmpT2="$dir/autothresh1_T_$$.cache"


    radius=`convert xc: -format "%[fx:$radius/3]" info:`
	size="0x${radius}"

echo "radius is : $radius"
echo "bias is : $bias"
echo "size is : $size"

convert -quiet "$infile" -colorspace gray -alpha off +repage "$tmpA1"

convert $tmpA1 -negate $tmpA1

convert $tmpA1 -blur "$size" $tmpM1
convert $tmpA1 $tmpM1 +swap -compose minus -composite -threshold ${bias}% $tmpT1
#convert $tmpT1 -negate "$outfile"
convert $tmpT1 "$outfile"
