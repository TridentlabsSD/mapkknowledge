# MAPKNWLEDGE controller overlay

This repository hosts a **standalone browser Gamepad API overlay**, not a Gamepad Viewer Beta custom CSS skin. Do **not** paste the website URL into Beta's **Edit CSS URL** field; that field only accepts stylesheets targeting Beta's own DOM.

## URLs
- Overlay: https://tridentlabssd.github.io/mapkknowledge/
- Debug preview: https://tridentlabssd.github.io/mapkknowledge/?debug=1

## Use
1. Open the overlay in Chrome on the PC with the controller connected.
2. Press a controller button to activate browser gamepad access.
3. Move both sticks and press A/B/X/Y, D-pad, triggers and bumpers.
4. In debug preview, WASD controls left stick, arrow keys control right, and 1–4 preview A/B/X/Y **when no controller is connected**.
5. Add the overlay URL as a Streamlabs/OBS browser source. Browser-source Gamepad API support varies; test input recognition before relying on it live. If unsupported, capture the Chrome overlay window instead.

## Artwork
The page uses `controller-body.png`, `stick-left.png`, and `stick-right.png` from this repository. Keep these filenames in the repository root. Image dimensions and coordinates are calibrated for the 1774×887 artwork; input glow positions are approximate.

## Notes
- The page background is transparent in normal mode.
- The controller scales to fit its viewport without changing aspect ratio.
- Standard Gamepad API button indices are used. Nonstandard devices may need remapping.
- The old Gamepad Viewer CSS experiments are not required for this standalone overlay.
- Live controller input and OBS compatibility must be checked on the actual streaming PC.
