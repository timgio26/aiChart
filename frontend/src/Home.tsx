import { NavLink, Outlet } from "react-router";

export function Home() {
  return (
    <div className="flex flex-col">
      {/* <NavLink to={"/"}>Home</NavLink> */}
      <nav className="bg-gray-200 flex flex-row gap-2 px-3">

      <NavLink to={"/"}>AI Cook</NavLink>
      <NavLink to={"/chart"}>Chart AI</NavLink>
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}
