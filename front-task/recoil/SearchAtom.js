import { atom } from "recoil";

export const SearchAtom = atom({
  key: "SearchAtom",
  default: {
    input: null,
  },
});

export const LikeAtom = atom({
  key: "LikeAtom",
  default: [],
});
