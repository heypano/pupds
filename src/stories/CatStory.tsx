import { DrawWithin, PatternType } from "../components";
import React, { ComponentProps, useCallback, useRef, useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";
import exportAsImage from "../lib/exportAsImage";
import ColorPatternPicker from "../components/DrawWithin/ColorPatternPicker";
import { PatternWithFill } from "../components/DrawWithin/patterns/PatternsDefs";

type CatStoryProps = Partial<ComponentProps<typeof DrawWithin>>;

const StContainer = styled.section`
  display: grid;
  grid-template-columns: 300px 400px;
`;

const StDrawWithin = styled(DrawWithin)`
  align-items: start;
  padding: 10px;
  svg {
    width: 100%;
    height: auto;
  }
`;

const StControls = styled.section<{ isActive?: boolean }>`
  display: flex;
  border: 2px solid ${({ isActive }) => (isActive ? "green" : "transparent")};
  padding: 5px;
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

  return (
    <StContainer>
      <StLeft>
        <h3>Available Patterns - take a look below</h3>

        {patterns.map(({ type, fill }, index) => (
          <StControls
            key={index}
            onClick={() => setCurrentPatternIndex(index)}
            isActive={currentPatternIndex === index}
          >
            <ColorPatternPicker
              color={fill}
              patternType={type}
              onChange={({ type, fill }) => {
                setPatterns((prev) => {
                  const newPatterns = [...prev];
                  newPatterns[index] = { type, fill };
                  return newPatterns;
                });
              }}
            />
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
      <StRight ref={ref}>
        <StDrawWithin
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
