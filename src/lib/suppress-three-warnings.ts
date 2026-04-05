/**
 * Suppress known harmless deprecation warnings from third-party libraries.
 *
 * THREE.Clock deprecation (three ≥ 0.183):
 *   @react-three/fiber internally uses THREE.Clock which was deprecated in
 *   favour of THREE.Timer.  Until R3F publishes a compatible release we
 *   silence this specific console.warn to keep the dev console clean.
 *
 * This file should be imported once from the app entry (layout.tsx or
 * a top-level client component that loads before the 3D canvas).
 */

if (typeof window !== "undefined") {
  const _origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock") &&
      args[0].includes("deprecated")
    ) {
      return; // swallow this specific warning
    }
    _origWarn.apply(console, args);
  };
}
