import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/makiia-logo.png';
import './Login.css';

const LEVELS = [
  { label: 'Fraca', color: '#C73A68' },
  { label: 'Razoável', color: '#FF8A4C' },
  { label: 'Boa', color: '#FFBE55' },
  { label: 'Forte', color: '#7B4DFF' },
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStrength(v) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
}


// Logos oficiais (SVG) para os botões sociais
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

// Painel da direita: a identidade da marca "orbitando" a MAKIIA
const Glyph = ({ k }) => {
  if (k === 'logo') return <img className="lg-mini-logo" src={logo} alt="" />;
  if (k === 'pal') return <span className="lg-dots"><i style={{ background: '#5B3CF5' }} /><i style={{ background: '#C73A68' }} /><i style={{ background: '#FF8A4C' }} /><i style={{ background: '#FFBE55' }} /></span>;
  if (k === 'type') return <b className="lg-aa">Aa</b>;
  if (k === 'poster') return <span className="lg-mini lg-mini-p" />;
  return <span className="lg-mini lg-mini-s" />;
};
const ORBIT = [
  { n: 1, rev: false, dur: 48, items: [{ a: 0, k: 'logo', t: 'Logo' }, { a: 180, k: 'pal', t: 'Paleta' }] },
  { n: 2, rev: true, dur: 74, items: [{ a: 50, k: 'type', t: 'Tipografia' }, { a: 170, k: 'poster', t: 'Cartaz' }, { a: 290, k: 'post', t: 'Post' }] },
];

// Campo com rótulo, ícone e mensagem de erro
function Field({ id, label, icon, error, side, children }) {
  return (
    <div className="lg-f">
      <label htmlFor={id}>{label}{side}</label>
      <div className={'lg-in' + (error ? ' lg-bad' : '')}>
        <i>{icon}</i>
        {children}
      </div>
      {error && <p className="lg-err">! {error}</p>}
    </div>
  );
}

// Input de senha com botão mostrar/ocultar
function PasswordInput({ id, value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />

      <button
        type="button"
        className="lg-eye"
        onClick={() => setShow((current) => !current)}
      >
        {show ? "Ocultar" : "Mostrar"}
      </button>
    </>
  );
}

/**
 * Props opcionais (para ligar ao seu back-end):
 *   onLogin({ email, password, remember })  -> Promise
 *   onSignup({ name, email, password })     -> Promise
 *   onSocial('google' | 'apple')
 * Se a função lançar um erro, a mensagem aparece no formulário.
 */
