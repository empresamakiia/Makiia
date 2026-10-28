from app.database.base import Base
from app.database.session import engine

# Importa todos os models para que a Base os conheça
from app.models.perfis import Perfil
from app.models.permissoes import Permissao
from app.models.ferramentas_ia import FerramentaIA
from app.models.usuarios import Usuario
from app.models.perfis_permissoes import PerfilPermissao
from app.models.projetos import Projeto
from app.models.recuperacoes_senha import RecuperacaoSenha
from app.models.auditoria_eventos import AuditoriaEvento
from app.models.solicitacoes_ia import SolicitacaoIA
from app.models.execucoes_ia import ExecucaoIA
from app.models.arquivos import Arquivo


def criar_tabelas():
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")


if __name__ == "__main__":
    criar_tabelas()