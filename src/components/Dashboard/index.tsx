export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") as any);

  return (
    <>
      <div className="flex">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-1">
              <div className="col-span-3 lg:border-l">
                <div className="h-full py-6 lg:px-8">Welcome, {user?.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
