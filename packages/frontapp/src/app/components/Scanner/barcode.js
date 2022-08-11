export const barcode = function (canvasCtx) {
  let bars = [];

  const ctx = canvasCtx;

  const upc = {
    0: [3, 2, 1, 1],
    1: [2, 2, 2, 1],
    2: [2, 1, 2, 2],
    3: [1, 4, 1, 1],
    4: [1, 1, 3, 2],
    5: [1, 2, 3, 1],
    6: [1, 1, 1, 4],
    7: [1, 3, 1, 2],
    8: [1, 2, 1, 3],
    9: [3, 1, 1, 2],
  };

  const check = {
    oooooo: '0',
    ooeoee: '1',
    ooeeoe: '2',
    ooeeeo: '3',
    oeooee: '4',
    oeeooe: '5',
    oeeeoo: '6',
    oeoeoe: '7',
    oeoeeo: '8',
    oeeoeo: '9',
  };

  const config = {
    start: 0,
    end: 1,
    threshold: 160,
    quality: 0.45,
  };

  return processImage();

  function processImage() {
    bars = [];

    const pixels = [];
    const binary = [];
    let pixelBars = [];

    // convert to grayscale

    const imgd = ctx.getImageData(
      0,
      canvasCtx.canvas.height * 0.5,
      canvasCtx.canvas.width,
      1
    );
    const rgbpixels = imgd.data;

    for (let i = 0, ii = rgbpixels.length; i < ii; i = i + 4) {
      pixels.push(
        Math.round(
          rgbpixels[i] * 0.2126 +
            rgbpixels[i + 1] * 0.7152 +
            rgbpixels[i + 2] * 0.0722
        )
      );
    }

    // normalize and convert to binary

    const min = Math.min.apply(null, pixels);
    const max = Math.max.apply(null, pixels);

    for (let i = 0, ii = pixels.length; i < ii; i++) {
      if (
        Math.round(((pixels[i] - min) / (max - min)) * 255) > config.threshold
      ) {
        binary.push(1);
      } else {
        binary.push(0);
      }
    }

    // determine bar widths

    let current = binary[0];
    let count = 0;

    for (let i = 0, ii = binary.length; i < ii; i++) {
      if (binary[i] === current) {
        count++;
      } else {
        pixelBars.push(count);
        count = 1;
        current = binary[i];
      }
    }
    pixelBars.push(count);

    // quality check

    if (pixelBars.length < 3 + 24 + 5 + 24 + 3 + 1) {
      return;
    }

    // find starting sequence

    let startIndex = 0;
    const minFactor = 0.5;
    const maxFactor = 1.5;

    for (let i = 3, ii = pixelBars.length; i < ii; i++) {
      const refLength =
        (pixelBars[i] + pixelBars[i - 1] + pixelBars[i - 2]) / 3;
      if (
        (pixelBars[i] > minFactor * refLength ||
          pixelBars[i] < maxFactor * refLength) &&
        (pixelBars[i - 1] > minFactor * refLength ||
          pixelBars[i - 1] < maxFactor * refLength) &&
        (pixelBars[i - 2] > minFactor * refLength ||
          pixelBars[i - 2] < maxFactor * refLength) &&
        pixelBars[i - 3] > 3 * refLength
      ) {
        startIndex = i - 2;
        break;
      }
    }

    // console.log("startIndex: " + startIndex);

    // return if no starting sequence found

    if (startIndex === 0) {
      return;
    }

    // discard leading and trailing patterns

    pixelBars = pixelBars.slice(startIndex, startIndex + 3 + 24 + 5 + 24 + 3);

    // console.log("pixelBars: " + pixelBars);

    // calculate relative widths

    const ref = (pixelBars[0] + pixelBars[1] + pixelBars[2]) / 3;

    for (let i = 0, ii = pixelBars.length; i < ii; i++) {
      bars.push(Math.round((pixelBars[i] / ref) * 100) / 100);
    }

    // analyze pattern

    analyze();
  }

  function analyze() {
    // console.clear();

    // console.log("analyzing");

    // determine parity first digit and reverse sequence if necessary

    const first = normalize(bars.slice(3, 3 + 4), 7);
    if (!isOdd(Math.round(first[1] + first[3]))) {
      bars = bars.reverse();
    }

    // split into digits

    const digits = [
      normalize(bars.slice(3, 3 + 4), 7),
      normalize(bars.slice(7, 7 + 4), 7),
      normalize(bars.slice(11, 11 + 4), 7),
      normalize(bars.slice(15, 15 + 4), 7),
      normalize(bars.slice(19, 19 + 4), 7),
      normalize(bars.slice(23, 23 + 4), 7),
      normalize(bars.slice(32, 32 + 4), 7),
      normalize(bars.slice(36, 36 + 4), 7),
      normalize(bars.slice(40, 40 + 4), 7),
      normalize(bars.slice(44, 44 + 4), 7),
      normalize(bars.slice(48, 48 + 4), 7),
      normalize(bars.slice(52, 52 + 4), 7),
    ];

    // console.log("digits: " + digits);

    // determine parity and reverse if necessary

    const parities = [];

    for (let i = 0; i < 6; i++) {
      if (parity(digits[i])) {
        parities.push('o');
      } else {
        parities.push('e');
        digits[i] = digits[i].reverse();
      }
    }

    // identify digits

    const result = [];
    let quality = 0;

    for (let i = 0, ii = digits.length; i < ii; i++) {
      let distance = 9;
      let bestKey = '';

      for (const key in upc) {
        if (maxDistance(digits[i], upc[key]) < distance) {
          distance = maxDistance(digits[i], upc[key]);
          bestKey = key;
        }
      }

      result.push(bestKey);
      if (distance > quality) {
        quality = distance;
      }
    }

    // console.log("result: " + result);

    // check digit

    const checkDigit = check[parities.join('')];

    // output

    // console.log("quality: " + quality);

    if (quality < config.quality) {
      return checkDigit + result.join('');
    }
  }

  function normalize(input, total) {
    let sum = 0;
    const result = [];
    for (let i = 0, ii = input.length; i < ii; i++) {
      sum = sum + input[i];
    }
    for (let i = 0, ii = input.length; i < ii; i++) {
      result.push((input[i] / sum) * total);
    }
    return result;
  }

  function isOdd(num) {
    return num % 2;
  }

  function maxDistance(a, b) {
    let distance = 0;
    for (let i = 0, ii = a.length; i < ii; i++) {
      if (Math.abs(a[i] - b[i]) > distance) {
        distance = Math.abs(a[i] - b[i]);
      }
    }
    return distance;
  }

  function parity(digit) {
    return isOdd(Math.round(digit[1] + digit[3]));
  }
};
