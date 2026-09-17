#!/usr/bin/env bash
# Cuts the homepage hero montage from the raw 4K stock clips and writes web-ready
# encodes + posters into public/video. Requires ffmpeg on PATH.
#
#   SRC=/path/to/raw/clips bash scripts/build-hero-video.sh
#
# Loop construction: six shots joined by 0.8s dissolves. The opening drone shot is
# processed once and split into a 0.8s "head" and the "main" remainder; the film
# starts on main and the final shot dissolves into head, so the last frame flows
# straight into the first and <video loop> is seamless.
set -euo pipefail

SRC="${SRC:-$HOME/Downloads}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/video"
mkdir -p "$OUT"

FPS=30
T=24 # dissolve length in frames (0.8s)

# file | seek (s) | speed | frames | portrait crop centre (0-1) | reframe (16:9 crop, or null) | grade
# speed 2 = every other frame of a 30fps source (tmix adds the motion blur back);
# speed 1 on the 24/25fps sources re-times them to 30fps, i.e. 1.25x / 1.2x.
SHOTS=(
  "17404328-uhd_3840_2160_24fps.mp4|3|2|138|0.45|null|eq=contrast=1.05:saturation=0.88"
  "16428573_3840_2160_30fps.mp4|0.5|2|90|0.5|null|eq=contrast=1.03:saturation=0.95:gamma=1.04"
  "7578552-uhd_3840_2160_30fps.mp4|4|1|90|0.62|null|eq=contrast=1.06:saturation=0.9"
  # reframed to lose the black foreground post on the left edge
  "15466375_3840_2160_30fps.mp4|4|2|90|0.5|crop=iw*0.9:ih*0.9:iw*0.1:ih*0.05|eq=contrast=1.04:saturation=0.78"
  "14777099_3840_2160_25fps.mp4|2|1|84|0.5|null|eq=contrast=1.06:saturation=0.92:gamma=0.96"
  "13252541_3840_2160_30fps.mp4|5|2|102|0.38|null|eq=contrast=1.05:saturation=0.9:gamma=1.08"
)

# build <name> <geometry filter using {P} for crop centre> <x264 crf> <maxrate>
build() {
  local name="$1" geo="$2" crf="$3" maxrate="$4"
  local inputs=() fc="" i=0
  for shot in "${SHOTS[@]}"; do
    IFS='|' read -r file ss speed frames p reframe grade <<<"$shot"
    inputs+=(-ss "$ss" -i "$SRC/$file")
    local pre=""
    [ "$speed" = "2" ] && pre="tmix=frames=2,"
    local g="${geo//\{P\}/$p}"
    fc+="[$i:v]${pre}setpts=N/($((FPS * speed))*TB),fps=$FPS,$reframe,$g,$grade,format=yuv420p,trim=end_frame=$frames,setpts=N/($FPS*TB),settb=AVTB[s$i];"
    i=$((i + 1))
  done

  # Opening shot -> head (first T frames) + main (the rest).
  fc+="[s0]split[h0][m0];[h0]trim=end_frame=$T,setpts=N/($FPS*TB),settb=AVTB[head];"
  fc+="[m0]trim=start_frame=$T,setpts=N/($FPS*TB),settb=AVTB[x0];"

  # Chain the dissolves: main -> s1 -> ... -> s5 -> head.
  IFS='|' read -r _ _ _ frames _ <<<"${SHOTS[0]}"
  local len=$((frames - T)) k=1 prev="x0"
  for shot in "${SHOTS[@]:1}"; do
    IFS='|' read -r _ _ _ frames _ <<<"$shot"
    local off; off=$(awk "BEGIN{printf \"%.4f\", ($len-$T)/$FPS}")
    fc+="[$prev][s$k]xfade=transition=fade:duration=$(awk "BEGIN{print $T/$FPS}"):offset=$off[x$k];"
    len=$((len + frames - T)); prev="x$k"; k=$((k + 1))
  done
  local off; off=$(awk "BEGIN{printf \"%.4f\", ($len-$T)/$FPS}")
  fc+="[$prev][head]xfade=transition=fade:duration=$(awk "BEGIN{print $T/$FPS}"):offset=$off,format=yuv420p[v]"

  # H.264 only: a VP9 encode of this footage came out larger at matched quality.
  echo ">> $name  ($(awk "BEGIN{print $len/$FPS}")s)"
  ffmpeg -v error -stats -y "${inputs[@]}" -filter_complex "$fc" \
    -map "[v]" -an -c:v libx264 -preset slow -profile:v high -crf "$crf" -maxrate "$maxrate" -bufsize "$maxrate" \
      -g 60 -pix_fmt yuv420p -movflags +faststart "$OUT/$name.mp4"

  # Poster = frame 0 of the loop, so poster -> video is an invisible hand-off.
  ffmpeg -v error -y -i "$OUT/$name.mp4" -frames:v 1 -q:v 7 "$OUT/$name-poster.jpg"
}

build hero-desktop "scale=1920:1080:flags=lanczos" 27 3500k
build hero-mobile "crop=ih*9/16:ih:(iw-ow)*{P}:0,scale=720:1280:flags=lanczos" 27 1600k

ls -la "$OUT"
