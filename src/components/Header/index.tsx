import { UserNav } from "@components/Dashboard/user-nav";
import { MainNav } from "@components/Dashboard/main-nav";

const HeaderPage = () => {
  return (
    <div className="border-b bg-black">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6 " />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
