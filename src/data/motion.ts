// Shared geometry so the cursor lines up across carousel <-> city view cuts.
// Every expanded city card uses the same width/height/position formula and
// the same back-button placement, so the offset below is identical everywhere.
export const CARD_WIDTH_FRACTION = 0.8;
export const CARD_HEIGHT_FRACTION = 0.7;
export const CARD_TOP_FRACTION = 0.205;

// Offset (in px) from screen center to the back button, for a cursor
// anchored at left: 50%, top: 50%.
export const getBackButtonOffset = (width: number, height: number) => {
  const cardLeft = (width - width * CARD_WIDTH_FRACTION) / 2;
  const cardTop = height * CARD_TOP_FRACTION;

  const backButtonCenterX = cardLeft + 32 + 36;
  const backButtonCenterY = cardTop + 32 + 36;

  return {
    x: backButtonCenterX - width / 2,
    y: backButtonCenterY - height / 2,
  };
};
