import { DrawWithin } from "../components";
import React, { useEffect, useRef, useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";
import exportAsImage from "../lib/exportAsImage";
import {
  patternMap,
  PatternType,
} from "../components/DrawWithin/patterns/data";
import ColorPatternPicker from "./ColorPatternPicker";

interface CatStoryProps {}

const StInput = styled.input`
  width: 300px;
`;

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

const StDrawWithin = styled(DrawWithin)`
  padding: 10px;
`;

const StPatternButton = styled.div`
  padding: 10px;
  background: lightpink;
`;

function CatStory(props: CatStoryProps) {
  const [color, setColor] = useState<string>("hotpink");
  const [pattern, setPattern] = useState<PatternType>("bankNote");
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    console.log("ref", ref);
  }, []);
  return (
    <StContainer>
      <ColorPatternPicker
        color={color}
        pattern={pattern}
        setColor={setColor}
        setPattern={setPattern}
      />
      <button
        onClick={() => {
          if (ref.current) {
            exportAsImage({
              element: ref.current,
              imageFileName: "bla.png",
              // width: 2000,
              height: 2000,
            }).then(() => {
              console.log("done?");
            });
          }
        }}
      >
        Save
      </button>
      <StDrawWithin
        ref={ref}
        strokeColor={color}
        patternIndex={0}
        viewBox="0 0 202.53 230.74"
        ImagePaths={<CatPaths />}
        MaskPaths={<CatMaskPaths />}
        patterns={[
          { type: "dominoes", fill: "hotpink" },
          { type: "bankNote", fill: "red" },
        ]}
      />
    </StContainer>
  );
}

export default CatStory;
