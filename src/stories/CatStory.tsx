import { DrawWithin } from "../components";
import React, { useEffect, useRef, useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";
import exportAsImage from "../lib/exportAsImage";
import ColorPatternPicker from "./ColorPatternPicker";
import { Pattern } from "../components/DrawWithin/patterns/Patterns";

interface CatStoryProps {}

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

const StDrawWithin = styled(DrawWithin)`
  padding: 10px;
`;

const StControls = styled.section`
  display: flex;
`;

const StNumberInput = styled.input`
  padding: 10px;
`;

function CatStory(props: CatStoryProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [patternIndex, setPatternIndex] = useState(0);
  const [patterns, setPatterns] = useState<Array<Pattern>>([
    { type: "dominoes", fill: "hotpink" },
    { type: "bankNote", fill: "red" },
  ]);

  useEffect(() => {
    console.log("ref", ref);
  }, []);
  return (
    <StContainer>
      <h3>Available Patterns</h3>
      <label>
        Select pattern:
        <StNumberInput
          type="number"
          min={0}
          max={patterns.length - 1}
          value={patternIndex}
          onChange={(e) => {
            setPatternIndex(+e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            setPatterns([...patterns, { type: "dominoes", fill: "hotpink" }]);
          }}
        >
          Add Pattern
        </button>
      </label>

      {patterns.map(({ type, fill }, index) => (
        <StControls>
          {patternIndex === index && <div>-&gt;</div>}
          <ColorPatternPicker
            color={fill}
            pattern={type}
            setColor={(fill) => {
              const newPatterns = [...patterns];
              const newPattern = { ...newPatterns[index], fill };
              newPatterns[index] = newPattern;
              setPatterns(newPatterns);
            }}
            setPattern={(type) => {
              const newPatterns = [...patterns];
              const newPattern = { ...newPatterns[index], type };
              newPatterns[index] = newPattern;
              setPatterns(newPatterns);
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
      <StDrawWithin
        ref={ref}
        // strokeColor={color}
        patternIndex={patternIndex}
        viewBox="0 0 202.53 230.74"
        ImagePaths={<CatPaths />}
        MaskPaths={<CatMaskPaths />}
        patterns={patterns}
      />
    </StContainer>
  );
}

export default CatStory;
