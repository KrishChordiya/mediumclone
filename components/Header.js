import Link from "next/link"
import Image from "next/image"
export default function Header() {
  return (
    <nav className="bg-yellow p-5 border-b-2 border-black flex justify-between">
      <Link href={"/"}>
        <Image className="cursor-pointer" width={176} height={48} objectFit="contain" src="/images/logo.png"/>
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

