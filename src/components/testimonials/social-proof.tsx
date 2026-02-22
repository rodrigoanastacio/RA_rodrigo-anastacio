import { TestimonialCard } from './testimonial-card'

const SocialProof = () => {
  const testimonials = [
    {
      quote:
        'A plataforma transformou nossa gestão de leads. Agora temos visibilidade total sobre o ROI de cada canal de aquisição.',
      authorName: 'Dr. João M.',
      authorRole: 'Sócio Gestor',
      authorInitials: 'JM',
      authorImage: undefined
    },
    {
      quote:
        'A facilidade de criar landing pages integradas diretamente ao CRM é um diferencial absurdo para nossa operação.',
      authorName: 'Dra. Luiza B.',
      authorRole: 'Marketing Jurídico',
      authorInitials: 'LB',
      authorImage: undefined
    },
    {
      quote:
        'Nossa produtividade aumentou muito depois que passamos a centralizar todos os leads e automações em um só lugar.',
      authorName: 'Dr. Ricardo F.',
      authorRole: 'Diretor Operacional',
      authorInitials: 'RF',
      authorImage: undefined
    }
  ]

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SaaS Gestão Leads',
    description:
      'Soluções de alta performance para gestão de presença digital e leads.',
    url: 'https://rodrigoanastacio.com/',
    telephone: '+55-11-98765-4321',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      reviewCount: testimonials.length.toString()
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Service',
        name: 'Plataforma de Gestão de Leads e Presença Digital',
        description:
          'Software de alta performance para captação, gestão e conversão de leads qualificados.',
        provider: {
          '@type': 'Person',
          name: 'Rodrigo Anastacio',
          jobTitle: 'Especialista em Estratégia Digital'
        }
      },
      author: {
        '@type': 'Person',
        name: testimonial.authorName,
        jobTitle: testimonial.authorRole
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: testimonial.quote
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <header className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-lp-primary/10 text-lp-primary rounded-full">
              Prova Social
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-deep-navy mb-4">
              O Efeito Antes e Depois
            </h2>
            <p className="text-gray-500 max-w-[600px] mx-auto">
              Advogados que recuperaram o controle, a liberdade e a paz de
              espírito que só um escritório bem estruturado pode proporcionar.
            </p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                quote={testimonial.quote}
                authorName={testimonial.authorName}
                authorRole={testimonial.authorRole}
                authorInitials={testimonial.authorInitials}
                authorImage={testimonial.authorImage}
              />
            ))}
          </main>
        </div>
      </section>
    </>
  )
}

export default SocialProof
