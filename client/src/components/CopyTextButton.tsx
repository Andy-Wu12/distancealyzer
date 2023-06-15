import React from "react";

import ActionButton from "./generic/ActionButton";

interface ICopyTextButtonProps {
  elementID: string
}

export default function CopyTextButton({elementID}: ICopyTextButtonProps) {
  async function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    copyElementTextByID(elementID);
  }

  async function copyElementTextByID(elementID: string) {
    const textToCopy = document.getElementById(elementID)?.textContent;

    if(textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
    }
  }

  return (
    <ActionButton onClick={onClick} type="button" variant="contained" text="Copy"/>
  )
}