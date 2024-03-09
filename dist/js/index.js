function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  html5QrCode.stop().then((ignore) => {
      alert("Decodetext: " + decodedText);
    // QR Code scanning is stopped.
  }).catch((err) => {
    // Stop failed, handle it.
  });
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);
