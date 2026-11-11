# Polycentric knee — revision 3

Native SolidWorks revision of the accepted double-four-bar knee and thigh-mounted AK80-6 drive. The v2 source is preserved. This is a preliminary engineering model, not a released wearable device.

## Changes

- Preserved all four knee pivot coordinates, linkage lengths, crank radius and transmission-rod pin spacing. No belt was added.
- Removed the long cross-plane ground-pin arrangement. A is supported from the inner femur plate; B is supported from the outer cheek. Short opposed pins avoid the opposite moving ligament. Added thrust-washer envelopes and removed the unused A-side outer bridge. This changes the pivot support load paths and requires structural verification.
- Added an anterior-link stop lug, fixed shoulder stop and a retention bore. Their cylindrical contact surfaces touch at the nominal 0° extension position. The stop is intended to carry extension contact loads independently of controller commands; its strength has not been established.
- Removed the oversized full thigh/knee gaiter. The replacement joint pod has a roughly 136 × 105 mm sagittal footprint, clear inner/outer cheeks and a wraparound perimeter. Separate narrow clear channels follow the transmission rod and crank, leaving the mechanism visible. The motor housing remains separate. Six part configurations represent the moving exit-wiper geometry. SolidWorks is not simulating flexible wiper strain; attachment clips, wipers, pinch access, snagging and durability still need prototype validation.
- Added a metal AK80-6 impact housing, removable lid, static gasket seats, nominal rotary lip-seal envelope and radial cable-gland boss. These are a sealing concept, not a tested waterproof enclosure or IP rating. Final seal selections, gland installation, thermal path and exact motor adapter interface remain necessary.
- Replaced the flat cuff concept with curved open saddles, 5 mm soft-liner envelopes and 50 mm webbing slots. Thigh and calf nominal saddle radii are 75 and 58 mm. These sizes are assumptions; fit to actual leg measurements before manufacture. Webbing, buckles and textile load ratings are not represented by the rigid cuff model.

## Height adjustment in SolidWorks

Use the ConfigurationManager to select the named `Fit_360mm` through `Fit_430mm` configurations in 10 mm steps. `Knee_000deg` uses the nominal 440 mm extension setting. The dimension is the modeled rail datum distance, not a medically defined limb measurement.

For independent thigh/shank fitting, edit the distance mates `Thigh_Length_Index_mm` and `Shank_Length_Index_mm` in the assembly. Their values are shortening from 440 mm: 0 = 440 mm, 40 = 400 mm, 80 = 360 mm. Use 10 mm increments to match the hole pattern. Keep the slider on its existing branch/direction. Changing rail length does not move the motor relative to the knee pivots. Real adjustment requires releasing and reinstalling the positive rail-lock fasteners; this is not a powered telescopic mechanism.

## Motion and torque

The retained mechanism targets 0–150° flexion. The unchanged ideal kinematic knee/motor torque ratio is approximately 1.081–1.462. This is a virtual-work ratio, not measured output torque. Bearing, seal and flexible-cover resistance are not quantified; the requested 5–10% maximum torque loss is therefore not certified. The new rotary seal and gaiter require resistance measurements.

## Manufacturing and remaining verification

The frame/link plates remain intended for CNC machining from 6061-T6; pins/stops require suitable hardened steel, retention details and load assessment. The one-sided pivot supports, cheek attachment, stop impact loads, pin bending, bearing pressures and fatigue require calculations/FEA and bench proof testing before wearing. Cuffs are suitable candidates for machined or printed polymer prototypes with separately fabricated padding. Develop the clear guards as formed/machined polycarbonate shells with separate compliant port wipers. The posed wiper geometry is not a fabrication pattern. Round and finish all wearer-facing edges. Final fastener threads, fits, tolerances and release drawings are not provided.

The AK80-6 body remains an envelope model with a generic adapter. Confirm the exact purchased motor revision and supplier mounting drawing. Complete motor cooling and water-ingress tests before claiming environmental protection. No load-bearing human testing is authorized by this model.
