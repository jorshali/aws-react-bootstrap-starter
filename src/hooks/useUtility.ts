import React from "react";

export const useUtility = () => {
  const onEnterKey = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter') {
      callback();
    }
  }

  return { onEnterKey };
};
