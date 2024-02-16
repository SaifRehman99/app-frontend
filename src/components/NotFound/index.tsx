import emptySvg from "@assets/no-data.svg";
import { NotFoundType } from "@/types";

const NotFound = ({ text, height = 500, width = 400, customSvg }: NotFoundType) => {
  return (
    <div className="flex justify-center items-center w-[100%]">
      <p className="flex flex-col justify-center items-center">
        <img src={customSvg || emptySvg} height={height} width={width} alt="not-found" />
        <span className="mt-10 text-lg text-gray-400 font-bold">{text}</span>
      </p>
    </div>
  );
};

export default NotFound;
