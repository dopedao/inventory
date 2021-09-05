import parts from "dope-metrics/output/item-parts.json";
export const { suffixes, namePrefixes, nameSuffixes } = parts;

export function parseItemParts(item) {
  return Object.keys(item).reduce((acc, slot) => {
    const name = item[slot];
    acc[slot] = {
      slot,
      name,
      item: findItemType(name),
      suffix: suffixes.find((suffix) => name.includes(suffix)) || null,
      namePrefix: namePrefixes.find((prefix) => name.includes(prefix)) || null,
      nameSuffix: nameSuffixes.find((suffix) => name.includes(suffix)) || null,
      bonus: name.includes("+1"),
    };
    return acc;
  }, {});
}

export function findItemType(item) {
  const hasPart = (part) => item.includes(part);
  const weapon = parts.weapons.filter(hasPart)[0];
  if (weapon) return weapon;
  const clothes = parts.clothes.filter(hasPart)[0];
  if (clothes) return clothes;
  const drugs = parts.drugs.filter(hasPart)[0];
  if (drugs) return drugs;
  const vehicle  = parts.vehicle.filter(hasPart)[0];
  if (vehicle ) return vehicle ;
  const waist = parts.waistArmor.filter(hasPart)[0];
  if (waist) return waist;
  const foot = parts.footArmor.filter(hasPart)[0];
  if (foot) return foot;
  const hand = parts.handArmor.filter(hasPart)[0];
  if (hand) return hand;
  const necklace = parts.necklaces.filter(hasPart)[0];
  if (necklace) return necklace;
  const ring = parts.rings.filter(hasPart)[0];
  if (ring) return ring;
}
