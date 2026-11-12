# MAPKNWLEDGE live controller overlay

Standalone browser Gamepad API overlay, **not** a Gamepad Viewer Beta custom CSS skin.

- Live: https://tridentlabssd.github.io/mapkknowledge/
- Diagnostics: https://tridentlabssd.github.io/mapkknowledge/?debug=1

Uses the approved controller-clean.png artwork, preserving the established responsive sizing. Standard Xbox Gamepad API button indices 0–16 and axes 0–3 drive input. No custom input remapping is performed. Artwork hotspot coordinates are visual positions only. Trigger glows reflect analog button pressure where exposed by the browser.

Open diagnostics in Chrome on the gaming PC, press a controller button to grant access, and check each input and axis. Stick clicks are L3/R3. The Home button may not be exposed by the browser. Nonstandard mapping may need device-specific handling; diagnostics warns when mapping isn't standard. If multiple pads are connected, ?pad=0 (or another index) selects one.

Debug keyboard preview when disconnected: WASD left stick, arrow keys right stick, 1–4 A/B/X/Y. The live overlay background is transparent. OBS/Streamlabs embedded browser gamepad access varies; if it doesn't detect the controller, capture the Chrome window instead.

**Physical testing is still required** to confirm every control and hotspot lines up on the user's controller. The GitHub code cannot independently validate a connected gamepad.