export default function Login({ onLogin, onSignup, onSocial }) {
  const { hash } = useLocation();
  const [tab, setTab] = useState(hash.includes('cadastro') ? 'signup' : 'login');
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: true, accept: false });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const isSignup = tab === 'signup';
  const strength = getStrength(form.password);

  const set = key => e => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [key]: v }));
    setErrors(er => ({ ...er, [key]: '' }));
  };
  const switchTab = t => { setTab(t); setErrors({}); setFormError(''); };

  const validate = () => {
    const e = {};
    if (isSignup && form.name.trim().length < 2) e.name = 'Informe o seu nome.';
    if (!EMAIL.test(form.email)) e.email = 'Digite um e-mail válido.';
    if (!form.password) e.password = 'Digite a sua senha.';
    else if (isSignup && form.password.length < 8) e.password = 'Use pelo menos 8 caracteres.';
    if (isSignup && !form.accept) e.accept = 'Aceite os termos para continuar.';
    return e;
  };

  const submit = async ev => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true); setFormError('');
    try {
      const { name, email, password, remember } = form;
      // TODO: troque pelo seu fetch/axios e depois redirecione (ex.: navigate('/'))
      const wait = () => new Promise(r => setTimeout(r, 900));
      if (isSignup) await (onSignup ? onSignup({ name, email, password }) : wait());
      else await (onLogin ? onLogin({ email, password, remember }) : wait());
    } catch (err) {
      setFormError(err?.message || 'Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg-page">
      <section className="lg-l">
        <div className="lg-top">
          <Link className="lg-logo" to="/"><img src={logo} alt="" />MAKIIA</Link>
          <Link className="lg-back" to="/">← Voltar ao site</Link>
        </div>

        <div className="lg-wrap"><div className="lg-card">
          <div className={'lg-seg' + (isSignup ? ' lg-su' : '')} role="tablist">
            <button type="button" role="tab" aria-selected={!isSignup} className={!isSignup ? 'lg-on' : ''} onClick={() => switchTab('login')}>Entrar</button>
            <button type="button" role="tab" aria-selected={isSignup} className={isSignup ? 'lg-on' : ''} onClick={() => switchTab('signup')}>Criar conta</button>
          </div>

          <form key={tab} className="lg-pane lg-on" onSubmit={submit} noValidate>
            {isSignup
              ? <h1>Crie a sua <span className="lg-gt">conta</span></h1>
              : <h1>Bem-vindo de volta</h1>}
            <p className="lg-sub">{isSignup ? 'Comece grátis. Sem cartão de crédito.' : 'Entre para continuar criando as suas marcas.'}</p>

            <div className="lg-soc">
              <button type="button" onClick={() => onSocial?.('google')}><GoogleIcon />Google</button>
              <button type="button" onClick={() => onSocial?.('apple')}><AppleIcon />Apple</button>
            </div>
            <div className="lg-or lg-sm">{isSignup ? 'ou cadastre com e-mail' : 'ou entre com e-mail'}</div>

            {isSignup && (
              <Field id="lg-name" label="Nome" icon="◌" error={errors.name}>
                <input id="lg-name" value={form.name} onChange={set('name')} placeholder="Seu nome completo" autoComplete="name" />
              </Field>
            )}
            <Field id="lg-email" label="E-mail" icon="@" error={errors.email}>
              <input id="lg-email" type="email" value={form.email} onChange={set('email')} placeholder="voce@empresa.com" autoComplete="email" />
            </Field>
            <Field id="lg-pass" label="Senha" icon="●" error={errors.password}
              side={!isSignup && <a href="#recuperar">Esqueci a senha</a>}>
              <PasswordInput id="lg-pass" value={form.password} onChange={set('password')}
                placeholder={isSignup ? 'Mínimo de 8 caracteres' : 'Sua senha'}
                autoComplete={isSignup ? 'new-password' : 'current-password'} />
            </Field>

            {isSignup && (
              <div className="lg-str">
                {LEVELS.map((l, i) => <i key={l.label} style={{ background: i < strength ? LEVELS[strength - 1].color : undefined }} />)}
                <span className="lg-sm">{form.password ? LEVELS[Math.max(strength - 1, 0)].label : 'Fraca'}</span>
              </div>
            )}

            {isSignup ? (
              <>
                <label className="lg-ck"><input type="checkbox" checked={form.accept} onChange={set('accept')} />
                  <span>Li e aceito os <a href="#termos">Termos de uso</a> e a <a href="#privacidade">Política de privacidade</a>.</span></label>
                {errors.accept && <p className="lg-err lg-err-ck">! {errors.accept}</p>}
              </>
            ) : (
              <label className="lg-ck"><input type="checkbox" checked={form.remember} onChange={set('remember')} /><span>Manter conectado neste dispositivo</span></label>
            )}

            {formError && <p className="lg-formerr">{formError}</p>}
            <button className="lg-go" type="submit" disabled={loading}>
              {loading ? <span className="lg-spin" aria-label="Carregando" /> : (isSignup ? 'Criar minha conta →' : 'Entrar na MAKIIA')}
            </button>
            <p className="lg-sw lg-sm">
              {isSignup ? 'Já tem uma conta? ' : 'Ainda não tem conta? '}
              <button type="button" className="lg-link" onClick={() => switchTab(isSignup ? 'login' : 'signup')}>{isSignup ? 'Entrar' : 'Criar conta grátis'}</button>
            </p>
            <Link className="lg-guest" to="/chat">Continuar sem login →</Link>
          </form>
        </div></div>

        <div className="lg-fo lg-sm"><span>© 2026 MAKIIA STUDIO</span><span>Termos · Privacidade · Ajuda</span></div>
      </section>

      <aside className="lg-r">
        <div><span className="lg-cap">MAKIIA 2 · Modo criativo</span><h2>Do briefing à marca, <span className="lg-gt">em minutos</span>.</h2></div>

        <div className="lg-orb" aria-hidden="true">
          <span className="lg-halo" /><span className="lg-halo lg-h2" />
          {ORBIT.map(o => (
            <div key={o.n} className={`lg-ring lg-ring${o.n}${o.rev ? ' lg-rev' : ''}`} style={{ '--dur': o.dur + 's' }}>
              {o.items.map(it => (
                <div key={it.t} className="lg-arm" style={{ '--a': it.a + 'deg' }}>
                  <div className="lg-chip"><Glyph k={it.k} />{it.t}</div>
                </div>
              ))}
            </div>
          ))}
          <div className="lg-core"><img src={logo} alt="" /></div>
        </div>

        <div className="lg-ft"><span className="lg-sm">Logo, cores, fontes e peças orbitando a mesma identidade.</span></div>
      </aside>
    </div>
  );
}
