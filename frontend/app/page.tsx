import { RestaurantList } from "@/components/RestaurantList";

export default function Home() {
  return (
    <>
      <section className="border-b border-line bg-brand-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Comida rica que no se desperdicia
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink">
            Descubrí restaurantes y platos cerca tuyo, y sumate a cuidar el planeta
            comiendo bien.
          </p>
          <a
            href="#restaurantes"
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand px-5 py-2.5 text-base font-semibold text-on-brand hover:bg-brand-dark"
          >
            Ver restaurantes
          </a>
        </div>
      </section>

      <section id="restaurantes" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold text-ink">Restaurantes</h2>
        <RestaurantList />
      </section>
    </>
  );
}
