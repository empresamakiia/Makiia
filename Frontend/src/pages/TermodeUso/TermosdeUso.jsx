import { Link } from "react-router-dom";
import {
  LegalFooter,
  LegalHeader,
  LegalToc,
} from "../../components/Legal/Legal";
import "./TermosdeUso.css";

/* ATENÇÃO: texto-base. Precisa de revisão jurídica antes de ir ao ar
   (razão social, CNPJ, endereço, valores e prazos dos planos). */

const VIGENCIA = "19 de novembro de 2026";

const SECTIONS = [
  { id: "resumo", label: "Resumo em 1 minuto" },
  { id: "aceitacao", label: "1. Aceitação" },
  { id: "servico", label: "2. O que é a MAKIIA" },
  { id: "conta", label: "3. Sua conta" },
  { id: "uso", label: "4. Uso permitido" },
  { id: "planos", label: "5. Planos e pagamentos" },
  { id: "conteudo", label: "6. Seu conteúdo" },
  { id: "ia", label: "7. Inteligência artificial" },
  { id: "propriedade", label: "8. Propriedade da MAKIIA" },
  { id: "terceiros", label: "9. Serviços de terceiros" },
  { id: "disponibilidade", label: "10. Disponibilidade" },
  { id: "responsabilidade", label: "11. Responsabilidade" },
  { id: "encerramento", label: "12. Encerramento" },
  { id: "alteracoes", label: "13. Alterações" },
  { id: "lei", label: "14. Lei e foro" },
  { id: "contato", label: "15. Contato" },
];

const ICONS = {
  spark: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5z" />,
};

