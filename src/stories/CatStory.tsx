import { DrawWithin } from "../components";
import React from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";

interface CatStoryProps {}
function CatStory(props: CatStoryProps) {
  return (
    <DrawWithin
      viewBox="0 0 202.53 230.74"
      ImagePaths={<CatPaths />}
      MaskPaths={<CatMaskPaths />}
    />
  );
}

export default CatStory;
