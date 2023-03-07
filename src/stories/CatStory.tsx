import { DrawWithin } from "../components";
import React, { useEffect, useRef, useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";
import exportAsImage from "../lib/exportAsImage";

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

function CatStory(props: CatStoryProps) {
  const [color, setColor] = useState("#fabdad");
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    console.log("ref", ref);
  }, []);
  return (
    <StContainer>
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
      <label>
        Pick a color{" "}
        <StInput
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
      </label>
      <StDrawWithin
        ref={ref}
        strokeColor={color}
        viewBox="0 0 202.53 230.74"
        ImagePaths={<CatPaths />}
        MaskPaths={<CatMaskPaths />}
      />
    </StContainer>
  );
}

export default CatStory;
