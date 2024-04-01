import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
    return (<>
        <div className="flex justify-center items-center">
            <Link href="/">
                <Image
                    height={100}
                    width={100}
                    alt="Logo"
                    src={"/logo.svg"}
                />
            </Link>
        </div>
    </>
    )
}