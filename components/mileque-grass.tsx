export default function Grass() {
  const arr = [
    1, 2, 4, 0, 0, 5, 8, 0, 1, 2, 4, 6, 0, 0, 0, 0, 2, 5, 8, 7, 1, 4, 0, 0, 5,
    8, 0, 1,
  ];

  const getClassName = (value: number) => {
    if (value === 0) return "bg-basic-200";
    if (value >= 1 && value <= 3) return "bg-primary-90";
    if (value >= 4 && value <= 7) return "bg-primary-70";
    if (value >= 8) return "bg-primary-50";
    return "";
  };

  return (
    <div className="flex flex-wrap w-[196px]">
      {arr.map((value, index) => (
        <div
          key={index}
          className={`w-6 h-6 rotate-90 ${getClassName(
            value
          )} rounded-[3px] m-[1px]`}
        />
      ))}
    </div>
  );
}
