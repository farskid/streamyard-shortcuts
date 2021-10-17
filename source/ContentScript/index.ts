// import { browser } from "webextension-polyfill-ts/lib/index";

console.log(`
=======================================
    StreamYard shortcuts initialized

    List of shortcuts:

    - Cmd/Ctrl + D: Mute/Unmute
    - Cmd/Ctrl + E: Turn on/off camera
=======================================

`);

const scriptCode = `
    function isWithPlatformMetaKey(event) {
        return isMac() ? event.metaKey : event.ctrlKey;
    }
    
    function isMac() {
        return testPlatform(/^Mac/);
    }
    
    function testPlatform(regexp) {
        return regexp.test(window?.navigator?.platform);
    }

    let getMicButton = () => document.querySelector('[aria-label="Mute microphone"]') || document.querySelector('[aria-label="Unmute microphone"]')
    let getCameraButton = () => document.querySelector('[aria-label="Turn off camera"]') || document.querySelector('[aria-label="Turn on camera"]')

    window.addEventListener("keydown", function(event) {
        if (isWithPlatformMetaKey(event)) {
            switch (event.code) {
                case 'KeyD':
                    event.preventDefault();
                    getMicButton()?.click();
                    break;
                case 'KeyE':
                    event.preventDefault();
                    getCameraButton()?.click();
                    break;
                default:
            }
        }
    });
`;

function injectScript(code: string) {
  const script = document.createElement("script");
  script.textContent = code;
  (document.head || document.documentElement).appendChild(script);
  script.parentNode?.removeChild(script);
}

// Inject codes
injectScript(scriptCode);

export {};
