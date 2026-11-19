import { Link } from "react-router-dom";
import {
  LegalFooter,
  LegalHeader,
  LegalToc,
} from "../../components/Legal/Legal";
import { useCookieConsent } from "../../consent/context";
import "./Privacidade.css";

/* ATENÇÃO: texto de exemplo. Prazos, parceiros e cláusulas devem ser
   revisados pelo jurídico e pelo DPO antes de publicar. */

const ATUALIZACAO = "10 de novembro de 2026";

const SECTIONS = [
  { id: "dados", label: "Dados e finalidades" },
  { id: "ia", label: "Conteúdo e IA" },
  { id: "compartilhamento", label: "Compartilhamento" },
  { id: "direitos", label: "Seus direitos" },
  { id: "retencao", label: "Retenção" },
  { id: "seguranca", label: "Segurança" },
  { id: "contato", label: "Mudanças e contato" },
];

const DADOS = [
  {
    dado: "Nome e e-mail",
    uso: "Criar e proteger sua conta, avisar sobre mudanças importantes",
    bases: ["Contrato"],
  },
  {
    dado: "Briefings, conversas e peças",
    uso: "Gerar, salvar e refinar o que você cria",
    bases: ["Contrato"],
  },
  {
    dado: "Uso do produto",
    uso: "Entender quais recursos ajudam e corrigir erros",
    bases: ["Legítimo interesse"],
  },
  {
    dado: "Dispositivo e IP aproximado",
    uso: "Segurança da conta e prevenção a fraudes",
    bases: ["Legítimo interesse"],
  },
  {
    dado: "Dados de pagamento",
    uso: "Cobrar planos (feito por parceiro; não guardamos o cartão completo)",
    bases: ["Contrato", "Obrigação legal"],
  },
  {
    dado: "E-mails de novidades",
    uso: "Enviar lançamentos e dicas",
    bases: ["Consentimento"],
  },
];

const PARCEIROS = [
  ["Hospedagem e infraestrutura", "Mantém o produto no ar e guarda seus arquivos", "Conta e conteúdo"],
  ["Modelos de IA", "Processam briefings para gerar as peças", "Conteúdo do pedido"],
  ["Pagamentos", "Processam cobranças e emitem recibos", "Dados de cobrança"],
  ["E-mail e suporte", "Enviam mensagens e atendem pedidos", "Nome e e-mail"],
  ["Análise de uso", "Medem uso agregado, só com seu consentimento", "Eventos de navegação"],
];

const DIREITOS = [
  ["Acesso", "Saber quais dados temos sobre você."],
  ["Correção", "Atualizar dados incompletos ou errados."],
  ["Exclusão", "Apagar dados que não precisamos manter por lei."],
  ["Portabilidade", "Receber seus dados em formato aberto."],
  ["Revogação", "Retirar um consentimento, como o de novidades."],
  ["Oposição", "Contestar um uso baseado em legítimo interesse."],
];

const PASSOS = [
  ["1. Peça", "Em Conta › Privacidade ou por e-mail."],
  ["2. Confirme", "Verificamos que o pedido é seu."],
  ["3. Receba", "Resposta em até 15 dias."],
];

const RETENCAO = [
  ["Conta e perfil", "Enquanto a conta estiver ativa, mais 30 dias após o encerramento"],
  ["Projetos e peças", "Até você apagar ou encerrar a conta"],
  ["Registros de acesso", "6 meses, como determina o Marco Civil da Internet"],
  ["Dados fiscais e de cobrança", "5 anos, por obrigação legal"],
];

const RESUMO = [
  ["Não vendemos seus dados", "Nem para anunciantes, nem para corretores de dados."],
  ["Seu conteúdo é seu", "Briefings e peças não treinam modelos de terceiros sem o seu aceite."],
  ["Você decide", "Acesse, corrija, exporte ou apague seus dados quando quiser."],
  ["Protegido por padrão", "Criptografia em trânsito e em repouso."],
];

