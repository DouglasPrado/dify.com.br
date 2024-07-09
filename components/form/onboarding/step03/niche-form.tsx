import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion as m } from "framer-motion";

export default function NicheForm({ step }: any) {
  return (
    <>
      <m.h3
        className="border-l-4 border-black text-start text-2xl font-light dark:text-white"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.3,
          },
        }}
      >
        <span className="ml-3">Divulgação</span>
      </m.h3>
      <m.h1
        className="text-start font-title text-3xl dark:text-white"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.3,
          },
        }}
      >
        {step} - Qual o nicho de mercado que você pretende atuar?
      </m.h1>
      <m.h2
        className="text-xl text-gray-800"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.6,
          },
        }}
      >
        Em que área você quer trabalhar? Por exemplo, com brinquedos, roupas,
        comida ou algo diferente?
      </m.h2>
      <m.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{
          opacity: 1,
          y: "0%",
          transition: {
            ease: "easeInOut",
            duration: 1.2,
            delay: 0.9,
          },
        }}
        className="flex flex-col gap-6 py-6 md:flex-row"
      >
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o nicho de mercado" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(niches).map((niche: any, idxNiche: number) => (
              <SelectGroup key={`key-select-niche-${idxNiche}`}>
                <SelectLabel>{niche[0]}</SelectLabel>
                {niche[1].map((item: any, idxItem: number) => (
                  <SelectItem key={`item-${idxItem}`} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </m.div>
    </>
  );
}

const niches = {
  "Marketing Digital": [
    { label: "Marketing de Afiliados", value: "marketing_de_afiliados" },
    {
      label: "SEO (Otimização para Motores de Busca)",
      value: "seo_otimizacao_para_motores_de_busca",
    },
    { label: "Marketing de Conteúdo", value: "marketing_de_conteudo" },
    {
      label: "Marketing em Mídias Sociais",
      value: "marketing_em_midias_sociais",
    },
    { label: "E-mail Marketing", value: "e-mail_marketing" },
    { label: "PPC (Pagamento Por Clique)", value: "ppc_pagamento_por_clique" },
    { label: "Automação de Marketing", value: "automacao_de_marketing" },
  ],
  "Tecnologia e Desenvolvimento": [
    {
      label: "Web Design e Desenvolvimento",
      value: "web_design_e_desenvolvimento",
    },
    {
      label: "Desenvolvimento de Aplicativos Móveis",
      value: "desenvolvimento_de_aplicativos_moveis",
    },
    {
      label: "Análise de Dados e Big Data",
      value: "analise_de_dados_e_big_data",
    },
    {
      label: "Inteligência Artificial e Machine Learning",
      value: "inteligencia_artificial_e_machine_learning",
    },
    { label: "Blockchain e Criptomoedas", value: "blockchain_e_criptomoedas" },
    { label: "Segurança Cibernética", value: "seguranca_cibernetica" },
    { label: "Modelagem e Impressão 3D", value: "modelagem_e_impressao_3d" },
  ],
  "Educação e Aprendizado Online": [
    {
      label: "Criação e Venda de Cursos Online",
      value: "criacao_e_venda_de_cursos_online",
    },
    { label: "Ensino de Idiomas Online", value: "ensino_de_idiomas_online" },
    {
      label: "Plataformas de Aprendizado de Habilidades",
      value: "plataformas_de_aprendizado_de_habilidades",
    },
    { label: "Tutoriais e How-To Guides", value: "tutoriais_e_how-to_guides" },
  ],
  "Estilo de Vida e Bem-Estar": [
    { label: "Saúde e Bem-estar Online", value: "saude_e_bem-estar_online" },
    {
      label: "Nutrição e Planos de Dieta Personalizados",
      value: "nutricao_e_planos_de_dieta_personalizados",
    },
    { label: "Treinamento Físico Online", value: "treinamento_fisico_online" },
    { label: "Yoga e Meditação Online", value: "yoga_e_meditacao_online" },
    {
      label: "Coaching de Vida e Carreira",
      value: "coaching_de_vida_e_carreira",
    },
  ],
  "Negócios e Finanças": [
    {
      label: "Consultoria Financeira Online",
      value: "consultoria_financeira_online",
    },
    {
      label: "Investimento e Trading Online",
      value: "investimento_e_trading_online",
    },
    {
      label: "Planejamento Financeiro para Jovens",
      value: "planejamento_financeiro_para_jovens",
    },
    { label: "Blockchain e Criptomoedas", value: "blockchain_e_criptomoedas" },
  ],
  "Criatividade e Design": [
    { label: "Design Gráfico", value: "design_grafico" },
    { label: "Ilustração e Arte Digital", value: "ilustracao_e_arte_digital" },
    { label: "Fotografia de Stock", value: "fotografia_de_stock" },
    {
      label: "Produção de Vídeo e Edição",
      value: "producao_de_video_e_edicao",
    },
    {
      label: "Animação e Motion Graphics",
      value: "animacao_e_motion_graphics",
    },
  ],
};
