import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Logo />
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;
