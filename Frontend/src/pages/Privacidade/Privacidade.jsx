import { useEffect, useState } from "react";
import "./Privacidade.css";

export default function PoliticaPrivacidade() {
  const [ativa, setAtiva] = useState("dados");

  // Destaca no menu lateral a seção que está na tela
  useEffect(() => {
    const secoes = document.querySelectorAll(".pp-card[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setAtiva(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    secoes.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id) => (ativa === id ? "pp-toc__link is-active" : "pp-toc__link");

  return (
    <div className="pp-page">
      <div className="pp-topbar"></div>
      <div className="pp-glow pp-glow--left"></div>
      <div className="pp-glow pp-glow--right"></div>

      <div className="pp-container">
        {/* ===== HEADER ===== */}
        <header className="pp-header">
          <a href="/" className="pp-logo">MAKIIA</a>

          <nav className="pp-tabs">
            <a href="/privacidade" className="pp-tab pp-tab--active">Privacidade</a>
            <a href="/cookies" className="pp-tab">Cookies</a>
          </nav>

          <a href="mailto:privacidade@makiia.com" className="pp-btn">Fale com a gente</a>
        </header>

        {/* ===== HERO ===== */}
        <section className="pp-hero">
          <div className="pp-hero__text">
            <div className="pp-badge">
              <span className="pp-badge__tag">LGPD</span>
              Atualizada em 10 de novembro de 2026
            </div>

            <h1 className="pp-title">
              Seus dados são seus.{" "}
              <span className="pp-gradient-text">Só pedimos o que a criação precisa.</span>
            </h1>

            <p className="pp-lead">
              Esta política explica o que a MAKIIA coleta, por que coleta, com quem compartilha e
              como você controla cada ponto, em linguagem direta.
            </p>
          </div>

          <aside className="pp-summary">
            <div className="pp-summary__bar">
              <span className="pp-dot pp-dot--red"></span>
              <span className="pp-dot pp-dot--yellow"></span>
              <span className="pp-dot pp-dot--green"></span>
              <span className="pp-summary__title">MAKIIA · RESUMO</span>
            </div>

            <ul className="pp-summary__list">
              <li className="pp-summary__item">
                <span className="pp-check">✓</span>
                <div>
                  <strong>Não vendemos seus dados</strong>
                  <p>Nem para anunciantes, nem para corretores de dados.</p>
                </div>
              </li>
              <li className="pp-summary__item">
                <span className="pp-check">✓</span>
                <div>
                  <strong>Seu conteúdo é seu</strong>
                  <p>Briefings e peças não treinam modelos de terceiros sem o seu aceite.</p>
                </div>
              </li>
              <li className="pp-summary__item">
                <span className="pp-check">✓</span>
                <div>
                  <strong>Você decide</strong>
                  <p>Acesse, corrija, exporte ou apague seus dados quando quiser.</p>
                </div>
              </li>
              <li className="pp-summary__item">
                <span className="pp-check">✓</span>
                <div>
                  <strong>Protegido por padrão</strong>
                  <p>Criptografia em trânsito e em repouso.</p>
                </div>
              </li>
            </ul>
          </aside>
        </section>

        {/* ===== NÚMEROS ===== */}
        <section className="pp-stats">
          <div className="pp-stat">
            <span className="pp-stat__value">0</span>
            <span className="pp-stat__label">Dados vendidos</span>
          </div>
          <div className="pp-stat">
            <span className="pp-stat__value">15 dias</span>
            <span className="pp-stat__label">Prazo de resposta</span>
          </div>
          <div className="pp-stat">
            <span className="pp-stat__value">6</span>
            <span className="pp-stat__label">Direitos garantidos</span>
          </div>
          <div className="pp-stat">
            <span className="pp-stat__value">1 e-mail</span>
            <span className="pp-stat__label">Para exercer todos</span>
          </div>
        </section>

        <div className="pp-layout">
          {/* ===== MENU LATERAL ===== */}
          <aside className="pp-toc">
            <span className="pp-toc__title">Nesta página</span>
            <ul>
              <li><a href="#dados" className={linkClass("dados")}>Dados e finalidades</a></li>
              <li><a href="#ia" className={linkClass("ia")}>Conteúdo e IA</a></li>
              <li><a href="#compartilhamento" className={linkClass("compartilhamento")}>Compartilhamento</a></li>
              <li><a href="#direitos" className={linkClass("direitos")}>Seus direitos</a></li>
              <li><a href="#retencao" className={linkClass("retencao")}>Retenção</a></li>
              <li><a href="#seguranca" className={linkClass("seguranca")}>Segurança</a></li>
              <li><a href="#contato" className={linkClass("contato")}>Mudanças e contato</a></li>
            </ul>
          </aside>

          <main className="pp-content">
            {/* ===== DADOS ===== */}
            <section id="dados" className="pp-card pp-card--warm">
              <h2>Dados que coletamos e por quê</h2>
              <p>
                Cada dado tem uma finalidade e uma base legal prevista na LGPD. Se não precisamos de
                um dado, não pedimos.
              </p>

              <div className="pp-table-wrap">
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>Dado</th>
                      <th>Para que usamos</th>
                      <th>Base legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pp-strong">Nome e e-mail</td>
                      <td>Criar e proteger sua conta, avisar sobre mudanças importantes</td>
                      <td><span className="pp-chip">Contrato</span></td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Briefings, conversas e peças</td>
                      <td>Gerar, salvar e refinar o que você cria</td>
                      <td><span className="pp-chip">Contrato</span></td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Uso do produto</td>
                      <td>Entender quais recursos ajudam e corrigir erros</td>
                      <td><span className="pp-chip">Legítimo interesse</span></td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Dispositivo e IP aproximado</td>
                      <td>Segurança da conta e prevenção a fraudes</td>
                      <td><span className="pp-chip">Legítimo interesse</span></td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Dados de pagamento</td>
                      <td>Cobrar planos (feito por parceiro; não guardamos o cartão completo)</td>
                      <td>
                        <div className="pp-chips">
                          <span className="pp-chip">Contrato</span>
                          <span className="pp-chip">Obrigação legal</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="pp-strong">E-mails de novidades</td>
                      <td>Enviar lançamentos e dicas</td>
                      <td><span className="pp-chip">Consentimento</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== IA ===== */}
            <section id="ia" className="pp-card">
              <h2>Seu conteúdo e a inteligência artificial</h2>
              <p>
                A MAKIIA envia o seu briefing a modelos de IA para gerar logos, cartazes e identidade
                visual. Por isso, deixamos claro como isso funciona:
              </p>
              <ul className="pp-list">
                <li>Seu conteúdo é usado para entregar o que você pediu e manter as peças coerentes com a sua marca.</li>
                <li>Não usamos seus briefings nem suas peças para treinar modelos que sirvam a outros clientes sem o seu consentimento.</li>
                <li>Você pode apagar projetos e conversas a qualquer momento, e a exclusão vale também para as cópias de trabalho.</li>
                <li>Evite enviar dados pessoais de terceiros (como fotos de clientes) sem ter autorização deles.</li>
              </ul>
            </section>

            {/* ===== COMPARTILHAMENTO ===== */}
            <section id="compartilhamento" className="pp-card">
              <h2>Com quem compartilhamos</h2>
              <p>
                Compartilhamos dados apenas com prestadores que fazem a MAKIIA funcionar, sob contrato
                e com as mesmas exigências de proteção. Também podemos compartilhar quando a lei ou
                uma ordem judicial exigir.
              </p>

              <div className="pp-table-wrap">
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>Tipo de parceiro</th>
                      <th>O que faz</th>
                      <th>Dados envolvidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pp-strong">Hospedagem e infraestrutura</td>
                      <td>Mantém o produto no ar e guarda seus arquivos</td>
                      <td>Conta e conteúdo</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Modelos de IA</td>
                      <td>Processam briefings para gerar as peças</td>
                      <td>Conteúdo do pedido</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Pagamentos</td>
                      <td>Processam cobranças e emitem recibos</td>
                      <td>Dados de cobrança</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">E-mail e suporte</td>
                      <td>Enviam mensagens e atendem pedidos</td>
                      <td>Nome e e-mail</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Análise de uso</td>
                      <td>Medem uso agregado, só com seu consentimento</td>
                      <td>Eventos de navegação</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="pp-note">
                Alguns parceiros ficam fora do Brasil. Nesses casos, a transferência segue as regras
                da LGPD, com cláusulas contratuais de proteção.
              </p>
            </section>

            {/* ===== DIREITOS ===== */}
            <section id="direitos" className="pp-card">
              <h2>Seus direitos</h2>
              <p>
                Você pode exercer qualquer um destes direitos, sem custo, pelas configurações da conta
                ou por e-mail.
              </p>

              <div className="pp-grid pp-grid--2">
                <div className="pp-tile">
                  <h3>Acesso</h3>
                  <p>Saber quais dados temos sobre você.</p>
                </div>
                <div className="pp-tile">
                  <h3>Correção</h3>
                  <p>Atualizar dados incompletos ou errados.</p>
                </div>
                <div className="pp-tile">
                  <h3>Exclusão</h3>
                  <p>Apagar dados que não precisamos manter por lei.</p>
                </div>
                <div className="pp-tile">
                  <h3>Portabilidade</h3>
                  <p>Receber seus dados em formato aberto.</p>
                </div>
                <div className="pp-tile">
                  <h3>Revogação</h3>
                  <p>Retirar um consentimento, como o de novidades.</p>
                </div>
                <div className="pp-tile">
                  <h3>Oposição</h3>
                  <p>Contestar um uso baseado em legítimo interesse.</p>
                </div>
              </div>

              <div className="pp-grid pp-grid--3">
                <div className="pp-tile">
                  <h3>1. Peça</h3>
                  <p>Em Conta › Privacidade ou por e-mail.</p>
                </div>
                <div className="pp-tile">
                  <h3>2. Confirme</h3>
                  <p>Verificamos que o pedido é seu.</p>
                </div>
                <div className="pp-tile">
                  <h3>3. Receba</h3>
                  <p>Resposta em até 15 dias.</p>
                </div>
              </div>
            </section>

            {/* ===== RETENÇÃO ===== */}
            <section id="retencao" className="pp-card">
              <h2>Quanto tempo guardamos</h2>

              <div className="pp-table-wrap">
                <table className="pp-table pp-table--2col">
                  <thead>
                    <tr>
                      <th>Informação</th>
                      <th>Prazo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pp-strong">Conta e perfil</td>
                      <td>Enquanto a conta estiver ativa, mais 30 dias após o encerramento</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Projetos e peças</td>
                      <td>Até você apagar ou encerrar a conta</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Registros de acesso</td>
                      <td>6 meses, como determina o Marco Civil da Internet</td>
                    </tr>
                    <tr>
                      <td className="pp-strong">Dados fiscais e de cobrança</td>
                      <td>5 anos, por obrigação legal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ===== SEGURANÇA ===== */}
            <section id="seguranca" className="pp-card">
              <h2>Como protegemos seus dados</h2>
              <ul className="pp-list">
                <li>Criptografia em trânsito (HTTPS) e em repouso.</li>
                <li>Acesso interno por função, com registro de quem acessou o quê.</li>
                <li>Senhas guardadas de forma irreversível e verificação em duas etapas opcional.</li>
                <li>Em caso de incidente com risco a você, avisamos você e a ANPD no prazo legal.</li>
              </ul>
            </section>

            {/* ===== CONTATO ===== */}
            <section id="contato" className="pp-card">
              <h2>Mudanças e contato</h2>
              <p>
                Se mudarmos esta política de forma relevante, avisamos por e-mail e dentro do produto
                antes de a mudança valer. Para dúvidas ou pedidos, fale com nosso encarregado de dados
                (DPO) em <a href="mailto:privacidade@makiia.com">privacidade@makiia.com</a>.
              </p>
              <p className="pp-note">
                Texto de exemplo para o protótipo. Prazos, parceiros e cláusulas devem ser revisados
                pelo jurídico e pelo DPO antes de publicar.
              </p>
            </section>

            {/* ===== CTA COOKIES ===== */}
            <section className="pp-cta">
              <div>
                <h3>Quer controlar os cookies?</h3>
                <p>Escolha o que permitir no painel de preferências.</p>
              </div>
              <a href="/cookies" className="pp-btn">Abrir política de cookies</a>
            </section>
          </main>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="pp-footer">
        <div className="pp-footer__inner">
          <div className="pp-footer__brand">
            <span className="pp-logo">MAKIIA</span>
            <p>Identidade visual criada conversando, do briefing ao arquivo final.</p>
          </div>

          <div className="pp-footer__col">
            <h4>Legal</h4>
            <a href="/privacidade" className="is-current">Política de Privacidade</a>
            <a href="/cookies">Política de Cookies</a>
          </div>

          <div className="pp-footer__col">
            <h4>Contato</h4>
            <a href="mailto:privacidade@makiia.com">privacidade@makiia.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
