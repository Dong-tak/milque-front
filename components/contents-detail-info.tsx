interface ContentsDetailInfoProps {
  label: string;
  labelData: any;
}

export default function ContentsDetailInfo({
  label,
  labelData,
}: ContentsDetailInfoProps) {
  return (
    <div className="flex flex-col items-start">
      <div
        style={{ lineHeight: "150%", letterSpacing: "-0.4px" }}
        className="text-basic-600"
      >
        {label}
      </div>
      <div
        style={{ lineHeight: "150%", letterSpacing: "-0.45px" }}
        className="text text-[18px] font-semibold"
      >
        {labelData}
      </div>
    </div>
  );
}