const NUMEROS = [
  ["0", "Dados vendidos"],
  ["15 dias", "Prazo de resposta"],
  ["6", "Direitos garantidos"],
  ["1 e-mail", "Para exercer todos"],
];

function CheckIcon() {
  return (
    <svg
      className="lg-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function PoliticaPrivacidade() {
  const { openPreferences } = useCookieConsent();

  return (
    <div className="lg-page">
      <div className="lg-glow lg-glow--top" aria-hidden="true"></div>
      <div className="lg-glow lg-glow--bottom" aria-hidden="true"></div>

      <div className="lg-container">
        <LegalHeader current="/privacidade" />

        {/* ===== Destaque ===== */}
        <section className="lg-hero">
          <div className="lg-hero__text">
            <div className="lg-badge">
              <span>LGPD</span>
              Atualizada em {ATUALIZACAO}
            </div>
            <h1>
              Seus dados são seus.{" "}
              <span className="lg-gradient">
                Só pedimos o que a criação precisa.
              </span>
            </h1>
            <p className="lg-lead">
              Esta política explica o que a MAKIIA coleta, por que coleta, com
              quem compartilha e como você controla cada ponto, em linguagem
              direta.
            </p>
          </div>

          <aside className="lg-summary" aria-label="Resumo">
            <div className="lg-summary__bar">
              <span></span>
              <span></span>
              <span></span>
              <p>MAKIIA · RESUMO</p>
            </div>
            <ul className="lg-summary-list">
              {RESUMO.map(([titulo, texto]) => (
                <li key={titulo}>
                  <CheckIcon />
                  <div>
                    <strong>{titulo}</strong>
                    <p>{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* ===== Números ===== */}
        <section className="pv-stats" aria-label="Em números">
          {NUMEROS.map(([valor, rotulo]) => (
            <div className="pv-stat" key={rotulo}>
              <strong>{valor}</strong>
              <span>{rotulo}</span>
            </div>
          ))}
        </section>

        <div className="lg-layout">
          <LegalToc sections={SECTIONS} />

          <main className="lg-content">
            {/* ===== Dados ===== */}
            <section id="dados" className="lg-card lg-card--warm">
              <h2>Dados que coletamos e por quê</h2>
              <p>
                Cada dado tem uma finalidade e uma base legal prevista na LGPD.
                Se não precisamos de um dado, não pedimos.
              </p>
              <div className="lg-table-wrap">
                <table className="lg-table">
                  <thead>
                    <tr>
                      <th scope="col">Dado</th>
                      <th scope="col">Para que usamos</th>
                      <th scope="col">Base legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DADOS.map((linha) => (
                      <tr key={linha.dado}>
                        <td className="pv-strong">{linha.dado}</td>
                        <td>{linha.uso}</td>
                        <td>
                          <div className="lg-chips">
                            {linha.bases.map((base) => (
                              <span className="lg-chip" key={base}>
                                {base}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== IA ===== */}
            <section id="ia" className="lg-card">
              <h2>Seu conteúdo e a inteligência artificial</h2>
              <p>
                A MAKIIA envia o seu briefing a modelos de IA para gerar logos,
                cartazes e identidade visual. Por isso, deixamos claro como
                isso funciona:
              </p>
              <ul className="lg-list">
                <li>
                  Seu conteúdo é usado para entregar o que você pediu e manter
                  as peças coerentes com a sua marca.
                </li>
                <li>
                  Não usamos seus briefings nem suas peças para treinar modelos
                  que sirvam a outros clientes sem o seu consentimento.
                </li>
                <li>
                  Você pode apagar projetos e conversas a qualquer momento, e a
                  exclusão vale também para as cópias de trabalho.
                </li>
                <li>
                  Evite enviar dados pessoais de terceiros (como fotos de
                  clientes) sem ter autorização deles.
                </li>
              </ul>
            </section>

            {/* ===== Compartilhamento ===== */}
            <section id="compartilhamento" className="lg-card">
              <h2>Com quem compartilhamos</h2>
              <p>
                Compartilhamos dados apenas com prestadores que fazem a MAKIIA
                funcionar, sob contrato e com as mesmas exigências de proteção.
                Também podemos compartilhar quando a lei ou uma ordem judicial
                exigir.
              </p>
              <div className="lg-table-wrap">
                <table className="lg-table">
                  <thead>
                    <tr>
                      <th scope="col">Tipo de parceiro</th>
                      <th scope="col">O que faz</th>
                      <th scope="col">Dados envolvidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PARCEIROS.map(([tipo, faz, dados]) => (
                      <tr key={tipo}>
                        <td className="pv-strong">{tipo}</td>
                        <td>{faz}</td>
                        <td>{dados}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg-callout">
                Alguns parceiros ficam fora do Brasil. Nesses casos, a
                transferência segue as regras da LGPD, com cláusulas
                contratuais de proteção.
              </div>
            </section>

            {/* ===== Direitos ===== */}
            <section id="direitos" className="lg-card">
              <h2>Seus direitos</h2>
              <p>
                Você pode exercer qualquer um destes direitos, sem custo, pelas
                configurações da conta ou por e-mail.
              </p>
              <div className="lg-tiles">
                {DIREITOS.map(([titulo, texto]) => (
                  <div className="lg-tile" key={titulo}>
                    <strong>{titulo}</strong>
                    <p>{texto}</p>
                  </div>
                ))}
              </div>
              <div className="lg-tiles lg-tiles--3 pv-steps">
                {PASSOS.map(([titulo, texto]) => (
                  <div className="lg-tile" key={titulo}>
                    <strong>{titulo}</strong>
                    <p>{texto}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== Retenção ===== */}
            <section id="retencao" className="lg-card">
              <h2>Quanto tempo guardamos</h2>
              <div className="lg-table-wrap pv-table-2col">
                <table className="lg-table">
                  <thead>
                    <tr>
                      <th scope="col">Informação</th>
                      <th scope="col">Prazo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RETENCAO.map(([info, prazo]) => (
                      <tr key={info}>
                        <td className="pv-strong">{info}</td>
                        <td>{prazo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== Segurança ===== */}
            <section id="seguranca" className="lg-card">
              <h2>Como protegemos seus dados</h2>
              <ul className="lg-list">
                <li>Criptografia em trânsito (HTTPS) e em repouso.</li>
                <li>
                  Acesso interno por função, com registro de quem acessou o
                  quê.
                </li>
                <li>
                  Senhas guardadas de forma irreversível e verificação em duas
                  etapas opcional.
                </li>
                <li>
                  Em caso de incidente com risco a você, avisamos você e a ANPD
                  no prazo legal.
                </li>
              </ul>
            </section>

            {/* ===== Contato ===== */}
            <section id="contato" className="lg-card">
              <h2>Mudanças e contato</h2>
              <p>
                Se mudarmos esta política de forma relevante, avisamos por
                e-mail e dentro do produto antes de a mudança valer. Para
                dúvidas ou pedidos, fale com nosso encarregado de dados (DPO)
                em <a href="mailto:privacidade@makiia.com">privacidade@makiia.com</a>.
              </p>
              <div className="lg-callout">
                Veja também os <Link to="/termos">Termos de Uso</Link> e a{" "}
                <Link to="/cookies">Política de Cookies</Link>.
              </div>
            </section>

            {/* ===== Chamada ===== */}
            <section className="lg-cta">
              <div>
                <h2>Quer controlar os cookies?</h2>
                <p>Escolha o que permitir no painel de preferências.</p>
              </div>
              <button
                type="button"
                className="lg-btn lg-btn--primary"
                onClick={openPreferences}
              >
                Abrir preferências de cookies
              </button>
            </section>
          </main>
        </div>
      </div>

      <LegalFooter current="/privacidade" />
    </div>
  );
}
