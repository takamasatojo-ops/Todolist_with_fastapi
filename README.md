# TODOリスト（作成中）

ブラウザで使用するTODOリストです。

## ディレクトリ構成

```text
To-do-list/
  docker-compose.yaml           docker-compose起動のためのyamlファイル
  backend/
    Dockerfile
    poetry.lock
    pyproject.toml
    .env.example
    api/
      db.py
      main.py
      migrate.py
      cruds/
      models/
      routers/
      schemas/
  frontend/
    Dockerfile
    package.json
    ...
    src/
      app/
      components/
      hooks/
      types/
```

## 立ち上げ

まず、ローカルのPCにコピーした後、以下の場所にenvファイル等を配置する

```text
To-do-list/
  backend/
  frontend/
```

## docker-compose立ち上げ

```bash
docker-compose up
```

