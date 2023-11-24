import { Newspaper } from 'lucide-react'

const Nav = () => {
  return (
    <section className="border-b-2 border-muted">
      <div className="container py-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
          <Newspaper fontSize={40} />
          News
        </h1>
      </div>
    </section>
  )
}

export { Nav }