function Icon({ name }) {
  return (
    <svg
      className="tu-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function Section({ id, number, title, children }) {
  return (
    <section id={id} className="lg-card tu-section">
      <h2>
        <span className="tu-num">{String(number).padStart(2, "0")}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function TermosDeUso() {
  return (
    <div className="lg-page tu-page">
      <div className="lg-glow lg-glow--top" aria-hidden="true"></div>
      <div className="lg-glow lg-glow--bottom" aria-hidden="true"></div>

      <div className="lg-container">
        <LegalHeader current="/termos" />

        {/* ===== Destaque ===== */}
        <section className="lg-hero">
          <div className="lg-hero__text">
            <div className="lg-badge">
              <span>TERMOS DE USO</span>
              Vigentes desde {VIGENCIA}
            </div>
            <h1>
              Regras claras para usar a{" "}
              <span className="lg-gradient">MAKIIA</span> sem surpresas.
            </h1>
            <p className="lg-lead">
              Estes termos explicam o que você pode esperar da MAKIIA e o que
              esperamos de você. Escrevemos em linguagem direta, mas eles têm
              valor de contrato.
            </p>
            <div className="tu-hero-actions">
              <a href="#resumo" className="lg-btn lg-btn--primary">
                Ler o resumo
              </a>
              <button
                type="button"
                className="lg-btn"
                onClick={() => window.print()}
              >
                Imprimir ou salvar PDF
              </button>
            </div>
          </div>

          <aside className="lg-summary tu-summary" aria-label="Em resumo">
            <div className="tu-summary__bar">
              <span></span>
              <span></span>
              <span></span>
              <p>MAKIIA · EM RESUMO</p>
            </div>
            <ul>
              <li>
                <Icon name="spark" />
                <div>
                  <strong>O que você cria é seu</strong>
                  <p>Marcas, peças e textos gerados pertencem a você.</p>
                </div>
              </li>
              <li>
                <Icon name="card" />
                <div>
                  <strong>Sem fidelidade</strong>
                  <p>Cancele quando quiser, direto na sua conta.</p>
                </div>
              </li>
              <li>
                <Icon name="bell" />
                <div>
                  <strong>Aviso antes de mudar</strong>
                  <p>Mudanças importantes são avisadas com 30 dias.</p>
                </div>
              </li>
              <li>
                <Icon name="chat" />
                <div>
                  <strong>Gente de verdade</strong>
                  <p>Dúvidas e problemas são respondidos por pessoas.</p>
                </div>
              </li>
            </ul>
          </aside>
        </section>

        <div className="lg-layout">
          <LegalToc sections={SECTIONS} />

          <main className="lg-content">
            {/* ===== Resumo ===== */}
            <section id="resumo" className="lg-card lg-card--warm">
              <h2>Resumo em 1 minuto</h2>
              <p>
                O essencial destes termos. O resumo ajuda, mas o texto completo
                abaixo é o que vale.
              </p>
              <div className="tu-tiles">
                <div className="tu-tile">
                  <Icon name="spark" />
                  <strong>Você é dono do que cria</strong>
                  <p>
                    Seu briefing e as peças geradas são seus, inclusive para uso
                    comercial.
                  </p>
                </div>
                <div className="tu-tile">
                  <Icon name="shield" />
                  <strong>Use com responsabilidade</strong>
                  <p>
                    Nada de conteúdo ilegal, enganoso ou que viole direitos de
                    outras pessoas e marcas.
                  </p>
                </div>
                <div className="tu-tile">
                  <Icon name="card" />
                  <strong>Pague só pelo que usa</strong>
                  <p>
                    Planos sem fidelidade e 7 dias para desistir da primeira
                    assinatura.
                  </p>
                </div>
                <div className="tu-tile">
                  <Icon name="eye" />
                  <strong>A IA pode errar</strong>
                  <p>
                    Revise nomes, textos e marcas antes de publicar ou registrar.
                  </p>
                </div>
              </div>
            </section>

            <Section id="aceitacao" number={1} title="Aceitação dos termos">
              <p>
                Ao criar uma conta ou usar a MAKIIA, você concorda com estes
                Termos de Uso e com a{" "}
                <Link to="/privacidade">Política de Privacidade</Link>. Se não
                concordar, não use o serviço.
              </p>
              <p>
                Para usar a MAKIIA você precisa ter pelo menos 18 anos, ou a
                autorização de um responsável legal. Se usar em nome de uma
                empresa, você declara ter poderes para aceitar estes termos por
                ela.
              </p>
            </Section>

            <Section id="servico" number={2} title="O que é a MAKIIA">
              <p>
                A MAKIIA é uma plataforma que usa inteligência artificial para
                criar identidades visuais e peças de marca, como logos, paletas,
                cartazes e posts, a partir do briefing que você descreve.
              </p>
            </Section>

            <Section id="conta" number={3} title="Sua conta">
              <ul className="tu-list">
                <li>Informe dados verdadeiros e mantenha-os atualizados.</li>
                <li>
                  Guarde sua senha com cuidado: o que for feito na sua conta é
                  de sua responsabilidade.
                </li>
                <li>
                  Avise a gente imediatamente se suspeitar de acesso indevido.
                </li>
                <li>Cada conta é pessoal e não pode ser vendida ou repassada.</li>
              </ul>
            </Section>

            <Section id="uso" number={4} title="Uso permitido">
              <p>
                Use a MAKIIA para criar e divulgar marcas de forma legítima. Não
                é permitido:
              </p>
              <ul className="tu-list tu-list--no">
                <li>
                  Criar conteúdo ilegal, discriminatório, violento, sexual
                  envolvendo menores ou que incentive ódio.
                </li>
                <li>
                  Copiar ou imitar marcas, personagens ou obras de terceiros sem
                  autorização.
                </li>
                <li>
                  Produzir material enganoso, como golpes, falsificações ou
                  desinformação.
                </li>
                <li>
                  Tentar invadir, sobrecarregar, copiar ou fazer engenharia
                  reversa da plataforma.
                </li>
                <li>
                  Usar robôs ou scripts para extrair dados ou gerar conteúdo em
                  massa sem autorização.
                </li>
              </ul>
            </Section>

            <Section id="planos" number={5} title="Planos, pagamentos e cancelamento">
              <ul className="tu-list">
                <li>
                  Os preços e limites de cada plano aparecem na página de planos
                  antes da contratação.
                </li>
                <li>
                  Assinaturas são renovadas automaticamente no fim de cada
                  período, até você cancelar.
                </li>
                <li>
                  Você pode cancelar a qualquer momento na sua conta. O acesso
                  continua até o fim do período já pago.
                </li>
                <li>
                  Reajustes de preço são avisados com pelo menos 30 dias de
                  antecedência.
                </li>
              </ul>
              <div className="lg-callout">
                <strong>Direito de arrependimento:</strong> na primeira
                contratação, você pode desistir em até 7 dias e receber o valor
                de volta integralmente, como prevê o Código de Defesa do
                Consumidor (art. 49).
              </div>
            </Section>

            <Section id="conteudo" number={6} title="Seu conteúdo">
              <p>
                Tudo o que você envia (briefings, textos, imagens) e tudo o que a
                MAKIIA gera para você pertence a você. Você pode usar,
                modificar e comercializar livremente.
              </p>
              <p>
                Para o serviço funcionar, você nos dá uma licença limitada para
                armazenar, processar e exibir esse conteúdo dentro da sua conta.
                Não usamos seu conteúdo para treinar modelos de terceiros sem o
                seu consentimento, como explica a{" "}
                <Link to="/privacidade">Política de Privacidade</Link>.
              </p>
              <p>
                Você garante que tem o direito de usar o que envia, como logos,
                fotos e textos de outras pessoas.
              </p>
            </Section>

            <Section id="ia" number={7} title="Inteligência artificial">
              <p>
                Os resultados são gerados automaticamente e podem conter erros,
                imprecisões ou semelhanças com materiais já existentes. Pedidos
                parecidos de outras pessoas podem gerar resultados parecidos.
              </p>
              <div className="lg-callout">
                <strong>Revise antes de publicar.</strong> Antes de usar
                comercialmente ou registrar uma marca no INPI, confira se o nome
                e o desenho não conflitam com marcas existentes. A MAKIIA não
                faz busca de anterioridade nem garante o registro.
              </div>
            </Section>

            <Section id="propriedade" number={8} title="Propriedade da MAKIIA">
              <p>
                A plataforma, o nome, o logo, o código, o design e os modelos da
                MAKIIA pertencem à MAKIIA. Estes termos não transferem nenhum
                desses direitos a você, apenas permitem o uso do serviço.
              </p>
            </Section>

            <Section id="terceiros" number={9} title="Serviços de terceiros">
              <p>
                Alguns recursos dependem de parceiros, como provedores de
                pagamento, hospedagem e login com Google ou Apple. O uso desses
                serviços também segue os termos de cada um deles.
              </p>
            </Section>

            <Section id="disponibilidade" number={10} title="Disponibilidade e mudanças no serviço">
              <p>
                Trabalhamos para manter a MAKIIA no ar o tempo todo, mas podem
                ocorrer interrupções para manutenção ou por falhas fora do nosso
                controle. Manutenções programadas são avisadas com antecedência
                sempre que possível.
              </p>
              <p>
                Podemos melhorar, mudar ou remover recursos. Se uma mudança
                tirar algo essencial do seu plano pago, você pode cancelar e
                receber o valor proporcional ao período não usado.
              </p>
            </Section>

            <Section id="responsabilidade" number={11} title="Limitação de responsabilidade">
              <p>
                Na medida permitida pela lei, a MAKIIA não se responsabiliza
                por danos indiretos, lucros cessantes ou pelo uso que você faz
                das peças geradas, incluindo conflitos com marcas de terceiros.
              </p>
              <p>
                Nada nestes termos limita os direitos que o Código de Defesa do
                Consumidor garante a você.
              </p>
            </Section>

            <Section id="encerramento" number={12} title="Suspensão e encerramento">
              <ul className="tu-list">
                <li>
                  Você pode excluir sua conta quando quiser, nas configurações.
                </li>
                <li>
                  Podemos suspender ou encerrar contas que violem estes termos.
                  Em casos que não sejam graves, avisamos antes e damos a chance
                  de corrigir.
                </li>
                <li>
                  Ao encerrar, você tem 30 dias para baixar suas criações antes
                  que sejam apagadas.
                </li>
              </ul>
            </Section>

            <Section id="alteracoes" number={13} title="Alterações destes termos">
              <p>
                Podemos atualizar estes termos. Mudanças importantes são
                avisadas por e-mail e na plataforma com pelo menos 30 dias de
                antecedência. Se não concordar, você pode cancelar antes de elas
                valerem.
              </p>
            </Section>

            <Section id="lei" number={14} title="Lei aplicável e foro">
              <p>
                Estes termos seguem as leis do Brasil, incluindo o Código de
                Defesa do Consumidor, o Marco Civil da Internet e a LGPD.
                Eventuais disputas serão resolvidas no foro do seu domicílio.
              </p>
            </Section>

            <Section id="contato" number={15} title="Contato">
              <p>
                Dúvidas sobre estes termos? Escreva para{" "}
                <a href="mailto:contato@makiia.com">contato@makiia.com</a>.
                Respondemos em até 5 dias úteis.
              </p>
            </Section>

            {/* ===== Chamada ===== */}
            <section className="lg-cta">
              <div>
                <h2>Ainda com dúvida sobre algum ponto?</h2>
                <p>Fale com a gente. Uma pessoa do time vai responder.</p>
              </div>
              <a href="mailto:contato@makiia.com" className="lg-btn lg-btn--primary">
                Falar com o time
              </a>
            </section>
          </main>
        </div>
      </div>

      <LegalFooter current="/termos" />
    </div>
  );
}
