import { useEffect, useState } from "react";
import useNotification from "@/hooks/useNotification";
import { useNavigate } from "react-router-dom";
import NotFound from "@components/NotFound";
import Loader from "@components/Loader";
import useApiRequest from "@/hooks/useApiRequest";

export default function Dashboard() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  return (
    <>
      <div className="flex">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-1">
              <div className="col-span-3 lg:border-l">
                <div className="h-full py-6 lg:px-8">Welcome, Saif</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
