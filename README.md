# MapKnwledge V2 - independent controller overlay

This is a **new self-contained overlay** that reads the browser's Gamepad API. It does **not** use Gamepad Viewer Beta's CSS URL field, because that integration was clipping the image and moving analog sticks outside the body.

## GitHub installation
1. In `TridentlabsSD/mapkknowledge`, select **Add file > Upload files**.
2. Upload the contents of this package **inside a folder named `mapknwledge-v2`**. GitHub's web uploader may not preserve the folder if you select files individually; drag the complete folder into the upload area, or create `mapknwledge-v2/index.html` using **Add file > Create new file** first, then upload the remaining files into that folder.
3. Commit. Existing root files remain untouched.
4. Under Settings > Pages, use `main` and `/ (root)` (already configured).
5. Open `https://tridentlabssd.github.io/mapkknowledge/mapknwledge-v2/`.
6. Plug in your Xbox controller, press a button, and test sticks/buttons. Browser Gamepad API typically requires interaction before gamepad access.

## Streaming
Try this page in an OBS / Streamlabs browser source. **Browser source gamepad access depends on the embedded browser and may not work.** If inputs don't animate in OBS, open the page in Chrome with the controller connected and capture that window with a transparent/background-aware capture method instead. Confirm on the streaming machine before going live.

## Preview without controller
Append `?debug=1` to the page URL. WASD moves left stick, arrow keys move right, 1-4 light up ABXY (preview only).

## Notes
- Uses the supplied iridescent art and transparent cutout body.
- Analog caps move independently, no 1774px fixed CSS element or conflicting transforms.
- Button highlight positions are approximate, and the real controller input mapping depends on browser/driver.
- This package has been checked for file presence and code syntax, but **not** tested against your physical controller or streaming browser.
