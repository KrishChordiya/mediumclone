import Link from "next/link"
export default function Header() {
  return (
    <nav className="bg-[#FFC017] p-5 border-b-2 border-black flex justify-between">
      <Link href={"/"}>
        <img className="w-44 cursor-pointer" src="/images/logo.png" alt="" />
      </Link>
      <div className="flex items-center">
        <div className="hidden md:flex space-x-4">
          <h3 className="cursor-pointer">Our Story</h3>
          <h3 className="cursor-pointer">Membership</h3>
          <h3 className="cursor-pointer">Write</h3>
          <h3 className="cursor-pointer">Sign In</h3>
        </div>
        <h3 className="p-2 ml-2 sm:ml-4 text-sm cursor-pointer font-medium bg-black text-white font-800 rounded-full">Get Started</h3>
      </div>
    </nav>
  )
}

