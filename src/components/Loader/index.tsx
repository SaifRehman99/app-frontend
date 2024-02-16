import { Loader2 } from "lucide-react";
import React from "react";

const index: React.FC<{ children?: React.ReactNode }> = ({ children }): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] w-full">
      {" "}
      <Loader2 className="mr-2 h-[30px] w-[30px] animate-spin" />
      {children}
    </div>
  );
};

export default index;
