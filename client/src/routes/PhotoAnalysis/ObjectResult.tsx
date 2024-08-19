import React from "react";
import { AnalysisObject } from "./AnalysisResultDisplay";

export type AnalysisObjectProps = {
  obj: AnalysisObject;
  index: number;
};

const ObjectResult: React.FC<AnalysisObjectProps> = (props) => {
  let backgroundColor;
  switch (true) {
    case props.obj.confidence <= 0.5:
      backgroundColor = "bg-orange-400";
      break;
    case props.obj.confidence < 0.8:
      backgroundColor = "bg-yellow-400";
      break;
    default:
      backgroundColor = "bg-green-400";
      break;
  }

  return (
    <li key={props.index} className={`${backgroundColor} p-2 rounded`}>
      <span className="font-medium">{props.obj.object}:</span>{" "}
      {(props.obj.confidence * 100).toFixed(2)}% confidence
    </li>
  );
};

export default ObjectResult;
