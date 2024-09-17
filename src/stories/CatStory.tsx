import { DrawWithin, PatternType } from "../components";
import React, { useCallback, useRef, useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";
import exportAsImage from "../lib/exportAsImage";
import ColorPatternPicker from "../components/DrawWithin/ColorPatternPicker";
import { PatternWithFill } from "../components/DrawWithin/patterns/Patterns";
import { DrawWithinProps } from "../components/DrawWithin/DrawWithin";

type CatStoryProps = Partial<DrawWithinProps>;

const StContainer = styled.section`
  display: grid;
  grid-template-columns: 300px 400px;
`;

const StDrawWithin = styled(DrawWithin)`
  padding: 10px;
`;

const StControls = styled.section`
  display: flex;
`;

const StLeft = styled.section``;

const StRight = styled.section``;

function CatStory(props: CatStoryProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [patterns, setPatterns] = useState<Array<PatternWithFill>>([
    { type: "dominoes", fill: "hotpink" },
    { type: "bankNote", fill: "red" },
  ]);

  const setColor = useCallback(
    (index: number, fill: string) => {
      if (patterns[index].fill !== fill) {
        const newPatterns = [...patterns];
        newPatterns[index] = {
          ...newPatterns[index],
          fill,
        };
        setPatterns(newPatterns);
      }
    },
    [patterns]
  );

  const setPatternType = useCallback(
    (index: number, type: PatternType) => {
      if (patterns[index].type !== type) {
        const newPatterns = [...patterns];
        newPatterns[index] = {
          ...newPatterns[index],
          type,
        };
        setPatterns(newPatterns);
      }
    },
    [patterns]
  );

  return (
    <StContainer>
      <StLeft>
        <h3>Available Patterns - take a look below</h3>

        {patterns.map(({ type, fill }, index) => (
          <StControls key={index}>
            <ColorPatternPicker />
          </StControls>
        ))}
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
      </StLeft>
      <StRight>
        <StDrawWithin
          ref={ref}
          patternIdBase="pattern"
          patternIndex={currentPatternIndex}
          viewBox="0 0 202.53 230.74"
          ImagePaths={<CatPaths />}
          MaskPaths={<CatMaskPaths />}
          patterns={patterns}
          {...props}
        />
      </StRight>
    </StContainer>
  );
}

export default CatStory;
