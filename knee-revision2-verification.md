# Verification results

- Native SolidWorks crank-driven sweep: 31 positions, 0–150° at 5° increments; every solve and rebuild returned true.
- Maximum native knee-angle deviation from the target: 0.019722°.
- Maximum C-pivot position deviation: 0.004983 mm.
- Saved pose configurations: 0°, 30°, 60°, 90°, 120° and 150°, explicitly assigned as closed-linkage states and checked after closing/reopening the saved assembly.
- Saved fitting configurations: thigh/shank offsets −40/+40 mm and −80/+80 mm, verified after reopening. Local shank adjustment remains zero in the six nominal motion configurations.
- All active mate feature error codes in the saved extended configuration are zero. The two superseded Y-plane locks are intentionally suppressed.
- Analytical sweep: 601 points at 0.25° increments. Ideal torque ratio 1.081027–1.461845; maximum rod force for 12 Nm motor input 820.55 N.
- Selected nominal finite-width clearance minima: shank/motor 15.73 mm; shank/cheek supports 52.28 mm; rod/shield columns 62.46 mm; E spacer/outer cheek 18.50 mm.
- Neutral STEP export succeeded.

These checks establish nominal mechanism closure and saved-state persistence. They do not establish measured friction, structural strength/fatigue, full continuous 3D collision clearance, tolerance sensitivity, guard strength or anatomical fit. See DESIGN_HANDOFF.md for the manufacturing and validation work still needed.
