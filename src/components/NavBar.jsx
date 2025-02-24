import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-blue-500 text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">ZenTask</h1>
      <ToggleTheme />
    </nav>
  );
};

export default Navbar;
