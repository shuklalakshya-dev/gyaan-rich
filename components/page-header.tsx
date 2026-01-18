interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-accent">{title}</h1>
        <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto text-balance">{description}</p>
      </div>
    </section>
  )
}
