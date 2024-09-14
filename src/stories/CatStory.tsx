import { DrawWithin } from "../components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";
import exportAsImage from "../lib/exportAsImage";
import ColorPatternPicker from "../components/DrawWithin/ColorPatternPicker";
import { Pattern } from "../components/DrawWithin/patterns/Patterns";
import { v4 as uuid } from "uuid";
interface CatStoryProps {}

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

const StNumberInput = styled.input`
  padding: 10px;
`;

const StLeft = styled.section``;

const StRight = styled.section``;

function CatStory(props: CatStoryProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [patterns, setPatterns] = useState<Array<Pattern>>([
    { type: "dominoes", fill: "hotpink" },
    { type: "bankNote", fill: "red" },
  ]);

  useEffect(() => {
    console.log("ref", ref);
  }, []);
  const patternIdBase = useMemo(() => uuid(), []);
  return (
    <StContainer>
      <StLeft>
        <h3>Available Patterns - take a look</h3>
        <button
          type="button"
          onClick={() => {
            setPatterns([...patterns, { type: "dominoes", fill: "hotpink" }]);
          }}
        >
          Add Pattern
        </button>

        {patterns.map(({ type, fill }, index) => (
          <StControls>
            <ColorPatternPicker
              patternIdBase={patternIdBase}
              isSelected={currentPatternIndex === index}
              patternIndex={index}
              color={fill}
              pattern={type}
              setPatternIndex={setCurrentPatternIndex}
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
      </StLeft>
      <StRight>
        <StDrawWithin
          ref={ref}
          patternIdBase={patternIdBase}
          // strokeColor={color}
          patternIndex={currentPatternIndex}
          viewBox="0 0 202.53 230.74"
          ImagePaths={<CatPaths />}
          MaskPaths={<CatMaskPaths />}
          patterns={patterns}
        />
      </StRight>
    </StContainer>
  );
}

export default CatStory;
