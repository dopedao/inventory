import { useCallback, useRef, useState } from "react";
import useMeasure from "use-measure";
import { rarityImageFromItems } from "gear-rarity";
import rarities from "../data/rare.json";
import { colors } from "../helpers/theme";
import Item from "./Item";

const ENDPOINT =
  "https://opensea.io/assets/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7/";
interface BagProps {
  bag: Bag;
}

const style = {
  container: {
    margin: 16,
    width: "100%",
    maxWidth: 512,
  },
  bag: {
    padding: 16,
    background: "black",
  },
  link: {
    marginRight: 12,
    color: colors.white,
    textDecoration: "none",
  },
  score: {
    marginRight: 12,
  },
  footer: {
    display: "flex",
    padding: 16,
    color: colors.muted,
  },
};

function Bag({ bag }: BagProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useMeasure(ref);
  const scores = rarities.find((loot) => loot.lootId === Number(bag.id));
  const itemScore = bag.items.reduce((score, item) => item.rarity + score, 0);

  const [audio, setAudio] = useState<HTMLAudioElement[]>([]);

  const addie = useCallback((a: HTMLAudioElement) => {
    setAudio((prev) => [...prev, a]);
  }, [setAudio]);

  const weed = useCallback((w: HTMLAudioElement) => {
    setAudio((prev) => [...prev, w]);
  }, [setAudio]);

  const play = useCallback(() => {
    audio.forEach((a) => a.play());
  }, [audio]);

  return (
    <div style={style.container} className="bag-container">
      <div style={{ ...style.bag, height: width }} ref={ref} className="bag">
        <img
          src={rarityImageFromItems(
            bag.items
              .map((item) => item.slot)
              .sort(byOrder)
              .map((slot) => {
                const key = slot as keyof typeof Item;
                const item = bag.items.find((item) => item.slot === key);
                return item!.name;
              })
          )}
          alt=""
        />
      </div>
      <div style={style.footer} className="bag-footer">
        <a
          style={style.link}
          href={`${ENDPOINT}/${bag.id}`}
          target="_blank"
          rel="noreferrer"
        >
          #{bag.id}
        </a>
        {/* <p style={style.score}>Rank: {scores?.rarest}</p>
        <p style={style.score}>Top: {getRarityPercentage(scores?.rarest)}%</p>
        <p style={style.score}>Item Score: {itemScore}</p> */}
        <audio ref={addie} src="https://storage.googleapis.com/lootfm-test/drugs/adderall.mp3" />
        <audio ref={weed} src="https://storage.googleapis.com/lootfm-test/drugs/weed.mp3" />
        <button onClick={play}>Play</button>
      </div>
    </div>
  );
}

// show 2 decimals for top 0%
// function getRarityPercentage(rank = 8000) {
//   const percentage = (rank / 8000) * 100;
//   const percentageRounded = percentage.toFixed(0);
//   if (Number(percentageRounded)) return percentageRounded;
//   return percentage.toFixed(2);
// }

const slotOrder = [
  "clothes",
  "foot",
  "hand",
  "neck",
  "ring",
  "waist",
  "weapon",
  "drugs",
  "vehicle",
];

function byOrder(a: String, b: String) {
  const aIndex = slotOrder.indexOf(a as string);
  const bIndex = slotOrder.indexOf(b as string);
  if (aIndex > bIndex) return 1;
  if (aIndex < bIndex) return -1;
  return 0;
}

export default Bag;
