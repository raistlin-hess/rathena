var playBtn = document.getElementById('playBtn');
var setupBtn = document.getElementById('setupBtn');
var exitBtn = document.getElementById('exitBtn');

var mainEl = document.querySelector('main');
var patchOutputEl = document.getElementById('patchOutput');
var patchLogContainerEl = document.getElementById('patchLogContainer');
var patchLogEl = document.getElementById('patchLog');
var summaryEl = document.getElementById('summary');

var downloadProgressEl = document.getElementById('downloadProgress');
var installProgressEl = document.getElementById('installProgress');
var firstDownloadStarted = false;
var downloadIndex = 0;
var installIndex = 0;

try {
  //Register button handlers
  playBtn.onclick = function() {
    playBtn.setAttribute('disabled', 'true');
    dispatchRpatchurCommand('play');
  };
  setupBtn.onclick = function() {
    dispatchRpatchurCommand('setup');
  };
  exitBtn.onclick = function() {
    dispatchRpatchurCommand('exit');
  };

  //Start the patching process
  dispatchRpatchurCommand('start_update');
} catch(err) {
  //Edgecase to remove placeholder for no patches required
  var firstPatchLog = patchLogEl.childNodes[0];
  if(firstPatchLog == 'No patches required.') {
    patchLogEl.removeChild(firstPatchLog);
  }
  patchingStatusError(err);
  throw err;
}

// ////////////////////// rpatchur callback functions //////////////////////
function notificationInProgress() {
  //Not sure what this is called with, but here to prevent IE11 errors
}
function patchingStatusReady() {
  playBtn.removeAttribute('disabled');
  downloadProgressEl.style.visibility = 'hidden';
  installProgressEl.style.visibility = 'hidden';

  summaryEl.innerText = 'Patch process completed. You may click Play to begin.';
  addPatchLog(summaryEl.innerText);
}
function patchingStatusError(errorMsg) {
  patchOutputEl.style.display = 'none';
  playBtn.setAttribute('disabled', 'true');
  patchLogContainerEl.classList.add('patch-error');
  addPatchLog(errorMsg);
}
function patchingStatusDownloading(currPatchNumber, totalPatches, bytesPerSec) {
  //Edgecase to remove placeholder for no patches required
  if(!firstDownloadStarted) {
    firstDownloadStarted = true;
    var place = patchLogEl.childNodes[0];
    patchLogEl.removeChild(place);
    addPatchLog('Patch started');
  }

  installProgressEl.style.visibility = 'hidden';
  var downloadSpeed = bytesPerSec > 0
    ? ' - ' + humanFileSize(bytesPerSec) + '/s'
    : '';
  downloadProgressEl.setAttribute('value', currPatchNumber);
  downloadProgressEl.setAttribute('max', totalPatches);

  var patchStatMsg = 'Downloading patch: ' + currPatchNumber + '/' + totalPatches;
  summaryEl.innerText = patchStatMsg + downloadSpeed;
  if(downloadIndex != currPatchNumber) {
    addPatchLog(patchStatMsg);
    downloadIndex = currPatchNumber;
  }
}
function patchingStatusInstalling(currPatchNumber, totalPatches) {
  installProgressEl.style.visibility = 'visible';
  installProgressEl.setAttribute('value', currPatchNumber);
  installProgressEl.setAttribute('max', totalPatches);

  summaryEl.innerText = 'Installing: ' + currPatchNumber + '/' + totalPatches;
  if(installIndex != currPatchNumber) {
    addPatchLog(summaryEl.innerText);
    installIndex = currPatchNumber;
  }
}
function patchingStatusPatchApplied(filename) {
  summaryEl.innerText = 'Completed: ' + filename;
  addPatchLog(summaryEl.innerText);
}

////////////////////// Utility functions //////////////////////
function dispatchRpatchurCommand(command) {
  // https://github.com/L1nkZ/rpatchur/issues/39
  if(window.external !== undefined) {
    return window.external.invoke(command);
  } else if(window.webkit.messageHandlers.external !== undefined) {
    return window.webkit.messageHandlers.external.postMessage(cmd);
  }
  throw new Error('Failed to locate webkit external handler');
}
function addPatchLog(filename) {
  var patchTime = (new Date()).toLocaleString();
  var patchItemEl = document.createElement('li');
  patchItemEl.innerText = '[' + patchTime + '] -- ' + filename;
  patchLogEl.appendChild(patchItemEl);
}
// Note: Function taken from https://stackoverflow.com/a/20732091
function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kiB', 'MiB', 'GiB', 'TiB'][i];
}
