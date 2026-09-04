/**
 * Verifies the pinch/pan math added to CultureGraphView.tsx for mobile
 * touch support. The gesture handling itself lives inline in that
 * component (closures over React refs/state), which isn't unit-testable
 * without adding a DOM/component-testing framework — out of scope per
 * "keep the implementation lightweight... do not add unnecessary
 * dependencies." Instead, this reproduces the EXACT formulas used there
 * (anchor-preserving zoom, incremental pinch-distance-ratio zooming, and
 * midpoint-delta panning) and checks the mathematical properties that
 * make the implementation correct.
 *
 * Run: npx tsx scripts/test-culture-graph-touch-zoom.ts
 */

import * as fs from "fs";
import * as path from "path";

let failures = 0;
let passed = 0;
function ok(label: string, cond: boolean, detail?: string) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failures++;
    console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

console.log("\nCulture Graph touch/pinch zoom tests:\n");

const MIN_SCALE = 0.3;
const MAX_SCALE = 10; // must match the component's raised mobile zoom ceiling

function clampScale(s: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
}

interface Transform {
  x: number;
  y: number;
  scale: number;
}

/** Exact copy of CultureGraphView's zoomAtPoint — the one anchor-preserving
 * zoom primitive shared by wheel zoom, the +/- buttons, and pinch zoom. */
function zoomAtPoint(t: Transform, vx: number, vy: number, factor: number): Transform {
  const newScale = clampScale(t.scale * factor);
  const ratio = newScale / t.scale;
  return {
    scale: newScale,
    x: vx - ratio * (vx - t.x),
    y: vy - ratio * (vy - t.y),
  };
}

// The source file's actual MAX_SCALE must match what this test assumes —
// catches the test and the component silently drifting apart.
{
  const source = fs.readFileSync(
    path.join(__dirname, "../components/culture-graph/CultureGraphView.tsx"),
    "utf8",
  );
  const match = source.match(/const MAX_SCALE = (\d+(?:\.\d+)?);/);
  ok("MAX_SCALE constant found in source", !!match);
  ok(
    `MAX_SCALE in source (${match?.[1]}) matches this test's assumption (${MAX_SCALE})`,
    match?.[1] === String(MAX_SCALE),
  );
  ok(
    "MAX_SCALE was substantially raised from the old desktop-era limit (4)",
    Number(match?.[1]) >= 8,
  );
}

// Anchor-preserving property: the viewBox point passed to zoomAtPoint
// stays under the same screen position before and after — this is what
// "zoom stays centered around the pinch location" actually requires.
{
  const t: Transform = { x: 40, y: -15, scale: 1.5 };
  const anchor = { x: 300, y: 220 };
  const after = zoomAtPoint(t, anchor.x, anchor.y, 1.8);
  // Screen position of the anchor point = t.x + t.scale * contentCoord.
  // Solve for content coord under the OLD transform, then verify it maps
  // to the same screen position under the NEW transform.
  const contentX = (anchor.x - t.x) / t.scale;
  const contentY = (anchor.y - t.y) / t.scale;
  const screenXBefore = t.x + t.scale * contentX;
  const screenYBefore = t.y + t.scale * contentY;
  const screenXAfter = after.x + after.scale * contentX;
  const screenYAfter = after.y + after.scale * contentY;
  ok("anchor point's screen X is unchanged by a zoom centered on it", Math.abs(screenXAfter - screenXBefore) < 1e-9);
  ok("anchor point's screen Y is unchanged by a zoom centered on it", Math.abs(screenYAfter - screenYBefore) < 1e-9);
}

// Pinching inward (fingers getting closer) must zoom OUT; expanding two
// fingers (getting farther apart) must zoom IN — this is the exact
// distance-ratio-as-factor relationship the component uses.
{
  const t: Transform = { x: 0, y: 0, scale: 1 };
  const expandFactor = 140 / 100; // fingers moved apart: 100px -> 140px
  const pinchFactor = 60 / 100; // fingers moved together: 100px -> 60px
  const afterExpand = zoomAtPoint(t, 50, 50, expandFactor);
  const afterPinch = zoomAtPoint(t, 50, 50, pinchFactor);
  ok("expanding two fingers increases scale (zoom in)", afterExpand.scale > t.scale);
  ok("pinching fingers together decreases scale (zoom out)", afterPinch.scale < t.scale);
}

// Incremental (frame-to-frame) factors must compose correctly: applying
// several small ratio-of-consecutive-samples factors in sequence must
// reach the SAME total scale as one big factor computed from first-to-last
// distance directly — this is what makes computing `currentDistance /
// lastDistance` on every pointermove (rather than tracking a fixed
// gesture-start distance) mathematically valid.
{
  const distances = [100, 115, 130, 150, 175]; // a smooth two-finger expand
  let t: Transform = { x: 10, y: -5, scale: 1 };
  for (let i = 1; i < distances.length; i++) {
    const factor = distances[i] / distances[i - 1];
    t = zoomAtPoint(t, 200, 200, factor);
  }
  const expectedTotalFactor = distances[distances.length - 1] / distances[0];
  const expectedScale = clampScale(1 * expectedTotalFactor);
  ok(
    "chained incremental factors reach the same scale as one cumulative factor",
    Math.abs(t.scale - expectedScale) < 1e-9,
    `got ${t.scale}, expected ${expectedScale}`,
  );
}

// Scale clamps at both ends — a runaway pinch (e.g. fingers moving to the
// very edge of the screen) must never exceed MAX_SCALE or go below
// MIN_SCALE, regardless of how extreme the factor is.
{
  const t: Transform = { x: 0, y: 0, scale: 1 };
  const zoomedInHuge = zoomAtPoint(t, 0, 0, 1000);
  const zoomedOutHuge = zoomAtPoint(t, 0, 0, 0.0001);
  ok("an extreme zoom-in factor clamps at MAX_SCALE", zoomedInHuge.scale === MAX_SCALE);
  ok("an extreme zoom-out factor clamps at MIN_SCALE", zoomedOutHuge.scale === MIN_SCALE);
}

// Pure two-finger pan (distance unchanged, midpoint moved) must be
// translation-only — this is the "dx/dy of the midpoint" component the
// component applies BEFORE the zoom-anchor adjustment on each pinch move.
{
  const t: Transform = { x: 0, y: 0, scale: 2 };
  const midpointDelta = { x: 12, y: -8 };
  // Component applies: setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }))
  const panned: Transform = { ...t, x: t.x + midpointDelta.x, y: t.y + midpointDelta.y };
  ok("scale is unaffected by a pure two-finger pan", panned.scale === t.scale);
  ok("x moves by exactly the midpoint's delta", panned.x === midpointDelta.x);
  ok("y moves by exactly the midpoint's delta", panned.y === midpointDelta.y);
}

// A zero-distance-change pinch sample (factor === 1) must be a no-op for
// scale/position via zoomAtPoint — confirms combining the pan step with a
// factor-1 zoomAtPoint call (as the component does on every pinch move)
// never introduces zoom drift during a pure pan.
{
  const t: Transform = { x: 5, y: 5, scale: 2 };
  const after = zoomAtPoint(t, 123, 456, 1);
  ok("factor of 1 leaves scale unchanged", after.scale === t.scale);
  ok("factor of 1 leaves x unchanged", Math.abs(after.x - t.x) < 1e-9);
  ok("factor of 1 leaves y unchanged", Math.abs(after.y - t.y) < 1e-9);
}

console.log(`\n${passed} passed, ${failures} failed.\n`);
if (failures > 0) process.exit(1);
