import { DrawWithin } from "../components";
import React, { useState } from "react";
import { CatMaskPaths, CatPaths } from "../components/DrawWithin/cat/paths";
import styled from "styled-components";

interface CatStoryProps {}

const StInput = styled.input`
  width: 300px;
`;

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

function CatStory(props: CatStoryProps) {
  const [color, setColor] = useState("#fabdad");
  return (
    <StContainer>
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
      <DrawWithin
        strokeColor={color}
        viewBox="0 0 202.53 230.74"
        ImagePaths={<CatPaths />}
        MaskPaths={<CatMaskPaths />}
      />
    </StContainer>
  );
}

export default CatStory;
