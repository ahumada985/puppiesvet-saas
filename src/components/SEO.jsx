import Head from 'next/head';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  schemaData = {} 
}) {
  const fullTitle = title ? `${title} - Mente Autónoma` : 'Mente Autónoma - Soluciones Digitales con IA';
  const defaultDescription = 'Transformamos tu empresa con inteligencia artificial. Soluciones personalizadas de desarrollo web, chatbots inteligentes y automatización avanzada.';
  const defaultKeywords = 'inteligencia artificial, desarrollo web, chatbots, automatización, IA, tecnología, Chile';
  const defaultImage = 'https://res.cloudinary.com/dysvptyfc/image/upload/v1756465870/logos/hp0ci35hkx5ld1azubdv.png';

  return (
    <Head>
      {/* Meta Tags Básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Mente Autónoma" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content="https://menteautonoma.cl" />
      <meta property="og:site_name" content="Mente Autónoma" />
      <meta property="og:locale" content="es_CL" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      
      {/* Otros Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <link rel="canonical" href="https://menteautonoma.cl" />
      
      {/* Schema.org Structured Data */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
      )}
      
      {/* Schema.org Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mente Autónoma",
            "url": "https://menteautonoma.cl",
            "logo": "https://res.cloudinary.com/dysvptyfc/image/upload/v1756465870/logos/hp0ci35hkx5ld1azubdv.png",
            "description": "Soluciones digitales con inteligencia artificial para empresas",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Santiago",
              "addressCountry": "CL"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+56-9-1234-5678",
              "contactType": "customer service",
              "email": "contacto@menteautonoma.cl"
            },
            "sameAs": [
              "https://linkedin.com/company/mente-autonoma",
              "https://twitter.com/menteautonoma"
            ]
          })
        }}
      />
    </Head>
  );
}
