import {
  ActivitySquare,
  Book,
  CaseUpper,
  Check,
  KanbanSquare,
  Languages,
  Lightbulb,
  Puzzle,
  Smile,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  // https://copygen-nextjs.vercel.app/index-s5
  return (
    <div className="flex h-full min-h-screen w-full bg-[RGBA(7,19,33,var(--bs-bg-opacity,1))] bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/dot-a-white.c0dd91a2.png')] bg-[length:20px_20px] bg-center">
      <div className="">
        <header className="flex h-full max-h-full w-full max-w-full">
          <div className="absolute left-12 h-full max-h-[883px] w-full max-w-[883px] bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/blur-r.46587ad8.png')] bg-contain bg-no-repeat"></div>
          <div className="absolute left-1/4 h-full max-h-[993px] w-full max-w-[993px] bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/blur-q.3f61b3b4.png')] bg-contain bg-no-repeat"></div>
          <div className="absolute -right-1/4 top-20 h-full w-full bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/border-a.304562cc.png')] bg-contain bg-no-repeat lg:h-[949px] lg:w-[949px]"></div>
          <div className="absolute right-0 top-0 h-full w-full bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/border-b.77ca7088.png')] bg-contain bg-no-repeat lg:h-[237px] lg:w-[237px]"></div>
          <div className="absolute -left-52 top-52 h-full w-full bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/border-c.1ba535e9.png')] bg-contain bg-no-repeat lg:h-[949px] lg:w-[949px]"></div>
        </header>
      </div>
      <main className="z-10 mx-auto flex w-full max-w-7xl flex-col ">
        <header className="flex items-center justify-between gap-12 py-6">
          <svg
            width="98"
            height="36"
            viewBox="0 0 113 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.836 41.84C2.10533 38.64 0.74 34.6933 0.74 30C0.74 25.3067 2.10533 21.36 4.836 18.16C7.56667 14.96 11.1293 13.36 15.524 13.36C19.3213 13.36 22.372 14.9813 24.676 18.224V3.888H33.252V46H24.676V41.84C22.372 45.04 19.3213 46.64 15.524 46.64C11.1293 46.64 7.56667 45.04 4.836 41.84ZM11.556 23.984C10.148 25.52 9.444 27.5253 9.444 30C9.444 32.4747 10.148 34.48 11.556 36.016C13.0067 37.552 14.8627 38.32 17.124 38.32C19.3427 38.32 21.156 37.552 22.564 36.016C23.972 34.48 24.676 32.4747 24.676 30C24.676 27.5253 23.972 25.52 22.564 23.984C21.156 22.448 19.3427 21.68 17.124 21.68C14.8627 21.68 13.0067 22.448 11.556 23.984ZM40.9025 46V14H49.4785V46H40.9025ZM40.1345 5.744C40.1345 4.336 40.6252 3.14133 41.6065 2.16C42.6305 1.136 43.8252 0.623997 45.1905 0.623997C46.5985 0.623997 47.7932 1.136 48.7745 2.16C49.7985 3.14133 50.3105 4.336 50.3105 5.744C50.3105 7.10933 49.7985 8.304 48.7745 9.328C47.7932 10.3093 46.5985 10.8 45.1905 10.8C43.8252 10.8 42.6305 10.3093 41.6065 9.328C40.6252 8.304 40.1345 7.10933 40.1345 5.744ZM58.855 46V20.912H53.863V14H58.919V11.824C58.919 10.2453 59.1537 8.816 59.623 7.536C60.135 6.256 60.7537 5.25333 61.479 4.528C62.2043 3.76 63.0363 3.14133 63.975 2.672C64.9137 2.16 65.7883 1.81867 66.599 1.648C67.4523 1.43467 68.2417 1.328 68.967 1.328C70.887 1.328 72.5723 1.54133 74.023 1.968C75.4737 2.39466 76.455 2.82133 76.967 3.248L77.735 3.888L74.471 9.776C72.8923 8.88 71.5697 8.432 70.503 8.432C68.4977 8.432 67.495 9.69067 67.495 12.208V14H75.431V20.912H67.431V46H58.855ZM84.5235 55.408V47.344C86.4008 47.344 87.8302 47.0027 88.8115 46.32C89.7928 45.68 90.5822 44.6987 91.1795 43.376L91.7555 42.16L78.5075 14H87.2755L93.7395 28.976L95.7235 34.096C96.6622 31.4507 97.3235 29.6373 97.7075 28.656L103.468 14H112.172L97.7715 47.344C95.4248 52.72 91.0088 55.408 84.5235 55.408Z"
              fill="white"
            />
          </svg>
          <nav className="0 flex w-full">
            <ul className="flex gap-12 font-title text-white">
              <li className="cursor-pointer hover:underline">Home</li>
              <li className="cursor-pointer hover:underline">Recursos</li>
              <li className="cursor-pointer hover:underline">Conteúdos</li>
            </ul>
          </nav>
          <div className="flex w-full max-w-sm items-center justify-end gap-6">
            <button className="cursor-pointer font-title text-white hover:underline">
              Login
            </button>
            <button className="appearance-none rounded-lg bg-indigo-700 px-12 py-2 font-title uppercase  text-white hover:bg-indigo-600 forced-colors:appearance-auto">
              Comece agora
            </button>
          </div>
        </header>
        <section className="grid grid-cols-2 gap-12 pt-12">
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col">
              <h5 className="font-title text-sm uppercase text-white">
                Bem-vindo ao dify
              </h5>
              <h1 className="font-title text-5xl leading-[64px] text-white">
                Faça{" "}
                <span className="bg-gradient-to-r from-indigo-700 to-cyan-500 bg-clip-text text-transparent">
                  lançamento
                </span>{" "}
                de produtos físicos ou digitais 10x mais rápido.
              </h1>
            </div>
            <p className="text-gray-400">
              Alavanque o crescimento do seu negócio online com uma estrutura
              personalizada, dispensando a necessidade de contratar
              programadores.
            </p>
            <div className="flex gap-6">
              <a
                className="rounded-lg bg-indigo-700 px-12 py-3 font-title text-sm text-white hover:bg-indigo-600"
                href="https://app.dify.com.br"
              >
                <em className="ni ni-google icon"></em>
                <span>Inscrever-se com Google</span>
              </a>
              <a
                className="rounded-lg bg-white px-12 py-3 font-title text-sm text-gray-700 hover:bg-gray-100"
                href="https://app.dify.com.br"
              >
                <span>Faça parte da nossa pré-venda</span>
              </a>
            </div>
            <p className="mt-2 text-sm font-light text-gray-400">
              <strong className="text-white">*100% grátis </strong> para
              começar. Não é necessário cartão de crédito.
            </p>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-indigo-700 to-cyan-500 p-2">
            <Image
              alt=""
              width={1000}
              height={1000}
              src="https://copygen-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fg.93563838.jpg&w=1200&q=75"
              className="rounded-xl object-cover"
            />
          </div>
        </section>
        {true && (
          <section className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-20 pt-24">
            <div className="flex max-w-4xl flex-col gap-8">
              <h2 className=" text-center font-title text-5xl text-white">
                Aumente os lucros e a eficiência com nosso gerador de estrutura
                digital.
              </h2>
              <p className="text-center text-xl text-gray-400">
                Um gerador de estruturas digitais pode ser a chave para iniciar
                o seu próprio negócio na internet, proporcionando uma estratégia
                de marketing validada para a venda de produtos. Aproveite o
                poder da inteligência artificial em um ritmo mais acelerado do
                que nunca.
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-16">
              <div className="flex">
                <Image
                  alt=""
                  width={1104}
                  height={982}
                  src="https://copygen-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fb.237d1389.png&w=1200&q=75"
                  className="rounded-xl object-cover "
                />
              </div>
              <div className="flex flex-col gap-6 text-gray-400">
                <h2 className="font-title text-4xl text-white">
                  Estrutura completa para o seu negócio digital
                </h2>
                <p className="text-lg">
                  Nossa estrutura atende tanto o tráfego orgânico quanto pago,
                  impulsionando vendas de produtos físicos ou digitais, ideal
                  para afiliados, produtores e criadores de conteúdo.
                </p>
                <ul className="flex flex-col gap-3">
                  <li className="flex gap-3">
                    <em>
                      <Check
                        size={18}
                        className="rounded-full bg-cyan-400 p-0.5 text-black"
                      />
                    </em>
                    <span>
                      Crie conteúdo de alta qualidade em uma fração do tempo que
                      levaria para criar o mesmo conteúdo manualmente.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <em>
                      <Check
                        size={18}
                        className="rounded-full bg-cyan-400 p-0.5 text-black"
                      />
                    </em>
                    <span>
                      Capte leads e converta-os em clientes de forma
                      automatizada.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <em>
                      <Check
                        size={18}
                        className="rounded-full bg-cyan-400 p-0.5 text-black"
                      />
                    </em>
                    <span>
                      Maximize suas conversões com nossos funis de vendas
                      otimizados
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <em>
                      <Check
                        size={18}
                        className="rounded-full bg-cyan-400 p-0.5 text-black"
                      />
                    </em>
                    <span>
                      Facilite suas compras com nosso checkout pré populado,
                      desfrute da cobrança automatizada e recupere vendas com a
                      automação e remarketing para carrinho abandonado.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
        <section className="mx-auto mt-12 flex h-full w-full max-w-7xl flex-col items-center justify-center gap-20 py-12">
          <div className="flex max-w-4xl flex-col items-center gap-8 bg-[url('https://copygen-nextjs.vercel.app/_next/static/media/border-d.1c6fa1a1.png')] bg-[length:237px_237px] bg-center bg-no-repeat">
            <div className="h-16" />
            <h2 className="font-title text-4xl text-white">
              Crie um negócio 360 na internet
            </h2>
            <p className="text-center text-xl text-gray-400">
              Desenvolva sua habilidade de construção de um negócio online sem a
              necessidade de programador.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex gap-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900">
              <div className="flex w-full max-w-md flex-col justify-center p-4">
                <h4 className="mb-3 font-title text-lg text-white">
                  Pesquisa rápida
                </h4>
                <p className="text-gray-400">
                  Basta escolher um modelo da lista disponível para escrever
                  conteúdo para postagens de blog, landing page, conteúdo de
                  site, etc.
                </p>
              </div>
              <Image
                src={
                  "https://copygen-nextjs.vercel.app/_next/image?url=%2Fimages%2Fnumber%2F1-light.png&w=48&q=75"
                }
                alt=""
                height={101}
                width={42}
                className="py-6"
              />
            </div>
            <div className="flex gap-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900">
              <div className="flex w-full max-w-md flex-col justify-center p-4">
                <h4 className="mb-3 font-title text-lg text-white">
                  Eficiência de tempo
                </h4>
                <p className="text-gray-400">
                  Forneça ao nosso a nossa IA algumas frases sobre o que você
                  deseja escrever e ele começará a escrever para você.
                </p>
              </div>
              <Image
                src={
                  "https://copygen-nextjs.vercel.app/_next/image?url=%2Fimages%2Fnumber%2F2-light.png&w=64&q=75"
                }
                alt=""
                height={101}
                width={42}
                className="py-6"
              />
            </div>
            <div className="flex gap-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900">
              <div className="flex w-full max-w-md flex-col justify-center p-4">
                <h4 className="mb-3 font-title text-lg text-white">
                  Eficiência de SEO
                </h4>
                <p className="text-gray-400">
                  Nossas poderosas ferramentas de IA otimizam seu conteúdo em
                  questão de segundos, impulsionando seu ranqueamento no Google.
                </p>
              </div>
              <Image
                src={
                  "https://copygen-nextjs.vercel.app/_next/image?url=%2Fimages%2Fnumber%2F3-light.png&w=96&q=75"
                }
                alt=""
                height={101}
                width={42}
                className="py-6"
              />
            </div>
          </div>
        </section>
        <section className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-20  py-12">
          <div className="flex max-w-4xl flex-col gap-8">
            <h2 className="font-title text-4xl text-white">
              Como a dify desbloqueará seu potencial criativo?
            </h2>
            <p className="text-center text-xl text-gray-400">
              A estrutura da dify permite que você crie vários conteúdos de
              forma rápida e eficiente, aumentando sua produtividade e liberando
              tempo para se concentrar em outras tarefas mais importantes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex gap-6">
              <Book size={57} strokeWidth={2.25} className="text-cyan-400" />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Escreva textos e conteúdos que convertam
                </h4>
                <p className="text-gray-400">
                  Você pode gerar conteúdo de alta qualidade em segundos,
                  economizando um tempo valioso que pode ser gasto em outras
                  tarefas importantes.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <Lightbulb
                size={63}
                strokeWidth={2.25}
                className="text-cyan-400"
              />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Brainstorm new ideas.
                </h4>
                <p className="text-gray-400">
                  An interview-style show featuring industry leaders, experts,
                  and influencers, covering topics ranging from tech, politics,
                  art, and more.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <ActivitySquare
                size={63}
                strokeWidth={2.25}
                className="text-cyan-400"
              />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  10X your content output
                </h4>
                <p className="text-gray-400">
                  Use templates to streamline your content creation process.
                  This can include templates for blog posts, social media posts,
                  videos, and more.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <CaseUpper
                size={63}
                strokeWidth={2.25}
                className="text-cyan-400"
              />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Crie descrições valiosas para o seu produto
                </h4>
                <p className="text-gray-400">
                  Estrutura para ter uma landing page de alta conversão para
                  vender muito sem os entraves de tecnologia.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <Languages
                size={63}
                strokeWidth={2.25}
                className="text-cyan-400"
              />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Intercionalize seu negócio
                </h4>
                <p className="text-gray-400">
                  Você pode vender ter produtos em 26 idiomas, incluindo ingles,
                  japonês e português. Podendo oferecer produtos para qualquer
                  parte do mundo.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <Puzzle size={63} strokeWidth={2.25} className="text-cyan-400" />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Configurações simples e otimizada
                </h4>
                <p className="text-gray-400">
                  Não depende de nenhum conhecimento de programação para fazer
                  integrações, tudo está um único lugar.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <KanbanSquare
                size={63}
                strokeWidth={2.25}
                className="text-cyan-400"
              />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Collaborate with your team
                </h4>
                <p className="text-gray-400">
                  Clear communication is key to successful collaboration. Be
                  sure to express your ideas clearly and listen actively to
                  others.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <Smile size={63} strokeWidth={2.25} className="text-cyan-400" />
              <div>
                <h4 className="mb-3 font-title text-lg text-white">
                  Have fun! CopyGen is a joy.
                </h4>
                <p className="text-gray-400">
                  AI is an exciting, new technology that can unlock your
                  imagination to create some amazing things.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-20  py-12">
          <div className="flex max-w-4xl flex-col items-center gap-8">
            <h2 className="font-title text-4xl text-white">
              Quem já experimentou nossa plataforma
            </h2>
            <p className="text-center text-xl text-gray-400">
              Descubra o que empreendedores que conduzem negócios online estão
              dizendo depois de usar nossa plataforma
            </p>
          </div>

          <div className="container">
            <div className="grid grid-cols-3 gap-8 px-6 ">
              <div className="grid gap-8">
                <div className="flex h-auto max-w-full flex-col gap-6 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h5 className="font-title text-lg text-white">
                        André Silva
                      </h5>
                      <div className="text-sm text-gray-500">
                        CEO at Hire &amp; Retain
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Ótimo aplicativo - fácil de usar. Grande valor e tão fácil
                    de usar, economiza muito tempo! Fiquei surpreso com o quanto
                    de tempo e energia mental me poupou. Simples e fácil... tem
                    que amar isso. ✌️
                  </p>
                </div>
                <div className="flex h-auto max-w-full flex-col gap-6 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h5 className="font-title text-lg text-white">
                        Fernanda Oliveira
                      </h5>
                      <div className="text-sm text-gray-500">
                        CEO at Hire & Retain
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Um ano de marketing orgânico em cerca de 30 minutos.
                    Escrever artigos nunca foi tão fácil para mim. Desde que
                    comecei a usar o CopyGen, só preciso de alguns minutos 🎉
                  </p>
                </div>
              </div>
              <div className="grid gap-8">
                <div className="flex h-auto max-w-full flex-col gap-6 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h5 className="font-title text-lg text-white">
                        Ricardo Santos
                      </h5>
                      <div className="text-sm text-gray-500">
                        CEO at Hire & Retain
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Economia de tempo e melhor do que conteúdo PLR. CopyGen é
                    uma ferramenta fantástica para escrever descrições de
                    produtos e começar posts de blog. Não preciso mais ficar
                    olhando para uma tela em branco tentando descobrir como
                    desenvolver um tópico além de 50 palavras. Para mim, o
                    CopyGen substitui a compra de conteúdo PLR que eu editaria e
                    personalizaria de maneira semelhante. Isso me economiza
                    tempo porque posso adaptar às minhas necessidades de
                    palavras-chave e nicho.
                  </p>
                </div>

                <div className="flex h-auto max-w-full flex-col gap-6 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h5 className="font-title text-lg text-white">
                        Camila Souza
                      </h5>
                      <div className="text-sm text-gray-500">
                        Empreendedora na Arte & Design
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    A plataforma da dify transformou minha abordagem no
                    lançamento dos meus produtos. Agora, consigo apresentar
                    minhas criações ao mundo muito mais rápido. A estrutura
                    personalizada e a eficiência são incomparáveis!
                  </p>
                </div>
              </div>
              <div className="grid gap-8">
                <div className="flex h-auto max-w-full flex-col gap-6 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h5 className="font-title text-lg text-white">
                        Guilherme Costa
                      </h5>
                      <div className="text-sm text-gray-500">
                        Criador de Conteúdo Digital
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    O DIFY é um verdadeiro aliado para quem busca aumentar os
                    lucros e a eficiência. Com o gerador de estrutura digital,
                    pude criar uma estratégia de marketing sólida para meus
                    produtos, tudo de forma acelerada pela inteligência
                    artificial.
                  </p>
                </div>

                <div className="flex h-auto max-w-full flex-col gap-6 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                  <div className="flex flex-col">
                    <div className="">
                      <h5 className="font-title text-lg text-white">
                        Juliana Pereira
                      </h5>
                      <div className="text-sm text-gray-500">
                        Empresária na Tech Innovate
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Os funis de vendas otimizados do DIFY são incríveis!
                    Maximizei minhas conversões de forma significativa. Além
                    disso, o checkout pré-populado e a cobrança automatizada
                    facilitaram as compras para meus clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-20  py-12">
          <div className="flex max-w-4xl flex-col items-center gap-8">
            <h2 className="text-center font-title text-4xl text-white">
              Planos que melhor atendem às necessidades do seu negócio
            </h2>
            <p className="text-center text-xl text-gray-400">
              Este é um cabeçalho simples e comumente usado que permite aos
              clientes saber que estão procurando diferentes opções de preços.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-8">
            <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8">
              <div className="">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="mb-2 text-slate-400">Basic</div>
                    <div className="end-0 top-0 flex items-center justify-center rounded-full border border-white border-opacity-10 bg-opacity-30 px-6 text-xs text-white">
                      Active
                    </div>
                  </div>

                  <h5 className="mb-3 font-title text-xl text-white">
                    Limited Words
                  </h5>
                  <h3 className="mb-4 font-title text-4xl text-white">Free</h3>
                  <a
                    className="bg-dark hover-bg-primary flex items-center justify-center rounded-lg bg-slate-700 bg-opacity-40 py-4 text-white"
                    href="/login"
                  >
                    <span className="text-sm">Start free trial today</span>
                    <em className="ni ni-arrow-long-right icon"></em>
                  </a>
                </div>
                <ul className="gx-0 gy-3 pt-5">
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      <strong className="text-white">5,000</strong> Monthly Word
                      Limit
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[0.5px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      <strong className="text-white">5+</strong> Templates
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      50+ Languages
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Advance Editor Tool
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Regular Technical Support
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Unlimited Logins
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Newest Features
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8">
              <div className="">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="mb-2 text-slate-400">Silver</div>
                    <div className="end-0 top-0 flex items-center justify-center rounded-full bg-indigo-700 px-6 text-xs text-white">
                      Most Popular
                    </div>
                  </div>

                  <h5 className="mb-3 font-title text-xl text-white">
                    Unlimited Words
                  </h5>
                  <h3 className="mb-4 font-title text-4xl text-white">
                    $139{" "}
                    <span className="font-default text-sm text-slate-700">
                      / monthly
                    </span>
                  </h3>
                  <a
                    className="hover-bg-primary flex items-center justify-center rounded-lg bg-indigo-700 py-4 text-white"
                    href="/login"
                  >
                    <span className="text-sm">Start free trial today</span>
                    <em className="ni ni-arrow-long-right icon"></em>
                  </a>
                </div>
                <ul className="gx-0 gy-3 pt-5">
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      <strong className="text-white">5,000</strong> Monthly Word
                      Limit
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[0.5px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      <strong className="text-white">5+</strong> Templates
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      50+ Languages
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Advance Editor Tool
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Regular Technical Support
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Unlimited Logins
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Newest Features
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8">
              <div className="">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="mb-2 text-slate-400">Diamond</div>
                  </div>

                  <h5 className="mb-3 font-title text-xl text-white">
                    Customized Plan
                  </h5>
                  <h3 className="mb-4 font-title text-4xl text-white">
                    $269{" "}
                    <span className="font-default text-sm text-slate-700">
                      / monthly
                    </span>
                  </h3>
                  <a
                    className="bg-dark hover-bg-primary flex items-center justify-center rounded-lg bg-slate-700 bg-opacity-40 py-4 text-white"
                    href="/login"
                  >
                    <span className="text-sm">Start free trial today</span>
                    <em className="ni ni-arrow-long-right icon"></em>
                  </a>
                </div>
                <ul className="gx-0 gy-3 pt-5">
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      <strong className="text-white">5,000</strong> Monthly Word
                      Limit
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[0.5px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      <strong className="text-white">5+</strong> Templates
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      50+ Linguagens
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Advance Editor Tool
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Regular Technical Support
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Unlimited Logins
                    </span>
                  </li>
                  <li className="flex items-center gap-3 border-b-[1px] border-slate-800 py-2">
                    <Check className="text-emerald-500" size={18} />
                    <span className="text-sm text-slate-600">
                      Newest Features
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-20 py-12">
          <div className="flex max-w-4xl flex-col items-center justify-center gap-8">
            <h2 className="font-title text-4xl text-white">
              Dúvidas frequentes
            </h2>
            <p className="text-center text-xl text-gray-400">
              Este é um cabeçalho simples e comumente usado que permite aos
              clientes saber que estão procurando diferentes opções de preços.
            </p>
          </div>
          <div className="flex max-w-4xl flex-col items-center justify-center gap-3">
            <div className="w-full rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-4 ">
              <h2 className="">
                <button className="font-title text-lg text-slate-50">
                  What is a copy?
                </button>
              </h2>
              <div className="">
                <div className="text-slate-400">
                  Yes, you can write long articel for your blog posts, product
                  descriptions or any long article with CopyGen. Were always
                  updating our template and tools, so let us know what are
                  expecting!
                </div>
              </div>
            </div>
            <div className="w-full rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-4 ">
              <h2 className="">
                <button className="font-title text-lg text-slate-50">
                  What is a copy?
                </button>
              </h2>
            </div>
            <div className="w-full rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-4 ">
              <h2 className="">
                <button className="font-title text-lg text-slate-50">
                  What is a copy?
                </button>
              </h2>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex h-full w-full flex-col items-center justify-center gap-20 pt-24">
          <section className="flex w-full gap-24">
            <div className="flex flex-col gap-6">
              <Image
                alt=""
                src="/logo.svg"
                className="text-white"
                height={"70"}
                width={"60"}
              />
              <span className="text-lg font-light text-white ">
                Earn up to 30% Lifetime Commission as an Affiliate!
              </span>
              <button className="appearance-none rounded-lg bg-indigo-700 px-12 py-2 font-title text-white hover:bg-indigo-600 forced-colors:appearance-auto">
                Comece agora
              </button>
            </div>
            <nav className="flex w-full gap-12 text-white">
              <div className="flex w-full flex-col">
                <h2 className="mb-3 font-title text-sm uppercase">USE CASE</h2>
                <ul className="flex cursor-pointer flex-col gap-3 text-sm hover:text-slate-100">
                  <li>AI Writer</li>
                  <li>AI Articel Writer</li>
                  <li>Content Generator</li>
                  <li>Content Rewriter</li>
                  <li>Blog Post Writer</li>
                </ul>
              </div>
              <div className="flex w-full cursor-pointer flex-col hover:text-slate-100">
                <h2 className="mb-3 font-title text-sm uppercase">USE CASE</h2>
                <ul className="flex cursor-pointer flex-col gap-3 text-sm hover:text-slate-100">
                  <li>AI Writer</li>
                  <li>AI Articel Writer</li>
                  <li>Content Generator</li>
                  <li>Content Rewriter</li>
                  <li>Blog Post Writer</li>
                </ul>
              </div>
              <div className="flex w-full cursor-pointer flex-col hover:text-slate-100">
                <h2 className="mb-3 font-title text-sm uppercase">CONTACTS</h2>
                <ul className="flex cursor-pointer flex-col gap-3 text-sm hover:text-slate-100">
                  <li>
                    If you need help using our service, or have a question about
                    it, please feel free to contact us.
                  </li>
                  <li>support@copygen.ai</li>
                </ul>
              </div>
            </nav>
          </section>
          <section className="flex w-full justify-between border-t border-slate-800 py-6">
            <span className="text-slate-400">
              © 2023 Feito com amor pela dify
            </span>
          </section>
        </footer>
      </main>
    </div>
  );
}
