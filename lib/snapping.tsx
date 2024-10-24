// 스냅핑 로직 함수
export const snap = (value: number) => {
  const remainder = value % 30;
  if (remainder >= 0 && remainder <= 14) {
    return value - remainder;
  } else {
    return value + (30 - remainder);
  }
};

export const snapOnDragMove = (e: any) => {
  const node = e.target;
  // 현재 좌표 가져오기
  let x = node.x();
  let y = node.y();

  // 스냅핑 로직 적용
  x = snap(x);
  y = snap(y);

  // 위치 업데이트
  node.position({ x, y });
};

export const snapOnDragEnd = (e: any, shapeProps: any, onChange: any) => {
  e.cancelBubble = true;
  const node = e.target;
  // 최종 위치 가져오기
  let x = node.x();
  let y = node.y();

  // 스냅핑 로직 적용
  x = snap(x);
  y = snap(y);

  // 위치 업데이트
  node.position({ x, y });
  console.log("start position:", x, y);

  // 상태 업데이트
  onChange({
    ...shapeProps,
    x,
    y,
  });
};

export const anchorDragBoundFunc = (oldPos: any, newPos: any, event: any) => {
  // snap 함수를 사용하여 x와 y 좌표를 스냅합니다.
  const x = snap(newPos.x);
  const y = snap(newPos.y);
  console.log("snap position:", x, y);

  return { x, y };
};
