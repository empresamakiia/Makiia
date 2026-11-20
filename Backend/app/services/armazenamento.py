from pathlib import Path

from fastapi import HTTPException, UploadFile

from app.config import settings

FORMATOS_ACEITOS = {"image/png": "png", "image/jpeg": "jpg", "image/webp": "webp"}
TAMANHO_MAXIMO = 5 * 1024 * 1024  # 5 MB


def _pasta_brand_kits() -> Path:
    return Path(settings.UPLOAD_DIR) / "brand_kits"


def salvar_logo(id_brand_kit: int, arquivo: UploadFile) -> None:
    """Valida e grava a logo. Substitui a logo anterior, se existir."""
    extensao = FORMATOS_ACEITOS.get(arquivo.content_type)
    if not extensao:
        raise HTTPException(status_code=415, detail="Formato não aceito. Use PNG, JPG ou WEBP")

    conteudo = arquivo.file.read(TAMANHO_MAXIMO + 1)
    if len(conteudo) > TAMANHO_MAXIMO:
        raise HTTPException(status_code=413, detail="Arquivo maior que 5 MB")

    pasta = _pasta_brand_kits()
    pasta.mkdir(parents=True, exist_ok=True)
    remover_logo(id_brand_kit)
    (pasta / f"{id_brand_kit}_logo.{extensao}").write_bytes(conteudo)


def localizar_logo(id_brand_kit: int) -> Path | None:
    """Devolve o caminho da logo do kit, ou None se não houver."""
    pasta = _pasta_brand_kits()
    if not pasta.exists():
        return None
    return next(pasta.glob(f"{id_brand_kit}_logo.*"), None)


def remover_logo(id_brand_kit: int) -> None:
    """Apaga a logo do kit, se existir."""
    pasta = _pasta_brand_kits()
    if pasta.exists():
        for arquivo in pasta.glob(f"{id_brand_kit}_logo.*"):
            arquivo.unlink()