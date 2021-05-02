# MYNA

## Image conversion commands

To create the square product images
```sh
function optimize_product_images {
  mkdir optimized;

  for image in *.jpg
  convert $image -resize 1270x1270 optimized/_$image && \
  jpeg-recompress -m ms-ssim -a optimized/_$image optimized/$image;

  rm optimized/_*.jpg;
}
```

For lookbook images (without any colour overlays):
```sh
function optimize_lookbook_images {
  mkdir optimized;

  for image in *.jpg
  convert $image -resize 1280x1280 optimized/_$image && \
  jpeg-recompress -q high -a optimized/_$image optimized/$image;

  rm optimized/_*.jpg;
}
```

For slider images (with colour overlays):
```sh
function optimize_slider_images {
  mkdir optimized;

  for image in *.jpg
  do
    for color in '#b6664d' '#49594e' '#efdfd7'
    do
      convert $image \
        -resize 1400x852 \
        -size 1400x852 "xc:$color" +swap \
        -gravity west \
        -composite \
        -fill "$color" \
        -draw "fill-opacity 0.35 rectangle 0,0 1060,852" \
        optimized/${color:1:$}_$image;
    done
  done
}
```
