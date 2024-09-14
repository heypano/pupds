import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import User, { userPath } from "../../assets/icons/User";
import Bus, { busPath } from "../../assets/icons/Bus";
import Building, { buildingPath } from "../../assets/icons/Building";

const StContainer = styled.section`
  width: 100%;
  height: 100%;
`;
const StControls = styled.section``;
const StPeopleContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(25, min-content);
`;
const StCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
const StGroup = styled.section``;
const StLabel = styled.label``;
const StInput = styled.input``;

const defaultNumPeople = 10;

interface EntityMap {
  [index: string]: {
    size: number;
    path: string;
    Icon: () => JSX.Element;
  };
}

const entityMap: EntityMap = {
  person: {
    Icon: User,
    path: userPath,
    size: 1,
  },
  bus: {
    Icon: Bus,
    path: busPath,
    size: 50,
  },
  building: {
    Icon: Building,
    path: buildingPath,
    size: 100,
  },
};

function People() {
  const [numPeople, setNumPeople] = useState(defaultNumPeople);
  let displayedEntity = "person";
  if (numPeople > 1_000) {
    displayedEntity = "bus";
  } else if (numPeople > 1_000_000) {
    displayedEntity = "building";
  }
  const { Icon, size, path } = entityMap[displayedEntity];
  const displayedNumber = Math.floor(numPeople / size);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const img = new Image();
  img.src = "./assets/bxs-user.svg";
  const fill = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    // context.strokeStyle = "#000";
    // context.lineWidth = 1;
    // context.fillStyle = "#000";
    // context.moveTo(x, y);
    // const p = new Path2D(userPath);
    // context.stroke(p);
    // context.fill(p);
    // console.log(img);
    // context.drawImage(img, x, y);
    context.fillRect(x, y, w, h);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext?.("2d");
    if (canvas && context) {
      const numColumns = 30;
      const numRows = Math.ceil(displayedNumber / numColumns);
      const eachItemTotalWidth = canvas.width / numColumns;
      const eachItemTotalHeight = canvas.height / numRows;
      const horizontalDistance = eachItemTotalWidth / 10;
      const verticalDistance = eachItemTotalHeight / 10;
      const width = eachItemTotalWidth - horizontalDistance;
      const height = Math.min(eachItemTotalHeight - verticalDistance, 10);
      context.clearRect(0, 0, canvas.width, canvas.height);
      let total = 0;
      let done = false;
      console.log("a");
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
          const x = j * width + horizontalDistance * j;
          const y = i * height + verticalDistance * i;
          fill(context, x, y, width, height);
          total++;
          console.log(total, displayedNumber);
          done = displayedNumber === total;
          if (done) {
            console.log("breaking inner");
            break;
          }
        }
        if (done) {
          console.log("breaking outer");
          break;
        }
      }
    }
  }, [displayedNumber]);

  return (
    <StContainer>
      <StControls>
        <StLabel>
          <StInput
            type="number"
            value={numPeople}
            onChange={(e) => {
              setNumPeople(Number(e?.target?.value ?? defaultNumPeople));
            }}
          />
        </StLabel>
      </StControls>
      <StCanvas ref={canvasRef} />
    </StContainer>
  );
}

export default People;
