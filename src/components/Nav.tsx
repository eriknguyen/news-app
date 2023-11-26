import { Newspaper } from 'lucide-react'
import Link from 'next/link'

import { ThemeToggle } from './Theme'

const Nav = () => {
  return (
    <section className="border-b-2 border-muted">
      <div className="container flex items-center justify-between py-6 max-sm:px-4">
        <Link href="/">
          <h1 className="flex items-center gap-2 text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
            <Newspaper fontSize={40} />
            News
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link className="hover:underline" href="/history">
            History
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </section>
  )
}

export { Nav }
