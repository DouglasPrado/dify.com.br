const features = [
  {
    title: "Top 10 Produtos",
    description:
      "Crie listas dos melhores produtos com informações sempre atualizadas e descubra as melhores opções!",
    icon: "bx:bxs-briefcase",
  },
  {
    title: "Comparador de Produtos",
    description:
      "Compare produtos rapidamente com nosso recurso X vs X e faça escolhas mais informadas!",
    icon: "bx:bxs-window-alt",
  },
  {
    title: "Automação de Artigos",
    description:
      "Crie artigos que convertem automaticamente e aumente suas vendas com eficiência!",
    icon: "bx:bxs-data",
  },
  {
    title: "Exploração de Palavras-Chave",
    description:
      "Descubra caudas longas para enriquecer seus artigos informativos e atrair mais visitantes.",
    icon: "bx:bxs-bot",
  },
  {
    title: "Análise de SERP",
    description:
      "Obtenha insights automatizados da SERP para construir conteúdo de alto impacto.",
    icon: "bx:bxs-file-find",
  },
  {
    title: "Indexação Automática",
    description:
      "Garanta que seu conteúdo seja indexado no Google automaticamente e ganhe visibilidade!",
    icon: "bx:bxs-user",
  },
];

const Features = () => {
  return (
    <div className="mt-16 md:mt-0">
      <h2 className="text-4xl font-bold lg:text-5xl lg:tracking-tight">
        Tudo que você precisa no Marketing de Afiliados
      </h2>
      <p className="mt-4 text-lg text-stone-600">
        Nossa plataforma vem pronta para usar, reunindo as melhores ferramentas
        do mercado com inovações exclusivas para potencializar suas vendas.
      </p>

      <div className="mt-16 grid gap-16 sm:grid-cols-2 md:grid-cols-3">
        {features.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-black p-2">
              {/* <Icon className="text-white" icon={item.icon} /> */}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
