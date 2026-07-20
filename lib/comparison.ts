/* Mediterranean forest comparison, from FAO FRA 2020 national reports (Table 1b,
 * year 2020, 1000 ha). One harmonised methodology across all four countries —
 * that is the whole reason these bars can sit next to each other.
 *
 * Read the caveat in `plantedShare`'s doc before writing copy about this. */
import type { ForestShare } from "./types";

export const FOREST_SHARES = [
  {
    code: "PRT",
    namePt: "Portugal",
    nameEn: "Portugal",
    totalKha: 3312.0,
    plantedKha: 2256.0,
    sources: [
      { id: "fra2020", note: "Portugal (cb0048en), Tabela 1b: total 3312,00 / plantado 2256,00 mil ha." },
    ],
  },
  {
    code: "ESP",
    namePt: "Espanha",
    nameEn: "Spain",
    totalKha: 18572.17,
    plantedKha: 2590.1,
    sources: [
      { id: "fra2020", note: "Espanha (cb0103es), Tabela 1b: total 18 572,17 / plantado 2590,10 mil ha." },
    ],
  },
  {
    code: "ITA",
    namePt: "Itália",
    nameEn: "Italy",
    totalKha: 9566.13,
    plantedKha: 644.99,
    sources: [
      { id: "fra2020", note: "Itália (cb0012en), Tabela 1b: total 9566,13 / plantado 644,99 mil ha." },
    ],
  },
  {
    code: "GRC",
    namePt: "Grécia",
    nameEn: "Greece",
    totalKha: 3901.8,
    plantedKha: 138.9,
    sources: [
      { id: "fra2020", note: "Grécia (ca9999en), Tabela 1b: total 3901,80 / plantado 138,90 mil ha." },
    ],
  },
] as const satisfies readonly ForestShare[];

/**
 * Share of forest that is planted rather than naturally regenerated, 0–100.
 *
 * CAVEAT for copy: FRA's "planted forest" means *planted stands*, not *exotic
 * species*. Much of Portugal's figure is maritime pine, which is native. This
 * number says the forest was put there, not that it is foreign.
 */
export function plantedShare(share: ForestShare): number {
  return (share.plantedKha / share.totalKha) * 100;
}
