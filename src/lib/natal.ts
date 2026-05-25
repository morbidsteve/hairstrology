/**
 * Natal "holy trinity" calculation — Sun, Moon, Ascendant (Rising).
 *
 * Uses astronomy-engine (cosinekitty) for ephemeris. All longitudes are
 * tropical-of-date (the standard Western astrological frame), so 0° Aries
 * = the vernal equinox of the BIRTH date, not J2000.
 *
 * Inputs MUST be in UTC. Convert local birth time → UTC at the call site
 * using luxon + the IANA timezone of the birthplace (handles historical
 * DST correctly).
 */

import * as Astronomy from "astronomy-engine";
import { DateTime } from "luxon";

export const SIGN_NAMES = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export type SignName = (typeof SIGN_NAMES)[number];

export interface Placement {
  sign: SignName;
  longitude: number;       // 0..360 along the ecliptic
  degreesInSign: number;   // 0..30 within the sign
  formatted: string;       // "Cancer 14°37'"
}

export interface NatalChart {
  sun: Placement;
  moon: Placement;
  rising: Placement;
}

export interface NatalInput {
  utcDate: Date;
  lat: number;    // degrees, north-positive
  lon: number;    // degrees, east-positive
}

export function computeNatalChart({ utcDate, lat, lon }: NatalInput): NatalChart {
  const time = Astronomy.MakeTime(utcDate);
  return {
    sun: placement(sunLongitude(time)),
    moon: placement(moonLongitude(time)),
    rising: placement(ascendantLongitude(time, lat, lon)),
  };
}

/**
 * Convenience: build a Date from local birth components + IANA timezone.
 * Luxon handles historical DST transitions correctly.
 */
export function localBirthToUtc(args: {
  year: number;
  month: number;     // 1-12
  day: number;       // 1-31
  hour: number;      // 0-23
  minute: number;    // 0-59
  tz: string;        // IANA, e.g. "America/Chicago"
}): Date | null {
  const dt = DateTime.fromObject(
    { year: args.year, month: args.month, day: args.day, hour: args.hour, minute: args.minute },
    { zone: args.tz }
  );
  if (!dt.isValid) return null;
  return dt.toUTC().toJSDate();
}

// ─────────────────────────── helpers ───────────────────────────

function sunLongitude(time: Astronomy.AstroTime): number {
  // SunPosition returns geocentric ecliptic coords referenced to the true
  // equinox of date — already what tropical astrology uses.
  return Astronomy.SunPosition(time).elon;
}

function moonLongitude(time: Astronomy.AstroTime): number {
  // GeoMoon → J2000 equatorial vector; rotate into ecliptic-true-of-date
  // (ECT), then read longitude from the resulting xy plane.
  const vecJ2000 = Astronomy.GeoMoon(time);
  const rot = Astronomy.Rotation_EQJ_ECT(time);
  const vecECT = Astronomy.RotateVector(rot, vecJ2000);
  return normalize360((Math.atan2(vecECT.y, vecECT.x) * 180) / Math.PI);
}

/**
 * Ecliptic longitude of the ascendant — the point where the ecliptic
 * crosses the eastern horizon. Standard formula (e.g. Meeus, ch. 47):
 *
 *   tan(ASC) = -cos(LST) / [ sin(LST)·cos(ε) + tan(φ)·sin(ε) ]
 *
 * atan2 alone returns the right *line* through the origin but the wrong
 * half ~50% of the time (ASC vs descendant). We disambiguate by checking
 * that ASC is in the rising half-circle relative to the MC.
 */
function ascendantLongitude(time: Astronomy.AstroTime, lat: number, lon: number): number {
  const gastHours = Astronomy.SiderealTime(time);           // GAST, hours
  const lstDeg = normalize360((gastHours + lon / 15) * 15); // local sidereal time, degrees
  const eps = Astronomy.e_tilt(time).tobl;                  // true obliquity of ecliptic, deg

  const lstRad = toRad(lstDeg);
  const epsRad = toRad(eps);
  const latRad = toRad(lat);

  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let asc = normalize360(toDeg(Math.atan2(y, x)));

  // MC = ecliptic point on the upper meridian
  const mc = normalize360(
    toDeg(Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(epsRad)))
  );

  // The ascendant lies in the rising semicircle (0 < ASC − MC < 180 mod 360).
  const diff = normalize360(asc - mc);
  if (diff < 1 || diff > 179) asc = normalize360(asc + 180);
  return asc;
}

function placement(lonDeg: number): Placement {
  const norm = normalize360(lonDeg);
  const signIndex = Math.floor(norm / 30);
  const within = norm - signIndex * 30;
  const deg = Math.floor(within);
  const min = Math.round((within - deg) * 60);
  const minPart = min === 60 ? "59" : String(min).padStart(2, "0");
  return {
    sign: SIGN_NAMES[signIndex],
    longitude: norm,
    degreesInSign: within,
    formatted: `${SIGN_NAMES[signIndex]} ${deg}°${minPart}'`,
  };
}

function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}
function toRad(d: number): number { return (d * Math.PI) / 180; }
function toDeg(r: number): number { return (r * 180) / Math.PI; }
