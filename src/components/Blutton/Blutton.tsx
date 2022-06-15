import React from "react";

export interface BluttonProps {
    label: string;
}

const Blutton = (props: BluttonProps) => {
    return <button>{props.label}</button>;
};

export default Blutton;
