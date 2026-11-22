import { LegalToc } from "../../components/Legal/Legal";
import LegalFrame from "../../components/Legal/LegalFrame";
import "./Privacidade.css";

/* Mesma estrutura e peças visuais de Termos de Uso e Cookies (components/Legal/Legal.css). */

const SECTIONS = [
  { id: "dados", label: "Dados e finalidades" },
  { id: "ia", label: "Conteúdo e IA" },
  { id: "compartilhamento", label: "Compartilhamento" },
  { id: "direitos", label: "Seus direitos" },
  { id: "retencao", label: "Retenção" },
  { id: "seguranca", label: "Segurança" },
  { id: "contato", label: "Mudanças e contato" },
];

function Check() {
  return (
    <svg
      className="tu-icon"
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
  return (
    <LegalFrame active="/privacidade">
    <div className="lg-page pv-page">
      <div className="lg-container">
        {/* ===== Destaque ===== */}
        <section className="lg-hero">
          <div className="lg-hero__text">
            <div className="lg-badge">
              <span>LGPD</span>
              Atualizada em 10 de novembro de 2026
            </div>

            <h1>
              Seus dados são seus.{" "}
              <span className="lg-gradient">Só pedimos o que a criação precisa.</span>
            </h1>

            <p className="lg-lead">
              Esta política explica o que a MAKIIA coleta, por que coleta, com quem compartilha e
              como você controla cada ponto, em linguagem direta.
            </p>
          </div>

          <aside className="lg-summary tu-summary" aria-label="Resumo">
            <div className="tu-summary__bar">
              <span></span>
              <span></span>
              <span></span>
              <p>MAKIIA · RESUMO</p>
            </div>

            <ul>
              <li>
                <Check />
                <div>
                  <strong>Não vendemos seus dados</strong>
                  <p>Nem para anunciantes, nem para corretores de dados.</p>
                </div>
              </li>
              <li>
                <Check />
                <div>
                  <strong>Seu conteúdo é seu</strong>
                  <p>Briefings e peças não treinam modelos de terceiros sem o seu aceite.</p>
                </div>
              </li>
              <li>
                <Check />
                <div>
                  <strong>Você decide</strong>
                  <p>Acesse, corrija, exporte ou apague seus dados quando quiser.</p>
                </div>
              </li>
              <li>
                <Check />
                <div>
                  <strong>Protegido por padrão</strong>
                  <p>Criptografia em trânsito e em repouso.</p>
                </div>
              </li>
            </ul>
          </aside>
        </section>

        {/* ===== Números ===== */}
        <section className="pv-stats" aria-label="Em números">
          <div className="pv-stat">
            <strong>0</strong>
            <span>Dados vendidos</span>
          </div>
          <div className="pv-stat">
            <strong>15 dias</strong>
            <span>Prazo de resposta</span>
          </div>
          <div className="pv-stat">
            <strong>6</strong>
            <span>Direitos garantidos</span>
          </div>
          <div className="pv-stat">
            <strong>1 e-mail</strong>
            <span>Para exercer todos</span>
          </div>
        </section>

        <div className="lg-layout">
          <LegalToc sections={SECTIONS} />

          <main className="lg-content">
            {/* ===== Dados ===== */}
            <section id="dados" className="lg-card lg-card--warm">
              <h2>Dados que coletamos e por quê</h2>
              <p>
                Cada dado tem uma finalidade e uma base legal prevista na LGPD. Se não precisamos de
                um dado, não pedimos.
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
                    <tr>
                      <td className="pv-strong">Nome e e-mail</td>
                      <td>Criar e proteger sua conta, avisar sobre mudanças importantes</td>
                      <td><span className="lg-tag">Contrato</span></td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Briefings, conversas e peças</td>
                      <td>Gerar, salvar e refinar o que você cria</td>
                      <td><span className="lg-tag">Contrato</span></td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Uso do produto</td>
                      <td>Entender quais recursos ajudam e corrigir erros</td>
                      <td><span className="lg-tag">Legítimo interesse</span></td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Dispositivo e IP aproximado</td>
                      <td>Segurança da conta e prevenção a fraudes</td>
                      <td><span className="lg-tag">Legítimo interesse</span></td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Dados de pagamento</td>
                      <td>Cobrar planos (feito por parceiro; não guardamos o cartão completo)</td>
                      <td>
                        <div className="pv-tags">
                          <span className="lg-tag">Contrato</span>
                          <span className="lg-tag">Obrigação legal</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="pv-strong">E-mails de novidades</td>
                      <td>Enviar lançamentos e dicas</td>
                      <td><span className="lg-tag">Consentimento</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== IA ===== */}
            <section id="ia" className="lg-card">
              <h2>Seu conteúdo e a inteligência artificial</h2>
              <p>
                A MAKIIA envia o seu briefing a modelos de IA para gerar logos, cartazes e identidade
                visual. Por isso, deixamos claro como isso funciona:
              </p>
              <ul className="tu-list">
                <li>Seu conteúdo é usado para entregar o que você pediu e manter as peças coerentes com a sua marca.</li>
                <li>Não usamos seus briefings nem suas peças para treinar modelos que sirvam a outros clientes sem o seu consentimento.</li>
                <li>Você pode apagar projetos e conversas a qualquer momento, e a exclusão vale também para as cópias de trabalho.</li>
                <li>Evite enviar dados pessoais de terceiros (como fotos de clientes) sem ter autorização deles.</li>
              </ul>
            </section>

            {/* ===== Compartilhamento ===== */}
            <section id="compartilhamento" className="lg-card">
              <h2>Com quem compartilhamos</h2>
              <p>
                Compartilhamos dados apenas com prestadores que fazem a MAKIIA funcionar, sob contrato
                e com as mesmas exigências de proteção. Também podemos compartilhar quando a lei ou
                uma ordem judicial exigir.
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
                    <tr>
                      <td className="pv-strong">Hospedagem e infraestrutura</td>
                      <td>Mantém o produto no ar e guarda seus arquivos</td>
                      <td>Conta e conteúdo</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Modelos de IA</td>
                      <td>Processam briefings para gerar as peças</td>
                      <td>Conteúdo do pedido</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Pagamentos</td>
                      <td>Processam cobranças e emitem recibos</td>
                      <td>Dados de cobrança</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">E-mail e suporte</td>
                      <td>Enviam mensagens e atendem pedidos</td>
                      <td>Nome e e-mail</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Análise de uso</td>
                      <td>Medem uso agregado, só com seu consentimento</td>
                      <td>Eventos de navegação</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="lg-callout">
                Alguns parceiros ficam fora do Brasil. Nesses casos, a transferência segue as regras
                da LGPD, com cláusulas contratuais de proteção.
              </div>
            </section>

            {/* ===== Direitos ===== */}
            <section id="direitos" className="lg-card">
              <h2>Seus direitos</h2>
              <p>
                Você pode exercer qualquer um destes direitos, sem custo, pelas configurações da conta
                ou por e-mail.
              </p>

              <div className="tu-tiles">
                <div className="tu-tile">
                  <strong>Acesso</strong>
                  <p>Saber quais dados temos sobre você.</p>
                </div>
                <div className="tu-tile">
                  <strong>Correção</strong>
                  <p>Atualizar dados incompletos ou errados.</p>
                </div>
                <div className="tu-tile">
                  <strong>Exclusão</strong>
                  <p>Apagar dados que não precisamos manter por lei.</p>
                </div>
                <div className="tu-tile">
                  <strong>Portabilidade</strong>
                  <p>Receber seus dados em formato aberto.</p>
                </div>
                <div className="tu-tile">
                  <strong>Revogação</strong>
                  <p>Retirar um consentimento, como o de novidades.</p>
                </div>
                <div className="tu-tile">
                  <strong>Oposição</strong>
                  <p>Contestar um uso baseado em legítimo interesse.</p>
                </div>
              </div>

              <div className="tu-tiles pv-tiles--3">
                <div className="tu-tile">
                  <strong>1. Peça</strong>
                  <p>Em Conta › Privacidade ou por e-mail.</p>
                </div>
                <div className="tu-tile">
                  <strong>2. Confirme</strong>
                  <p>Verificamos que o pedido é seu.</p>
                </div>
                <div className="tu-tile">
                  <strong>3. Receba</strong>
                  <p>Resposta em até 15 dias.</p>
                </div>
              </div>
            </section>

            {/* ===== Retenção ===== */}
            <section id="retencao" className="lg-card">
              <h2>Quanto tempo guardamos</h2>

              <div className="lg-table-wrap">
                <table className="lg-table pv-table--2col">
                  <thead>
                    <tr>
                      <th scope="col">Informação</th>
                      <th scope="col">Prazo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pv-strong">Conta e perfil</td>
                      <td>Enquanto a conta estiver ativa, mais 30 dias após o encerramento</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Projetos e peças</td>
                      <td>Até você apagar ou encerrar a conta</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Registros de acesso</td>
                      <td>6 meses, como determina o Marco Civil da Internet</td>
                    </tr>
                    <tr>
                      <td className="pv-strong">Dados fiscais e de cobrança</td>
                      <td>5 anos, por obrigação legal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== Segurança ===== */}
            <section id="seguranca" className="lg-card">
              <h2>Como protegemos seus dados</h2>
              <ul className="tu-list">
                <li>Criptografia em trânsito (HTTPS) e em repouso.</li>
                <li>Acesso interno por função, com registro de quem acessou o quê.</li>
                <li>Senhas guardadas de forma irreversível e verificação em duas etapas opcional.</li>
                <li>Em caso de incidente com risco a você, avisamos você e a ANPD no prazo legal.</li>
              </ul>
            </section>

            {/* ===== Contato ===== */}
            <section id="contato" className="lg-card">
              <h2>Mudanças e contato</h2>
              <p>
                Se mudarmos esta política de forma relevante, avisamos por e-mail e dentro do produto
                antes de a mudança valer. Para dúvidas ou pedidos, fale com nosso encarregado de dados
                (DPO) em <a href="mailto:privacidade@makiia.com">privacidade@makiia.com</a>.
              </p>
              <div className="lg-callout">
                Texto de exemplo para o protótipo. Prazos, parceiros e cláusulas devem ser revisados
                pelo jurídico e pelo DPO antes de publicar.
              </div>
            </section>

            {/* ===== Chamada ===== */}
            <section className="lg-cta">
              <div>
                <h2>Quer controlar os cookies?</h2>
                <p>Escolha o que permitir no painel de preferências.</p>
              </div>
              <a href="/cookies" className="lg-btn lg-btn--primary">Abrir política de cookies</a>
            </section>
          </main>
        </div>
      </div>
    </div>
    </LegalFrame>
  );
}
