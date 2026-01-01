type ValueRange = {
  min: number;
  max: number;
};

type HardwareCamera = {
  distance: ValueRange;
  light: ValueRange;
};

function isCoverageSufficient(
  requiredDistance: ValueRange,
  requiredLight: ValueRange,
  cameras: HardwareCamera[]
): boolean {
  
  const boundaries = new Set<number>();
  boundaries.add(requiredDistance.min);
  boundaries.add(requiredDistance.max);

  for (const cam of cameras) {
    boundaries.add(cam.distance.min);
    boundaries.add(cam.distance.max);
  }

  const points = Array.from(boundaries).sort((a, b) => a - b);

  for (let i = 0; i < points.length - 1; i++) {
    const segmentStart = points[i];
    const segmentEnd = points[i + 1];

    if (segmentEnd <= requiredDistance.min || segmentStart >= requiredDistance.max) {
      continue;
    }

    const validCameras = cameras.filter(cam =>
      cam.distance.min <= segmentStart &&
      cam.distance.max >= segmentEnd
    );

    if (validCameras.length === 0) {
      return false;
    }

    const lightRanges = validCameras
      .map(cam => cam.light)
      .sort((a, b) => a.min - b.min);

    let currentLight = requiredLight.min;

    for (const range of lightRanges) {
      if (range.min > currentLight) {
        return false;
      }
      currentLight = Math.max(currentLight, range.max);
      if (currentLight >= requiredLight.max) {
        break;
      }
    }

    if (currentLight < requiredLight.max) {
      return false;
    }
  }

  return true;
}


// Example usage:
const requiredDistance: ValueRange = { min: 0, max: 100 };
const requiredLight: ValueRange = { min: 10, max: 50 };
const cameras: HardwareCamera[] = [
  { distance: { min: 0, max: 50 }, light: { min: 5, max: 30 } },
  { distance: { min: 40, max: 100 }, light: { min: 20, max: 60 } }
];                                                          
console.log(isCoverageSufficient(requiredDistance, requiredLight, cameras)); 